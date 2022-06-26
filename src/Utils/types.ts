export type ModeType = 'RESOLVE' | 'REJECT'
export type ModeMessageType = 'ERROR' | 'SUCCESSFUL' | "OFF"
export type MessageStateType = {
    mode: ModeMessageType,
    message: string
}
export type DataType = {
    name: string
    email: string
    tel: string
    birthday: Date | undefined
    message: string
}
export type errorNameType = {
    mode: boolean
    errorMessage: string | null
}
