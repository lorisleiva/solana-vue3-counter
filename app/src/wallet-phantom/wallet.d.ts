import { Wallet, WalletName } from '@/wallet-core';
import { PhantomWalletAdapterConfig } from './adapter';
export declare const PhantomWalletName: WalletName;
export declare const getPhantomWallet: (config?: PhantomWalletAdapterConfig) => Wallet;
