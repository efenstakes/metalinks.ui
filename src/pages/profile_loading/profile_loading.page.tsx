import { Skeleton } from '@mui/material'



// components
import AppbarComponent from '../../components/appbar/appbar.component'
import LoadingMetalinkCardComponent from '../../components/loading_metalink_card/loading_metalink_card.component'
import SectionTitleComponent from '../../components/section_title/section_title.component'
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'



const ProfileLoadingPage = () => {
    return (
        <div className='page'>
                        
            {/* appbar */}
            <AppbarComponent />

            {/* avatars */}
            <div className="profile_avatars_container">

                <Skeleton 
                    className="profile_avatars_container__avatar_container__big_avatar absolute"
                    width="100%" height={400}
                />

                <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
                    <div
                    className="profile_avatars_container__avatar_container__avatar__loading" 
                    />
                </div>

            </div>
            <VSpacerComponent space={.5} />

            {/* name & stats */}
            <div className="column ca_center profile_info_container">

                <Skeleton width="36%" height={48} />
                <VSpacerComponent space={.5} />

                <Skeleton width="25%" height={24} />
                <VSpacerComponent space={1.5} />

                <div className="row ma_evenly ca_center profile_info_container__chips">

                    <Skeleton width="20%" height={56} />
                    <Skeleton width="20%" height={56} />
                    <Skeleton width="20%" height={56} />

                </div>

            </div>
            <VSpacerComponent space={6} />

            {/* metalinks if any */}
            <SectionTitleComponent title='Links' />
            <div className="padded_container_lg">
                { 
                    Array(6).fill(0).map((_, index: number)=> {

                        return (
                            <LoadingMetalinkCardComponent
                                key={index} 
                                animationIndex={index+12+2}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ProfileLoadingPage