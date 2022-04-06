import { MetaLink } from "./metalink.model"



enum AvatarStatus {
    ACTIVE, INACTIVE
}

export interface Avatar {
    id?: any
    name?: string
    aka?: string
    link?: string
    avatar?: string
    bg_avatar?: string
    bio?: string

    is_active?: boolean
    status?: AvatarStatus

    links?: Array<MetaLink>

    addresses?: Array<string>
}



export const toAvatar = (avatarData): Avatar => {
    if( !avatarData ) return null
    return {
        id: avatarData?.id,
        name: avatarData?.name,
        aka: avatarData?.aka,
        bio: avatarData?.bio,
        avatar: avatarData?.avatarURI,
        bg_avatar: avatarData?.bgAvatarURI,
        addresses: avatarData?.addresses,

        links: avatarData?.links.map((lik)=> {
            return {
                id: lik?.id,
                name: lik?.name,
                aka: lik?.aka,
                bio: lik?.bio,
                universe: lik?.universe?.name,
                avatar: lik?.avatarURI,
                bg_avatar: lik?.bgAvatarURI,
                link: lik?.link,
                is_active: lik?.active,
            }
        }),
    }
}