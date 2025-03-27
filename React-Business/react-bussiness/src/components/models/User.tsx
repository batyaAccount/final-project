export type User = {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    roleName: string | undefined,
    token: string | undefined,
    accountantId: number | undefined,
}
export type partUser = Partial<User>
