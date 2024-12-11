import ScheduleWrapper from "@/components/schedule/schedule-wrapper";
import { useState, useEffect } from "react";

export default function Teams() {
  const [tableData, setTableData] = useState();

  return (
    <div className="flex flex-col gap-16">
      <div className="flex w-1/2">
        <ScheduleWrapper />
      </div>
    </div>
  );
}
