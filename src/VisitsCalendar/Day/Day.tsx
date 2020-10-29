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
  // basic state
  const [globalVisibility, setGlobalVisibility] = useState({
    isGVisible:
      day.stateThing === "none"
        ? styles.none
        : day.stateThing === "regular"
        ? styles.regular
        : styles.special,
  });
  const [popupVisibility, setPopupVisibility] = useState({
    isPVisible: styles.specialOff,
  });
  function toggleVisibility() {
    if (day.stateThing === "special") {
      // first toggling, we need to check the type of the day
      if (popupVisibility.isPVisible === styles.special) {
        setPopupVisibility({
          isPVisible: styles.specialOn,
        });
        setGlobalVisibility({
          isGVisible: styles.globalOn,
        });
      } else if (popupVisibility.isPVisible === styles.specialOn) {
        setPopupVisibility({
          isPVisible: styles.specialOff,
        });
        setGlobalVisibility({
          isGVisible: styles.special,
        });
      } else if (popupVisibility.isPVisible === styles.specialOff) {
        setPopupVisibility({
          isPVisible: styles.specialOn,
        });
        setGlobalVisibility({
          isGVisible: styles.globalOn,
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
    <div
      className={globalVisibility.isGVisible}
      onClick={() => toggleVisibility()}
    >
      {day.dayNum}
      <div className={popupVisibility.isPVisible}>
        <div className={styles.activityTimeName}>
          {day.activity.date.getHours()}:{day.activity.date.getMinutes()}{" "}
          {day.activity.eventName}
        </div>
        <div className={styles.traineeName}>{day.activity.trainerName}</div>
      </div>
    </div>
  );
}
