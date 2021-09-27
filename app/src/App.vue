<template>
    <div>
        <pre>{{ wallet }}</pre>
        <input type="text" v-model="walletProvider">
        {{ walletProvider }}
        <button v-if="connected" @click="disconnect">Disconnect</button>
        <button v-else @click="connect">Connect</button>
        <button @click="create">Create counter</button>
        <button @click="increment">Increment counter</button>
        <h1>Counter: {{ counter ?? 'NOT SET' }}</h1>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getPhantomWallet } from '@solana/wallet-adapter-wallets'
import { initWallet, useWallet } from './useWallet'
import { initWorkspace } from './useWorkspace'
import createCounter from './api/createCounter'
import fetchAccount from './api/fetchAccount'
import incrementCounter from './api/incrementCounter'

const wallets = [getPhantomWallet()]

export default {
    name: 'App',
    setup () {
        initWallet(wallets, true)
        initWorkspace()
        const { wallet, walletProvider, connect, disconnect, connected } = useWallet()
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
            walletProvider,
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
