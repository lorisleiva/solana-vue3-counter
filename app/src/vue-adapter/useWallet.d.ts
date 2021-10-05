import { Ref } from '@vue/runtime-core';
import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { SendTransactionOptions, WalletError } from '@solana/wallet-adapter-base';
import { Wallet, WalletName } from '@solana/wallet-adapter-wallets';
declare type Adapter = ReturnType<Wallet['adapter']>;
export interface WalletStore {
    wallets: Wallet[];
    autoConnect: boolean;
    wallet: Wallet | null;
    adapter: Adapter | null;
    publicKey: PublicKey | null;
    ready: boolean;
    connected: boolean;
    connecting: Ref<boolean>;
    disconnecting: Ref<boolean>;
    select(walletName: WalletName): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction: Ref<((transaction: Transaction) => Promise<Transaction>) | undefined>;
    signAllTransactions: Ref<((transaction: Transaction[]) => Promise<Transaction[]>) | undefined>;
    signMessage: Ref<((message: Uint8Array) => Promise<Uint8Array>) | undefined>;
}
export interface WalletStoreProps {
    wallets: Wallet[];
    autoConnect?: boolean;
    onError?: (error: WalletError) => void;
    localStorageKey?: string;
}
export declare const useWallet: () => WalletStore;
export declare const initWallet: ({ wallets, autoConnect, onError, localStorageKey, }: WalletStoreProps) => void;
export {};
