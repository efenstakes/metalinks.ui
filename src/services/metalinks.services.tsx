import { utils } from 'ethers'
import { useCall, useContractFunction, useSendTransaction,  } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'


import axios from 'axios'


// abi
import WethAbi from '../assets/abi/MetaLinks.json'
import { Avatar } from '../models/avatar.model'

const CONTRACT_ADDRESS = '0x4CF5744CDd62bddc322Be3045F7bd337d65fbaDF'



// export const useCreateAvatar = async (avatarObj: Avatar)=> {
//     const wethInterface = new utils.Interface(WethAbi.abi)
//     const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

//     // get data
//     const { name, aka, bio, avatar, bg_avatar } = avatarObj

//     const { sendTransaction, state } = useSendTransaction()
//     const { status } = state

//     sendTransaction({
//         to: CONTRACT_ADDRESS,
//         data: [ name, aka, bio, avatar, bg_avatar ] 
//     })

//     console.log("status ", status)

//     return status
// }
// export const useCreateAvatar = async (avatarObj: Avatar)=> {
//     const wethInterface = new utils.Interface(WethAbi.abi)
//     const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

//     // get data
//     const { name, aka, bio, avatar, bg_avatar } = avatarObj

//     const { state, send } = useContractFunction(contract, 'createAvatar', { transactionName: 'createAvatarTransaction' })
//     const { status } = state

//     // send({
//     //     value: [ name, aka, bio, avatar, bg_avatar ] 
//     // })

//     // console.log("status ", status)

//     return { state, send }
// }


export const useCreateAvatar = ()=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { state, send } = useContractFunction(contract, 'createAvatar', { transactionName: 'createAvatarTransaction' })

    return { caState: state, caSend: send }
}


export const useCreateMetaLink = ()=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { state, send } = useContractFunction(contract, 'addAvatarMetalink', { transactionName: 'addAvatarMetaLinkTransaction' })

    return { cmState: state, cmSend: send }
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


export const useAvatarDetails = (id: number | null)=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { value, error } = useCall({ 
        contract,
        method: 'getAvatar', 
        args: [ id ] 
    }) ?? {}
    console.log("value ", value, " error ", error)

    return { avatar: value, error }
}

export const useAvatarLinks = (id: number | null)=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { value, error } = useCall({ 
        contract,
        method: 'getAvatarMetaLinks', 
        args: [ id ] 
    }) ?? {}
    console.log("value ", value, " error ", error)

    return { links: value, error }
}


export const useMetaLinkDetails = (id: number | null)=> {
    const wethInterface = new utils.Interface(WethAbi.abi)
    const contract = new Contract(CONTRACT_ADDRESS, wethInterface);

    const { value, error } = useCall({ 
        contract,
        method: 'getAvatarMetaLink', 
        args: [ id ]
    }) ?? {}
    console.log("value ", value, " error ", error)

    return { metalink: value, error }
}



// get an address id
const getAvatarId = async (address: string)=> {

}


// get an address details
const getAvatarDetailsByID = async (id: number)=> {

}


// get an address details
const getAvatarDetailsByAddress = async (address: string)=> {

}


// get an avatars metalinks ids
const getAvatarMetaLinkIDs = async (address: string)=> {

}


// get an avatars metalinks ids
const getAvatarMetaLinks = async (address: string)=> {

}




export const getAvatar = async (id: number)=> {
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
    } catch(e) {
        console.error('get avatar error ', e)
    }
}