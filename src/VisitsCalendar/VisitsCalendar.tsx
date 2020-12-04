import React, { useEffect, useState } from "react";
import styles from "./VisitsCalendar.css";
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
