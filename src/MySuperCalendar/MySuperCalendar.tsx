import React, { RefObject } from "react";
import styles from "./MySuperCalendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import VisitsCalendar from "../VisitsCalendar/VisitsCalendar";
import ResizeObserver from "resize-observer-polyfill";
import { Context } from "../context";
import { DateTime } from "luxon";

export default function MySuperCalendar() {
  // we get only months that we need to build calendar on
  // then we neet to call function that will generate visits for given months
  const [monthsCont] = useState({
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  });
  const [datesInCal, setDate] = useState({
    dates: [DateTime.local()],
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
  function changeMonth(index: number, event: React.MouseEvent) {
    function createDatesArray(
      startMonth: DateTime,
      quantityMonths: number,
      isAnotherYear: number
    ) {
      const arrayWithDates = [];
      let curmonth = startMonth;
      curmonth = curmonth.set({ year: curmonth.year + isAnotherYear });
      for (let i = 0; i < quantityMonths; i++) {
        arrayWithDates.push(DateTime.local(curmonth.year, curmonth.month));
        curmonth = curmonth.set({ month: curmonth.month + 1 });
      }

      return arrayWithDates;
    }
    let curIndex = datesInCal.dates[0].month;
    let flag = 0;
    if (index > 0 && curIndex + datesInCal.dates.length > 12) {
      curIndex = datesInCal.dates.length;
      flag = 1;
    } else if (index < 0 && curIndex - datesInCal.dates.length < 1) {
      curIndex = 12 - datesInCal.dates.length - 1;
      flag = -1;
    } else {
      curIndex = datesInCal.dates[0].month + datesInCal.dates.length * index;
    }
    setDate({
      dates: createDatesArray(
        DateTime.local(datesInCal.dates[0].year, curIndex),
        datesInCal.dates.length,
        flag
      ),
    });
    event.stopPropagation();
  }
  function getNewMonths(quantity: number) {
    const forReturn = [];
    const months = [];
    let forMonths = DateTime.local();
    for (let i = 0; i < quantity; i++) {
      forReturn.push(forMonths);
      forMonths = forMonths.set({ month: forMonths.month + 1 });
    }
    return forReturn;
  }
  // we are useEffect with empty state dependency to
  // only call this when the width of the calendar container is changed
  const [quant, setQuant] = useState(0);
  useEffect(() => {
    setDate({
      dates: getNewMonths(quant),
    });
  }, [quant]);
  useEffect(() => {
    let quantityMonths;
    let width;

    let firstR = true;
    function onChangeSize(entry: ResizeObserverEntry, flag: boolean) {
      if (flag) {
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
      } else {
        width = entry.contentRect.width;
        quantityMonths = Math.floor(width / 200);
        if (quantityMonths !== quant) {
          setQuant(quantityMonths);
        }
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
      }
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onChangeSize(entry, firstR);
        firstR = false;
      }
    });
    ro.observe(document.getElementById("cWidth") as Element);
  }, [monthsCont.months]);
  function toggleOffVisibility() {
    function createDatesArray(startMonth: DateTime, quantityMonths: number) {
      const arrayWithDates = [];
      let curmonth = startMonth;
      curmonth = curmonth.set({ year: curmonth.year });
      for (let i = 0; i < quantityMonths; i++) {
        arrayWithDates.push(DateTime.local(curmonth.year, curmonth.month));
        curmonth = curmonth.set({ month: curmonth.month + 1 });
      }

      return arrayWithDates;
    }
    const curIndex = datesInCal.dates[0].month;
    setDate({
      dates: createDatesArray(
        DateTime.local(datesInCal.dates[0].year, curIndex),
        datesInCal.dates.length
      ),
    });
  }
  function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          toggleOffVisibility();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, datesInCal]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Context.Provider
      value={{
        changeMonth,
      }}
    >
      <div
        ref={wrapperRef}
        className={styles.container}
        id="cWidth"
        onClick={() => toggleOffVisibility()}
      >
        <div className={styles.title}>
          <p className={styles.mainTitle}>Visits calendar</p>
          <div className={visibilityForOneMonth.visibility.tb}>
            <div className={visibilityForOneMonth.visibility.tbS}>
              Show Months
            </div>
            <div
              className={styles.titleButton}
              onClick={(event) => changeMonth(-1, event)}
            >
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
            <div
              className={styles.titleButtonN}
              onClick={(event) => changeMonth(1, event)}
            >
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
