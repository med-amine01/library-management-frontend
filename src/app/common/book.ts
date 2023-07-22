import {Entity} from "./entity";
import {Author} from "./author";

export class Book extends Entity {
  title !: string;
  publisher !: string;
  yearOfPublication !: number;
  author !: Author;
}
