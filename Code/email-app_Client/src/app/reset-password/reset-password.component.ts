import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css' // Typo: should be styleUrls instead of styleUrl
})

export class ResetPasswordComponent {
  // Object to hold email data
  emailData = {
    to: '',
    name:'',
    password: '',
    flag:"1" // Flag for identifying password reset request
  };

  constructor(private http: HttpClient, private router:Router) { }

  // Function to navigate back to the home page
  onback(){
    this.router.navigate(['/']);
  }

  // Function to send email using HTTP POST request
  sendEmail(data:any): Observable<any> {
    console.log("Request..") // Log request initiation
    console.log(this.emailData); // Log the email data before sending
    return this.http.post<any>('https://localhost:7283/api/Email', this.emailData); // Send email data to backend API
  }

  // Function to handle form submission
  onSubmit(formdata:NgForm) {
    if(formdata.form.valid){ // Check if the form is valid
      // Call sendEmail function and subscribe to the Observable
      this.sendEmail(formdata.form.value).subscribe(
        response => {
          console.log('Email sent successfully:', response); // Log success response
          // Clear emailData object and display success alert
          this.emailData = {
            to: '',
            name:'',
            password: '',
            flag:"1"
          };
          alert("Email has been sent.");
          // Optionally, display a success message or redirect to a different page
        },
        error => {
          console.error('Error sending email:', error); // Log error response
          // Optionally, display an error message
        }
      );
    } else {
      alert("please enter valid credentials"); // Alert user to enter valid credentials if form is invalid
    }
  }
}
