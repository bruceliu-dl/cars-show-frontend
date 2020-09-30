import { Component, OnInit } from '@angular/core';
import { ViewCarsService } from '../service/view-cars.service';
import { Cars } from '../interface/cars.interface';

@Component({
  selector: 'view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.scss']
})
export class ViewCarsComponent implements OnInit {
  tableRowHeader: any;
  carsInfor: any;
  columnName :string[] = [];
  showModal: boolean = false;
  uptCarsInfo: any;
  newId: number;
  isUpdt: boolean = false;
  needToUpdt: boolean = false;

  constructor( private _viewCarsService: ViewCarsService ) { 
    this.tableRowHeader = ["id", "brand", "market time", "maker", "made year", "price"];
    this.columnName = ['id', 'brand', 'year', 'maker', 'makerYear', 'price'];
  }

  ngOnInit(): void {
    //retrieve all cars infor from backend
    this._viewCarsService.getAllCars().subscribe(d => {
      this.carsInfor = d;
    });
  }

  //delete one car by id
  public removeCar(carData: Cars) {
    if(confirm("Are you sure to delete " + carData.brand)) {
      //execute delete operation
      this._viewCarsService.deleteCarById(Number(carData.id)).subscribe(d => {
        this.carsInfor = d;
      });
    }
  }

   //update one car
   public updateCarsInfor(uptedCarsData: Cars) {
     if(this.needToUpdt) {
      this._viewCarsService.updateCarById(uptedCarsData.id, uptedCarsData).subscribe(d => {
        this.carsInfor = d;
      })
     } else {
        //execute add a new car 
        this._viewCarsService.addNewCar(uptedCarsData).subscribe(d => {
          this.carsInfor = d;
        })
     }
  }

  //set new car id when add a car
  public setNewCarId() {
    let idsArray = this.carsInfor.map(d => d.id)
    this.newId = Math.max(...idsArray) + 1;
    this.isUpdt = false;
    this.showModal = true;
  }

  public setUpdtFlag(event) {
    this.needToUpdt = event;
  }

  //open modal window
  public showModalPopup(carData?: Cars) {
    this.showModal = true;
    this.uptCarsInfo = carData;
    this.isUpdt = true;
  }

  //close modal widnow
  public closeModalPopup() {
    this.showModal = false;

  }
}
