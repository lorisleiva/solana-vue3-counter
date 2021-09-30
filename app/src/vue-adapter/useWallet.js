var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, computed, watch, watchEffect } from '@vue/runtime-core';
import { WalletNotConnectedError, WalletNotReadyError, } from '@solana/wallet-adapter-base';
import { useLocalStorage } from './useLocalStorage';
import { WalletNotSelectedError, OperationNotSupportedByWalletError } from './errors';
let walletStore = {};
export const useWallet = () => walletStore;
export const initWallet = ({ wallets, autoConnect = false, onError = (error) => console.error(error), localStorageKey = 'walletName', }) => {
    const walletName = useLocalStorage(localStorageKey);
    const wallet = ref(null);
    const adapter = ref(null);
    const publicKey = ref(null);
    const ready = ref(false);
    const connected = ref(false);
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
        var _a, _b, _c, _d;
        wallet.value = (_b = (_a = walletsByName.value) === null || _a === void 0 ? void 0 : _a[walletName.value]) !== null && _b !== void 0 ? _b : null;
        adapter.value = (_d = (_c = wallet.value) === null || _c === void 0 ? void 0 : _c.adapter()) !== null && _d !== void 0 ? _d : null;
        if (adapter.value) {
            ready.value = adapter.value.ready;
            publicKey.value = adapter.value.publicKey;
            connected.value = adapter.value.connected;
        }
        else {
            ready.value = false;
            publicKey.value = null;
            connected.value = false;
        }
    }, { immediate: true });
    // Select a wallet by name.
    const select = (newWalletName) => __awaiter(void 0, void 0, void 0, function* () {
        if (walletName.value === newWalletName)
            return;
        if (adapter.value)
            yield adapter.value.disconnect();
        walletName.value = newWalletName;
    });
    // Handle the adapter events.
    const onReady = () => ready.value = true;
    const onConnect = () => {
        if (!adapter.value)
            return;
        ready.value = adapter.value.ready;
        publicKey.value = adapter.value.publicKey;
        connected.value = adapter.value.connected;
    };
    watchEffect(onInvalidate => {
        if (!adapter.value)
            return;
        adapter.value.on('ready', onReady);
        adapter.value.on('connect', onConnect);
        adapter.value.on('error', onError);
        onInvalidate(() => {
            if (!adapter.value)
                return;
            adapter.value.off('ready', onReady);
            adapter.value.off('connect', onConnect);
            adapter.value.off('error', onError);
        });
    });
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
            walletName.value = null;
            window.open(wallet.value.url, '_blank');
            throw newError(new WalletNotReadyError());
        }
        try {
            connecting.value = true;
            yield adapter.value.connect();
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
        if (!adapter.value) {
            walletName.value = null;
            return;
        }
        try {
            disconnecting.value = true;
            yield adapter.value.disconnect();
        }
        finally {
            walletName.value = null;
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
    const signTransaction = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter.value)
            throw newError(new WalletNotSelectedError());
        if (!connected.value)
            throw newError(new WalletNotConnectedError());
        if (!('signTransaction' in adapter.value))
            throw newError(new OperationNotSupportedByWalletError());
        return yield adapter.value.signTransaction(transaction);
    });
    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = (transactions) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter.value)
            throw newError(new WalletNotSelectedError());
        if (!connected.value)
            throw newError(new WalletNotConnectedError());
        if (!('signAllTransactions' in adapter.value))
            throw newError(new OperationNotSupportedByWalletError());
        return yield adapter.value.signAllTransactions(transactions);
    });
    // Sign an arbitrary message if the wallet supports it.
    const signMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter.value)
            throw newError(new WalletNotSelectedError());
        if (!connected.value)
            throw newError(new WalletNotConnectedError());
        if (!('signMessage' in adapter.value))
            throw newError(new OperationNotSupportedByWalletError());
        return yield adapter.value.signMessage(message);
    });
    // If autoConnect is enabled, try to connect when the adapter changes and is ready.
    watchEffect(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!autoConnect || !adapter.value || !ready.value || connected.value || connecting.value)
            return;
        yield connect();
    }));
    walletStore = {
        // Props.
        wallets,
        autoConnect,
        // Data.
        walletName,
        walletsByName,
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