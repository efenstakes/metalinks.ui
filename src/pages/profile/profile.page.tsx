import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useEthers } from '@usedapp/core'


import { Drawer, Skeleton } from '@mui/material'



// components
import AppbarComponent from '../../components/appbar/appbar.component'
import FabComponent from '../../components/fab/fab.component'
import LoadingMetalinkCardComponent from '../../components/loading_metalink_card/loading_metalink_card.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import AddMetaLinkPage from '../add_link/add_metalink.page'


// models
import { MetaLink } from '../../models/metalink.model'
import { Avatar } from '../../models/avatar.model'


// services
import { getAvatarByAddress, getAvatarById } from '../../services/metalinks.api.services'


// styles
import './profile.page.scss'


const ProfilePage = () => {
    let { id } = useParams()

    // get logged in address    
    const { activateBrowserWallet, deactivate, account } = useEthers()

    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [isAddLinkDrawerOpen, setIsAddLinkDrawerOpen] = useState<boolean>(false)
    const [isCreateAvatarDrawerOpen, setIsCreateAvatarDrawerOpen] = useState<boolean>(false)

    const [avatar, setAvatar] = useState<Avatar|null>()
    const [isMine, setIsMine] = useState<boolean>(false)
    // const profile: Avatar = avatars[0]


    // get avatar details - avatar & metalinks
    useEffect(()=> {
      checkIfIOwnAccount()
      getAvatarDetails()
    }, [ id ])


    useEffect(()=> {
      checkIfIOwnAccount()
    }, [ ])


    const checkIfIOwnAccount = ()=> {
      if( id == account ) {
        setIsMine(true)
      } else {
        setIsMine(false)
      }
    }


    const getAvatarDetails = ()=> {
      if( id && isNaN(parseInt(id)) ) {
        console.log("get profile with addess ", id)
        getByAddress(id)
      } else {
        console.log("get profile by id ", id)
        getByID(id)
      }
    }
    
    const getByAddress = async (id: string)=> {
      setIsLoading(true)
      const avatr: Avatar = await getAvatarByAddress(id) 
      setAvatar(avatr)
      setIsLoading(false)
    }
    
    const getByID = async (id: string | number)=> {
      setIsLoading(true)
      const avatr: Avatar = await getAvatarById(id) 
      setAvatar(avatr)
      setIsLoading(false)
    }


    const toggleDrawer = ()=> {}





    // if no id, go to home page
    if( !id ) {
      <Navigate to="/" />
    }
    if( isLoading ) {
      return (  
        <div className='page'>
                      
          {/* appbar */}
          <AppbarComponent />

          {/* avatars */}
          <div className="profile_avatars_container">

            <Skeleton 
              className="profile_avatars_container__avatar_container__big_avatar absolute"
              width="100%" height={400}
            />

            <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
              <div
                className="profile_avatars_container__avatar_container__avatar__loading" 
              />
            </div>

          </div>
          <VSpacerComponent space={1} />

          <div className="column ca_center profile_info_container">

            <Skeleton width="48%" height={20} />
            <VSpacerComponent space={.5} />

            <Skeleton width="32%" height={16} />
            <VSpacerComponent space={1.5} />

            <div className="row ma_evenly ca_center profile_info_container__chips">

              <Skeleton width="30%" height={16} />
              <Skeleton width="30%" height={16} />

            </div>

          </div>
          <VSpacerComponent space={6} />

          {/* metalinks if any */}
          <SectionTitleComponent title='Links' />
          <div className="padded_container">
              { 
                  Array(6).fill(0).map((_, index: number)=> {

                      return (
                          <LoadingMetalinkCardComponent
                              animationIndex={index+12+2}
                          />
                      )
                  })
              }
          </div>

        </div>
      )
    }
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

            <p className="text_3 bold">
              { avatar.name }
            </p>
            <VSpacerComponent space={.5} />

            <p className="text_7 profile_info_container__bio">
              { avatar.bio }
            </p>
            <VSpacerComponent space={1.5} />

            <div className="row ma_evenly ca_center profile_info_container__chips">

              <div className="chip_md chip_primary_outlined">
                { avatar?.links.length } Links
              </div>
              <div className="chip_md chip_primary_outlined">
                { avatar?.links.length } Universes
              </div>

            </div>

          </div>
          <VSpacerComponent space={6} />

          {/* metalinks if any */}
          <SectionTitleComponent title='Links' />
          <div className="padded_container">
              { ! isLoading &&
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

export default ProfilePage