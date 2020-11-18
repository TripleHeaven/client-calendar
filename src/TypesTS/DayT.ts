import { VisitT } from "./VisitT";

export interface DayT {
  dayId : number;
  dayNum: string;
  stateThing: string;
  activity : VisitT;
}
