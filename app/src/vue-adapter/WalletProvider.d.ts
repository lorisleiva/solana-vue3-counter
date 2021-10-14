import { WalletError } from "@solana/wallet-adapter-base";
import { Wallet } from "@solana/wallet-adapter-wallets";
import { PropType } from "@vue/runtime-core";
declare const _default: import("@vue/runtime-core").DefineComponent<{
    wallets: {
        type: PropType<Wallet[]>;
        default: () => never[];
    };
    autoConnect: {
        type: PropType<boolean>;
        default: boolean;
    };
    onError: {
        type: PropType<(error: WalletError) => void>;
        default: (error: WalletError) => void;
    };
    localStorageKey: {
        type: PropType<string>;
        default: string;
    };
}, () => import("@vue/runtime-core").VNode<import("@vue/runtime-core").RendererNode, import("@vue/runtime-core").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    wallets?: unknown;
    autoConnect?: unknown;
    onError?: unknown;
    localStorageKey?: unknown;
} & {
    onError: (error: WalletError) => void;
    wallets: Wallet[];
    autoConnect: boolean;
    localStorageKey: string;
} & {}>, {
    onError: (error: WalletError) => void;
    wallets: Wallet[];
    autoConnect: boolean;
    localStorageKey: string;
}>;
export default _default;
