import { atom } from 'recoil'

export const attendanceRequestIdState = atom<string>({
    key: 'attendanceRequestIdState',
    default: '',
})
