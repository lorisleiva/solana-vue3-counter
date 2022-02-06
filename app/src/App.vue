<script setup>
import { WalletMultiButton } from 'solana-wallets-vue'
import Counter from './Counter'
</script>

<template>
    <div>
        <div class="fixed top-0 right-0 p-8">
            <wallet-multi-button></wallet-multi-button>
        </div>
        <counter></counter>
    </div>
</template>
