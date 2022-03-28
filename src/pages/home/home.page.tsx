import { useState } from 'react'

// components
import AppbarComponent from '../../components/appbar/appbar.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import WelcomeComponent from './welcome.component'
import FabComponent from '../../components/fab/fab.component'
import LoadingMetalinkCardComponent from '../../components/loading_metalink_card/loading_metalink_card.component'


// models
import { Avatar } from '../../models/avatar.model'
import { MetaLink } from '../../models/metalink.model'
import { avatars } from '../../models/test.data'


import './home.page.scss'


const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log("avatars ", avatars)


    const toggleDrawer = ()=> {}

    return (
        <div className='page'>
            
            {/* appbar */}
            <AppbarComponent />

            {/* welcome */}
            <WelcomeComponent />

            {/* metalinks if any */}
            <SectionTitleComponent title='Links' />
            <div className="padded_container">
                { ! isLoading &&
                    avatars[0].links.map((metaLink: MetaLink, index: number)=> {

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

        </div>
    )
}

export default HomePage