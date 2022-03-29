import { utils } from 'ethers'
import { useCall, useContractFunction  } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'


import axios from 'axios'


// abi
import WethAbi from '../assets/abi/MetaLinks.json'
import { Avatar } from '../models/avatar.model'

const CONTRACT_ADDRESS = '0x4CF5744CDd62bddc322Be3045F7bd337d65fbaDF'



export const useCreateAvatar = async (avatarObj: Avatar)=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    // get data
    const { name, aka, bio, avatar, bg_avatar } = avatarObj

    const { state, send } = useContractFunction(contract, 'createAvatar', { transactionName: 'createAvatarTransaction' })
    const { status } = state

    send({
        value: [ name, aka, bio, avatar, bg_avatar ] 
    })

    console.log("status ", status)

    return status
}


export const useAvatarID = (address: string)=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { value, error } = useCall({ 
        contract, 
        method: 'getAvatarID', 
        args: [ address ] 
    }) ?? {}
    console.log("value ", value, " error ", error)

    return { value, error }
}


export const getAvatar = async (id: number)=> {
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8'
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

    // const url = "https://api.thegraph.com/subgraphs/name/efenstakes/metalinks/graphql"
    const url = "https://api.studio.thegraph.com/query/3138/metalinks/v0.0.1/graphql"

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
                // mode: 'no-cors',
                body: JSON.stringify({
                    query: AVATAR_QUERY,
                    variables: { id }
                }), 
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': "*"
                },
            })
        console.log('resp.data ', resp)
    } catch(e) {
        console.error('get avatar error ', e)
    }
}