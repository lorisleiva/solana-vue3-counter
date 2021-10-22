import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider, web3 } from '@project-serum/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-vue'
import { computed } from 'vue'
import idl from '../../target/idl/learn_anchor_1.json'

const programID = new PublicKey(idl.metadata.address)
let workspaceStore = {}

export const useWorkspace = () => workspaceStore

export const initWorkspace = (network = 'http://127.0.0.1:8899', preflightCommitment = 'processed') => {
    const baseAccount = web3.Keypair.generate()
    const wallet = useAnchorWallet()
    const connection = new Connection(network, preflightCommitment)
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment }))
    const program = computed(() => new Program(idl, programID, provider.value))

    workspaceStore = {
        baseAccount,
        connection,
        provider,
        program,
        wallet,
    }
}
