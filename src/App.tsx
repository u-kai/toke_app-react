import {Card} from "components/atoms/Card"
import React from "react"
function App() {
  return (
    <Card
    title="今日の予定"
    isDate={true}
    schedules={["夕食","卓球","集会","Meeting"]}
    scheduleDates={["18:00","15:00","12:00","12:00"]}
    scheduleLocations={["はま寿司","体育館","プラザ","Zoom"]}
    scheduleUrl={["#","#","#","#"]}
    ></Card>
  );
}

export default App;
