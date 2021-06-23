export class DateChecker {
    isToday = (date: string) => {
        const today = new Date()
        const compare = new Date(date)
        return (
            today.getFullYear() === compare.getFullYear() &&
            today.getMonth() === compare.getMonth() &&
            today.getDate() === compare.getDate()
        )
    }
    sortAsc = (dates:string[]) => {
        // let sortList:string[] = [new Date(dates[0]).]
        let minList:string[] = [dates[0]]
        // for (let i=0;i<dates.length;i++){
        //     for (let j=0;j<dates.length;j++){
        //         if(this.isBiggerDate1(minList[i],dates[i+1])){
        //             minList[i]
        //         }
        //     }
        // }
        const keyIsIndexValueIsDateValueTemp:{[key:string]:string} = {}
        const keyIsDateValueValueIsIndexTemp:{[key:string]:number} = {}
        const dateToValueList = dates.map((date,i)=>{
            keyIsDateValueValueIsIndexTemp[this.dateToValue(date).toString()] = i
            keyIsIndexValueIsDateValueTemp[i.toString()] = date
            return this.dateToValue(date)
        })
        const sortList = dateToValueList.sort()
        return sortList.map((data)=>{
            const index = keyIsDateValueValueIsIndexTemp[data]
            return keyIsIndexValueIsDateValueTemp[index]
        })



    }  
    private dateToValue = (date:string):number => {
        const dateInfo = new Date(date)
        return dateInfo.getFullYear() * 12 * 30 + dateInfo.getMonth() * 30 + dateInfo.getDate() + dateInfo.getHours() * 1/24 + dateInfo.getMinutes() * 1/1440
    } 
    private isBiggerDate1 = (date1:string,date2:string) => {
        return this.dateToValue(date1) >= this.dateToValue(date2)
    }
}
