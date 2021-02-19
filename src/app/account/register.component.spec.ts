import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { AccountService } from '../_services/account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('RegisterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule, HttpClientTestingModule, ReactiveFormsModule
      ],
      declarations: [
        RegisterComponent
      ],
      providers: [
          AccountService, AlertService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});