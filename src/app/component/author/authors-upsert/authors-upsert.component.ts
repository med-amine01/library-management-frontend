import {Component, OnInit} from '@angular/core';
import {Author} from "../../../common/author";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthorService} from "../../../service/author.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-authors-upsert',
  templateUrl: './authors-upsert.component.html',
  styleUrls: ['./authors-upsert.component.css']
})
export class AuthorsUpsertComponent implements OnInit{
  authorFormGroup: FormGroup;
  authorToUpdate: Author = new Author();
  isUpdate = false;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private authorService: AuthorService,
              private route: ActivatedRoute,
              private router: Router) {

    this.authorFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.initToAuthorToUpdate();
    });
  }

  initToAuthorToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.isUpdate = true;
      let id = +this.route.snapshot.paramMap.get('id')!;
      this.authorService.getAuthor(id).subscribe(
        (data) => {
          this.authorToUpdate = data;

          this.authorFormGroup.setValue({
            name : this.authorToUpdate.name
          });
        }
      );
    }
  }

  inputNameValid(): boolean {
    return this.authorFormGroup?.invalid && (this.authorFormGroup?.dirty || this.authorFormGroup?.touched) ? true : false;
  }

  upsertAuthor() {
    if (!this.isUpdate) {
      // Create Author
      this.authorService.createAuthor(this.authorFormGroup?.value).subscribe(
        (data) => {
          this.toastr.success("Author Created Successfully !");
          this.router.navigate(['/authors']);
        },
        (error) => {
          alert("error: " + error.message);
        }
      );
    } else {
      // Update Author
      this.authorService.updateAuthor(this.authorFormGroup?.value, this.authorToUpdate.id).subscribe(
        (data) => {
          this.toastr.success("Author Updated Successfully !");
          this.router.navigate(['/authors']);
        },
        (error) => {
          alert("error: " + error.message);
        }
      );
    }
  }

  onSubmit() {
    if (this.authorFormGroup.invalid) {
      this.authorFormGroup.markAllAsTouched();
      return;
    }

    this.upsertAuthor();
    this.authorFormGroup.reset();
  }
}
