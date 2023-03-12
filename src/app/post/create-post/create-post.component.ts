import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UrlEncode } from "../../shared/url-encode.pipe";
import { PostDisplay } from "../post";
import { PostService } from "../post.service";

@Component({
  selector: "pmw-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
  createPostForm = new UntypedFormGroup({
    title: new UntypedFormControl("", Validators.required),
    summary: new UntypedFormControl("", Validators.required),
    image: new UntypedFormControl(null, Validators.required),
    content: new UntypedFormControl("", Validators.required),
  });

  error: string = "";

  constructor(
    private postService: PostService,
    private router: Router,
    private urlEncode: UrlEncode,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {}

  createPost(): void {
    this.error = "";
    this.postService
      .createPost(this.convertToFormData(this.createPostForm.value))
      .subscribe(
        (post: PostDisplay) => {
          const title = this.urlEncode.transform(post.title);
          this.router.navigate([`../${title}`], {
            relativeTo: this.activatedRoute,
          });
        },
        (err) => {
          err = err.error;
          console.error(err);
          if ("message" in err) {
            this.error = err.message;
          } else {
            this.error = "Internal error.";
          }
        }
      );
  }

  convertToFormData(createPostFormValue: any) {
    const data = new FormData();
    Object.keys(createPostFormValue).forEach((key) =>
      data.append(key, createPostFormValue[key])
    );

    return data;
  }

  goBack() {
    this.location.back();
  }
}
