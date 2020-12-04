import React from "react";
import styles from "./VisitsCalendar.scss";
import CreateCalendar from "./CreateCalendar";
import { CalUse } from "../containers/calendarcontainer";

export default function VisitsCalendar() {
  const calCont = CalUse.useContainer();
  return (
    <div className={styles.container} id="cWidth">
      <div className={styles.calendarContainer}>
        {calCont.calendarItems.map((item) => (
          <CreateCalendar
            key={item.id}
            days={item.days}
            monthLabel={item.monthLabel}
            qd={item.visitsQuantity}
          />
        ))}
      </div>
    </div>
  );
}
