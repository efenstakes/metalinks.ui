import axios from "axios"


import { Avatar } from "../models/avatar.model"



// get avatar
export const getAvatarById = async (id: number|string): Promise<Avatar|null> => {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8'
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

    const url = "https://api.thegraph.com/subgraphs/name/efenstakes/metalinks"

    // {
    //     query getAvatar($id: Int!) {
    //         avatar(id: $id) {
    //                 id
    //                 assignedID
    //                 name
    //                 bio
    //                 avatarURI
    //                 bgAvatarURI
    //                 addresses
    //         }
    //     }
    // }
    const AVATAR_QUERY = `
            {
                avatars {
                        id
                        assignedID
                        name
                        bio
                        avatarURI
                        bgAvatarURI
                        addresses
                }
            }
        `

    try {
        const resp = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    query: AVATAR_QUERY,
                    variables: { id }
                }), 
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': "*"
                },
            })
        const jsn = await resp.json()
        console.log('resp.data ', jsn)

        return jsn
    } catch(e) {
        console.error('get avatar error ', e)
    }
    
    return null
}



// get avatar details by address
export const getAvatarByAddress = async (address: string): Promise<Avatar|null> => {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8'
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

    const url = "https://api.thegraph.com/subgraphs/name/efenstakes/metalinks"


    const AVATAR_QUERY = `
            {
                query getAvatar($address: Int!) {
                    avatars(
                        where: {
                            addressed_contains: [ $address ]
                        }
                    ) {
                            id
                            assignedID
                            name
                            bio
                            avatarURI
                            bgAvatarURI
                            addresses
                    }
                }
            }
        `

    try {
        const resp = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    query: AVATAR_QUERY,
                    variables: { address }
                }), 
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': "*"
                },
            })
        const jsn = await resp.json()
        console.log('resp.data ', jsn)

        return jsn
    } catch(e) {
        console.error('get avatar error ', e)
    }

    return null
}