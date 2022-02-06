import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'solana-wallets-vue/styles.css'
import SolanaWallets from 'solana-wallets-vue'

import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
    wallets: [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: 'devnet' }),
      new TorusWalletAdapter(),
      new SolletWalletAdapter({ network: 'devnet' }),
      new SolletExtensionWalletAdapter({ network: 'devnet' }),
    ],
    autoConnect: true,
}

createApp(App)
    .use(SolanaWallets, walletOptions)
    .mount('#app')
