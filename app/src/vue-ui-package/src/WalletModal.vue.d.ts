import { WalletName } from '@solana/wallet-adapter-wallets';
declare const _default: import("vue").DefineComponent<{
    featuredWallets: {
        type: NumberConstructor;
        default: number;
    };
    container: {
        type: StringConstructor;
        default: string;
    };
    logo: StringConstructor;
}, {
    container: string;
    logo: string | undefined;
    visible: any;
    expanded: import("vue").Ref<boolean>;
    featuredWallets: import("vue").ComputedRef<import("@solana/wallet-adapter-wallets").Wallet[]>;
    otherWallets: import("vue").ComputedRef<import("@solana/wallet-adapter-wallets").Wallet[]>;
    modal: import("vue").Ref<Element | undefined>;
    selectWallet: (walletName: WalletName) => void;
    hideModal: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    featuredWallets?: unknown;
    container?: unknown;
    logo?: unknown;
} & {
    featuredWallets: number;
    container: string;
} & {
    logo?: string | undefined;
}>, {
    featuredWallets: number;
    container: string;
}>;
export default _default;
