var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseMessageSignerWalletAdapter, WalletAccountError, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletSignTransactionError, WalletWindowClosedError, } from '@/wallet-core';
import { PublicKey } from '@solana/web3.js';
export class PhantomWalletAdapter extends BaseMessageSignerWalletAdapter {
    constructor(config = {}) {
        super();
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                this.emit('error', new WalletDisconnectedError());
                this.emit('disconnect');
            }
        };
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
    }
    get publicKey() {
        return this._publicKey;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.isConnected);
    }
    ready() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window === 'undefined' || typeof document === 'undefined')
                return false;
            if (document.readyState === 'complete')
                return !!((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isPhantom);
            return new Promise((resolve) => {
                function listener() {
                    var _a;
                    window.removeEventListener('load', listener);
                    resolve(!!((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isPhantom));
                }
                window.addEventListener('load', listener);
            });
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                this._connecting = true;
                if (!(yield this.ready()))
                    throw new WalletNotReadyError();
                const wallet = window.solana;
                if (!wallet.isConnected) {
                    // HACK: Phantom doesn't reject or emit an event if the popup is closed
                    const handleDisconnect = wallet._handleDisconnect;
                    try {
                        yield new Promise((resolve, reject) => {
                            const connect = () => {
                                wallet.off('connect', connect);
                                resolve();
                            };
                            wallet._handleDisconnect = (...args) => {
                                wallet.off('connect', connect);
                                reject(new WalletWindowClosedError());
                                return handleDisconnect.apply(wallet, args);
                            };
                            wallet.on('connect', connect);
                            wallet.connect().catch((reason) => {
                                wallet.off('connect', connect);
                                reject(reason);
                            });
                        });
                    }
                    catch (error) {
                        if (error instanceof WalletError)
                            throw error;
                        throw new WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                    }
                    finally {
                        wallet._handleDisconnect = handleDisconnect;
                    }
                }
                if (!wallet.publicKey)
                    throw new WalletAccountError();
                let publicKey;
                try {
                    publicKey = new PublicKey(wallet.publicKey.toBytes());
                }
                catch (error) {
                    throw new WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
                }
                wallet.on('disconnect', this._disconnected);
                this._wallet = wallet;
                this._publicKey = publicKey;
                this.emit('connect');
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                this._connecting = false;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this._publicKey = null;
                try {
                    yield wallet.disconnect();
                }
                catch (error) {
                    this.emit('error', new WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
                }
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new WalletNotConnectedError();
                try {
                    return (yield wallet.signTransaction(transaction)) || transaction;
                }
                catch (error) {
                    throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new WalletNotConnectedError();
                try {
                    return (yield wallet.signAllTransactions(transactions)) || transactions;
                }
                catch (error) {
                    throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new WalletNotConnectedError();
                try {
                    const { signature } = yield wallet.signMessage(message);
                    return signature;
                }
                catch (error) {
                    throw new WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=adapter.js.map