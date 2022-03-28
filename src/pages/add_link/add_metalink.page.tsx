import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import clsx from 'clsx'

import { FormControlLabel, FormGroup, Switch } from '@mui/material'


// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import FabComponent from '../../components/fab/fab.component'
import TextInputComponent from '../../components/inputs/text_input.component'


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

    const logOut = ()=> {
        closeDrawer()
    }


    useEffect(()=> {
        if( width > 1400 ) {
            setDrawerSize(30)
        } else if ( width > 800 && width < 1400 ) {
            setDrawerSize(50)
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
                  [`drawer_${drawerSize}`], 'column', 'ma_center',
                  'add_metalink'
              ])
          } 
      >

        {/* title */}
        <p className="text_4 bold">
          Add MetaLink
        </p>
        <VSpacerComponent space={4} />

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
        <VSpacerComponent space={2} />

        
        {/* aka */}
        <TextInputComponent
            name='aka'
            id='aka'
            onChange={ handleFieldChange }
            autoFocus
            labelText='Enter aka'
            labelWidth={132}
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
            labelWidth={132}
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
        <FormGroup>
            <FormControlLabel 
                control={<Switch size='medium' defaultChecked />} 
                label="Is link active" 
            />
        </FormGroup>
        <VSpacerComponent space={4} />


        {/* add button */}
        <button className='primary_button add_metalink__button'>
          {
            isCreateLink ? "Add MetaLink" : "Create Avatar"
          }
        </button>
        <VSpacerComponent space={10} />

      </div>
    )
}

export default AddMetaLinkPage
