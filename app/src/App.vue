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
import { WalletProvider } from '@solana/wallet-adapter-vue'
import { WalletMultiButton, WalletModalProvider } from './vue-ui'
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
</script>

<template>
    <wallet-provider :wallets="wallets" auto-connect>
        <div>
            <div class="fixed top-0 right-0 p-8">
                <wallet-modal-provider>
                    <wallet-multi-button></wallet-multi-button>
                </wallet-modal-provider>
            </div>
            <counter></counter>
        </div>
    </wallet-provider>
</template>
