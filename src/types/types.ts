
export type photosType = {
    small: string | null
    large: string | null
}

export type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type userType = {
    name: string
    id: number
    uniqueUrlName?: string | null
    status: string | null
    followed: boolean
    photos: photosType
}

export type profileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}