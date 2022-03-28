import { Drawer } from '@mui/material'
import { profile } from 'console'
import { useState } from 'react'


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


// data
import { avatars } from '../../models/test.data'


// styles
import './profile.page.scss'


const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [isAddLinkDrawerOpen, setIsAddLinkDrawerOpen] = useState<boolean>(false)
    const [isCreateAvatarDrawerOpen, setIsCreateAvatarDrawerOpen] = useState<boolean>(false)


    const profile: Avatar = avatars[0]

    const toggleDrawer = ()=> {}

    return (
      <div className='page'>
                  
          {/* appbar */}
          <AppbarComponent />

          {/* avatars */}
          <div className="profile_avatars_container">

            <div 
              className="profile_avatars_container__avatar_container__big_avatar absolute"
              style={{
                backgroundImage: `url(${profile.bg_avatar})`,
              }}
            />

            <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
              <img 
                src={ profile.avatar } 
                alt="avatar" 
                className="profile_avatars_container__avatar_container__avatar" 
              />
            </div>

          </div>
          <VSpacerComponent space={1} />

          <div className="column ca_center profile_info_container">

            <p className="text_3 bold">
              { profile.name }
            </p>
            <VSpacerComponent space={.5} />

            <p className="text_7 profile_info_container__bio">
              { profile.bio }
            </p>
            <VSpacerComponent space={1.5} />

            <div className="row ma_evenly ca_center profile_info_container__chips">

              <div className="chip_md chip_primary_outlined">
                4 Links
              </div>
              <div className="chip_md chip_primary_outlined">
                4 Universes
              </div>

            </div>

          </div>
          <VSpacerComponent space={6} />

          {/* metalinks if any */}
          <SectionTitleComponent title='Links' />
          <div className="padded_container">
              { ! isLoading &&
                  profile.links.map((metaLink: MetaLink, index: number)=> {

                      return (
                          <MetalinkCardComponent
                              key={index}
                              metaLink={metaLink}
                          />
                      )
                  })
              }
              { isLoading &&
                  Array(6).fill(0).map((_, index: number)=> {

                      return (
                          <LoadingMetalinkCardComponent
                              animationIndex={index+12+2}
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