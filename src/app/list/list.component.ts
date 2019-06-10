import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import $ from 'jquery';
import { Book } from '../book';
import { Category } from '../category';
import { books } from '../mock-books';
import { categories } from '../mock-categories';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: Book[] = books;
  categories: Category[] = categories;
  selectedCategory: Category;
  selectedbooks: Book[] = [];
  selectedbook: Book;
  safeSrc: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk");
   }

  ngOnInit() {
  }

  onCategorySelect(index: number) {
    // let book = _.find(this.books, {id : id});
    // this.selectedCategory = categories[index];
    if ($("#book" + index).hasClass('show')) {
      $("#book" + index).removeClass('show');
    }
    else {
      this.closeCategory();
      $("#book" + index).addClass('show');
      this.filterBooks(categories[index].name);
    }
  }
  onBookSelect(index) {
    this.selectedbook = this.selectedbooks[index];
    this.router.navigate(['/book', this.selectedbook.id]);
  }
  closeCategory() {
    for (let index = 0; index < this.categories.length; index++) {
      $("#book" + index).removeClass('show');
    }
  }

  filterBooks(category: string) {
    if (category == null || category == '') {
      this.selectedbooks = this.books;
    }
    else {
      this.selectedbooks = this.books.filter(element => {
        return element.category.includes(category);
      })
    }
  }

}