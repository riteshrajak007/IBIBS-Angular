import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    selectedCountry: String = "--Choose Country--";
    selectedState: String = "--Choose State--";
    selectedBranch: String = "--Choose Branch--";

    
    
    tomorrow = new Date(2003, 1, 1);
    yesterday = new Date(1925, 1, 14);
  
	Countries: Array<any> = [
		{ name: 'Germany', states: [ {name: 'Munich', branches: ['Duesseldorf Branch', 'Leinfelden-Echterdingen Branch', 'Eschborn Branch']} ] },
		{ name: 'Spain', states: [ {name: 'Lisbon', branches: ['Barcelona Branch']} ] },
		{ name: 'USA', states: [ {name: 'Texas', branches: ['Downers Grove Branch']} ] },
		{ name: 'Mexico', states: [ {name: 'Mexico City', branches: ['Puebla Branch']} ] },
		{ name: 'India', states: [ {name: 'West Bengal', branches: ['HowrahBranch', 'KolkataBranch', 'Hooghlybranch', 'NewTownBranch']} ] },
    ];
    
    Citizenships: Array<any> = [
		{ name: 'Geramnian'},
		{ name: 'Spainish' },
		{ name: 'American' },
		{ name: 'Mexican'},
		{ name: 'Indian' },
    ];
    
    AccountTypes: Array<any> = [
		{ name: 'Savings'},
		{ name: 'Salary' },
    ];

    Genders: Array<any> = [
		{ name: 'Male'},
		{ name: 'Female' },
    ];
    
    GuardianTypes: Array<any> = [
		{ name: 'Father'},
		{ name: 'Mother' },
		{ name: 'Husband' },
		{ name: 'Wife'},
		{ name: 'Other' },
    ];
  
    MaritalStatuses: Array<any> = [
		{ name: 'Single'},
		{ name: 'Married' },
		{ name: 'Divorced' },
    ];

    IdProofTypes: Array<any> = [
		{ name: 'Aadhar Card'},
		{ name: 'PAN' },
		{ name: 'Voter ID' },
		{ name: 'Passport'},
		{ name: 'Drving License' },
    ];

	states: Array<any>;

	branches: Array<any>;
	
	onChangeCountry(country) {
        this.states = this.Countries.find(cntry => cntry.name == country).states;
    }
    
    onChangeState(state) {
        console.log(this.selectedState);
		this.branches = this.Countries.find(cntry => cntry.name == this.selectedCountry).states.find(stat => stat.name == state).branches;
    }

    onChangeAccountType(e) {
        let amount: string;
        if(e === 'Savings')
        {
            amount = "5000";
        }
        else if(e === 'Salary')
        {
            amount = "0";
        }
        else{ amount = "" }
        this.InitialDepositAmount.setValue(amount , {
            onlySelf: false
            })
      }

      

    
    @Output() 
    dateChange:EventEmitter<MatDatepickerInputEvent<any>>;

    ageFromDateOfBirthday(dateOfBirth: any): number {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if(age > 60)
        {
            this.CitizenStatus.setValue('Senior Citizen' , {
                onlySelf: false
                })
        }
        else if(age < 18)
        {
            this.CitizenStatus.setValue('Minor' , {
                onlySelf: false
                })
        }
        else
        {
            this.CitizenStatus.setValue('Normal' , {
                onlySelf: false
                })
        }
        this.Age.setValue(age , {
            onlySelf: false
            })
        return age;
      }

    get CitizenStatus() {
        return this.form.get('citizenstatus');
     }

     get InitialDepositAmount() {
        return this.form.get('initialDepositAmount');
     }

     get Age() {
        return this.form.get('age');
     }
     
    

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
       
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)]],
            lastName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)]],
            username: ['', Validators.required],
            password: ['', passwordValidators],

            accountType: ['', Validators.required],
            initialDepositAmount: ['', Validators.required],
            
           
            branchName: ['', Validators.required],
            country: ['', Validators.required],
            
            email: ['', [Validators.required,Validators.email]],
            contact: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],

            state: ['', Validators.required],
            refAccountholderAccountNumber: ['', Validators.required],

            gender: ['', Validators.required],
            maritalStatus: ['', Validators.required],
           
            idProofType: ['', Validators.required],
            idDocNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/)]],

            refAccountholderAccountName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)]],
            refAccountholderAddress: ['', Validators.required],

            guardianType: ['', Validators.required],
            guardianName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)]],

            address: ['', Validators.required],
            dob: ['', Validators.required],
            age: ['', Validators.required],

            citizenship: ['', Validators.required],
            citizenstatus: ['', Validators.required],
            
            customerId : this.accountService.customerId,
            registrationDate: this.accountService.registrationDate,
            accountNumber: this.accountService.accountNumber,
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x)
                });
        }
    }

    // Getter method to access formcontrols
    get State() {
        return this.form.get('state');
     }   

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        console.log(this.form.value);
        this.accountService.update(this.id, this.form.value)
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