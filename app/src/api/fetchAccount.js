import { useWorkspace } from "../useWorkspace"

export default async () => {
    const { baseAccount, program } = useWorkspace()
    return await program.account.baseAccount.fetch(baseAccount.publicKey)
}
