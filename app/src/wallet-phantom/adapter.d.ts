import { BaseMessageSignerWalletAdapter } from '@/wallet-core';
import { PublicKey, Transaction } from '@solana/web3.js';
export interface PhantomWalletAdapterConfig {
}
export declare class PhantomWalletAdapter extends BaseMessageSignerWalletAdapter {
    private _connecting;
    private _wallet;
    private _publicKey;
    constructor(config?: PhantomWalletAdapterConfig);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    ready(): Promise<boolean>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    private _disconnected;
}
