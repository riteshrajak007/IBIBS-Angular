import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Loan } from '../_models';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class LoanService {
    private loanSubject: BehaviorSubject<Loan>;
    public loan: Observable<Loan>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private accountService: AccountService
    ) {
        this.loanSubject = new BehaviorSubject<Loan>(JSON.parse(localStorage.getItem('loan')));
        this.loan = this.loanSubject.asObservable();
    }

    public get loanValue(): Loan {
        return this.loanSubject.value;
    }

    register(loan: Loan) {
        return this.http.post(`${environment.apiUrl}/loans/add`, loan);
    }

    getAll() {
        return this.http.get<Loan[]>(`${environment.apiUrl}/loans`);
    }

    getById(id: number) {
        return this.http.get<Loan>(`${environment.apiUrl}/loans/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/loans/${id}`, params)
            .pipe(map(x => {
                // update stored loan if the logged in user updated their own record
                    params.username = this.accountService.currentUser.username;
                    // update local storage
                    const loan = { ...this.loanValue, ...params };
                    console.log(loan);
                    localStorage.setItem('loan', JSON.stringify(loan));
               
                    // publish updated loan to subscribers
                    this.loanSubject.next(loan);
                
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/loans/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}