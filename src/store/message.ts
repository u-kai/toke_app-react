import { atom } from 'recoil'

export const messageState = atom<string>({
    key: 'messageState',
    default: '',
})
