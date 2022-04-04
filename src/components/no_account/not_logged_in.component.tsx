import { useEthers } from "@usedapp/core"


import VSpacerComponent from "../v_spacer/v_spacer.component"


// assets
import face_img from '../../assets/images/face-big.png'


import './not_logged_in.component.scss'


const NotLoggedInComponent = () => {
    // get logged in address    
    const { activateBrowserWallet } = useEthers()
    

    return (  
        <div className="not_loggedin_container g_bg_ps_1 column ma_center ca_center">

            <img src={face_img} className='not_loggedin_container__image' />
            <VSpacerComponent space={1} />

            <p className="text_2 bold">
                Connect Wallet
            </p>
            <VSpacerComponent space={1} />

            <p className="text_6 text_center">
                Your wallet is not connected. Connect your wallet to see your profile and create avatar and metalinks. 
            </p>
            <VSpacerComponent space={1.5} />

            <button 
                className="button main_appbar__button bold" 
                onClick={activateBrowserWallet}
            >
                Connect Wallet
            </button>

        </div>
    )
}

export default NotLoggedInComponent