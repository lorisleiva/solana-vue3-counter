import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'solana-wallets-vue/styles.css'
import SolanaWallets from 'solana-wallets-vue'

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

createApp(App)
    .use(SolanaWallets, { wallets, autoConnect: true })
    .mount('#app')
