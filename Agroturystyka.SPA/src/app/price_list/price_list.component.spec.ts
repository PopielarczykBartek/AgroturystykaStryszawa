/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Price_listComponent } from './price_list.component';

describe('Price_listComponent', () => {
  let component: Price_listComponent;
  let fixture: ComponentFixture<Price_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Price_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Price_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
