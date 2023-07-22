import {Component, OnInit} from '@angular/core';
import {Author} from "../../../common/author";
import {ToastrService} from "ngx-toastr";
import {AuthorService} from "../../../service/author.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {

  authors: Author[] = [];
  searchText: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  count !: number;

  constructor(private authorService: AuthorService, private toastr: ToastrService, private location : Location) {}

  ngOnInit(): void {
    this.listAuthors();
  }

  listAuthors() {
    this.authorService.getAllAuthors(this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.authors = data;
        this.count = this.authors.length;
      },
      (error) => {
        console.log('ERROR: ' + error.message);
      }
    );
  }



  get filteredItems(): any[] {
    return this.authors.filter(item =>
      (item.name && item.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (item.id && item.id.toString().includes(this.searchText.toLowerCase()))
    );
  }

  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id).subscribe(
      data => {
        this.toastr.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error => {
        console.log(error.message());
      }
    )
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.listAuthors();
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  generateFakeData() {
    this.authorService.generateBooksAndAuthors().subscribe(
      (data) => {
        this.toastr.info("10 Authors each one of them has 2 Books");
        this.toastr.success("Data Generated Successfully :)");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        alert("Error : "+error.message());
      }
    );
  }
}
