import React from "react";
import styles from "./VisitsCalendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CreateCalendar from "./CreateCalendar";
import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { getVisitsForOneMonth } from "../visitsContainer/visitsContainer";

export default function VisitsCalendar({
  inputMonths,
}: {
  inputMonths: number[];
}) {
  // we get only months that we need to build calendar on
  // then we neet to call function that will generate visits for given months
  const [months, setMonth] = useState({
    months: inputMonths,
  });

  // we are useEffect with empty state dependency to
  // only call this when the width of the calendar container is changed
  useEffect(() => {
    let quantityMonths;
    let width;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        quantityMonths = Math.floor(width / 220);
        changeQuantity(quantityMonths);
      }
    });

    ro.observe(document.getElementById("cWidth") as Element);
  }, []);
  function changeQuantity(quantityMonths: number) {
    setMonth({
      months: months.months.slice(0, quantityMonths),
    });
  }
  function changeMonth(index: number) {
    // returning  new array
    function createMonthsArray(startMonth: number, quantityMonths: number) {
      const arrayWithMonths = [];
      let curmonth = startMonth;
      for (let i = 0; i < quantityMonths; i++) {
        if (curmonth > 11) {
          curmonth = 0;
        }
        arrayWithMonths.push(curmonth);
        curmonth += 1;
      }
      return arrayWithMonths;
    }
    let curIndex = months.months[0];

    if (index > 0 && curIndex + months.months.length > 11) {
      curIndex = 0;
    } else if (index < 0 && curIndex - months.months.length < 0) {
      curIndex = 12 - months.months.length;
    } else {
      curIndex = months.months[0] + months.months.length * index;
    }
    setMonth({
      months: createMonthsArray(curIndex, months.months.length),
    });
  }

  return (
    <div className={styles.container} id="cWidth">
      <div className={styles.title}>
        <p className={styles.mainTitle}>Visits calendar</p>
        <div className={styles.titleButtons}>
          <p className={styles.titleButtonS}>Show Months</p>
          <div className={styles.titleButton} onClick={() => changeMonth(-1)}>
            <div className={styles.arrowI}>
              <FontAwesomeIcon icon={faArrowLeft} color="rgba(0, 0, 0, 0.4)" />
            </div>
            <p>Previouts period</p>
          </div>
          <div className={styles.titleButtonN} onClick={() => changeMonth(1)}>
            <p>Next period</p>
            <div className={styles.arrowN}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                flip="horizontal"
                color="rgba(0, 0, 0, 0.4)"
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className={styles.threeDots}>
          <div className={styles.tdContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
      <div className={styles.calendarContainer}>
        {months.months.map((oneMonth) => (
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
