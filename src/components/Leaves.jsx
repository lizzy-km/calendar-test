import React from "react";
import { CheckIsDateEqual } from "../hooks/calendar/EventDateIsInDateCell";

const Leaves = ({ leavesData, value }) => {
  const data = leavesData;
  return (
    <ul>
      {data?.map((leave) => {

        const hasLeave = CheckIsDateEqual(value, leave);
        const list = hasLeave ? <li>{leave.values.name}</li> : <></>;
        return list;
      })}
    </ul>
  );
};

export default Leaves;
