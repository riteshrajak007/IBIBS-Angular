import { AlertService } from './alert.service';
import { AccountService } from './account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs'; // Add import
import { HttpClientModule } from '@angular/common/http';

describe('AlertService', () => {
  let alertService: AlertService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
        providers: [AlertService, AccountService]
    });

    alertService = TestBed.get(AlertService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(alertService).toBeTruthy();
  });
});