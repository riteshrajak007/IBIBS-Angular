import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './Home.component';
import { AccountService } from '../_services/account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule, HttpClientTestingModule, ReactiveFormsModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
          AccountService, AlertService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});