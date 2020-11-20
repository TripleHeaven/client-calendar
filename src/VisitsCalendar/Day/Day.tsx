import React, { useContext, useEffect } from "react";
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
    isPVisible: day.isVisible ? styles.specialOn : styles.specialOff,
  });
  const toDisplayTime = (timeValue: string): string => {
    if (timeValue.length < 2) {
      return "0" + timeValue;
    } else {
      return timeValue;
    }
  };
  const {
    calendarItems,
    setCalendarItems,
    visibleDayId,
    setVisibleDay,
  } = useContext(VisibilityContext);
  function findADayIndex(dayid: number) {
    for (let i = 0; i < calendarItems.length; i++) {
      for (let j = 0; j < calendarItems[i].days.length; j++) {
        if (calendarItems[i].days[j].dayId === dayid) {
          return [i, j];
        }
      }
    }
    return [100, 100];
  }
  function toggleGlobalVisibility() {
    const currentDayIndex = findADayIndex(day.dayId);
    const dayC = calendarItems[currentDayIndex[0]].days[currentDayIndex[1]];
    if (visibleDayId === 0) {
      calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !calendarItems[currentDayIndex[0]].days[currentDayIndex[1]]
        .isVisible;
      setVisibleDay(dayC.dayId);
    } else if (visibleDayId === day.dayId) {
      calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !calendarItems[currentDayIndex[0]].days[currentDayIndex[1]]
        .isVisible;
      setVisibleDay(dayC.dayId);
    } else if (visibleDayId !== day.dayId) {
      const prevDayIndex = findADayIndex(visibleDayId);
      calendarItems[prevDayIndex[0]].days[prevDayIndex[1]].isVisible = false;
      calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !calendarItems[currentDayIndex[0]].days[currentDayIndex[1]]
        .isVisible;
      setVisibleDay(dayC.dayId);
    }
    setCalendarItems(calendarItems.slice(0, calendarItems.length));
  }
  useEffect(() => {
    if (day.stateThing === "special") {
      if (day.isVisible) {
        setPopupVisibility({
          isPVisible: styles.specialOn,
        });
        setGlobalVisibility({
          isGVisible: styles.globalOn,
        });
      } else {
        setPopupVisibility({
          isPVisible: styles.specialOff,
        });
        setGlobalVisibility({
          isGVisible: styles.special,
        });
      }
    }
  }, [visibleDayId, day.isVisible, day.stateThing]);

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
