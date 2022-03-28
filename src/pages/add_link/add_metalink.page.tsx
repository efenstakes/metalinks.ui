import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import clsx from 'clsx'


import { FormControlLabel, FormGroup, IconButton, Switch, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TextInputComponent from '../../components/inputs/text_input.component'
import ButtonComponent from '../../button/button.component'


// models
import { MetaLink } from '../../models/metalink.model'


import { EXTRA_LG_FULL_WIDTH_INPUT_STYLES } from '../../styles/common.styles'



import './add_metalink.page.scss'


type ComponentProps = {
  closeDrawer: ()=> void
  isCreateLink: boolean
}
const AddMetaLinkPage = ({ closeDrawer, isCreateLink }: ComponentProps) => {
  
    const [drawerSize, setDrawerSize] = useState(80)
    let width = useWindowWidth()
    
    const initialLink: MetaLink = {}
    const initialLinkErrors: MetaLink = {}
    const [metaLink, setMetaLink] = useState<MetaLink>(initialLink)
    const [metaLinkErrors, setMetaLinkErrors] = useState<MetaLink>(initialLinkErrors)
    

    const handleFieldChange = (e)=> {
      setMetaLink(()=> {
            return {
                ...metaLink, [e.target.name]: e.target.value
            }
        })
    }


    console.log("width ", width)

    const executeAction = ()=> {
        
    }
    


    useEffect(()=> {
        if( width > 1400 ) {
            setDrawerSize(20)
        } else if ( width > 800 && width < 1400 ) {
            setDrawerSize(40)
        } else if ( width > 600 && width < 800 ) {
            setDrawerSize(80)
        } else {
            setDrawerSize(100)
        }
    }, [ width ])


    return (
      <div 
          className={
              clsx([
                  [`drawer_${drawerSize}`], 
                  'add_metalink',
                  'column',
                  // 'padded_container_xl',
              ])
          } 
      >

        <VSpacerComponent space={1} />
        {/* <div className="add_metalink__close_container row ma_center">
          <IconButton size='medium' onClick={closeDrawer}
            style={{
              backgroundColor: 'brown',
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
        </div> */}
        {/* <VSpacerComponent space={4} /> */}
        

        {/* title */}
        <p className="text_4 bold" style={{  marginLeft: '1rem' }}>
          Add MetaLink
        </p>
        <VSpacerComponent space={48} />

        {/* name */}
        <TextInputComponent
            name='name'
            id='name'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter Dao name'
            labelWidth={132}
            placeholder='Enter Dao name'
            errorText={metaLinkErrors.name}
            wrapperStyles={{
              ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
            }}
        />
        <VSpacerComponent space={20} />

        
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
        <VSpacerComponent space={20} />
        
        
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
        <VSpacerComponent space={20} />
        

        {/* is active */}
        <FormGroup style={{  marginLeft: '1rem' }} >
            <FormControlLabel 
                control={<Switch size='medium' defaultChecked />} 
                label="Is link active" 
            />
        </FormGroup>
        <VSpacerComponent space={20} />


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
        <VSpacerComponent space={20} />

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
        <VSpacerComponent space={40} />

        {/* add button */}
        <ButtonComponent 
          isFlat
          classes={['primary_button', 'button_lg', 'add_metalink__button']}
          text={
            isCreateLink ? "Add MetaLink" : "Create Avatar"
          }
          startIcon={
            <CircularProgress size='small' style={{ fontSize: '.1rem' }} />
          }
          onClick={executeAction}
        />
        <VSpacerComponent space={20} />

      </div>
    )
}

export default AddMetaLinkPage
