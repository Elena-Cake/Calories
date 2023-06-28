export type photosType = {
    small: string | null
    large: string | null
}

export type userType = {
    name: string
    id: number
    uniqueUrlName: string | null
    status: string | null
    followed: boolean
    photos: photosType
}