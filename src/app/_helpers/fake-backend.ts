import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { Loan } from '../_models';

// array in local storage for registered users
const usersKey = 'users-key';
const loansKey = 'loans-key';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
let loans = JSON.parse(localStorage.getItem(loansKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                   
                    case url.endsWith('/loans/add') && method === 'POST':
                        return registerLoan();
                    case url.endsWith('/loans') && method === 'GET':
                        return getLoans();
                    case url.match(/\/loans\/\d+$/) && method === 'GET':
                        return getLoanById();
                    case url.match(/\/loans\/\d+$/) && method === 'PUT':
                        return updateLoan();
                    case url.match(/\/loans\/\d+$/) && method === 'DELETE':
                        return deleteLoan();

                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions
        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }
            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            user.customerId =  user.id > 9 ? 'R-1' + user.id : 'R-10' + user.id;
            user.registrationDate = new Date();
            user.accountNumber = user.id > 9 ? '50003214002000' + user.id : '500032140020000' + user.id;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function registerLoan() {
            const loan = body
            loan.id = loans.length ? Math.max(...loans.map(x => x.id)) + 1 : 1;
            loans.push(loan);
            localStorage.setItem(loansKey, JSON.stringify(loans));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getLoans() {
            if (!isLoggedIn()) return unauthorized();
            return ok(loans.map(x => basicLoanDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function getLoanById() {
            if (!isLoggedIn()) return unauthorized();

            const loan = loans.find(x => x.id === idFromUrl());
            loan.id = idFromUrl();
            return ok(basicLoanDetails(loan));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function updateLoan() {
            if (!isLoggedIn()) return unauthorized();

            let toupdateid = idFromUrl();
            let params = body;
            let loan = loans.find(x => x.id === idFromUrl());
            params.id = toupdateid;

            // update and save user
            Object.assign(loan, params);
            localStorage.setItem(loansKey, JSON.stringify(loans));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function deleteLoan() {
            if (!isLoggedIn()) return unauthorized();

            loans = loans.filter(x => x.id !== idFromUrl());
            localStorage.setItem(loansKey, JSON.stringify(loans));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user) {
            const { id, username, firstName, lastName, customerId , age, accountNumber, state, country, email, contact, registrationDate, accountType, branchName, initialDepositAmount, idProofType, idDocNumber, gender, maritalStatus, refAccountholderAccountNumber, refAccountholderAccountName,refAccountholderAddress,guardianType, guardianName, address, citizenship, dob,citizenstatus } = user;
            return { id, username, firstName, lastName, customerId, age, accountNumber, state, country, email, contact, registrationDate, accountType, branchName, initialDepositAmount, idProofType, idDocNumber, gender, maritalStatus, refAccountholderAccountNumber, refAccountholderAccountName,refAccountholderAddress,guardianType, guardianName, address, citizenship, dob, citizenstatus };
        }

        function basicLoanDetails(loan) {
            const { id, loanType, loanAmount, roi, duration, userName, applyDate, accountHolder  } = loan;
            return { id, loanType, loanAmount, roi, duration, userName, applyDate, accountHolder };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};