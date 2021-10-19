import { computed } from '@vue/reactivity';
import { useWallet } from './useWallet';
export function useAnchorWallet() {
    const wallet = useWallet();
    return computed(() => {
        // Ensure the wallet was initialised by a WalletProvider.
        if (!wallet)
            return;
        // Ensure the wallet is connect and supports the right methods.
        const { signTransaction, signAllTransactions, publicKey } = wallet;
        if (!signTransaction.value || !signAllTransactions.value || !publicKey.value)
            return;
        return {
            signTransaction: signTransaction.value,
            signAllTransactions: signAllTransactions.value,
            publicKey: publicKey.value,
        };
    });
}
//# sourceMappingURL=useAnchorWallet.js.map