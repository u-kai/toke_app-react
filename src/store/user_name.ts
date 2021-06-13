import { atom } from 'recoil'

export const userNameState = atom<string>({
    key: 'userNameState',
    default: '有働真樹',
})
