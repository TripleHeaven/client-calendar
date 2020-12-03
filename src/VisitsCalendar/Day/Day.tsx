import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Day.css";
import { DayT } from "../../TypesTS/DayT";
import { CalUse } from "../../containers/calendarcontainer";
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
  const usabilityCont = CalUse.useContainer();

  function findADayIndex(dayid: number) {
    for (let i = 0; i < usabilityCont.calendarItems.length; i++) {
      for (let j = 0; j < usabilityCont.calendarItems[i].days.length; j++) {
        if (usabilityCont.calendarItems[i].days[j].dayId === dayid) {
          return [i, j];
        }
      }
    }
    return [100, 100];
  }
  function toggleGlobalVisibility(event: React.MouseEvent) {
    const currentDayIndex = findADayIndex(day.dayId);

    const dayC =
      usabilityCont.calendarItems[currentDayIndex[0]].days[currentDayIndex[1]];
    if (usabilityCont.visibleDayId === 0) {
      usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible;
      usabilityCont.setVisibleDay(dayC.dayId);
    } else if (usabilityCont.visibleDayId === day.dayId) {
      usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible;
      usabilityCont.setVisibleDay(dayC.dayId);
    } else if (usabilityCont.visibleDayId !== day.dayId) {
      const prevDayIndex = findADayIndex(usabilityCont.visibleDayId);
      usabilityCont.calendarItems[prevDayIndex[0]].days[
        prevDayIndex[1]
      ].isVisible = false;
      usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible = !usabilityCont.calendarItems[currentDayIndex[0]].days[
        currentDayIndex[1]
      ].isVisible;
      usabilityCont.setVisibleDay(dayC.dayId);
    }
    usabilityCont.setCalendarItems(
      usabilityCont.calendarItems.slice(0, usabilityCont.calendarItems.length)
    );
    event.stopPropagation();
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
  }, [usabilityCont.visibleDayId, day.isVisible, day.stateThing]);
  if (day.stateThing === "special") {
    return (
      <div
        className={globalVisibility.isGVisible}
        onClick={(event) => toggleGlobalVisibility(event)}
      >
        {day.dayNum}
        <div
          className={popupVisibility.isPVisible}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.activityTimeName}>
            {toDisplayTime(day.activity.date.getHours().toString())}:
            {toDisplayTime(day.activity.date.getMinutes().toString())}{" "}
            {day.activity.eventName}
          </div>
          <div className={styles.traineeName}>{day.activity.trainerName}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={globalVisibility.isGVisible}
        onClick={(event) => toggleGlobalVisibility(event)}
      >
        {day.dayNum}
      </div>
    );
  }
}
