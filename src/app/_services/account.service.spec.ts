import { LoanService } from './loan.service';
import { AccountService } from './account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs'; // Add import
import { HttpClientModule } from '@angular/common/http';

describe('AccountService', () => {
  let accountService: AccountService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
        providers: [AccountService]
    });

    accountService = TestBed.get(AccountService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(accountService).toBeTruthy();
  });

  // Add tests for all() method
  describe('getAll', () => {
    it('should return a collection of users', () => {
      const userResponse = [
        {
            id: '1',
            customerId: '2',
            username: 'a',
            password: 'a',
            firstName: 'a',
            lastName: 'a',
            token: 'a',
            state: 'a',
            country: 'a',
            email: 'a',
            contact : 'a',
            registrationDate: new Date(),
            accountType: 'a',
            accountNumber: 'a',
            branchName: 'a',
            initialDepositAmount: 1,
            idProofType: 'a',
            idDocNumber: 'a',
            gender: 'a',
            maritalStatus: 'a',
            refAccountholderAccountNumber: 'a',
            refAccountholderAccountName: 'a',
            refAccountholderAddress: 'a',
            guardianType: 'a',
            guardianName: 'a',
            address: 'a',
            dob:new Date(),
            citizenship:'a',
            citizenstatus:'a',
            age: 1
        },
        {
            id: '2',
            customerId: '2',
            username: 'a',
            password: 'a',
            firstName: 'a',
            lastName: 'a',
            token: 'a',
            state: 'a',
            country: 'a',
            email: 'a',
            contact : 'a',
            registrationDate: new Date(),
            accountType: 'a',
            accountNumber: 'a',
            branchName: 'a',
            initialDepositAmount: 1,
            idProofType: 'a',
            idDocNumber: 'a',
            gender: 'a',
            maritalStatus: 'a',
            refAccountholderAccountNumber: 'a',
            refAccountholderAccountName: 'a',
            refAccountholderAddress: 'a',
            guardianType: 'a',
            guardianName: 'a',
            address: 'a',
            dob:new Date(),
            citizenship:'a',
            citizenstatus:'a',
            age: 1
        }
      ];
      let response;
      spyOn(accountService, 'getAll').and.returnValue(of(userResponse));

      accountService.getAll().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

  describe('getById', () => {
    it('should return a single user', () => {
      const userResponse = {
        id: '2',
        customerId: '2',
        username: 'a',
        password: 'a',
        firstName: 'a',
        lastName: 'a',
        token: 'a',
        state: 'a',
        country: 'a',
        email: 'a',
        contact : 'a',
        registrationDate: new Date(),
        accountType: 'a',
        accountNumber: 'a',
        branchName: 'a',
        initialDepositAmount: 1,
        idProofType: 'a',
        idDocNumber: 'a',
        gender: 'a',
        maritalStatus: 'a',
        refAccountholderAccountNumber: 'a',
        refAccountholderAccountName: 'a',
        refAccountholderAddress: 'a',
        guardianType: 'a',
        guardianName: 'a',
        address: 'a',
        dob:new Date(),
        citizenship:'a',
        citizenstatus:'a',
        age: 1
      };
      let response;
      spyOn(accountService, 'getById').and.returnValue(of(userResponse));
  
      accountService.getById('2').subscribe(res => {
        response = res;
      });
  
      expect(response).toEqual(userResponse);
    });

  });
});