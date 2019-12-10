import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPostByTitle('My First Post').subscribe((data: Post) => {
      this.post = data;
    })
  }

}
