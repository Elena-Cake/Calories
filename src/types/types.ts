
export type photosType = {
    small: string | null
    large: string | null
}

export type contactsType = {
    [index: string]: string | null
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

export type postType = {
    id: number,
    avatar: string,
    text: string,
    likes: number
}