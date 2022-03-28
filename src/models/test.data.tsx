import { faker } from "@faker-js/faker"


// models
import { Avatar } from "./avatar.model"



export const avatars: Array<Avatar> = [
    ...Array(20).fill(1).map((_, index: number)=> {

        return {
            id: index,
            name: faker.name.findName(),
            aka: faker.name.firstName(),
            avatar: faker.image.people(400, 600),
            bg_avatar: faker.image.people(400, 600),
            is_active: index % 7 === 0,

            links: Array(20).fill(1).map((_, index: number)=> {

                return {
                    id: index,
                    name: faker.name.findName(),
                    aka: faker.name.firstName(),
                    avatar: faker.image.people(400, 600),
                    bg_avatar: faker.image.people(400, 600),
                    is_active: index % 7 === 0,
                    universe: faker.address.country()
                }
            })

        }
    })
]

