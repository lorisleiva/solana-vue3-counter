import { WalletAdapter } from './adapter';
import { MessageSignerWalletAdapter, SignerWalletAdapter } from './signer';
declare type Brand<T, B> = T & {
    __brand__: B;
};
export declare type WalletName = Brand<string, 'WalletName'>;
export declare type Adapter = WalletAdapter | SignerWalletAdapter | MessageSignerWalletAdapter;
export interface Wallet {
    name: WalletName;
    url: string;
    icon: string;
    adapter: Adapter;
}
export {};
