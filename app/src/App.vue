<script setup>
import {
    getPhantomWallet,
} from '@/wallet-wallets'
import { WalletProvider } from '@/wallet-vue'
import { WalletMultiButton, WalletModalProvider } from '@/wallet-vue-ui'
import Counter from './Counter'

const wallets = [
    getPhantomWallet(),
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
