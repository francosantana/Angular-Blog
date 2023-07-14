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

export interface BlogsHttpGetAll{
    status: string,
    data: [Blog]
}

export interface BlogHttpGet{
    status: string,
    data: Blog
}