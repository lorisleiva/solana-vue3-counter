import { web3 } from '@project-serum/anchor'
import { useWorkspace } from "../useWorkspace"

export default async () => {
    const { baseAccount, provider, program } = useWorkspace()

    try {
        await program.rpc.create({
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [baseAccount]
        })
    } catch (err) {
        console.log("Transaction error: ", err)
    }
}
