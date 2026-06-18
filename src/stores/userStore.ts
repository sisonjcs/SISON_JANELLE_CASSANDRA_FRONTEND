import { defineStore } from "pinia"
import { ref, computed, type Ref } from 'vue'
import type { User } from "@/types/User"

export const useUserStore = defineStore('users', () => {
    const users: Ref<User[]> = ref([])
    const currentUser = computed(() => users.value.find(u => u.loggedIn))

    function logIn(name: string) {
        const foundUser = users.value.find(u => u.name === name)
        if (foundUser) {
            foundUser.loggedIn = true
        } else {
            const newUser = {
                name: name,
                loggedIn: true,
                tasks: []
            }

            users.value.push(newUser)
        }
    }

    function logOut(name: string) {
        const foundUser = users.value.find(u => u.name === name)
        if (foundUser) {
            foundUser.loggedIn = false
        }
    }

    return ({ users, currentUser, logIn, logOut })
}, {
    persist: true
})