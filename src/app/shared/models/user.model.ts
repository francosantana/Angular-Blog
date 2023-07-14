
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

export type RawUser = User['user'];

export interface UserListHttpLogin{
    status: string,
    data: [User['user']]
}