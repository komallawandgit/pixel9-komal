import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators,FormBuilder,AbstractControl,FormArray} from '@angular/forms';
import {  ValidationErrors,ValidatorFn } from '@angular/forms';
import{ApiCallServiceService} from '../api-call-service.service';
import { from } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  styleUrls: ['./personal-loan.component.css'],
  providers: [ApiCallServiceService],
  
})
export class PersonalLoanComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false; 
  otpAPI:boolean= false;
  reset:boolean=true;
  subscription: Subscription;
  otpcnt:number=0;
  hidelink:boolean=true;
  spin:boolean=false;
  constructor(private formBuilder: FormBuilder,private api:ApiCallServiceService,private route:Router) { }
  ngOnInit() {
        this.registerForm = this.formBuilder.group({
          city: ['', Validators.required],
          panNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]],
          fullname: ['',[Validators.required,Validators.maxLength(140)]],
          email:['',[Validators.required,Validators.email,Validators.maxLength(255)]],
          mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
          otp: ['']
        },
      );
  }

  getOtp(){
    let obj={
      "panNumber": this.registerForm.controls.panNumber.value,
      "city": this.registerForm.controls.city.value,
      "fullname": this.registerForm.controls.fullname.value,
      "email": this.registerForm.controls.email.value,
      "mobile": this.registerForm.controls.mobile.value
    }
    this.spin=true; //spinner start
    this.api.getOtp(obj).subscribe(res => {
      if(res.status=="Success"){
        this.spin=false; //spinner stop
        this.otpAPI=true;
        const otp = <FormControl>this.registerForm.get('otp');
        otp.setValidators([Validators.required,Validators.maxLength(4),Validators.pattern("^[0-9]*$") ])
        otp.updateValueAndValidity();
        setTimeout(()=>{
        this.reset=false;
        },180000) // for 3 minutes 
      }
    });
  }
  veryfyOtp(){
    let body={
       "mobile":this.registerForm.controls.mobile.value,
       "otp":this.registerForm.controls.otp.value
    }
     if (this.registerForm.invalid) {
      return;
     }else{
       this.api.verifyOtp(body).subscribe(res => {
          if(res.status=="Success"){
          this.route.navigate([`displayComp`])
            alert("Thank you for verification" +this.registerForm.controls.fullname.value)
          }
        });
    }
  }
  otpCount(){
    this.otpcnt=this.otpcnt+1;
    if(this.otpcnt > 3){
      this.hidelink=false;
      alert('Please try again after an hour.')
      setTimeout(()=>{
        this.reset=false;
        this.hidelink=true;
      },3600000) //for 1 hour 
      this.otpcnt=0; 
    }
    else{
     this.getOtp();
    }
  }
  get f() { return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;
      if (this.registerForm.invalid) {//check form validation
            return;
      }
      this.getOtp(); //getOtp function call
  }

}
