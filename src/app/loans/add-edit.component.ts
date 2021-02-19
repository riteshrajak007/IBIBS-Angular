import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoanService, AlertService , AccountService} from '../_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    Loanform: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loanService: LoanService,
        private alertService: AlertService,
        private accountService: AccountService
    ) {}

   tomorrow = new Date();
    // Choose loan using select dropdown
  onChangeLoan(e) {
    let rate: string;
    if(e.target.value === 'Personal')
    {
        rate = "13"
    }
    else if(e.target.value === 'Home')
    {
        rate = "7"
    }
    else if(e.target.value === 'Education')
    {
        rate = "6"
    }
    else{ rate = "" }
    this.IntrestRate.setValue(rate , {
        onlySelf: false
        })
  }
    
      // Getter method to access formcontrols
     get LoanName() {
        return this.Loanform.get('loanType');
     }
     
      // Getter method to access formcontrols
      get IntrestRate() {
        return this.Loanform.get('roi');
     }   

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
        
        
        this.Loanform = this.formBuilder.group({
            loanType: ['', Validators.required],
            loanAmount: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
            roi: ['', Validators.required],
            duration: ['', Validators.required],
            userName: this.accountService.userValue.username,
            applyDate: ['', Validators.required],
            accountHolder: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)]],
            id: this.id
        });
       

        if (!this.isAddMode) {
            this.loanService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.Loanform.patchValue(x));

        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.Loanform.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.Loanform.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createLoan();
        } else {
            this.updateLoan();
        }
    }

    private createLoan() {
        console.log(this.Loanform.value);
        this.loanService.register(this.Loanform.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Loan applied successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateLoan() {
        console.log(this.Loanform.value);
        this.loanService.update(this.id, this.Loanform.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}