
import { useWindowWidth } from '@react-hook/window-size'

// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'


import face_big from '../../assets/images/face-big.png'
import face_small from '../../assets/images/face-small.png'


import './welcome.component.scss'


const WelcomeComponent = () => {
    let width = useWindowWidth()

    const authenticate = ()=> {}


    return (
        <div className='welcome_section padded_container gradial_bg_container column ma_center ca_center'>
            
            {/* underlay */}
            <div className="welcome_section__underlay row ma_around ca_center">
                {
                    width > 600 &&
                        <img 
                            src={face_small} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small'
                        />
                }
                <img 
                    src={face_small} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small'
                />
                <img 
                    src={face_big} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__big'
                />
                <img 
                    src={face_small} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small'
                />
                {
                    width > 600 &&
                        <img 
                            src={face_small} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small'
                        />
                }
            </div>

            {/* info */}
            <div className="welcome_section__info column ma_center ca_center">

                <p className="title_3">
                    MetaLinks
                </p>

                <p className="welcome_section__info__text text_6">
                    Want to keep your different Metaverse profiles in one 
                    place? MetaLinks is here to help you do that.
                </p>
                <VSpacerComponent space={2} />
 
                <button 
                    className="black_button button_md bold" 
                    onClick={authenticate}
                >
                    Connect Wallet
                </button>

            </div>


        </div>
    )
}

export default WelcomeComponent
