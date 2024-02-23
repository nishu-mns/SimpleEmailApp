import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrl: './email-compose.component.css'
})

 // Object to hold email data
export class EmailComposeComponent {
  emailData = {
    to: '',
    name:'',
    password: '',
    flag: "0"
  };

  constructor(private http: HttpClient, private router:Router) { }

   // Function to navigate to the reset password page
  onReset(){
    this.router.navigate(['/reset']);
  }

  // Function to send email using HTTP POST request
  sendEmail(data:any): Observable<any> {
    // console.log("Request..")
    console.log(this.emailData);
    return this.http.post<any>('https://localhost:7283/api/Email', this.emailData);
  }

  // Function to handle form submission
  onSubmit(formdata:NgForm) {
    if(formdata.form.valid){ // Check if the form is valid
      // Call sendEmail function and subscribe to the Observable
    this.sendEmail(formdata.form.value).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        // Clear emailData object and display success alert
        this.emailData = {to: '',
        name:'',
        password: '',
        flag: "0"};
        alert("Email has been sent.");
      },
      error => {
        console.error('Error sending email:', error);
      }
    );}
    else{
      alert("Please enter valid credentials");// Alert user to enter valid credentials if form is invalid
    }
  }
}