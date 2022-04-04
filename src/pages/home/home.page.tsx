import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'


import { Dialog, Drawer } from '@mui/material'

// components
import AppbarComponent from '../../components/appbar/appbar.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import WelcomeComponent from './welcome.component'
import FabComponent from '../../components/fab/fab.component'
import LoadingMetalinkCardComponent from '../../components/loading_metalink_card/loading_metalink_card.component'
import AddMetaLinkPage from '../add_link/add_metalink.page'


// models
import { Avatar, toAvatar } from '../../models/avatar.model'
import { MetaLink } from '../../models/metalink.model'
import { avatars } from '../../models/test.data'

// queries
import { GET_AVATAR_DETAILS_BY_ADDRESS_QUERY } from '../../services/queries.graph'


import './home.page.scss'
import { set_profile_action } from '../../store/actions/profile.actions'
import { StoreState } from '../../models/store.models'


const HomePage = () => {  
    const dispatch = useDispatch()

    // get account  
    const { account } = useEthers()
    
    // get data from redux
    const avatar: Avatar | null = useSelector((state: StoreState)=> state?.profile?.avatar)

    

    // get avatar later when account connects
    const [getMyAvatar, getMyAvatarResult] = useLazyQuery(GET_AVATAR_DETAILS_BY_ADDRESS_QUERY)


    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAddLinkDrawerOpen, setIsAddLinkDrawerOpen] = useState<boolean>(false)
    const [isCreateAvatarDrawerOpen, setIsCreateAvatarDrawerOpen] = useState<boolean>(false)


    console.log("avatars ", avatars)


    // get avatar details - avatar & metalinks
    useEffect(()=> {
        if( account ) {
            console.log("get profile of adrss ", account)
            getMyAvatar({
                variables: { address: account },
            })
        } else {
            console.log("no accnt }, useEffect([ account ]) ") 
        }
    }, [ account ])

    // set avatar if uts not set and user just logged in
    useEffect(()=> {
        if( !avatar && getMyAvatarResult && getMyAvatarResult.data && getMyAvatarResult.data.avatars && getMyAvatarResult.data.avatars.length > 0 ) {
            dispatch(set_profile_action(toAvatar(getMyAvatarResult.data.avatars[0])))
        }
    }, [ getMyAvatarResult ])

    
    useEffect(()=> {
        if( account && !avatar ) {
            console.log("get profile of adrss ", account)
            getMyAvatar({
                variables: { address: account },
            })
        } else {
            console.log("no accnt }, useEffect([ ]) ") 
         }
    }, [ ])

    const openCreateMetaLinkDrawer = ()=> {
        setIsAddLinkDrawerOpen(true)
    }

    const openCreateAvatarDrawer = ()=> {
        setIsCreateAvatarDrawerOpen(true)
    }


    return (
        <div className='page'>
            
            {/* appbar */}
            <AppbarComponent />

            {/* welcome */}
            <WelcomeComponent />

            {/* metalinks if any */}
            <SectionTitleComponent title='Links' />
            <div className="padded_container">
                { !getMyAvatarResult.loading &&
                    avatars[0].links.map((metaLink: MetaLink, index: number)=> {

                        return (
                            <MetalinkCardComponent
                                key={index}
                                metaLink={metaLink}
                            />
                        )
                    })
                }
                { getMyAvatarResult.loading &&
                    Array(6).fill(0).map((_, index: number)=> {

                        return (
                            <LoadingMetalinkCardComponent
                                key={index}
                                animationIndex={index+12+2}
                            />
                        )
                    })
                }
            </div>


            {/* add link button */}
            {
                account && !avatar &&
                    <FabComponent
                        children={
                            <button className="primary_button" onClick={openCreateAvatarDrawer}>
                                Create My Avatar
                            </button>
                        }
                    />
            }
            {
                account && avatar &&
                    <FabComponent
                        children={
                            <button className="primary_button" onClick={openCreateMetaLinkDrawer}>
                                Add a MetaLink
                            </button>
                        }
                    />
            }

            
            <Drawer
                anchor='right'
                open={isAddLinkDrawerOpen}
                onClose={ ()=> setIsAddLinkDrawerOpen(false) }
            >
                <AddMetaLinkPage isCreateLink closeDrawer={ ()=> setIsAddLinkDrawerOpen(false) } />
            </Drawer>
            <Drawer
                anchor='right'
                open={isCreateAvatarDrawerOpen}
                onClose={ ()=> setIsCreateAvatarDrawerOpen(false) }
            >
                <AddMetaLinkPage isCreateLink={false} closeDrawer={ ()=> setIsCreateAvatarDrawerOpen(false) } />
            </Drawer>

        </div>
    )
}

export default HomePage