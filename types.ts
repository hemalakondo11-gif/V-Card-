
export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  CARD_SPEND = 'CARD_SPEND',
  CONVERSION = 'CONVERSION'
}

export interface Transaction {
  id: string;
  amount: number;
  currency: 'BDT' | 'USD';
  type: TransactionType;
  description: string;
  status: TransactionStatus;
  date: string;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  holderName: string;
  balance: number;
  type: 'VISA' | 'MASTERCARD';
  isFrozen: boolean;
}

export interface UserWallet {
  bdtBalance: number;
  usdBalance: number;
}
