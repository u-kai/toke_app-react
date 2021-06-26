import { atom } from 'recoil'
import {Banner} from "types/ui-types/Banner"
export const bannerState = atom<Banner>({
    key: 'bannerState',
    default:{status:undefined,message:undefined},
})
