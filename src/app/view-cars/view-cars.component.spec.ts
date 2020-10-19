import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ViewCarsComponent } from './view-cars.component';

describe('WeatherInqueryComponent', () => {
  let component: ViewCarsComponent;
  let fixture: ComponentFixture<ViewCarsComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all the cars inforation', () => {
    el = fixture.debugElement.query(By.css('.view-cars-container')).nativeElement;
    expect(el).not.toBeNull;
  });

  it('should show popup window when click update', () => {
    el = fixture.debugElement.query(By.css('.view-cars-container #cars-upt')).nativeElement;
    el.click();
    expect(fixture.debugElement.query(By.css('.modal')).nativeElement).not.toBeNull;
  });

  it('should show warning message when click delele', () => {
    el = fixture.debugElement.query(By.css('.view-cars-container #cars-del')).nativeElement;
    el.click();
    expect(document.querySelector('#confirm-window').textContent).toContain('Are you sure to delete');
  });

  it('should show popup window when click add new car', () => {
    el = fixture.debugElement.query(By.css('.btn-success')).nativeElement;
    el.click();
    expect(fixture.debugElement.query(By.css('.modal')).nativeElement).not.toBeNull;
  });
});
