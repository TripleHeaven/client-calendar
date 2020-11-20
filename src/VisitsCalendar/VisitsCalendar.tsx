import React, { useEffect, useState } from "react";
import styles from "./VisitsCalendar.css";
import CreateCalendar from "./CreateCalendar";
import { getVisitsForOneMonth } from "../visitsContainer/visitsContainer";
import { DayT } from "../TypesTS/DayT";
import { VisitT } from "../TypesTS/VisitT";
import { CalendarItemT } from "../TypesTS/CalendarItemT";
import { VisibilityContext } from "./VisibilityContext";
export default function VisitsCalendar({ inputDates }: { inputDates: Date[] }) {
  function makeADaysArray(inputDate: Date, visits: VisitT[]) {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    const yearNumber = inputDate.getFullYear();
    let sDays = 0;
    const numToMonthA: { [key: number]: string } = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December ",
    };
    const visitDates = [];
    for (let i = 0; i < visits.length; i++) {
      visitDates.push(visits[i].date);
    }
    function isSpecialDay(date: Date, visitDates: Array<Date>) {
      for (let l = 0; l < visitDates.length; l++) {
        if (
          visitDates[l].getDate() === date.getDate() &&
          visitDates[l].getMonth() === date.getMonth()
        ) {
          return true;
        }
      }
      return false;
    }
    function getDay(date: Date) {
      let day = date.getDay();
      if (day === 0) {
        day = 7;
      }
      return day - 1;
    }
    function quantityDaysInMonth(month: number, year: number) {
      return new Date(year, month, 0).getDate();
    }
    const mon = inputDate.getMonth();

    const d = new Date(yearNumber, inputDate.getMonth(), 1);
    const thisMonthDays: Array<DayT> = [];
    for (let i = 0; i < getDay(d); i++) {
      if (inputDate.getMonth() === 0) {
        thisMonthDays.push({
          dayId: Number(
            mon.toString() +
              d.getDate().toString() +
              (
                quantityDaysInMonth(12, yearNumber - 1) -
                (getDay(d) - i) +
                1
              ).toString() +
              getRandomInt(1, 10000)
          ),
          dayNum: (
            quantityDaysInMonth(12, yearNumber - 1) -
            (getDay(d) - i) +
            1
          ).toString(),
          stateThing: "none",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      } else {
        thisMonthDays.push({
          dayId: Number(
            mon.toString() +
              d.getDate().toString() +
              (
                quantityDaysInMonth(12, yearNumber - 1) -
                (getDay(d) - i) +
                1
              ).toString() +
              getRandomInt(1, 10000)
          ),
          dayNum: (
            quantityDaysInMonth(inputDate.getMonth() - 1, yearNumber) -
            (getDay(d) - i) +
            1
          ).toString(),
          stateThing: "none",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      }
    }
    let indexVisit = 0;
    while (d.getMonth() === mon) {
      if (isSpecialDay(d, visitDates) === true) {
        sDays += 1;
        thisMonthDays.push({
          dayId: Number(
            mon.toString() +
              d.getDate().toString() +
              (
                quantityDaysInMonth(12, yearNumber - 1) -
                (getDay(d) - sDays) +
                1
              ).toString() +
              getRandomInt(1, 10000)
          ),
          dayNum: d.getDate().toString(),
          stateThing: "special",
          activity: visits[indexVisit],
          isVisible: false,
        });
        indexVisit += 1;
      } else {
        thisMonthDays.push({
          dayId: Number(
            mon.toString() +
              d.getDate().toString() +
              (
                quantityDaysInMonth(12, yearNumber - 1) -
                (getDay(d) - sDays) +
                1
              ).toString() +
              getRandomInt(1, 10000)
          ),
          dayNum: d.getDate().toString(),
          stateThing: "regular",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      }
      d.setDate(d.getDate() + 1);
    }
    let dayNext = 1;
    if (getDay(d) !== 0) {
      for (let i = getDay(d); i < 7; i++) {
        thisMonthDays.push({
          dayId: Number(
            mon.toString() +
              d.getDate().toString() +
              (
                quantityDaysInMonth(12, yearNumber - 1) -
                (getDay(d) - i) +
                1
              ).toString() +
              getRandomInt(1, 10000)
          ),
          dayNum: dayNext.toString(),
          stateThing: "none",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
        dayNext += 1;
      }
    }
    return {
      id: Date.now() + getRandomInt(1, 10000),
      days: thisMonthDays,
      monthLabel: numToMonthA[mon],
      visitsQuantity: sDays,
    };
  }

  const [calendarItems, setCalendarItems] = useState<CalendarItemT[]>([]);
  const [visibleDayId, setVisibleDay] = useState(0);
  useEffect(() => {
    function createCalendarItems() {
      const arrayWithDays: CalendarItemT[] = [];
      for (let i = 0; i < inputDates.length; i++) {
        const iterObject = makeADaysArray(
          inputDates[i],
          getVisitsForOneMonth(2, inputDates[i].getMonth()).visitsList
        );
        arrayWithDays.push(iterObject);
      }
      setCalendarItems(arrayWithDays);
    }
    setVisibleDay(0);
    createCalendarItems();
  }, [inputDates]);
  return (
    <VisibilityContext.Provider
      value={{ calendarItems, visibleDayId, setVisibleDay, setCalendarItems }}
    >
      <div className={styles.container} id="cWidth">
        <div className={styles.calendarContainer}>
          {calendarItems.map((item) => (
            <CreateCalendar
              key={item.id}
              days={item.days}
              monthLabel={item.monthLabel}
              qd={item.visitsQuantity}
            />
          ))}
        </div>
      </div>
    </VisibilityContext.Provider>
  );
}
