import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cars } from '../interface/cars.interface';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
    @Input() 
    uptCarsInfo;

    @Input()
    isUpdt;

    @Input()
    newId;
    
    @Output() 
    close = new EventEmitter<string>();
    
    @Output()
    updatedCarsdata: EventEmitter<Cars> = new EventEmitter<Cars>();

    @Output()
    needUpdate: EventEmitter<any> = new EventEmitter();
    
    carData: Cars;
    id: number;

    ngOnInit() {
        this.id = this.newId;
        this.carData = !this.uptCarsInfo ? {} : this.uptCarsInfo; 
        if (this.id >= 0) {
            this.carData['id'] = this.id;
        }
    }

    ok(updtData?: Cars) {
        this.needUpdate.emit(this.isUpdt);
        this.updatedCarsdata.emit(updtData);
        this.close.emit();
    }

    cancel() {
        this.close.emit(null);
    }

}
