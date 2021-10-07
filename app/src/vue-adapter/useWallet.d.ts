import { Ref } from '@vue/runtime-core';
import { Connection, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { SendTransactionOptions, WalletError, SignerWalletAdapterProps, MessageSignerWalletAdapterProps } from '@solana/wallet-adapter-base';
import { Wallet, WalletName } from '@solana/wallet-adapter-wallets';
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
    signTransaction: Ref<SignerWalletAdapterProps['signTransaction'] | undefined>;
    signAllTransactions: Ref<SignerWalletAdapterProps['signAllTransactions'] | undefined>;
    signMessage: Ref<MessageSignerWalletAdapterProps['signMessage'] | undefined>;
}
export interface WalletStoreProps {
    wallets: Wallet[];
    autoConnect?: boolean;
    onError?: (error: WalletError) => void;
    localStorageKey?: string;
}
export declare const useWallet: () => WalletStore;
export declare const initWallet: ({ wallets, autoConnect, onError, localStorageKey, }: WalletStoreProps) => (() => void);
export {};
