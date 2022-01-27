import { Component, OnInit } from '@angular/core';
//import { Post, DATA } from '../../data/posts.data';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  username ="hhh";
  totalPosts: any;
  allPosts = [ { name: 'Product 01', groupID: '50303', delivery: 'mail'},
   { name: 'Product 02', groupID: '50403', delivery: 'bike'} ];
  deletePost(index: number) {
    console.log(" before deleted " + this.allPosts);
    this.allPosts.splice(index, 1);
    console.log("deleted " + this.allPosts);
  }

  constructor() { 
    
  }

  ngOnInit(): void {
    this.totalPosts = this.allPosts.length;
  }

}