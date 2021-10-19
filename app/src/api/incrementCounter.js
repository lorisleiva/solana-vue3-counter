import { useWorkspace } from "../useWorkspace"

export default async () => {
    const { baseAccount, program } = useWorkspace()

    await program.value.rpc.increment({
        accounts: {
            baseAccount: baseAccount.publicKey
        }
    })
}
