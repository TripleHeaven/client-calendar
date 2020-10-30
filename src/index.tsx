import React from "react";
import { render } from "react-dom";
import { register } from "./serviceWorker";
import styles from "./index.css";
import VisitsCalendar from "./VisitsCalendar/VisitsCalendar";
// here we disable console and performance for better production experience
// console.log(process.env.NODE_ENV);
// if (!process || !process.env || process.env.NODE_ENV !== "development") {
//   performance.mark = () => undefined as any;
//   performance.measure = () => undefined as any;
//   console.log = () => undefined as any;
// }

export default function App() {
  return (
    <div className={styles.container}>
      {/* Here we want to set the basic state of the calendar */}
      <VisitsCalendar
        inputMonths={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
      ></VisitsCalendar>
    </div>
  );
}

render(<App />, document.getElementById("root"));

register();
