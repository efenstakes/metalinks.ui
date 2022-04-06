import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { IconButton, FormControlLabel, FormGroup, Switch, CircularProgress, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TextInputComponent from '../../components/inputs/text_input.component'
import ButtonComponent from '../../button/button.component'


// models
import { MetaLink } from '../../models/metalink.model'


import { TransactionState } from '@usedapp/core'


// services
import { useCreateAvatar, useCreateMetaLink } from '../../services/metalinks.services'


// actions
import { add_metalink_action } from '../../store/actions/profile.actions'


// styles
import './add_metalink.page.scss'

import { EXTRA_LG_FULL_WIDTH_INPUT_STYLES, FULL_WIDTH_BUTTON_STYLES } from '../../styles/common.styles'


type ComponentProps = {
  closeDrawer: ()=> void
  reload?: ()=> void
  onViewAvatar?: ()=> void
  isCreateLink: boolean
}
const AddMetaLinkPage = ({ closeDrawer, reload, onViewAvatar, isCreateLink }: ComponentProps) => {
    // to programatically navigate 
    const navigate = useNavigate()

    // to dispatch redux actions
    const dispatch = useDispatch()
    
  
    const { caSend, caState } = useCreateAvatar()
    const { cmSend, cmState } = useCreateMetaLink()

    const [drawerSize, setDrawerSize] = useState(80)
    let width = useWindowWidth()
    
    const initialLink: MetaLink = {}
    const initialLinkErrors: MetaLink = {}
    const [metaLink, setMetaLink] = useState<MetaLink>(initialLink)
    const [metaLinkErrors, setMetaLinkErrors] = useState<MetaLink>(initialLinkErrors)
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false)

    const handleFieldChange = (e)=> {
      setMetaLink(()=> {
            return {
                ...metaLink, [e.target.name]: e.target.value
            }
        })
    }


    const executeAction = ()=> {
      // rese states
      setIsLoading(false)
      setHasError(false)

      let has_error = false

      let { name, aka, bio, avatar, bg_avatar, universe, link, is_active } = metaLink  

      if( !name || name.length === 0 ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, name: "Name cannot be empty" }
        })
      }
      if( name && name.length < 4 ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, name: "Name should be atleast 4 characters" }
        })
      }
      
      if( !aka ) aka = ""
      if( !bio ) bio = ""
          
      if( !avatar || avatar.length === 0 ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, avatar: "Avatar cannot be empty" }
        })
      }
      if( avatar && avatar.length < 5 ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, avatar: "Avatar should be a valid link" }
        })
      }

      if( !bg_avatar || bg_avatar.length === 0 ) {
        bg_avatar = ""
      }
       
      if( isCreateLink && (!universe || universe.length === 0) ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, universe: "Universe cannot be empty" }
        })
      }
      if( isCreateLink && (universe && universe.length < 3) ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, universe: "Universe should be a valid link" }
        })
      }
      
      if( isCreateLink && (!link || link.length === 0) ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, link: "Universe link cannot be empty" }
        })
      }
      if( isCreateLink && (link && link.length < 5) ) {
        has_error = true
        setMetaLinkErrors((state)=> {
          return { ...state, link: "Universe link should be a valid link" }
        })
      }

      if( has_error ) {
        console.log("data error")
        return 
      }

      setIsLoading(true)
      if( isCreateLink ) {
        cmSend( name, aka, bio, universe, avatar, bg_avatar, link, is_active )
      } else {
        caSend( name, aka, bio, avatar, bg_avatar )
      }
    }


    // go to my avatar page
    const goToMyAvatar = ()=> navigate("/me")
    

    useEffect(()=> {
        let _drawerSz = 20
        if( width > 1400 ) {
          _drawerSz = 20
        } else if ( width > 800 && width <= 1400 ) {
            _drawerSz = 50
        } else if ( width >= 560 && width <= 800 ) {
            _drawerSz = 80
        } else {
          _drawerSz = 100
        }

        // console.log("_drawerSz ", _drawerSz)
        setDrawerSize(_drawerSz)
    }, [ width ])

    useEffect(()=> {
      // console.log("new state is ", state)
      // if status --> success, it succeeded
      // it has receipt -> events --> then args to get data in event,
      // index [0] is the avatar id

      const status: TransactionState = isCreateLink ? cmState.status : caState.status

      if( status === "Success" as TransactionState ) {
        setIsLoading(false)
        setIsSuccessful(true)

        if( isCreateLink ) {
          dispatch(add_metalink_action(metaLink))
        }

        if( reload ) {
          reload()
        }

      }
      if( status === "Fail" as TransactionState ||  status === "Exception" as TransactionState ||  status === "Fail" as TransactionState ) {
        setIsLoading(false)
        setHasError(true)
      }
    }, [ cmState, caState ])


    return (
      <div 
          className={
              clsx([
                  [`drawer_${drawerSize}`], 
                  'add_metalink',
              ])
          } 
      >

        <VSpacerComponent space={1} />

        {
          width < 600 &&
            <div className="row width_100 ma_center">
              <IconButton 
                color="primary" aria-label="close" className='add_metalink__close_button'
                style={{
                  color: 'white',
                  backgroundColor: '#2e2e2e'
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>

        } 
        { width < 600 && <VSpacerComponent space={2} /> }    

        {/* title */}
        <p className="su_3 text_4 bold" style={{  marginLeft: '1rem' }}>
          { isCreateLink ? "Add MetaLink" : "Create Avatar" }
        </p>
        <VSpacerComponent space={3} />

        {/* name */}
        <TextInputComponent
            name='name'
            id='name'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter your name'
            labelWidth={132}
            placeholder='Enter your name'
            errorText={metaLinkErrors.name}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
        />
        <VSpacerComponent space={2} />

        
        {/* aka */}
        <TextInputComponent
            name='aka'
            id='aka'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter aka'
            labelWidth={80}
            placeholder='Enter aka'
            errorText={metaLinkErrors.aka}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
        />
        <VSpacerComponent space={2} />
        
        
        {/* bio */}
        <TextInputComponent
            name='bio'
            id='bio'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter your bio'
            labelWidth={120}
            placeholder='Enter bio'
            errorText={metaLinkErrors.bio}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
            multiline
            rows={5}
        />
        <VSpacerComponent space={2} />
        

        {/* is active */}
        <FormGroup style={{  marginLeft: '1rem' }} >
            <FormControlLabel 
                control={<Switch size='medium' defaultChecked />} 
                label="Is link active" 
            />
        </FormGroup>
        <VSpacerComponent space={2} />


        {/* pick avatar */}
        <TextInputComponent
            name='avatar'
            id='avatar'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter your avatar link'
            labelWidth={164}
            placeholder='Enter your avatar link'
            errorText={metaLinkErrors.avatar}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
        />
        <VSpacerComponent space={2} />

        {/* pick background avatar */}
        <TextInputComponent
            name='bg_avatar'
            id='bg_avatar'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter your background avatar link'
            labelWidth={260}
            placeholder='Enter your background avatar link'
            errorText={metaLinkErrors.bg_avatar}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
        />
        <VSpacerComponent space={ isCreateLink ? 2 : 4 } />
          
        {/* universe name */}
        {
          isCreateLink && 
            <TextInputComponent
              name='universe'
              id='universe'
              onChange={ handleFieldChange }
              autoFocus
              labelText='Enter your universe'
              labelWidth={160}
              placeholder='Enter your universe'
              errorText={metaLinkErrors.universe}
              wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
              }}
          />
        }
        { isCreateLink && <VSpacerComponent space={2} /> }

        {/* universe link */}
        {
          isCreateLink && 
            <TextInputComponent
              name='link'
              id='link'
              onChange={ handleFieldChange }
              autoFocus
              labelText='Enter your universe link'
              labelWidth={180}
              placeholder='Enter your universe link'
              errorText={metaLinkErrors.link}
              wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
              }}
          />
        }
        { isCreateLink && <VSpacerComponent space={4} /> }

        {/* add button */}
        {
          !isSuccessful &&
            <div className="width_100 row ma_center">
              <ButtonComponent
                isFlat
                classes={['primary_button', 'button_lg', 'add_metalink__button']}
                text={
                  isCreateLink 
                    ? isLoading ? "Adding Your MetaLink" : "Add MetaLink" 
                    : isLoading ? "Creating Your Avatar" : "Create Avatar"
                }
                onClick={executeAction}
                startIcon={
                  isLoading 
                    ? <CircularProgress size={20} style={{ color: 'black' }} />
                    : <div />
                }
                disabled={
                  isCreateLink 
                    ? cmState.status === "Mining"
                    : caState.status === "Mining"
                }
                styles={{
                  ...FULL_WIDTH_BUTTON_STYLES,
                  alignSelf: 'center',
                }}
              />
            </div>
        }
        {
          isSuccessful &&
            <Alert 
              severity="success"
              onClose={ ()=> setIsSuccessful(false) }
            >
              Your MetaLink avatar has been created, {metaLink.name}.
            </Alert>
        }
        {
          isSuccessful && !isCreateLink &&
            <ButtonComponent
              isFlat
              classes={['primary_button', 'button_lg', 'add_metalink__button']}
              text="See My Avatar"
              onClick={onViewAvatar || goToMyAvatar}
              styles={{
                ...FULL_WIDTH_BUTTON_STYLES,
                alignSelf: 'center',
              }}
            />
        }
        { hasError && <VSpacerComponent space={2} /> }
        {
          hasError &&
            <Alert 
              severity="error"
              onClose={ ()=> setHasError(false) }
            >
              An error occured while creating your avatar. <br/> Try again {metaLink.name}.
            </Alert>
        }
        <VSpacerComponent space={4} />

      </div>
    )
}

export default AddMetaLinkPage