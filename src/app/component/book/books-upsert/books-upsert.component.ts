import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../common/book';
import {Author} from '../../../common/author';
import {BookService} from '../../../service/book.service';
import {AuthorService} from '../../../service/author.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-books-upsert',
  templateUrl: './books-upsert.component.html',
  styleUrls: ['./books-upsert.component.css'],
})
export class BooksUpsertComponent implements OnInit {
  bookForm!: FormGroup;
  book: Book = new Book();
  authors: Author[] = [];
  isUpdate = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      yearOfPublication: ['', [Validators.required, Validators.min(1)]],
    });

    this.authorService.getAllAuthorsWithoutPagination().subscribe((authors) => {
      this.authors = authors;
    });

    this.route.paramMap.subscribe(() => {
      this.initToUpdateBook();
    });
  }

  initToUpdateBook() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.isUpdate = true;
      const bookId = +this.route.snapshot.paramMap.get('id')!;
      this.bookService.getBook(bookId).subscribe(
        (data) => {
          this.book = data;

          this.bookForm.setValue({
            title: this.book.title,
            author: this.book.author?.id || '',
            publisher: this.book.publisher,
            yearOfPublication: this.book.yearOfPublication,
          });
        },
        (error) => {
          console.log(error.message());
        }
      );
    }
  }

  isTitleInvalid() {
    return (
      this.bookForm.controls['title'].invalid &&
      (this.bookForm.controls['title'].dirty ||
        this.bookForm.controls['title'].touched)
    );
  }

  isAuthorInvalid() {
    return (
      this.bookForm.controls['author'].invalid &&
      (this.bookForm.controls['author'].dirty ||
        this.bookForm.controls['author'].touched)
    );
  }

  isPublisherInvalid() {
    return (
      this.bookForm.controls['publisher'].invalid &&
      (this.bookForm.controls['publisher'].dirty ||
        this.bookForm.controls['publisher'].touched)
    );
  }

  isYearOfPublicationInvalid() {
    return (
      this.bookForm.controls['yearOfPublication'].invalid &&
      (this.bookForm.controls['yearOfPublication'].dirty ||
        this.bookForm.controls['yearOfPublication'].touched)
    );
  }

  upsertBook() {
    const book = new Book();
    const author = new Author();

    book.title = this.bookForm.value.title;
    author.id = +this.bookForm.value.author;
    book.author = author;
    book.publisher = this.bookForm.value.publisher;
    book.yearOfPublication = this.bookForm.value.yearOfPublication;

    if (!this.isUpdate) {
      // Create Book
      this.bookService.createBook(book).subscribe(
        (data) => {
          this.toastr.success('Book Created Successfully');
          this.router.navigate(['/books']);
        },
        (error) => {
          console.log(error.message());
        }
      );
    } else {
      // Update Book
      this.bookService.updateBook(book, this.book.id).subscribe(
        (data) => {
          this.toastr.success('Book Updated Successfully');
          this.router.navigate(['/books']);
        },
        (error) => {
          console.log(error.message());
        }
      );
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.upsertBook();
    this.bookForm.reset();
  }
}
