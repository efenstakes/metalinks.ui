
import { useEthers } from '@usedapp/core'


import { useWindowWidth } from '@react-hook/window-size'

// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'


import face_big from '../../assets/images/face-big.png'
import face_small from '../../assets/images/face-small.png'


import './welcome.component.scss'


const WelcomeComponent = () => {
    let width = useWindowWidth()
    
    const { activateBrowserWallet, account } = useEthers()


    return (
        <div className='welcome_section padded_container gradial_bg_container column ma_center ca_center'>
            
            {/* underlay */}
            <div className="welcome_section__underlay row ma_around ca_center">
                {
                    width > 600 &&
                        <img 
                            src={face_small} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small su_7'
                        />
                }
                <img 
                    src={face_small} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small su_10'
                />
                <img 
                    src={face_big} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__big su_12'
                />
                <img 
                    src={face_small} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small su_15'
                />
                {
                    width > 600 &&
                        <img 
                            src={face_small} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small su_17'
                        />
                }
            </div>

            {/* info */}
            <div className="welcome_section__info width_100 column ma_center ca_center">

                <p className="title_3 su_18">
                    MetaLinks
                </p>

                <div className="welcome_section__info__text__container">
                    <p className="welcome_section__info__text text_6 su_20">
                        Want to keep your different Metaverse profiles in one 
                        place? MetaLinks is here to help you do that.
                    </p>
                </div>
                <VSpacerComponent space={2} />
 
                {
                    !account &&
                        <button 
                            className="black_button button_md bold su_24" 
                            onClick={activateBrowserWallet}
                        >
                            Connect Wallet
                        </button>
                }

            </div>


        </div>
    )
}

export default WelcomeComponent
