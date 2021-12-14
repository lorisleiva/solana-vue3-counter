import { WalletName } from "@/wallet-core";
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
    visible: import("vue").Ref<boolean>;
    expanded: import("vue").Ref<boolean>;
    featuredWallets: import("vue").ComputedRef<import("@/wallet-core").Wallet[]>;
    otherWallets: import("vue").ComputedRef<import("@/wallet-core").Wallet[]>;
    modal: import("vue").Ref<Element | undefined>;
    selectWallet: (walletName: WalletName) => void;
    hideModal: () => void;
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
