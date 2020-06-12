import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { displayUserPants, displayPlantTypes } from '../store/nav-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent implements OnInit {

  page$: Observable<string>;

  constructor(
    private store: Store<{page: string}>
  ) {
    this.page$ = store.pipe(select('page'));
  }

  ngOnInit(): void {
  }

  displayUserPants(event){
    this.store.dispatch(displayUserPants());
    this.selectLink(event.srcElement.id)
  }
  displayPlantTypes(event){
    this.store.dispatch(displayPlantTypes());
    this.selectLink(event.srcElement.id)
  }
  displayAdminPage(event){
    this.selectLink(event.srcElement.id)
  }

  selectLink(selected){
    var links = document.getElementsByClassName("nav-link")
    for (let i = 0; i < links.length; i++){
      links[i].classList.remove("selected-link")
    }
    document.getElementById(selected).classList.add("selected-link");
  }
}
