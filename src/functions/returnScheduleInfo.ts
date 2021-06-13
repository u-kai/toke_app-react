import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { SelectInfo } from 'types/post-data-types/SelectInfo'
import { postAndReturnResponseToJson } from './postAndReturnResponseToJson'

export const returnScheduleIds = (user_id: string) => {
    const selectInfo: SelectInfo = {
        tableName: 'user_attandance_request_info',
        selectDatas: ['attendance_request_id'],
        whereClaseElements: {
            whereKeys: ['user_id', 'is_response'],
            whereValues: [user_id, 'false'],
            whereOperators: ['AND'],
        },
    }
    return postAndReturnResponseToJson(selectInfo, 'select').then((results: BackendReturn) => {
        if (results.results.error !== undefined) {
            return 'Error!'
        }
        if (results.results.select) {
            const datas = results.results.select
            return datas
        }
    })
}

const isStrings = (ids: (string | undefined)[]): ids is string[] => {
    const notUndefines = ids.filter((id) => id !== undefined)
    return notUndefines.length === ids.length
}

// export const returnScheduleInfos = (user_id:string) => {
//     returnScheduleIds(user_id)
//     .then((datas)=>{
//         if(datas !== "Error!" && datas !== undefined){
//             const ids = datas.map((data)=>{
//                 const id = Object.values(data)[0]
//                 if(id !== null && id !== undefined){
//                     return id.toString()
//                 }
//             })
//             if(isStrings(ids)){
//                 const selectInfo:SelectInfo = {
//                     tableName:"user_attandance_request_info",
//                     selectDatas:["*"],
//                     whereClaseElements:{
//                         whereKeys:["user_id","is_response"],
//                         whereValues:ids,
//                         whereOperators:["AND"]
//                     }
//                 }
//                 return postAndReturnResponseToJson(selectInfo,"select")
//                 .then((reuslts:BackendReturn)=>{
//                     if(reuslts.results.select){
//                         return reuslts.results.select
//                     }
//                 })
//             }
//         }
//         return "Errors!"
//     )
// }
