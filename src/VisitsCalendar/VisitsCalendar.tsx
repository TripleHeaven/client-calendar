import React, { useEffect, useState } from "react";
import styles from "./VisitsCalendar.css";
import CreateCalendar from "./CreateCalendar";
import { getVisitsForOneMonth } from "../visitsContainer/visitsContainer";
import { DayT } from "../TypesTS/DayT";
import { VisitT } from "../TypesTS/VisitT";
import { CalendarItemT } from "../TypesTS/CalendarItemT";
import { VisibilityContext } from "./VisibilityContext";
import { DateTime } from "luxon";
import { CalUse } from "../containers/calendarcontainer";
import { createContainer, useContainer } from "unstated-next";
export default function VisitsCalendar() {
  let calCont = CalUse.useContainer();
  return (
    <CalUse.Provider initialState={[]}>
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
    </CalUse.Provider>
  );
}
