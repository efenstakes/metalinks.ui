import { useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'


import Identicon from 'react-identicons'

import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'


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

        // reset account only if avatar is not null
        if( !account && avatar && avatar?.id ) {
            dispatch(logout_action())
        }

        // console.log("account ", account)
        // console.log("detailResult ", getMyProfileResult)

        // if we have account but no avatar
        if( account && !avatar ) {
            console.log("getting profile with address ", account)
            getMyProfile({
                variables: { address: account }
            })
        }
    }, [ account ])
    
    useEffect(()=> {
        // set avatar only if avatar is not set
        if( !avatar && getMyProfileResult && getMyProfileResult.data && getMyProfileResult.data.avatars && getMyProfileResult.data.avatars.length > 0 ) {
            dispatch(set_profile_action(toAvatar(getMyProfileResult.data.avatars[0])))
        }
    }, [ getMyProfileResult ])


    useEffect(()=> {
        if( avatar ) {
            // console.info("appbar --> avatar ", avatar)
            return
        }
        // console.log("account ", account)
        if( account ) {
            // console.log("getting profile with id ", account)
            getMyProfile({
                variables: { address: account }
            })
        }
    }, [ ])


    const logOut = ()=> {
        deactivate()
        dispatch(logout_action())
    }


    return (
        <div className='main_appbar appbar_md padded_container_sm row ma_space_btn ca_center'>
            
            <a href='/' className="main_appbar__logo_container row ca_center">
                <img
                    src={logo_img} 
                    alt="logo" 
                    className="main_appbar__logo_container__image fd_10" 
                />
                <p className='main_appbar__logo_container__logo text_3 bolder fd_15'>
                    MetaLinks
                </p>
            </a>
            
            {/* connect wallet if not logged in */}
            {
                !account &&
                    <button 
                        className="button main_appbar__button bold fd_16" 
                        onClick={activateBrowserWallet}
                    >
                        Connect Wallet
                    </button>
            }

            {/* show icon & name & logout button*/}
            {
                account &&
                    <div className="row">
                        
                        <AvatarComponent 
                            address={account} 
                            avatar={avatar}
                        />

                        <IconButton onClick={logOut} className='fd_15' color="primary" aria-label="logout" style={{ marginLeft: '1.2rem', color: '#1e1e1e' }}>
                            <LogoutIcon />
                        </IconButton>

                    </div>
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
                    className="fd_8 main_appbar__right_container__image" 
                />
                <p className="fd_11 text_6 bold main_appbar__right_container__text">
                    { avatar && avatar.name.slice(0, 3) }
                </p>
            </a>
        )
    }
    return (
        <a href='/me' className="main_appbar__right_container row ma_center ca_center">
            <div className="fd_8">
                <Identicon 
                    string={address} 
                    size={20} 
                    palette={
                        [ "brown", "black", "pink", "blue", "magenta" ]
                    } 
                />
            </div>
            <p className="fd_11 text_6 bold main_appbar__right_container__text">
                { `${address.slice(0, 1)}..${ address.slice(address.length-3, address.length) }` }
            </p>
        </a>
    )
}

export default AppbarComponent