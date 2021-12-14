import { computed } from '@vue/reactivity';
import { useWallet } from './useWallet';
export function useAnchorWallet() {
    const walletStore = useWallet();
    return computed(() => {
        // Ensure the wallet store was initialised by a WalletProvider.
        if (!walletStore)
            return;
        // Ensure the wallet is connected and supports the right methods.
        const { signTransaction, signAllTransactions, publicKey } = walletStore;
        if (!publicKey.value || !signTransaction.value || !signAllTransactions.value)
            return;
        return {
            publicKey: publicKey.value,
            signTransaction: signTransaction.value,
            signAllTransactions: signAllTransactions.value,
        };
    });
}
//# sourceMappingURL=useAnchorWallet.js.map