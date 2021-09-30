<template>
    <div>
        <wallet-multi-button></wallet-multi-button>
        <wallet-modal></wallet-modal>
        <button @click="create">Create counter</button>
        <button @click="increment">Increment counter</button>
        <h1>Counter: {{ counter ?? 'NOT SET' }}</h1>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getPhantomWallet } from '@solana/wallet-adapter-wallets'
import { initWallet, useWallet } from './vue-adapter'
import { initWorkspace } from './useWorkspace'
import createCounter from './api/createCounter'
import fetchAccount from './api/fetchAccount'
import incrementCounter from './api/incrementCounter'
import WalletMultiButton from './vue-ui/WalletMultiButton'
import WalletModal from './vue-ui/WalletModal'

const wallets = [getPhantomWallet()]

export default {
    name: 'App',
    components: {
        WalletMultiButton,
        WalletModal,
    },
    setup () {
        initWallet({ wallets, autoConnect: false })
        initWorkspace()
        const { wallet, walletName, connect, disconnect, connected } = useWallet()
        const counter = ref(null)

        const fetchCounter = async () => {
            const account = await fetchAccount()
            counter.value = account.count.toString()
        }

        const create = async () => {
            await createCounter()
            await fetchCounter()
        }

        const increment = async () => {
            await incrementCounter()
            await fetchCounter()
        }

        return {
            walletName,
            wallet,
            connect,
            disconnect,
            connected,
            counter,
            create,
            increment,
        }
    },
}
</script>
