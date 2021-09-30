import { WalletError } from '@solana/wallet-adapter-base';
export declare class WalletNotSelectedError extends WalletError {
    name: string;
}
export declare class OperationNotSupportedByWalletError extends WalletError {
    name: string;
}
