import { atom } from 'recoil'

export const isAttendState = atom<boolean>({
    key: 'isAttendState',
    default: false,
})
