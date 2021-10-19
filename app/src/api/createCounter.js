import { web3 } from '@project-serum/anchor'
import { useWorkspace } from "../useWorkspace"

export default async () => {
    const { baseAccount, wallet, program } = useWorkspace()

    try {
        await program.value.rpc.create({
            accounts: {
                baseAccount: baseAccount.publicKey,
                user: wallet.value.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [baseAccount]
        })
    } catch (err) {
        console.log("Transaction error: ", err)
    }
}
