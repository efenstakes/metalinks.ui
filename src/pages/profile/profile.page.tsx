import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { useEthers } from '@usedapp/core'
import { useQuery, useLazyQuery  } from '@apollo/client'


// components
import AppbarComponent from '../../components/appbar/appbar.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import ProfileLoadingPage from '../profile_loading/profile_loading.page'
import ErrorLoadingAvatarComponent from '../../components/no_account/error_loading.component'
import NoLinksComponent from '../../components/no_links/no_links.component'


// models
import { MetaLink } from '../../models/metalink.model'
import { Avatar, toAvatar } from '../../models/avatar.model'

// queries
import { GET_AVATAR_DETAILS_BY_ADDRESS_QUERY, GET_AVATAR_DETAILS_BY_ID_QUERY } from '../../services/queries.graph'


// styles
import './profile.page.scss'


const isQueryParamID = (id: string): boolean => {
  if( id && id.length > 10 && id.startsWith('0x') ) {
    return false
  } else {
    return true
  }
}
type ByID = {
  id: string
}
type ByAddress = {
  address: string
}
type QueryParams = {
  params: ByID | ByAddress
}
const ProfilePage = () => {
    let { id } = useParams()
    let isID: boolean = isQueryParamID(id as string)

    console.log("isID ", isID, " id ", id)

    // get logged in address    
    const { account } = useEthers()
    
    // query the graph for profile
    const qParams: ByID | ByAddress = isID ? { id: id as string } : { address: id }
    const { loading, error, data, refetch } = useQuery(
      isID ? GET_AVATAR_DETAILS_BY_ID_QUERY : GET_AVATAR_DETAILS_BY_ADDRESS_QUERY,
      {
        variables: qParams
      }
    )

    useEffect(()=> {
      refreshProfile()
    }, [ id ])


    const refreshProfile = ()=> {
      const params: ByID | ByAddress = isID ? { id: id as string } : { address: id as string }
      // refetch()
      console.log("b4 refetch({ ...params })", params)
      refetch({ ...params })
      console.log("after refetch({ ...params })", params)
    }


    console.log("loading, error, data ", loading, error, data)
    // if no id, go to home page
    if( !id ) {
      return (
        <Navigate to="/" />
      )
    }
    if( loading ) {
      return (
        <ProfileLoadingPage />
      )
    }

    // error account
    if( error ) {
        console.log("error account")
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
        !error &&
        (
          !data ||
          (isID && !data?.avatar) || 
          (!isID && !data?.avatars) || 
          (!isID && data?.avatars?.length === 0)
        )
    ) {
        console.log("no error but no account either")
        return (
            <div className='page'>
            
                {/* appbar */}
                <AppbarComponent />
                <VSpacerComponent space={10} />

                <div className="padded_container_lg">
                    <ErrorLoadingAvatarComponent 
                        title="Avatar Not Found"
                        text="Avatar you are searching was not found. Check the id or address."
                        refresh={refreshProfile} 
                        hideCta
                    />
                </div>

            </div>
        )
    }

    // get the avatar from result
    const avatar: Avatar = toAvatar(
      isID ? data?.avatar : data?.avatars[0]
    )
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
              { avatar?.name }
            </p>
            <VSpacerComponent space={.5} />

            <p className="text_7 profile_info_container__bio">
              { avatar?.bio }
            </p>
            <VSpacerComponent space={1.5} />

            {/* meta info */}
            <div className="row ma_evenly ca_center profile_info_container__chips">

              {/* Links */}
              <div className="chip_md chip_primary_outlined text_6">
                { avatar?.links.length } Links
              </div>

              {/* Universes */}
              <div className="chip_md chip_primary_outlined text_6">
                { avatar?.links.length } Universes
              </div>

              {/* Addresses */}
              <div className="chip_md chip_primary_outlined text_6">
                  { avatar?.addresses.length } Addresses
              </div>

            </div>

          </div>
          <VSpacerComponent space={6} />

          {/* metalinks if any */}
          {  
            avatar?.links.length > 0 && 
              <SectionTitleComponent title='Links' /> 
          }
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
              {
                  avatar && avatar?.links.length === 0 &&
                      <NoLinksComponent
                          text={`${avatar?.name} has not added any MetaLinks yet.`}
                      />
              }
          </div>
            
      </div>
    )
}

export default ProfilePage