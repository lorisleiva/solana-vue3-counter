import { WalletError } from '@/wallet-core';
export class WalletNotSelectedError extends WalletError {
    constructor() {
        super(...arguments);
        this.name = 'WalletNotSelectedError';
    }
}
//# sourceMappingURL=errors.js.map