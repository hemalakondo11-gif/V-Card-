
# NexusPay: Virtual Card Issuing App Architecture Guide

## 1. Backend Stack (Node.js/Firebase)
- **API Framework:** Express.js on Firebase Cloud Functions.
- **Database:** Firestore for User Profiles, Wallet Balances, and Transaction Logs.
- **Authentication:** Firebase Auth (Phone + OTP).

## 2. Payments (SSLCommerz)
- **Flow:**
  1. App calls `/create-payment-session` on your Node server.
  2. Server uses SSLCommerz API to generate a `GatewayPageURL`.
  3. App opens the URL in a Webview or Browser.
  4. After payment, SSLCommerz sends an **IPN (Instant Payment Notification)** to your server webhook.
- **Webhook Security:** Always verify the IPN hash using the SSLCommerz verification API before updating the user's wallet.

## 3. Card Issuance (Bridgecard/Reloadly)
- **Provider Choice:** 
  - **Bridgecard.co:** Excellent for African/Asian fintechs, allows issuing USD cards.
  - **Reloadly:** Simple API for cards and top-ups.
- **Security Rule:** NEVER store CCV or full Card Number. Only store the `card_id` token. When a user wants to view the card, fetch details from the provider's API on-the-fly via your server.

## 4. Currency Conversion Logic
- Use a library like `axios` to fetch rates from `exchangerate-api.com`.
- Apply a "Spread" (markup). If market rate is 118 BDT, sell to users at 122 BDT to cover processing fees.

## 5. Webhook Logic for Wallet Topup (Node.js)
```javascript
app.post('/api/payment/webhook', async (req, res) => {
    const { tran_id, status, amount, verify_sign } = req.body;
    
    // 1. Verify payment with SSLCommerz API
    const isValid = await verifyWithSSLCommerz(tran_id, verify_sign);
    
    if (isValid && status === 'VALID') {
        // 2. Fetch User ID associated with this tran_id from Firestore
        const userId = await getUserIdByTxn(tran_id);
        
        // 3. Atomically update wallet using Firestore Transactions
        const userRef = db.collection('users').doc(userId);
        await db.runTransaction(async (t) => {
            const doc = await t.get(userRef);
            const newBalance = doc.data().bdtBalance + parseFloat(amount);
            t.update(userRef, { bdtBalance: newBalance });
            
            // 4. Create Transaction Log
            const txnRef = db.collection('transactions').doc(tran_id);
            t.set(txnRef, { 
                amount, 
                status: 'SUCCESS', 
                type: 'DEPOSIT', 
                timestamp: admin.firestore.FieldValue.serverTimestamp() 
            });
        });
    }
    return res.status(200).send('OK');
});
```
