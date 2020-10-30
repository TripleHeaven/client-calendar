import React from "react";
import styles from "./VisitsCalendar.css";
import CreateCalendar from "./CreateCalendar";
import { getVisitsForOneMonth } from "../visitsContainer/visitsContainer";

export default function VisitsCalendar({
  inputMonths,
}: {
  inputMonths: number[];
}) {
  // we get only months that we need to build calendar on
  // then we neet to call function that will generate visits for given months

  // we are useEffect with empty state dependency to
  // only call this when the width of the calendar container is changed

  return (
    <div className={styles.container} id="cWidth">
      <div className={styles.calendarContainer}>
        {inputMonths.map((oneMonth) => (
          <CreateCalendar
            key={oneMonth}
            monthNumber={oneMonth}
            visits={getVisitsForOneMonth(5, oneMonth).visitsList}
          />
        ))}
      </div>
    </div>
  );
}
