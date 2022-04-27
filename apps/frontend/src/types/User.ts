import { Music } from "./Music"

export type User = {
    id: number,
    username: string,
    tracks: Music[]
}