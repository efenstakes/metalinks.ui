import { Avatar } from "./avatar.model"


export interface ProfileState {
    isLoggedIn: boolean
    avatar: Avatar | null
}


export interface StoreState {
    profile: ProfileState
}