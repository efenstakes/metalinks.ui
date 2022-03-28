// components
import AppbarComponent from '../../components/appbar/appbar.component'
import MetalinkCardComponent from '../../components/metalink_card/metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import WelcomeComponent from './welcome.component'


// models
import { Avatar } from '../../models/avatar.model'
import { MetaLink } from '../../models/metalink.model'
import { avatars } from '../../models/test.data'


import './home.page.scss'


const HomePage = () => {

    console.log("avatars ", avatars)

    return (
        <div className='page'>
            
            {/* appbar */}
            <AppbarComponent />

            {/* welcome */}
            <WelcomeComponent />

            {/* metalinks if any */}
            <SectionTitleComponent title='Links' />
            <div className="padded_container">
                {
                    avatars[0].links.map((metaLink: MetaLink, index: number)=> {

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

        </div>
    )
}

export default HomePage