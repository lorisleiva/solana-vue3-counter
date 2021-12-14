import EventEmitter from 'eventemitter3';
export { EventEmitter };
export class BaseWalletAdapter extends EventEmitter {
    get connected() {
        return !!this.publicKey;
    }
}
export var WalletAdapterNetwork;
(function (WalletAdapterNetwork) {
    WalletAdapterNetwork["Mainnet"] = "mainnet-beta";
    WalletAdapterNetwork["Testnet"] = "testnet";
    WalletAdapterNetwork["Devnet"] = "devnet";
})(WalletAdapterNetwork || (WalletAdapterNetwork = {}));
//# sourceMappingURL=adapter.js.map