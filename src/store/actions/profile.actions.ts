import { Avatar } from "../../models/avatar.model"

import { LOGOUT, SET_CURRENT_AVATAR, GET_CURRENT_AVATAR } from "../action_types/profile.action_types"




// set profile
export const set_profile_action = (avatar: Avatar)=> {
    return { type: SET_CURRENT_AVATAR, payload: avatar }
}


// get profile
export const get_profile_action = ()=> {
    return { type: GET_CURRENT_AVATAR }
}


// logout
export const logout_action = ()=> {
    return { type: LOGOUT }
}