import type { Task } from "./Task"

export type User = {
    name: string
    loggedIn: boolean
    tasks: Task[]
}