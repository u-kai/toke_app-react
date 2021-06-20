// import React,{useState,useEffect} from "react"
// import {MultipleSelect} from "components/atoms/MultipleSelect"
// import { postAndReturnResponseToJson } from 'functions/postAndReturnResponseToJson'
// import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
// import { BackendResultsChecker } from 'model/BackendResultsChecker'
// import { ReturnDataForGetMembers } from 'types/backend-return-tyeps/ReturnDataForGetMembers'
// export const NewRegistGroup = () =>{
//     const [memberIds,setMemberIds] = useState([""])
//     const [memberNames,setMemberNames] = useState([""])
//     const [selectedMembers,setSelectedMembers] = useState([""])
//     const [error, setError] = useState("")
//     const organizerId = useRecoilValue(userIdState)
//     const onClick = () => {
export const s = 'd'
//     }
//     useEffect(()=>{
//         //search members
//         const sendData = {
//             userId:memberIds
//         }
//         postAndReturnResponseToJson(sendData,"getMembers")
//         .then((results:BackendReturn)=>{
//             const checker = new BackendResultsChecker(results)
//             if(checker.isError()){
//                 setError('エラーが起きてます．管理者にご報告ください．')
//                 return
//             }
//             if(checker.isSelect()){
//                 const selects = results.results.select! as ReturnDataForGetMembers
//                 let memberNamesTemp:string[] = []
//                 let memberIdsTemp:string[] = []
//                 selects.map((select)=>{
//                     memberNamesTemp = [...memberNamesTemp,select.user_name]
//                     memberIdsTemp = [...memberIdsTemp,select.user_id]
//                 })
//                 console.log(memberNamesTemp)
//                 console.log(memberIdsTemp)
//                 setMemberIds(memberIdsTemp)
//                 setMemberNames(memberNamesTemp)
//             }
//         })
//     },[])
//     return(
// <div>
// <MultipleSelect
//     names={memberNames}
//     onChange={(e)=>setSelectedMembers([e.target.value as string])}
//     placeholder={"メンバーを選択"}
//     selectNames={selectedMembers}/>
// <button onClick={onClick}>send</button>
// </div>
//     )
// }
