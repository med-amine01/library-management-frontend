import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {MainComponent} from './component/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthorsListComponent} from './component/author/authors-list/authors-list.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorsUpsertComponent} from './component/author/authors-upsert/authors-upsert.component';
import {BooksListComponent} from './component/book/books-list/books-list.component';
import {BooksUpsertComponent} from './component/book/books-upsert/books-upsert.component';
import {HomeComponent} from './component/home/home.component';


const routes : Routes = [
  //HOME
  { path : 'home', component : HomeComponent},

  //AUTHOR ROUTES
  { path : 'authors', component : AuthorsListComponent},
  { path : 'authors/upsert', component : AuthorsUpsertComponent},
  { path : 'authors/upsert/:id', component : AuthorsUpsertComponent},

  //BOOK ROUTES
  { path : 'books', component : BooksListComponent},
  { path : 'books/upsert', component : BooksUpsertComponent},
  { path : 'books/upsert/:id', component : BooksUpsertComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    AuthorsListComponent,
    AuthorsUpsertComponent,
    BooksListComponent,
    BooksUpsertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    //toastr notification
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      timeOut: 3000
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
