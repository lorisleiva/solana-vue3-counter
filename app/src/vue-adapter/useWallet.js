var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readonly, ref, computed, watch, watchEffect } from '@vue/runtime-core';
import { WalletNotConnectedError, WalletNotReadyError, } from '@solana/wallet-adapter-base';
import { useLocalStorage } from './useLocalStorage';
import { WalletNotSelectedError } from './errors';
function useState(initialState) {
    const state = ref(initialState);
    const setState = (newState) => {
        state.value = newState;
    };
    return [readonly(state), setState];
}
const initialState = {
    wallet: null,
    adapter: null,
    ready: false,
    publicKey: null,
    connected: false,
};
let walletStore = {};
export const useWallet = () => walletStore;
export const initWallet = ({ wallets, autoConnect = false, onError = (error) => console.error(error), localStorageKey = 'walletName', }) => {
    const walletName = useLocalStorage(localStorageKey);
    const [{ wallet, adapter, ready, publicKey, connected }, setState] = useState(initialState);
    // const wallet = ref<Wallet | null>(null);
    // const adapter = ref<Adapter | null>(null);
    // const publicKey = ref<PublicKey | null>(null);
    // const ready = ref<boolean>(false);
    // const connected = ref<boolean>(false);
    const connecting = ref(false);
    const disconnecting = ref(false);
    const walletsByName = computed(() => {
        return wallets.reduce((walletsByName, wallet) => {
            walletsByName[wallet.name] = wallet;
            return walletsByName;
        }, {});
    });
    // Update the wallet and adapter based on the wallet provider.
    watch(walletName, () => {
        var _a, _b, _c;
        const wallet = (_b = (_a = walletsByName.value) === null || _a === void 0 ? void 0 : _a[walletName.value]) !== null && _b !== void 0 ? _b : null;
        const adapter = (_c = wallet === null || wallet === void 0 ? void 0 : wallet.adapter()) !== null && _c !== void 0 ? _c : null;
        if (adapter) {
            const { ready, publicKey, connected } = adapter;
            setState({ wallet, adapter, connected, publicKey, ready });
        }
        else {
            setState(initialState);
        }
    }, { immediate: true });
    // Select a wallet by name.
    const select = (newWalletName) => __awaiter(void 0, void 0, void 0, function* () {
        if (walletName.value === newWalletName)
            return;
        if (adapter)
            yield adapter.disconnect();
        walletName.value = newWalletName;
    });
    // Handle the adapter events.
    const onReady = () => setState({ wallet, adapter, connected, publicKey, ready: true });
    const onConnect = () => {
        if (!adapter)
            return;
        const { connected, publicKey, ready } = adapter;
        setState({ wallet, adapter, connected, publicKey, ready });
    };
    watchEffect(onInvalidate => {
        if (!adapter)
            return;
        adapter.on('ready', onReady);
        adapter.on('connect', onConnect);
        adapter.on('error', onError);
        onInvalidate(() => {
            if (!adapter)
                return;
            adapter.off('ready', onReady);
            adapter.off('connect', onConnect);
            adapter.off('error', onError);
        });
    });
    // Helper method to return an error whilst using the onError callback.
    const newError = (error) => {
        onError(error);
        return error;
    };
    // Connect the adapter to the wallet.
    const connect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (connected || connecting.value || disconnecting.value)
            return;
        if (!wallet || !adapter)
            throw newError(new WalletNotSelectedError());
        if (!ready) {
            walletName.value = null;
            window.open(wallet.url, '_blank');
            throw newError(new WalletNotReadyError());
        }
        try {
            connecting.value = true;
            yield adapter.connect();
        }
        catch (error) {
            walletName.value = null;
            throw error;
        }
        finally {
            connecting.value = false;
        }
    });
    // Disconnect the adapter from the wallet.
    const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (disconnecting.value)
            return;
        if (!adapter) {
            walletName.value = null;
            return;
        }
        try {
            disconnecting.value = true;
            yield adapter.disconnect();
        }
        finally {
            walletName.value = null;
            disconnecting.value = false;
        }
    });
    // Send a transaction using the provided connection.
    const sendTransaction = (transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter)
            throw newError(new WalletNotSelectedError());
        if (!connected)
            throw newError(new WalletNotConnectedError());
        return yield adapter.sendTransaction(transaction, connection, options);
    });
    // Sign a transaction if the wallet supports it.
    const signTransaction = computed(() => {
        if (!(adapter && 'signTransaction' in adapter))
            return undefined;
        return (transaction) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw newError(new WalletNotConnectedError());
            // @ts-ignore
            return yield adapter.signTransaction(transaction);
        });
    });
    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = computed(() => {
        if (!(adapter && 'signAllTransactions' in adapter))
            return undefined;
        return (transactions) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw newError(new WalletNotConnectedError());
            // @ts-ignore
            return yield adapter.signAllTransactions(transactions);
        });
    });
    // Sign an arbitrary message if the wallet supports it.
    const signMessage = computed(() => {
        if (!(adapter && 'signMessage' in adapter))
            return undefined;
        return (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw newError(new WalletNotConnectedError());
            // @ts-ignore
            return yield adapter.signMessage(message);
        });
    });
    // If autoConnect is enabled, try to connect when the adapter changes and is ready.
    watchEffect(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!autoConnect || !adapter || !ready || connected || connecting.value)
            return;
        yield connect();
    }));
    walletStore = {
        // Props.
        wallets,
        autoConnect,
        // Data.
        wallet,
        adapter,
        publicKey,
        ready,
        connected,
        connecting,
        disconnecting,
        // Methods.
        select,
        connect,
        disconnect,
        sendTransaction,
        signTransaction,
        signAllTransactions,
        signMessage,
    };
};
//# sourceMappingURL=useWallet.js.map