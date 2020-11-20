import React from "react";
import styles from "./MySuperCalendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import VisitsCalendar from "../VisitsCalendar/VisitsCalendar";
import ResizeObserver from "resize-observer-polyfill";
import { Context } from "../context";

export default function MySuperCalendar() {
  // we get only months that we need to build calendar on
  // then we neet to call function that will generate visits for given months
  const [monthsCont] = useState({
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });

  const [datesInCal, setDate] = useState({
    dates: [new Date()],
  });

  // basic state , happens when we rendering page
  const [visibilityForOneMonth, setVisibility] = useState({
    visibility: {
      prev: styles.titleButtonS,
      next: styles.titleButtonN,
      tb: styles.titleButtons,
      tbS: styles.titleButtonS,
    },
  });
  function changeMonth(index: number) {
    // returning  new array
    // setContMonth({
    //   months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    // });
    function createDatesArray(
      startMonth: Date,
      quantityMonths: number,
      isAnotherYear: number
    ) {
      const arrayWithDates = [];
      const curmonth = startMonth;
      curmonth.setFullYear(curmonth.getFullYear() + isAnotherYear);
      for (let i = 0; i < quantityMonths; i++) {
        arrayWithDates.push(
          new Date(curmonth.getFullYear(), curmonth.getMonth())
        );
        curmonth.setMonth(curmonth.getMonth() + 1);
      }

      return arrayWithDates;
    }
    let curIndex = datesInCal.dates[0].getMonth();
    let flag = 0;
    if (index > 0 && curIndex + datesInCal.dates.length > 11) {
      curIndex = 0;
      flag = 1;
    } else if (index < 0 && curIndex - datesInCal.dates.length < 0) {
      curIndex = 12 - datesInCal.dates.length;
      flag = -1;
    } else {
      curIndex =
        datesInCal.dates[0].getMonth() + datesInCal.dates.length * index;
    }
    setDate({
      dates: createDatesArray(
        new Date(datesInCal.dates[0].getFullYear(), curIndex),
        datesInCal.dates.length,
        flag
      ),
    });
  }

  // we are useEffect with empty state dependency to
  // only call this when the width of the calendar container is changed
  useEffect(() => {
    let quantityMonths;
    let width;
    function getNewMonths(quantity: number) {
      const forReturn = [];
      const months = monthsCont.months.slice(0, quantity);
      for (let i = 0; i < months.length; i++) {
        forReturn.push(new Date(new Date().getFullYear(), months[i]));
      }
      return forReturn;
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        quantityMonths = Math.floor(width / 200);

        setDate({
          dates: getNewMonths(quantityMonths),
        });
        if (width < 497) {
          setVisibility({
            visibility: {
              prev: styles.notVisibleHidden,
              next: styles.notVisibleHidden,
              tb: styles.tbHidden,
              tbS: styles.notVisibleHidden,
            },
          });
        } else {
          setVisibility({
            visibility: {
              prev: styles.titleButtonS,
              next: styles.titleButtonN,
              tb: styles.titleButtons,
              tbS: styles.titleButtonS,
            },
          });
        }
        console.log(width);
      }
    });
    getNewMonths(0);
    ro.observe(document.getElementById("cWidth") as Element);
  }, [monthsCont.months]);

  return (
    <Context.Provider
      value={{
        changeMonth,
      }}
    >
      <div className={styles.container} id="cWidth">
        <div className={styles.title}>
          <p className={styles.mainTitle}>Visits calendar</p>
          <div className={visibilityForOneMonth.visibility.tb}>
            <div className={visibilityForOneMonth.visibility.tbS}>
              Show Months
            </div>
            <div className={styles.titleButton} onClick={() => changeMonth(-1)}>
              <div className={styles.arrowI}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  color="rgba(0, 0, 0, 0.4)"
                />
              </div>
              <p className={visibilityForOneMonth.visibility.prev}>
                Previouts period
              </p>
            </div>
            <div className={styles.titleButtonN} onClick={() => changeMonth(1)}>
              <p className={visibilityForOneMonth.visibility.next}>
                Next period
              </p>
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
        <VisitsCalendar inputDates={datesInCal.dates}></VisitsCalendar>
      </div>
    </Context.Provider>
  );
}
