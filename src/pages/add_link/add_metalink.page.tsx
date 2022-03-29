import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import clsx from 'clsx'


import { FormControlLabel, FormGroup, Switch, CircularProgress, Alert } from '@mui/material'


// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TextInputComponent from '../../components/inputs/text_input.component'
import ButtonComponent from '../../button/button.component'


// models
import { MetaLink } from '../../models/metalink.model'


import { TransactionState } from '@usedapp/core'


// abi
import { Avatar } from '../../models/avatar.model'

// services
import { useCreateAvatar } from '../../services/metalinks.services'


// styles
import './add_metalink.page.scss'

import { EXTRA_LG_FULL_WIDTH_INPUT_STYLES, FULL_WIDTH_BUTTON_STYLES } from '../../styles/common.styles'


type ComponentProps = {
  closeDrawer: ()=> void
  isCreateLink: boolean
}
const AddMetaLinkPage = ({ closeDrawer, isCreateLink }: ComponentProps) => {
    const { state, send } = useCreateAvatar()

    const [drawerSize, setDrawerSize] = useState(80)
    let width = useWindowWidth()
    
    const initialLink: MetaLink = {}
    const initialLinkErrors: MetaLink = {}
    const [metaLink, setMetaLink] = useState<MetaLink|Avatar>(initialLink)
    const [metaLinkErrors, setMetaLinkErrors] = useState<MetaLink|Avatar>(initialLinkErrors)
    
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
      let { name, aka, bio, avatar, bg_avatar, } = metaLink  

      if( !name || name.length === 0 ) {
        setMetaLinkErrors((state)=> {
          return { ...state, name: "Name cannot be empty" }
        })
      }
      if( name && name.length < 4 ) {
        setMetaLinkErrors((state)=> {
          return { ...state, name: "Name should be atleast 4 characters" }
        })
      }
      
      if( !aka ) aka = ""
      if( !bio ) bio = ""
          
      if( !avatar || avatar.length === 0 ) {
        setMetaLinkErrors((state)=> {
          return { ...state, avatar: "Avatar cannot be empty" }
        })
      }
      if( avatar && avatar.length < 5 ) {
        setMetaLinkErrors((state)=> {
          return { ...state, avatar: "Avatar should be a valid link" }
        })
      }

      if( !bg_avatar || bg_avatar.length === 0 ) {
        bg_avatar = ""
      }

      setHasError(false)
      send( name, aka, bio, avatar, bg_avatar )
      setIsLoading(true)
    }
    

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
      if( state.status === "Success" as TransactionState ) {
        setIsLoading(false)
        setIsSuccessful(true)
      }
      if( state.status === "Fail" as TransactionState ||  state.status === "Exception" as TransactionState ||  state.status === "Fail" as TransactionState ) {
        setIsLoading(false)
        setHasError(true)
      }
    }, [ state ])


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

        {/* title */}
        <p className="text_4 bold" style={{  marginLeft: '1rem' }}>
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
        <VSpacerComponent space={4} />

        {/* add button */}
        {
          !isSuccessful &&
            <ButtonComponent
              isFlat
              classes={['primary_button', 'button_lg', 'add_metalink__button']}
              text={
                isCreateLink ? "Add MetaLink" : "Create Avatar"
              }
              onClick={executeAction}
              startIcon={
                isLoading 
                  ? <CircularProgress size={20} style={{ color: 'white' }} />
                  : <div />
              }
              styles={{
                ...FULL_WIDTH_BUTTON_STYLES,
              }}
            />
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