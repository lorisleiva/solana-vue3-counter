<script setup>
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
import { initWallet } from '@/wallet-vue'
import { initWorkspace } from './useWorkspace'
import { WalletMultiButton, WalletModalProvider } from '@/wallet-vue-ui'
import Counter from './Counter'

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

initWallet({ wallets, autoConnect: true })
initWorkspace()
</script>

<template>
    <div>
        <div class="fixed top-0 right-0 p-8">
            <wallet-modal-provider>
                <wallet-multi-button></wallet-multi-button>
            </wallet-modal-provider>
        </div>
        <counter></counter>
    </div>
</template>
