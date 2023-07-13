export interface BlogCreate{
    title: string,
    description: string,
    image: string
}

export interface Blog{
    _id: string,
    title: string,
    description: string,
    image: string,
    tags: [string],
    author: string,
    createdAt: string,
    updatedAt: string
}

export interface BlogsHttpGet{
    status: string,
    data: [Blog]
}