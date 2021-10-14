var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WalletNotConnectedError, WalletNotReadyError, } from '@solana/wallet-adapter-base';
import { computed, inject, provide, ref, watch, watchEffect } from '@vue/runtime-core';
import { WalletNotSelectedError } from './errors';
import { useLocalStorage } from './useLocalStorage';
const walletStoreKey = Symbol();
export const useWallet = () => {
    return inject(walletStoreKey);
};
export const initWallet = ({ wallets, autoConnect = false, onError = (error) => console.error(error), localStorageKey = 'walletName', }) => {
    const name = useLocalStorage(localStorageKey);
    const wallet = ref(null);
    const adapter = ref(null);
    const publicKey = ref(null);
    const ready = ref(false);
    const connected = ref(false);
    const connecting = ref(false);
    const disconnecting = ref(false);
    // Helper methods to set and reset the main state variables.
    const setState = (state) => {
        wallet.value = state.wallet;
        adapter.value = state.adapter;
        ready.value = state.ready;
        publicKey.value = state.publicKey;
        connected.value = state.connected;
    };
    const setStateFromAdapter = (wallet, adapter) => {
        setState({
            wallet,
            adapter,
            ready: adapter.ready,
            publicKey: adapter.publicKey,
            connected: adapter.connected,
        });
    };
    const resetState = () => {
        setState({
            wallet: null,
            adapter: null,
            ready: false,
            publicKey: null,
            connected: false,
        });
    };
    // Create a wallet dictionary keyed by their name.
    const walletsByName = computed(() => {
        return wallets.reduce((walletsByName, wallet) => {
            walletsByName[wallet.name] = wallet;
            return walletsByName;
        }, {});
    });
    // Update the wallet and adapter based on the wallet provider.
    watch(name, () => {
        var _a, _b, _c;
        const wallet = (_b = (_a = walletsByName.value) === null || _a === void 0 ? void 0 : _a[name.value]) !== null && _b !== void 0 ? _b : null;
        const adapter = (_c = wallet === null || wallet === void 0 ? void 0 : wallet.adapter()) !== null && _c !== void 0 ? _c : null;
        if (!adapter)
            return resetState();
        setStateFromAdapter(wallet, adapter);
    }, { immediate: true });
    // Select a wallet by name.
    const select = (newName) => __awaiter(void 0, void 0, void 0, function* () {
        if (name.value === newName)
            return;
        if (adapter.value)
            yield adapter.value.disconnect();
        name.value = newName;
    });
    // Handle the adapter events.
    const onReady = () => (ready.value = true);
    const onDisconnect = () => (name.value = null);
    const onConnect = () => {
        if (!wallet.value || !adapter.value)
            return;
        setStateFromAdapter(wallet.value, adapter.value);
    };
    const invalidateListeners = watchEffect((onInvalidate) => {
        const _adapter = adapter.value;
        if (!_adapter)
            return;
        _adapter.on('ready', onReady);
        _adapter.on('connect', onConnect);
        _adapter.on('disconnect', onDisconnect);
        _adapter.on('error', onError);
        onInvalidate(() => {
            _adapter.off('ready', onReady);
            _adapter.off('connect', onConnect);
            _adapter.off('disconnect', onDisconnect);
            _adapter.off('error', onError);
        });
    });
    if (typeof window !== 'undefined') {
        // Ensure the adapter listeners are invalidated before refreshing the page.
        // This is because Vue does not unmount components when the page is being refreshed.
        window.addEventListener('beforeunload', invalidateListeners);
    }
    // Helper method to return an error whilst using the onError callback.
    const newError = (error) => {
        onError(error);
        return error;
    };
    // Connect the adapter to the wallet.
    const connect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (connected.value || connecting.value || disconnecting.value)
            return;
        if (!wallet.value || !adapter.value)
            throw newError(new WalletNotSelectedError());
        if (!ready.value) {
            name.value = null;
            window.open(wallet.value.url, '_blank');
            throw newError(new WalletNotReadyError());
        }
        try {
            connecting.value = true;
            yield adapter.value.connect();
        }
        catch (error) {
            name.value = null;
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
        if (!adapter.value) {
            name.value = null;
            return;
        }
        try {
            disconnecting.value = true;
            yield adapter.value.disconnect();
        }
        finally {
            name.value = null;
            disconnecting.value = false;
        }
    });
    // Send a transaction using the provided connection.
    const sendTransaction = (transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter.value)
            throw newError(new WalletNotSelectedError());
        if (!connected.value)
            throw newError(new WalletNotConnectedError());
        return yield adapter.value.sendTransaction(transaction, connection, options);
    });
    // Sign a transaction if the wallet supports it.
    const signTransaction = computed(() => {
        const _adapter = adapter.value;
        if (!(_adapter && 'signTransaction' in _adapter))
            return;
        return (transaction) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected.value)
                throw newError(new WalletNotConnectedError());
            return yield _adapter.signTransaction(transaction);
        });
    });
    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = computed(() => {
        const _adapter = adapter.value;
        if (!(_adapter && 'signAllTransactions' in _adapter))
            return;
        return (transactions) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected.value)
                throw newError(new WalletNotConnectedError());
            return yield _adapter.signAllTransactions(transactions);
        });
    });
    // Sign an arbitrary message if the wallet supports it.
    const signMessage = computed(() => {
        const _adapter = adapter.value;
        if (!(_adapter && 'signMessage' in _adapter))
            return;
        return (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected.value)
                throw newError(new WalletNotConnectedError());
            return yield _adapter.signMessage(message);
        });
    });
    // If autoConnect is enabled, try to connect when the adapter changes and is ready.
    watchEffect(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!autoConnect || !adapter.value || !ready.value || connected.value || connecting.value)
            return;
        try {
            connecting.value = true;
            yield adapter.value.connect();
        }
        catch (error) {
            // Clear the selected wallet
            name.value = null;
            // Don't throw error, but onError will still be called
        }
        finally {
            connecting.value = false;
        }
    }));
    // Set up the store.
    provide(walletStoreKey, {
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
    });
};
//# sourceMappingURL=useWallet.js.map