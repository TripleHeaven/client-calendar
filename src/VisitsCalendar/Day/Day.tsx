import React, { useContext } from "react";
import { useState } from "react";
import styles from "./Day.css";
import { DayT } from "../../TypesTS/DayT";
import { VisibilityContext } from "../VisibilityContext";
export default function Day({ day }: { day: DayT }) {
  // we need two states
  // first one indicates if the popup exist for this day or not
  // second one toggles visibility
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
  const toDisplayTime = (timeValue: string): string => {
    if (timeValue.length < 2) {
      return "0" + timeValue;
    } else {
      return timeValue;
    }
  };
  const { calendarItems, visibleDayId, setVisibleDay } = useContext(
    VisibilityContext
  );
  function findADayIndex(dayid: number) {
    for (let i = 0; i < calendarItems.length; i++) {
      for (let j = 0; j < calendarItems[i].days.length; j++) {
        if (calendarItems[i].days[j].dayId === day.dayId) {
          return [i, j];
        }
      }
    }
    return [100, 100];
  }
  function toggleGlobalVisibility() {
    const currentDayIndex = findADayIndex(day.dayId);
    const dayC = calendarItems[currentDayIndex[0]].days[currentDayIndex[1]];
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

    let previousDayIndex;
    let dayP;
    if (visibleDayId !== 0) {
      const previousDayIndex = findADayIndex(visibleDayId);
      const dayP = calendarItems[previousDayIndex[0]].days[previousDayIndex[1]];
    }
  }
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

  return (
    <div
      className={globalVisibility.isGVisible}
      onClick={() => toggleGlobalVisibility()}
    >
      {day.dayNum}
      <div className={popupVisibility.isPVisible}>
        <div className={styles.activityTimeName}>
          {toDisplayTime(day.activity.date.getHours().toString())}:
          {toDisplayTime(day.activity.date.getMinutes().toString())}{" "}
          {day.activity.eventName}
        </div>
        <div className={styles.traineeName}>{day.activity.trainerName}</div>
      </div>
    </div>
  );
}
