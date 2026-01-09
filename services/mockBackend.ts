
import { Transaction, TransactionStatus, TransactionType, VirtualCard } from '../types';

/**
 * ARCHITECTURAL GUIDE: NODE.JS BACKEND LOGIC
 * 
 * In a real production environment, this file would be implemented using Express.js.
 * Below is the logic for key fintech features.
 */

// 1. SSLCommerz Payment Session Creator (Express.js Example)
/*
app.post('/api/create-deposit', async (req, res) => {
  const { amount, userId } = req.body;
  const transactionId = `txn_${Date.now()}`;
  
  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `https://yourdomain.com/api/payment/success`,
    fail_url: `https://yourdomain.com/api/payment/fail`,
    cancel_url: `https://yourdomain.com/api/payment/cancel`,
    ipn_url: `https://yourdomain.com/api/payment/webhook`, // Critical for background verification
    product_name: 'Wallet Topup',
    cus_name: 'User Name',
    cus_phone: '017XXXXXXXX'
  };

  const sslcz = new SSLCommerzPayment(STORE_ID, STORE_PASS, IS_LIVE);
  const response = await sslcz.init(data);
  return res.json({ url: response.GatewayPageURL });
});
*/

// 2. Bridgecard Virtual Card Issuance (Express.js Example)
/*
app.post('/api/issue-card', async (req, res) => {
  const { userId, amount } = req.body;
  // Step 1: Check Wallet Balance
  // Step 2: Call Bridgecard API
  const response = await axios.post('https://api.bridgecard.co/v1/issuing/cards', {
    card_type: 'virtual',
    currency: 'USD',
    balance: amount,
    card_brand: 'VISA',
    first_name: 'John',
    last_name: 'Doe'
  }, {
    headers: { 'Authorization': `Bearer ${process.env.BRIDGECARD_API_KEY}` }
  });
  
  // Step 3: Save Token in Firestore (Never full card number)
  await db.collection('users').doc(userId).collection('cards').add({
    card_token: response.data.card_id,
    last4: response.data.last4,
    ...
  });
});
*/

export const EXCHANGE_RATE = 120.50; // 1 USD = 120.50 BDT

export const convertBDTtoUSD = (bdt: number): number => {
  return parseFloat((bdt / EXCHANGE_RATE).toFixed(2));
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 5000,
    currency: 'BDT',
    type: TransactionType.DEPOSIT,
    description: 'bKash Deposit',
    status: TransactionStatus.SUCCESS,
    date: '2023-11-20 14:30'
  },
  {
    id: '2',
    amount: 10,
    currency: 'USD',
    type: TransactionType.CARD_SPEND,
    description: 'Facebook Ads Payment',
    status: TransactionStatus.SUCCESS,
    date: '2023-11-21 09:15'
  },
  {
    id: '3',
    amount: 1205,
    currency: 'BDT',
    type: TransactionType.CONVERSION,
    description: 'Wallet Conversion BDT to USD',
    status: TransactionStatus.SUCCESS,
    date: '2023-11-21 11:00'
  }
];

export const MOCK_CARD: VirtualCard = {
  id: 'vcard_123',
  cardNumber: '4532 8812 0098 4451',
  expiry: '12/26',
  cvv: '998',
  holderName: 'RAKIBUL HASAN',
  balance: 245.50,
  type: 'VISA',
  isFrozen: false
};
