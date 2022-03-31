import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'


import { utils } from 'ethers'


import Identicon from 'react-identicons'


// components


import logo_img from '../../assets/images/face-small.png'


import './appbar.component.scss'



// abi
import { useAvatarDetails, useAvatarID } from '../../services/metalinks.services'
import { Avatar } from '../../models/avatar.model'



type ComponentProps = {
}
const AppbarComponent = ({ }: ComponentProps) => {
    const { activateBrowserWallet, deactivate, account } = useEthers()


    const { value, error } = useAvatarID(account)
    const detailResult = ""
    // const detailResult = useAvatarDetails(value)
    
    // console.log("value ", value, " error ", error)
    // console.log("detailResult ", detailResult)
    
    // when a user logs in, get their avatar id, then 
    // fetch their data from the graph api
    useEffect(()=> {
        console.log("account ", account)
        console.log("detailResult ", detailResult)
        if( account ) {
            console.log("getting profile with id ", value)
            // send(utils.parseUnits(value).toBigInt().toString())
        }
    }, [ account, detailResult ])


    return (
        <div className='main_appbar appbar_md padded_container_sm row ma_space_btn ca_center'>
            
            <div onClick={deactivate} className="main_appbar__logo_container row ca_center">
                <img
                    src={logo_img} 
                    alt="logo" 
                    className="main_appbar__logo_container__image" 
                />
                <p className='main_appbar__logo_container__logo text_3 bolder'>
                    MetaLinks
                </p>
            </div>

            
            {/* connect wallet if not logged in */}
            {
                !account &&
                    <button 
                        className="button main_appbar__button bold" 
                        onClick={activateBrowserWallet}
                    >
                        Connect Wallet
                    </button>
            }

            {/* show icon & name */}
            {
                account && <AvatarComponent address={account} />
            }
            

        </div>
    )
}



type AvatarComponentProps = {
    address: string
}
const AvatarComponent = ({ address }: AvatarComponentProps)=> {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<Avatar | null>()

    // get profile data here
    useEffect(()=> {
        // console.log("try get profile")
        getProfile()
    }, [ ])

    // get profile data here
    useEffect(()=> {
        // console.log("try get profile")
        if( address && address.length ) {
            getProfile()
        } else {
            setAvatar(null)
        }
    }, [ address ])
    
    // get profile data here
    const getProfile = async ()=> {
        if( address && address.length ) {
            setIsLoading(true)
        }
    }


    if ( avatar ) {
        <a href={`/profile/${address}`} className="main_appbar__right_container row ma_center ca_center">
            <img
                src={avatar?.avatar} 
                alt="profile avatar" 
                className="main_appbar__right_container__image" 
            />
            <p className="text_6 bold main_appbar__right_container__text">
                { avatar && avatar.name.slice(0, 3) }
            </p>
        </a>
    }
    return (
        <a href={`/profile/${address}`} className="main_appbar__right_container row ma_center ca_center">
            <Identicon 
                string={address} 
                size={20} 
                palette={
                    [ "brown", "black", "pink", "blue", "magenta" ]
                } 
            />
            <p className="text_6 bold main_appbar__right_container__text">
                { `${address.slice(0, 1)}..${ address.slice(address.length-3, address.length) }` }
            </p>
        </a>
    )
}

export default AppbarComponent