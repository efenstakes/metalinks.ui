import { useWindowWidth } from '@react-hook/window-size'


import { IconButton, Link } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'


// styles
import './mini_appbar.component.scss'



type ComponentProps = {
    toggleDrawer?: ()=> void
    title: string
    showBackIcon?: boolean
}
const MiniAppbarComponent = ({ title, showBackIcon = true, toggleDrawer }: ComponentProps) => {
    const width: number = useWindowWidth()


    const goBack = ()=> {

    }

    return (
        <div className='mini_appbar appbar_md padded_container_sm row ma_space_btn ca_center'>
            
            {/* back */}
            <div style={{ flex: 1 }}>

                {
                    showBackIcon && 
                        <IconButton
                            color="primary" 
                            size='large'
                            aria-label="exit search button"
                            onClick={ goBack }
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                }

            </div>

            {/* title */}
            <div className="mini_appbar__title__container">
                <p className='mini_appbar__title__container__title text_3'> 
                    { title }
                </p>
            </div>

            {/* actions -- account */}
            <div className="mini_appbar__actions row ma_end ca_center">

                {
                    width > 600 &&
                        <Link href="/dao/create" underline="none" className='appbar_action'>
                            Create Dao
                        </Link>
                }

                <IconButton color="primary" size='large' aria-label="account icon">
                    <AccountCircleIcon />
                </IconButton>

                {/* menu if in mobile */}
                {
                    width < 600 && toggleDrawer &&
                        <IconButton
                            color="primary" 
                            size='large' 
                            aria-label="menu icon"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                }
            </div>

        </div>
    )
}

export default MiniAppbarComponent