<template>
    <div>
        <div class="fixed top-0 right-0 p-8">
            <wallet-multi-button></wallet-multi-button>
        </div>
        <div class="flex h-screen">
            <div class="m-auto w-full max-w-sm">
                <div class="flex flex-col -space-y-px">
                    <div class="text-center bg-gray-50 border border-gray-200 rounded-t-lg p-8">
                        <h1 class="text-6xl font-semibold text-gray-700">{{ counter ?? 'NOT SET' }}</h1>
                        <p class="text-xs uppercase tracking-widest font-semibold text-gray-500">Counter</p>
                    </div>
                    <div class="flex bg-gray-50 border border-gray-200 rounded-b-lg overflow-hidden divide-x divide-gray-200">
                        <button class="flex-1 p-4 hover:bg-gray-100" @click="create">Create counter</button>
                        <button class="flex-1 p-4 hover:bg-gray-100" @click="increment">Increment counter</button>
                    </div>
                </div>
                <p 
                    class="text-xs text-gray-500 mt-4 text-center"
                    v-text="connected ? `You are connected as: ${publicKey}` : 'You are not connected!'"
                ></p>
            </div>

        </div>
        <wallet-modal></wallet-modal>
    </div>
</template>

<script>
import {
    getPhantomWallet,
    getBitpieWallet,
    getBloctoWallet,
    getCoin98Wallet,
    getLedgerWallet,
    getMathWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletWallet,
    getSolletExtensionWallet,
    getSolongWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets'
import { ref } from 'vue'
import { initWallet, useWallet } from './vue-adapter'
import { initWorkspace } from './useWorkspace'
import createCounter from './api/createCounter'
import fetchAccount from './api/fetchAccount'
import incrementCounter from './api/incrementCounter'
import WalletMultiButton from './vue-ui/WalletMultiButton'
import WalletModal from './vue-ui/WalletModal'

const wallets = [
    getPhantomWallet(),
    getBitpieWallet(),
    getBloctoWallet(),
    getCoin98Wallet(),
    getLedgerWallet(),
    getMathWallet(),
    getMathWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getSolflareWebWallet(),
    getSolletWallet(),
    getSolletExtensionWallet(),
    getSolongWallet(),
    getTorusWallet(),
]

export default {
    name: 'App',
    components: {
        WalletMultiButton,
        WalletModal,
    },
    setup () {
        initWallet({ wallets, autoConnect: false })
        initWorkspace()
        const { publicKey, connected } = useWallet()
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
            publicKey,
            connected,
            counter,
            create,
            increment,
        }
    },
}
</script>
