import React from "react";
import styles from "./VisitsContainerl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import VisitsCalendar from "../VisitsCalendar/VisitsCalendar";
import ResizeObserver from "resize-observer-polyfill";
import { Context } from "../context";

export default function VisitsContainerl() {
  // we get only months that we need to build calendar on
  // then we neet to call function that will generate visits for given months
  const [monthsCont, setContMonth] = useState({
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });

  const [monthsInCal, setMonth] = useState({
    months: monthsCont.months.slice(0, 5),
  });
  const [visibilityForOneMonth, setVisibility] = useState({
    visibility: {
      prev: styles.prevPerLabelVisible,
      next: styles.nextPerLabelVisible,
      tb: styles.titleButtons,
      tbS: styles.titleButtonS,
    },
  });
  function changeMonth(index: number) {
    // returning  new array
    setContMonth({
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    });
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
    let curIndex = monthsInCal.months[0];

    if (index > 0 && curIndex + monthsInCal.months.length > 11) {
      curIndex = 0;
    } else if (index < 0 && curIndex - monthsInCal.months.length < 0) {
      curIndex = 12 - monthsInCal.months.length;
    } else {
      curIndex = monthsInCal.months[0] + monthsInCal.months.length * index;
    }
    setMonth({
      months: createMonthsArray(curIndex, monthsInCal.months.length),
    });
  }

  // we are useEffect with empty state dependency to
  // only call this when the width of the calendar container is changed
  useEffect(() => {
    let quantityMonths;
    let width;
    function getNewMonths(quantity: number) {
      return monthsCont.months.slice(0, quantity);
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        quantityMonths = Math.floor(width / 220);

        setMonth({
          months: getNewMonths(quantityMonths),
        });
        if (width < 450) {
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
        <VisitsCalendar inputMonths={monthsInCal.months}></VisitsCalendar>
      </div>
    </Context.Provider>
  );
}
