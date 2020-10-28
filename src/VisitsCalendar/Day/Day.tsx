import React from "react";
import { useState } from "react";
import styles from "./Day.css";
import { DayT } from "../../TypesTS/DayT";

export default function Day({ day }: { day: DayT }) {
  const visibility: { [key: string]: string } = {
    a: styles.regular,
    b: styles.none,
    c: styles.special,
  };
  // we need two states
  // first one indicates if the popup exist for this day or not
  // second one toggles visibility
  // first state
  const [popupState, setPopup] = useState({
    isSpecial: false,
  });
  const [popupVisibility, setVisibility] = useState({
    isVisible: styles.template,
  });
  function toggleVisibility() {
    if (day.stateThing === "special") {
      // first toggling, we need to check the type of the day
      if (popupVisibility.isVisible === styles.template) {
        setVisibility({
          isVisible: styles.specialOn,
        });
      } else if (popupVisibility.isVisible === styles.specialOn) {
        setVisibility({
          isVisible: styles.specialOff,
        });
      } else if (popupVisibility.isVisible === styles.specialOff) {
        setVisibility({
          isVisible: styles.specialOn,
        });
      }
    }
  }
  let v = "a";
  if (day.stateThing === "none") {
    v = "b";
  } else if (day.stateThing === "regular") {
    v = "a";
  } else if (day.stateThing === "special") {
    v = "c";
    // setPopup({
    //   isSpecial: true,
    // });
  }
  return (
    <div className={visibility[v]} onClick={() => toggleVisibility()}>
      {day.dayNum}
      <div className={popupVisibility.isVisible} onClick={() => console.log(3)}>
        <div className={styles.specialInner}>
          {day.activity.eventName}
          {day.activity.trainerName} {day.activity.date.getHours()}{" "}
          {day.activity.date.getMinutes()}
        </div>
      </div>
    </div>
  );
}
