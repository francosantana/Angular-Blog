
// Function params ---------------
export interface UserRegisterParam{
    name: string,
    password: string,
    email: string
}

export interface UserLoginParam{
    password: string,
    email: string
}


// Generic types -----------
export interface User {
        _id: string,
        name: string,
        email: string,
        role: string
}


export interface JwtUser { 
    token: string,
    user: User
}


// Http Response types (they have status and data) ----------
export interface UserHttpLogin{
    status: string,
    data: JwtUser
}

export interface UserHttpProfile{
    status: string,
    data: User
}

export interface UserListHttpLogin{ 
    status: string,
    data: [User]
}


