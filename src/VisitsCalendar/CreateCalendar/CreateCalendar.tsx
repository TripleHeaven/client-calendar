import React from "react";
import styles from "./CreateCalendar.css";
import { DayT } from "../../TypesTS/DayT";
import Day from "../Day/Day";
export default function CreateCalendar({
  days,
  monthLabel,
  qd,
}: {
  days: DayT[];
  monthLabel: string;
  qd: number;
}) {
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.month}>
        <span className={styles.boldM}>{monthLabel}&nbsp;</span> {qd} Visits
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
        {days.map((ddd) => (
          <Day day={ddd} key={ddd.dayId} />
        ))}
      </div>
    </div>
  );
}
