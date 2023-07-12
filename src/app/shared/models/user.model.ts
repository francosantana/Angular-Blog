
export interface UserRegister{
    name: string,
    password: string,
    email: string
}

export interface UserLogin{
    password: string,
    email: string
}

export interface User {
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        role: string
    }
}

export interface UserHttpLogin{
    status: string,
    data: User
}