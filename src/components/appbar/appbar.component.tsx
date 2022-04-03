import { useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'


import Identicon from 'react-identicons'


// assets
import logo_img from '../../assets/images/face-small.png'


// models
import { Avatar, toAvatar } from '../../models/avatar.model'
import { StoreState } from '../../models/store.models'

// queries
import { GET_AVATAR_DETAILS_BY_ADDRESS_QUERY } from '../../services/queries.graph'

// actions
import { logout_action, set_profile_action } from '../../store/actions/profile.actions'



import './appbar.component.scss'


type ComponentProps = {
}
const AppbarComponent = ({ }: ComponentProps) => {
    const dispatch = useDispatch()

    const { activateBrowserWallet, deactivate, account } = useEthers()
    
    const [getMyProfile, getMyProfileResult] = useLazyQuery(GET_AVATAR_DETAILS_BY_ADDRESS_QUERY)


    // get data from redux
    const avatar: Avatar = useSelector((state: StoreState)=> state?.profile?.avatar)

    
    // when a user logs in, get their avatar id, then 
    // fetch their data from the graph api
    useEffect(()=> {
        if( account && avatar ) return

        // reset account
        if( !account ) {
            dispatch(logout_action())
        }

        console.log("account ", account)
        console.log("detailResult ", getMyProfileResult)

        // if we have account but no avatar
        if( account && !avatar ) {
            console.log("getting profile with address ", account)
            getMyProfile({
                variables: { address: account }
            })
        }
    }, [ account, getMyProfileResult ])
    
    useEffect(()=> {
        if( getMyProfileResult && getMyProfileResult.data && getMyProfileResult.data.avatars && getMyProfileResult.data.avatars.length > 0 ) {
            dispatch(set_profile_action(toAvatar(getMyProfileResult.data.avatars[0])))
        }
    }, [ getMyProfileResult ])


    useEffect(()=> {
        if( avatar ) {
            console.info("appbar --> avatar ", avatar)
            return
        }
        console.log("account ", account)
        if( account ) {
            console.log("getting profile with id ", account)
            getMyProfile({
                variables: { address: account }
            })
        }
    }, [ ])


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
                account && 
                    <AvatarComponent 
                        address={account} 
                        avatar={avatar}
                    />
            }
            

        </div>
    )
}



type AvatarComponentProps = {
    address: string
    avatar: Avatar | null
}
const AvatarComponent = ({ address, avatar }: AvatarComponentProps)=> {

    if ( avatar ) {
        return (
            <a href='/me' className="main_appbar__right_container row ma_center ca_center">
                <img
                    src={avatar?.avatar} 
                    alt="profile avatar" 
                    className="main_appbar__right_container__image" 
                />
                <p className="text_6 bold main_appbar__right_container__text">
                    { avatar && avatar.name.slice(0, 3) }
                </p>
            </a>
        )
    }
    return (
        <a href='/me' className="main_appbar__right_container row ma_center ca_center">
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