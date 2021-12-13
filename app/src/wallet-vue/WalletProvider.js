import { defineComponent } from '@vue/runtime-core';
import { initWallet } from './useWallet';
export const WalletProvider = defineComponent({
    name: 'wallet-provider',
    props: {
        wallets: {
            type: Array,
            default: () => [],
        },
        autoConnect: {
            type: Boolean,
            default: false,
        },
        onError: {
            type: Function,
            default: (error) => console.error(error),
        },
        localStorageKey: {
            type: String,
            default: 'walletName',
        },
    },
    setup(props, { slots }) {
        initWallet({
            wallets: props.wallets,
            autoConnect: props.autoConnect,
            onError: props.onError,
            localStorageKey: props.localStorageKey,
        });
        return () => { var _a; return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots); };
    },
});
//# sourceMappingURL=WalletProvider.js.map