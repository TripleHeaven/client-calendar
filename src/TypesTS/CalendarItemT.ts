import { DayT} from "./DayT";
export interface CalendarItemT {
  id : number;
  days : DayT[],
  monthLabel : string,
  visitsQuantity : number,
}
