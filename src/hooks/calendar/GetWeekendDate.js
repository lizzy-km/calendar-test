import moment from "moment";
import { useEffect, useState } from "react";
import { filterArray } from "./EventDateIsInDateCell";

export const getWeekendDates = (date) => {
  const startOfMonth = date.clone().startOf("month");
  const endOfMonth = date.clone().endOf("month");
  const weekendDates = [];

  let currentDate = startOfMonth.clone();

  while (currentDate.isSameOrBefore(endOfMonth, "day")) {
    const dayOfWeek = currentDate.day(); // 0 (Sunday) to 6 (Saturday)

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDates.push(currentDate.clone());
    }
    currentDate.add(1, "day");
  }

  return weekendDates;
};

export const GetWeekends = (currDate, deletedWeekends,weekendDatesInYear,holidays) => {

  //   const [weekends,setWeekends] = useState([])

  for (let i = 0; i < 12; i++) {
    const currentDate = moment().month(i);
    const weekendDates = getWeekendDates(currentDate);
    for (let ii = 0; ii < weekendDates.length; ii++) {
      weekendDatesInYear.push(weekendDates[ii]);
    }
  }
  const weekends =()=> weekendDatesInYear?.map((date) => {
    return { date: date?.format("YYYY-MM-DD"), day_type: "Weekend" };
  });
  //   useEffect(()=> {

  //     //   setWeekends(weekendsData)

  //   },[])

  const finalWeekends = () => filterArray(weekends, deletedWeekends,holidays);

    // console.log(currDate);
    

  const isHasHolidayOnCurrentDate = () =>
    finalWeekends().find(
      (holiday) => holiday.date === currDate?.format("YYYY-MM-DD")
    );

  // console.log(weekendDatesInYear);

  return {
    weekendDatesInYear,
    weekends,
    finalWeekends,
    isHasHolidayOnCurrentDate,
  };
};
