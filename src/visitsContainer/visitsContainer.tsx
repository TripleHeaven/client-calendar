import { RecordT } from "../TypesTS/RecordT";
// getting visits for month
// the purpose of this container of this container is to
// generate visits and send it to the calendar for processing
// purpose of this container is to generate visits
// no matter how
// event names and trainers

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
// base list of activities
const activities: string[] = [
  "TRX Functionality",
  "Fitness",
  "Football",
  "Volleyball",
  "Box",
  "Basketball",
  "Fitness old",
];
const trainerNames: string[] = [
  "Jefferson Johnes",
  "Monicca Belucci",
  "Alex Mork",
  "Dylan Ross",
  "Michael Bay",
  "Michael Jordan",
  "Cathe Blake",
];
// getting visit for one certain month
export function getVisitsForOneMonth(quantity: number, month: number): RecordT {
  const visits = [];
  let currentMinDate = 1;
  let indexOfActivity;
  // randomizing visits
  for (let i = 0; i < quantity; i++) {
    currentMinDate = currentMinDate + getRandomInt(1, 5);
    indexOfActivity = getRandomInt(0, activities.length);
    visits.push({
      date: new Date(
        2020,
        month,
        currentMinDate,
        getRandomInt(1, 12),
        getRandomInt(0, 60)
      ),
      eventName: activities[indexOfActivity],
      trainerName: trainerNames[indexOfActivity],
    });
  }
  return {
    month: month,
    visitsList: visits,
  };
}

export function getVisitsForMonths(months: Date[]): RecordT[] {
  const records = [];
  for (let i = 0; i < months.length; i++) {
    records.push(getVisitsForOneMonth(4, months[i].valueOf())); // here we set the time of the visit into the visit
  }
  console.log(records);
  return records;
}
