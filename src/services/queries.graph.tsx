import { gql } from "@apollo/client"


export const GET_AVATAR_DETAILS_BY_ID_QUERY = gql`
    query getAvatarByID($id: ID!) {
        avatar( id: $id ) {
            id
            name
            aka
            bio
            avatarURI
            bgAvatarURI
            addresses
            links {
                id
                name
                aka
                bio
                active
                universe {
                    id
                    name
                }
                avatarURI
                bgAvatarURI
                link
            }
        }
    }
`

export const GET_AVATAR_DETAILS_BY_ADDRESS_QUERY = gql`
    query getAvatarProfile($address: String!) {
        avatars(
            where: {
                addresses_contains: [
                    $address
                ]
            }
        ) {
            id
            name
            aka
            bio
            avatarURI
            bgAvatarURI
            addresses
            links {
                id
                name
                aka
                bio
                universe {
                    id
                    name
                }
                avatarURI
                bgAvatarURI
                link
            }
        }
    }
`