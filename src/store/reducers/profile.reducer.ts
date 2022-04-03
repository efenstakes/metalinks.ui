import { Avatar } from "../../models/avatar.model"
import { ProfileState } from "../../models/store.models"


import { LOGOUT, SET_CURRENT_AVATAR } from "../action_types/profile.action_types"


const initialState: ProfileState = {
    isLoggedIn: false,
    avatar: null,
}


export const profile_reducer = (state=initialState, { type, payload}) => {

    switch (type) {
        case SET_CURRENT_AVATAR:
            return {
                avatar: payload,
                isLoggedIn: payload != null,
            }
            
        case LOGOUT:
            return {
                avatar: null,
                isLoggedIn: true
            }    
    
        default:
            return state
    }

}