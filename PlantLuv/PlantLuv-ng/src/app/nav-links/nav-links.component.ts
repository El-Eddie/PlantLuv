import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { displayUserPants, displayPlantTypes } from '../store/nav-state';
import { Observable, concat } from 'rxjs';
import { Router } from '@angular/router'
import { TitleCasePipe, JsonPipe } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent implements OnInit {

  page$: Observable<string>;

  constructor(
    private store: Store<{page: string}>,
    private router: Router
  ) {
    this.page$ = store.pipe(select('page'));
  }

  ngOnInit(): void {
    // let linkID = this.getCurrentPageID(window.location.pathname);
    // let page = linkID == '/' ? 'userPlantsLink' : linkID;
    // this.selectLink(page)
  }

  displayUserPants(event){
    this.store.dispatch(displayUserPants());
    this.router.navigate(['./dashboard/user-plants']).then(() =>
    {
      this.selectLink(event.srcElement.id)
    })
  }
  displayPlantTypes(event){
    this.store.dispatch(displayPlantTypes());
    this.router.navigate(['./dashboard/care-sheets']).then(() =>
    {
      this.selectLink(event.srcElement.id)
    })
  }
  displayAdminPage(event){
    // this.selectLink(event.srcElement.id)
  }

  selectLink(selected: string){
    var links = document.getElementsByClassName("nav-link")
    for (let i = 0; i < links.length; i++){
      links[i].classList.remove("selected-link")
    }
    if (selected){
      document.getElementById(selected).classList.add("selected-link");
    }
  }

  getCurrentPageID(url): string | null {
    var path: string = url.substr(url.indexOf('/', 1)+1);
    if (!path) { return null; }

    if (path.includes('/')){
      path = path.substr(0, path.indexOf('/'));
    }

    var linkID: string = ''
    var pathSegments = path.split('-');

    pathSegments.forEach((n,i) =>
    {
      if (i) {
        linkID = linkID.concat(n[0].toUpperCase(), n.substr(1));
      } else {
        linkID = linkID.concat(n);
      }
    })

    linkID = linkID.concat('Link');
    return linkID;
  }
}
