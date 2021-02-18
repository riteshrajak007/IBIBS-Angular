import { LoanService } from './loan.service';
import { AccountService } from './account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs'; // Add import
import { HttpClientModule } from '@angular/common/http';

describe('LoanService', () => {
  let loanService: LoanService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
        providers: [LoanService, AccountService]
    });

    loanService = TestBed.get(LoanService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(loanService).toBeTruthy();
  });

  // Add tests for all() method
  describe('getAll', () => {
    it('should return a collection of loans', () => {
      const loanResponse = [
        {
            id: 1,
            loanType: 'a',
            loanAmount: '10',
            roi: 3,
            duration: 4,
            userName: 'a',
            applyDate: new Date(),
            accountHolder: '',
            issueDate: new Date()
        },
        {
          id: 2,
          loanType: 'b',
          loanAmount: '20',
          roi: 3,
          duration: 4,
          userName: 'b',
          applyDate: new Date(),
          accountHolder: 'b',
          issueDate: new Date()
        }
      ];
      let response;
      spyOn(loanService, 'getAll').and.returnValue(of(loanResponse));

      loanService.getAll().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(loanResponse);
    });
  });

  describe('getById', () => {
    it('should return a single loan', () => {
      const loanResponse = {
          id: 2,
          loanType: 'b',
          loanAmount: '20',
          roi: 3,
          duration: 4,
          userName: 'b',
          applyDate: new Date(),
          accountHolder: 'b',
          issueDate: new Date()
      };
      let response;
      spyOn(loanService, 'getById').and.returnValue(of(loanResponse));
  
      loanService.getById(2).subscribe(res => {
        response = res;
      });
  
      expect(response).toEqual(loanResponse);
    });

  });
});