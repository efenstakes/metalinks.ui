import { useEthers } from "@usedapp/core"

import WarningIcon from '@mui/icons-material/Warning'

import VSpacerComponent from "../v_spacer/v_spacer.component"


// assets
import face_img from '../../assets/images/face-wheat.png'



import './not_logged_in.component.scss'


type ComponentProps = {
    title?: string
    text?: string
    ctaText?: string
    hideCta?: boolean
    showIcon?: boolean
    refresh: ()=> void
}
const ErrorLoadingAvatarComponent = ({ title, text, ctaText, refresh, hideCta = false, showIcon = true }: ComponentProps) => {
    // get logged in address    
    const { activateBrowserWallet } = useEthers()
    

    return (  
        <div className="not_loggedin_container g_bg_ps_1 column ma_center ca_center">

            <img src={face_img} className='not_loggedin_container__image small_indicator_image infinite_bouncing' />
            <VSpacerComponent space={1} />

            <p className="su_9 text_2 bold">
                { title || "Error Getting Avatar" }
            </p>
            <VSpacerComponent space={.5} />

            <p className="su_11 text_6 text_center">
                {
                    text || 
                    "An error occured while loading avatar details. Click Refresh button below to retry."
                }
            </p>
            <VSpacerComponent space={1.5} />
            {
                hideCta &&
                    <button 
                        className="su_14 button main_appbar__button bold" 
                        onClick={refresh}
                    >
                        { ctaText ? ctaText : "Refresh" }
                    </button>
            }

        </div>
    )
}

export default ErrorLoadingAvatarComponent