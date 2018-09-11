import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services';
import { Bike } from '../bike';
import { BikeService } from '../shared/services';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit, OnDestroy {

  bike = new Bike();
  bikes: Bike[] = [];
  sub: Subscription;

  public currUserId: string;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currUserId = this.authService.getUserId();
    this.sub = this.bikeService.getBikes().subscribe(bikes => {
      this.bikes = bikes;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    // console.log('submitting form', this.bike);
    this.bike.ownerId = this.authService.getUserId();
    // console.log(this.bike.ownerId);
    this.sub = this.bikeService.createBike(this.bike)
      .subscribe(bike => {
        console.log('bike from api', bike);
        form.resetForm();
        // update bikes list
        this.sub = this.bikeService.getBikes().subscribe(bikes => {
          this.bikes = bikes;
        });
        this.router.navigateByUrl('/bikes');
      });
  }

  onUpdate(bikeToUpdate: Bike) {
    console.log('updating bike', bikeToUpdate._id);
    this.sub = this.bikeService.updateBike(bikeToUpdate._id, bikeToUpdate)
      .subscribe(bike => {
        console.log('update this bike from api', bike);
        // update bike list
        this.sub = this.bikeService.getBikes().subscribe(bikes => {
          this.bikes = bikes;
        });
      });
  }

  onDelete(bikeToDelete: Bike) {
    // console.log('deleting bike', bikeToDelete);
    this.bikeService.deleteBike(bikeToDelete)
      .subscribe(deletedBike => {
        // console.log('deleted bike', deletedBike);
        this.bikes = this.bikes.filter(bike => bike._id !== deletedBike._id);
      });
  }

}

