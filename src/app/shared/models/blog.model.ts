
// Function params --------
export interface BlogCreateParam{
    title: string,
    description: string,
    image: string
}


// Generic types ---------
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


// Http Response types (they have status and data) ----------
export interface BlogsHttpGetAll{
    status: string,
    data: [Blog]
}

export interface BlogHttpGet{
    status: string,
    data: Blog
}