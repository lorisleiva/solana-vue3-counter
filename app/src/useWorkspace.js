import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider, web3 } from '@project-serum/anchor'
import { useWallet } from '@solana/wallet-adapter-vue'
import idl from '../../target/idl/learn_anchor_1.json'

const programID = new PublicKey(idl.metadata.address)
let workspaceStore = {}

export const useWorkspace = () => workspaceStore

export const initWorkspace = (network = 'http://127.0.0.1:8899', preflightCommitment = 'processed') => {
    const { 
        sendTransaction,
        signTransaction,
        signAllTransactions,
        signMessage,
        publicKey,
    } = useWallet()

    const providerWallet = {
        sendTransaction,
        get signTransaction () { return signTransaction.value },
        get signAllTransactions () { return signAllTransactions.value },
        get signMessage () { return signMessage.value },
        get publicKey () { return publicKey.value },
    }

    const baseAccount = web3.Keypair.generate()
    const connection = new Connection(network, preflightCommitment)
    const provider = new Provider(connection, providerWallet, { preflightCommitment })
    const program = new Program(idl, programID, provider)

    workspaceStore = {
        baseAccount,
        connection,
        provider,
        program,
    }
}
