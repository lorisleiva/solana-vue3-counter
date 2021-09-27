import { ref, computed, watch, watchEffect } from 'vue'
import useLocalStorage from './useLocalStorage'

let walletStore = {}

export const useWallet = () => walletStore

export const initWallet = (wallets, autoConnect = false) => {
    const walletProvider = useLocalStorage('solana-wallet-provider')
    const wallet = ref(null)
    const adapter = ref(null)
    const publicKey = ref(null)
    const ready = ref(false)
    const connected = ref(false)
    const connecting = ref(false)
    const disconnecting = ref(false)

    const walletsByProvider = computed(() => {
        return wallets.reduce((walletsByProvider, wallet) => {
            walletsByProvider[wallet.name] = wallet
            return walletsByProvider
        }, {})
    })

    // Update the wallet and adapter based on the wallet provider.
    watch(walletProvider, () => {
        wallet.value = walletsByProvider.value?.[walletProvider.value]
        adapter.value = wallet.value?.adapter()
        if (adapter.value) {
            ready.value = adapter.value.ready
            publicKey.value = adapter.value.publicKey
            connected.value = adapter.value.connected
        } else {
            ready.value = false
            publicKey.value = null
            connected.value = false
        }
    }, { immediate:true })

    // If autoConnect is enabled, try to connect when the adapter changes and is ready.
    watchEffect(async () => {
        if (! autoConnect || ! adapter.value || ! ready.value || connected.value || connecting.value) return
        try {
            connecting.value = true
            await adapter.value.connect()
        } catch (error) {
            walletProvider.value = null
        } finally {
            connecting.value = false
        }
    })

    // Select a wallet by name.
    const select = async (newWalletProvider) => {
        if (walletProvider.value === newWalletProvider) return
        if (adapter.value) await adapter.value.disconnect()
        walletProvider.value = newWalletProvider
    }

    // Handle the adapter events.
    const onReady = () => ready.value = true
    const onError = (error) => console.log(error)
    const onDisconnect = () => {}
    const onConnect = () => {
        if (! adapter.value) return
        ready.value = adapter.value.ready
        publicKey.value = adapter.value.publicKey
        connected.value = adapter.value.connected
    }
    watchEffect(onInvalidate => {
        if (! adapter.value) return
        adapter.value.on('ready', onReady)
        adapter.value.on('connect', onConnect)
        adapter.value.on('disconnect', onDisconnect)
        adapter.value.on('error', onError)
        onInvalidate(() => {
            if (! adapter.value) return
            adapter.value.off('ready', onReady)
            adapter.value.off('connect', onConnect)
            adapter.value.off('disconnect', onDisconnect)
            adapter.value.off('error', onError)
        })
    })

    // Helper method to create an error whilst using the onError callback.
    const newError = message => {
        const error = new Error(message)
        onError(error)
        return error
    }

    // Connect the adapter to the wallet.
    const connect = async () => {
        if (connected.value || connecting.value || disconnecting.value) return
        if (! wallet.value || ! adapter.value) throw newError('Wallet not selected')

        if (! ready.value) {
            walletProvider.value = null
            window.open(wallet.value.url, '_blank')
            throw newError('Wallet not ready')
        }

        try {
            connecting.value = true
            await adapter.value.connect()
        } catch (error) {
            walletProvider.value = null
            onError(error)
            throw error
        } finally {
            connecting.value = false
        }
    }

    // Disconnect the adapter from the wallet.
    const disconnect = async () => {
        if (disconnecting.value) return
        if (! adapter.value) return walletProvider.value = null

        try {
            disconnecting.value = true
            await adapter.value.disconnect()
        } finally {
            walletProvider.value = null
            disconnecting.value = false
        }
    }

    // Send a transaction using the provided connection.
    const sendTransaction = async (transaction, connection, options = {}) => {
        if (! adapter.value) throw newError('Wallet not selected')
        if (! connected.value) throw newError('Wallet not connected')
        return await adapter.value.sendTransaction(transaction, connection, options)
    }

    // Sign a transaction if the wallet supports it.
    const signTransaction = async (transaction) => {
        if (! adapter?.value?.signTransaction) return
        if (! connected.value) throw newError('Wallet not connected')
        return await adapter.value.signTransaction(transaction)
    }

    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = async (transactions) => {
        if (! adapter?.value?.signAllTransactions) return
        if (! connected.value) throw newError('Wallet not connected')
        return await adapter.value.signAllTransactions(transactions)
    }

    // Sign an arbitrary message if the wallet supports it.
    const signMessage = async (message) => {
        if (! adapter?.value?.signMessage) return
        if (! connected.value) throw newError('Wallet not connected')
        return await adapter.value.signMessage(message)
    }

    walletStore = {
        // Data
        walletProvider,
        walletsByProvider,
        wallet,
        adapter,
        publicKey,
        ready,
        connected,
        connecting,
        disconnecting,

        // Methods
        select,
        connect,
        disconnect,
        sendTransaction,
        signTransaction,
        signAllTransactions,
        signMessage,
    }
}
