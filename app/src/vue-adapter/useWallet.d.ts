import { MessageSignerWalletAdapter, SendTransactionOptions, SignerWalletAdapter, WalletError } from '@solana/wallet-adapter-base';
import { Wallet, WalletName } from '@solana/wallet-adapter-wallets';
import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { Ref } from '@vue/runtime-core';
declare type Adapter = ReturnType<Wallet['adapter']>;
export interface WalletStore {
    wallets: Wallet[];
    autoConnect: boolean;
    wallet: Ref<Wallet | null>;
    adapter: Ref<Adapter | null>;
    publicKey: Ref<PublicKey | null>;
    ready: Ref<boolean>;
    connected: Ref<boolean>;
    connecting: Ref<boolean>;
    disconnecting: Ref<boolean>;
    select(walletName: WalletName): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction: Ref<SignerWalletAdapter['signTransaction'] | undefined>;
    signAllTransactions: Ref<SignerWalletAdapter['signAllTransactions'] | undefined>;
    signMessage: Ref<MessageSignerWalletAdapter['signMessage'] | undefined>;
}
export interface WalletStoreProps {
    wallets: Wallet[];
    autoConnect?: boolean;
    onError?: (error: WalletError) => void;
    localStorageKey?: string;
}
export declare const useWallet: () => WalletStore | undefined;
export declare const initWallet: ({ wallets, autoConnect, onError, localStorageKey, }: WalletStoreProps) => void;
export {};
