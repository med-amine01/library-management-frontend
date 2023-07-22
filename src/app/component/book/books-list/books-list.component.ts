import {Component} from '@angular/core';
import {Book} from "../../../common/book";
import {BookService} from "../../../service/book.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {
  books: Book[] = [];
  searchText: string = '';

  constructor(private bookService: BookService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks() {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.log('ERROR: ' + error.message);
      }
    );
  }

  filterBooks() {
    if (this.searchText.trim() === '') {
      return this.books; // No search text, return all books
    } else {
      const searchTextLower = this.searchText.toLowerCase();
      return this.books.filter(book =>
        book.title.toLowerCase().includes(searchTextLower) ||
        book.author.name.toLowerCase().includes(searchTextLower) ||
        book.publisher.toLowerCase().includes(searchTextLower)
      );
    }
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(
      data => {
        this.toastr.success("Deleted Successfully");
        setTimeout(() => {
          this.listBooks(); // Refresh the book list after deletion
        }, 1000);
      },
      error => {
        console.log(error.message());
      }
    )
  }
}
