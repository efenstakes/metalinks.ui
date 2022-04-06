import VSpacerComponent from '../v_spacer/v_spacer.component'

// assets
import face_img from '../../assets/images/face-big.png'


import './no_links.component.scss'


type ComponentProps = {
    text: string
}
const NoLinksComponent = ({ text }: ComponentProps) => {
  return (
    <div className='no_links_container column ca_center'>
        
        <img src={face_img} className='no_links_container__image small_indicator_image infinite_bouncing' />
        <VSpacerComponent space={1} />
        
        <p className="su_5 text_3 bold no_links_container__title">
            No MetaLinks
        </p>
        <VSpacerComponent space={.5} />
        
        <p className="su_8 text_6 no_links_container__text text_center">
            { text }
        </p>

    </div>
  )
}

export default NoLinksComponent