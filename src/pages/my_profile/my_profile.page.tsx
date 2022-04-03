import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useEthers } from '@usedapp/core'
import { useDispatch } from 'react-redux'


import { useLazyQuery  } from '@apollo/client'


import { Drawer } from '@mui/material'



// components
import AppbarComponent from '../../components/appbar/appbar.component'
import FabComponent from '../../components/fab/fab.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import AddMetaLinkPage from '../add_link/add_metalink.page'
import NotLoggedInComponent from '../../components/no_account/not_logged_in.component'
import ProfileLoadingPage from '../profile_loading/profile_loading.page'
import ErrorLoadingAvatarComponent from '../../components/no_account/error_loading.component'


// models
import { MetaLink } from '../../models/metalink.model'
import { Avatar, toAvatar } from '../../models/avatar.model'


// services
import { getAvatarByAddress, getAvatarById } from '../../services/metalinks.api.services'

// queries
import { GET_AVATAR_DETAILS_BY_ADDRESS_QUERY, GET_AVATAR_DETAILS_BY_ID_QUERY } from '../../services/queries.graph'


// styles
import '../profile/profile.page.scss'
import './my_profile.page.scss'
import { set_profile_action } from '../../store/actions/profile.actions'



const MyProfilePage = () => {
    const dispatch = useDispatch()

    // get logged in address    
    const { deactivate, account } = useEthers()
    
    const [getMyProfile, getMyProfileResult] = useLazyQuery(GET_AVATAR_DETAILS_BY_ADDRESS_QUERY)

    
    const [isAddLinkDrawerOpen, setIsAddLinkDrawerOpen] = useState<boolean>(false)
    const [isCreateAvatarDrawerOpen, setIsCreateAvatarDrawerOpen] = useState<boolean>(false)


    // get avatar details - avatar & metalinks
    useEffect(()=> {
      if( account ) {
          console.log("get profile of adrss ", account)
        getMyProfile({
            variables: { address: account },
        })
      } else {
         console.log("no accnt }, useEffect([ account ]) ") 
      }
    }, [ account ])

    useEffect(()=> {
        if( getMyProfileResult && getMyProfileResult.data && getMyProfileResult.data.avatars && getMyProfileResult.data.avatars.length > 0 ) {
            dispatch(set_profile_action(toAvatar(getMyProfileResult.data.avatars[0])))
        }
    }, [ getMyProfileResult ])

    useEffect(()=> {
        if( account ) {
            console.log("get profile of adrss ", account)
            getMyProfile({
                variables: { address: account },
            })
        } else {
            console.log("no accnt }, useEffect([ ]) ") 
         }
    }, [ ])


    const refreshProfile = ()=> {
        getMyProfile({
            variables: { account },
        })
    }

    const toggleDrawer = ()=> {}


    console.log("getMyProfileResult ", getMyProfileResult)
    
    return (
        <div className='page'>
            
            {/* appbar */}
            <AppbarComponent />
            
        </div>
    )
    // if no id, go to home page
    if( !account ) {
      return (
        <div className='page'>
            
            {/* appbar */}
            <AppbarComponent />
            <VSpacerComponent space={10} />

            <div className="padded_container_lg">
                <NotLoggedInComponent />
            </div>

        </div>
      )
    }

    // when loading
    if( getMyProfileResult.loading ) {
      return (  
        <ProfileLoadingPage />
      )
    }

    // no account
    if(
        getMyProfileResult.error || 
        !getMyProfileResult.data || 
        !getMyProfileResult.data?.avatars || 
        (getMyProfileResult.data && getMyProfileResult.data.avatar?.length == 0)
    ) {
        console.log("no account")
        return (
            <div className='page'>
            
                {/* appbar */}
                <AppbarComponent />
                <VSpacerComponent space={10} />

                <div className="padded_container_lg">
                    <ErrorLoadingAvatarComponent refresh={refreshProfile} />
                </div>

            </div>
        )
    }
    
    // no error but no account either
    if(
        !getMyProfileResult.error && getMyProfileResult.data &&
        getMyProfileResult.data?.avatars &&
        getMyProfileResult.data.avatar?.length > 0
    ) {
        console.log("no error but no account either")
        return (
            <div className='page'>
            
                {/* appbar */}
                <AppbarComponent />
                <VSpacerComponent space={10} />

                <div className="padded_container_lg">
                    <ErrorLoadingAvatarComponent 
                        title="No Account"
                        text="Account was not found."
                        refresh={refreshProfile} 
                        hideCta
                    />
                </div>

            </div>
        )
    }

    // we have avatar, show it
    const avatar: Avatar = toAvatar(getMyProfileResult.data?.avatars[0])
    console.log("avatar ", avatar)
    return (
      <div className='page'>
                  
          {/* appbar */}
          <AppbarComponent />

          {/* avatars */}
          <div className="profile_avatars_container">

            <div 
              className="profile_avatars_container__avatar_container__big_avatar absolute"
              style={{
                backgroundImage: `url(${avatar.bg_avatar})`,
              }}
            />

            <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
              <img 
                src={ avatar.avatar } 
                alt="avatar" 
                className="profile_avatars_container__avatar_container__avatar" 
              />
            </div>

          </div>
          <VSpacerComponent space={1} />

          <div className="column ca_center profile_info_container">

            {/* name */}
            <p className="text_3 bold">
              { avatar.name }
            </p>
            <VSpacerComponent space={.5} />
            
            {/* bio */}
            <p className="text_7 profile_info_container__bio">
              { avatar.bio }
            </p>
            <VSpacerComponent space={1.5} />

            <div className="row ma_evenly ca_center profile_info_container__chips">

                {/* Links */}
                <div className="chip_md chip_primary_outlined">
                    { avatar?.links.length } Links
                </div>

                {/* Universes */}
                <div className="chip_md chip_primary_outlined">
                    { avatar?.links.length } Universes
                </div>

                {/* Addresses */}
                <div className="chip_md chip_primary_outlined">
                    { avatar?.addresses.length } Addresses
                </div>

            </div>

          </div>
          <VSpacerComponent space={6} />

          {/* metalinks if any */}
          <SectionTitleComponent title='Links' />
          <div className="padded_container">
              {
                  avatar?.links.map((metaLink: MetaLink, index: number)=> {

                      return (
                          <MetalinkCardComponent
                              key={index}
                              metaLink={metaLink}
                          />
                      )
                  })
              }
          </div>
              
          {/* add link button */}
          <FabComponent
              children={
                  <button className="primary_button" onClick={toggleDrawer}>
                      Add a MetaLink
                  </button>
              }
          />

                      
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

export default MyProfilePage