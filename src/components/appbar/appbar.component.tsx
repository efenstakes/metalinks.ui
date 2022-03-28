import { useEffect, useState } from 'react'


// components


import logo_img from '../../assets/images/face-small.png'


import './appbar.component.scss'




type ComponentProps = {
}
const AppbarComponent = ({ }: ComponentProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)



    const connectWallet = ()=> {

    }

    return (
        <div className='main_appbar appbar_md padded_container_sm row ma_space_btn ca_center'>
            
            <div className="main_appbar__logo_container row ca_center">
                <img
                    src={logo_img} 
                    alt="logo" 
                    className="main_appbar__logo_container__image" 
                />
                <p className='main_appbar__logo_container__logo text_3 bolder'>
                    MetaLinks
                </p>
            </div>

            
            {/* connect wallet if not logged in */}
            {
                !isLoggedIn &&
                    <button className="button main_appbar__button bold" onClick={connectWallet}>
                        Connect Wallet
                    </button>
            }

            {/* show icon & name */}
            {
                isLoggedIn &&
                    <a href='/profile/1' className="main_appbar__right_container row ma_center ca_center">
                        <img
                            src={logo_img} 
                            alt="logo" 
                            className="main_appbar__right_container__image" 
                        />
                        <p className="text_5">
                            JJ
                        </p>
                    </a>
            }
            

        </div>
    )
}

export default AppbarComponent