<script setup>
import { ref } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import { initWorkspace } from './useWorkspace'
import createCounter from './api/createCounter'
import fetchAccount from './api/fetchAccount'
import incrementCounter from './api/incrementCounter'

initWorkspace()
const { publicKey, connected } = useWallet()
const counter = ref(null)

const fetchCounter = async () => {
    const account = await fetchAccount()
    counter.value = account.count.toString()
}

const create = async () => {
    await createCounter()
    await fetchCounter()
}

const increment = async () => {
    await incrementCounter()
    await fetchCounter()
}
</script>

<template>
    <div class="flex h-screen">
        <div class="m-auto w-full max-w-sm">
            <div class="flex flex-col -space-y-px">
                <div class="text-center bg-gray-50 border border-gray-200 rounded-t-lg p-8">
                    <h1 class="text-6xl font-semibold text-gray-700">{{ counter ?? 'NOT SET' }}</h1>
                    <p class="text-xs uppercase tracking-widest font-semibold text-gray-500">Counter</p>
                </div>
                <div class="flex bg-gray-50 border border-gray-200 rounded-b-lg overflow-hidden divide-x divide-gray-200">
                    <button class="flex-1 p-4 hover:bg-gray-100" @click="create">Create counter</button>
                    <button class="flex-1 p-4 hover:bg-gray-100" @click="increment">Increment counter</button>
                </div>
            </div>
            <p 
                class="text-xs text-gray-500 mt-4 text-center"
                v-text="connected ? `You are connected as: ${publicKey}` : 'You are not connected!'"
            ></p>
        </div>
    </div>
</template>
