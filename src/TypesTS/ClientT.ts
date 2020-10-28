import { VisitT } from './VisitT';
import { NoteT } from './NoteT';
export interface ClientT {
  name: string;
  phone: string;
  email: string;
  adress: string;
  gender: string;
  age: number;
  visits: VisitT[];
  notes: NoteT[];
}
