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

    is_active?: boolean
    status?: AvatarStatus

    links?: Array<MetaLink>
}