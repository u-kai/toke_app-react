import { atom } from 'recoil'

export const isAttendState = atom<boolean>({
    key: 'userIdState',
    default: false,
})
