import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LoanService, AccountService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    loans = null;
    
    constructor(private loanService: LoanService, private accountService: AccountService) {}
    
    ngOnInit() {
        this.loanService.getAll()
            .pipe(first())
            .subscribe(loans => this.loans = loans.filter(x => x.userName === this.accountService.currentUser.username));
    }

    deleteLoan(id: string) {
        const loan = this.loans.find(x => x.id === id);
        loan.isDeleting = true;
        this.loanService.delete(id)
            .pipe(first())
            .subscribe(() => this.loans = this.loans.filter(x => x.id !== id));
    }
}