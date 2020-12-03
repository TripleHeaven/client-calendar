import { createContainer } from "unstated-next";
import React, { useEffect, useState } from "react";
import styles from "./VisitsCalendar.css";
import CreateCalendar from "./CreateCalendar";
import { getVisitsForOneMonth } from "../visitsContainer/visitsContainer";
import { DayT } from "../TypesTS/DayT";
import { VisitT } from "../TypesTS/VisitT";
import { CalendarItemT } from "../TypesTS/CalendarItemT";
import { VisibilityContext } from "./VisibilityContext";
import { DateTime } from "luxon";
function useCalendar(initialState = []) {
  let inputDates = initialState;
  function makeADaysArray(inputDate: DateTime, visits: VisitT[]) {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    const yearNumber = inputDate.year;
    let sDays = 0;
    const numToMonthA: { [key: number]: string } = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December ",
    };
    const visitDates = [];
    for (let i = 0; i < visits.length; i++) {
      visitDates.push(visits[i].date);
    }
    function isSpecialDay(date: DateTime, visitDates: Array<Date>) {
      for (let l = 0; l < visitDates.length; l++) {
        if (
          visitDates[l].getDate() === date.day &&
          visitDates[l].getMonth() === date.month - 1
        ) {
          return true;
        }
      }
      return false;
    }

    function quantityDaysInMonth(month: number, year: number) {
      return new Date(year, month, 0).getDate();
    }
    const mon = inputDate.month;

    let d = DateTime.local(yearNumber, inputDate.month, 1);
    const thisMonthDays: Array<DayT> = [];
    //get day = weedday
    for (let i = 1; i < d.weekday; i++) {
      if (inputDate.month === 1) {
        thisMonthDays.push({
          dayId: Number(
            i.toString() +
              d.weekday.toString() +
              inputDate.month.toString() +
              (d.daysInMonth - i).toString()
          ),
          dayNum: (
            quantityDaysInMonth(12, yearNumber - 1) -
            (d.weekday - i) +
            1
          ).toString(),
          stateThing: "none",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      } else {
        thisMonthDays.push({
          dayId: Number(
            i.toString() +
              d.weekday.toString() +
              inputDate.month.toString() +
              (d.daysInMonth - i).toString()
          ),
          dayNum: (
            quantityDaysInMonth(inputDate.month - 1, yearNumber) -
            (d.weekday - i) +
            1
          ).toString(),
          stateThing: "none",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      }
    }
    let indexVisit = 0;
    while (d.month === mon) {
      if (isSpecialDay(d, visitDates) === true) {
        sDays += 1;
        thisMonthDays.push({
          dayId: Number(
            d.day.toString() +
              d.month.toString() +
              d.weekday.toString() +
              getRandomInt(1, 30)
          ),
          dayNum: d.day.toString(),
          stateThing: "special",
          activity: visits[indexVisit],
          isVisible: false,
        });
        indexVisit += 1;
      } else {
        thisMonthDays.push({
          dayId: Number(
            d.day.toString() +
              d.month.toString() +
              d.weekday.toString() +
              getRandomInt(1, 30)
          ),
          dayNum: d.day.toString(),
          stateThing: "regular",
          activity: { date: new Date(), eventName: "", trainerName: "" },
          isVisible: false,
        });
      }
      d = d.set({ day: d.day + 1 });
    }
    let dayNext = 1;
    if (d.weekday !== 1) {
      for (let i = d.weekday; i < 8; i++) {
        thisMonthDays.push({
          dayId: Number(
            d.day.toString() +
              d.month.toString() +
              d.weekday.toString() +
              getRandomInt(1, 1000)
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
          getVisitsForOneMonth(2, inputDates[i].month - 1).visitsList
        );
        arrayWithDays.push(iterObject);
      }
      setCalendarItems(arrayWithDays);
    }
    setVisibleDay(0);
    createCalendarItems();
  }, [inputDates]);

  return {
    calendarItems,
    visibleDayId,
    setVisibleDay,
    setCalendarItems,
    inputDates,
  };
}
export const CalUse = createContainer(useCalendar);
