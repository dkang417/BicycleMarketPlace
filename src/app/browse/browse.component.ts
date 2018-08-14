import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bike } from '../bike';
import { User } from '../user';
import { AuthService } from '../shared/services';
import { BikeService } from '../shared/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {

  bikes: Bike[] = [];
  sub: Subscription;
  authed: boolean;

  display = 'none';

  contact = {
    firstname: '',
    lastname: '',
    email: ''
  };
  filter = '';

  public currUserId: string;

  constructor(
    private bikeService: BikeService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // gets current loggedin user
    this.currUserId = this.auth.getUserId();

    // gets all bikes
    this.sub = this.bikeService.getBikes().subscribe(bikes => {
      this.bikes = bikes;
    });

    this.auth.authorized$.subscribe(authed => (this.authed = authed));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClick(event: Event) {
    event.stopPropagation();
    console.log('stop prop', event);
  }
  onDelete(bikeToDelete: Bike) {
    console.log('deleting bike', bikeToDelete);
    this.bikeService.deleteBike(bikeToDelete)
      .subscribe(deletedBike => {
        console.log('bye bye bike', deletedBike);
        this.bikes = this.bikes.filter(bike => bike._id !== deletedBike._id);
      });
  }

  // Modal
  openModal(ownerId: string) {
    this.display = 'block';
    console.log('contact id: ', ownerId);
    const observer = this.auth.getContact(ownerId);
    observer.subscribe(
      (response) => {
        console.log('get contact', response);
        this.contact = response;
        // console.log('firstname: ', this.contact[0].firstname);
        // console.log('lastname: ', this.contact[0].lastname);
        // console.log('email: ', this.contact[0].email);
      },
      (Error) => {
        console.log('error', Error);
      });
  }
  onCloseHandled() {
    this.display = 'none';
    this.contact = { firstname: '', lastname: '', email: '' };
  }


}

