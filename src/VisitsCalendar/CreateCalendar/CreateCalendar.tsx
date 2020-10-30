import React from "react";
import styles from "./CreateCalendar.css";
import { VisitT } from "../../TypesTS/VisitT";
import { DayT } from "../../TypesTS/DayT";
import Day from "../Day/Day";
export default function CreateCalendar({
  monthNumber,
  visits,
}: {
  monthNumber: number;
  visits: VisitT[];
}) {
  const yearNumber = visits[0].date.getFullYear();
  let sDays = 0;
  const numToMonthA: { [key: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December ",
  };
  const visitDates = [];
  for (let i = 0; i < visits.length; i++) {
    visitDates.push(visits[i].date);
  }
  console.log(visits);
  function isSpecialDay(date: Date, visitDates: Array<Date>) {
    for (let l = 0; l < visitDates.length; l++) {
      if (
        visitDates[l].getDate() === date.getDate() &&
        visitDates[l].getMonth() === date.getMonth()
      ) {
        return true;
      }
    }
    return false;
  }
  function getDay(date: Date) {
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day - 1;
  }
  function quantityDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  const mon = monthNumber;

  const d = new Date(yearNumber, monthNumber, 1);
  const thisMonthDays: Array<DayT> = [];
  for (let i = 0; i < getDay(d); i++) {
    if (monthNumber === 0) {
      thisMonthDays.push({
        dayNum: (
          quantityDaysInMonth(12, yearNumber - 1) -
          (getDay(d) - i) +
          1
        ).toString(),
        stateThing: "none",
        activity: { date: new Date(), eventName: "", trainerName: "" },
      });
    } else {
      thisMonthDays.push({
        dayNum: (
          quantityDaysInMonth(monthNumber - 1, yearNumber) -
          (getDay(d) - i) +
          1
        ).toString(),
        stateThing: "none",
        activity: { date: new Date(), eventName: "", trainerName: "" },
      });
    }
  }
  let indexVisit = 0;
  while (d.getMonth() === mon) {
    if (isSpecialDay(d, visitDates) === true) {
      sDays += 1;
      thisMonthDays.push({
        dayNum: d.getDate().toString(),
        stateThing: "special",
        activity: visits[indexVisit],
      });
      indexVisit += 1;
    } else {
      thisMonthDays.push({
        dayNum: d.getDate().toString(),
        stateThing: "regular",
        activity: { date: new Date(), eventName: "", trainerName: "" },
      });
    }
    d.setDate(d.getDate() + 1);
  }
  let dayNext = 1;
  if (getDay(d) !== 0) {
    for (let i = getDay(d); i < 7; i++) {
      thisMonthDays.push({
        dayNum: dayNext.toString(),
        stateThing: "none",
        activity: { date: new Date(), eventName: "", trainerName: "" },
      });
      dayNext += 1;
    }
  }
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.month}>
        <span className={styles.boldM}>{numToMonthA[mon]}&nbsp;</span> {sDays}{" "}
        Visits
      </div>
      <div className={styles.calendarDays}>
        <p>m</p>
        <p>t</p>
        <p>w</p>
        <p>t</p>
        <p>f</p>
        <p>s</p>
        <p>s</p>
      </div>
      <div className={styles.calDays}>
        {thisMonthDays.map((ddd, index) => (
          <Day day={ddd} key={index} />
        ))}
      </div>
    </div>
  );
}
