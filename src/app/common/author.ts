import {Book} from "./book";
import {Entity} from "./entity";

export class Author extends Entity {
  name !: string;
  books !: Book[];
}
