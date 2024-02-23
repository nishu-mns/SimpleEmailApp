import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent {
  emailData = {
    to: '',
    name:'',
    password: '',
    flag:"1"
  };

  constructor(private http: HttpClient) { }

  sendEmail(data:any): Observable<any> {
    console.log("Request..")
    console.log(this.emailData);
    return this.http.post<any>('https://localhost:7283/api/Email', this.emailData);
  }

  onSubmit(formdata:NgForm) {
    if(formdata.form.valid){
    
    this.sendEmail(formdata.form.value).subscribe(
      response => {
        console.log('Email sent successfully:', response);
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
        console.error('Error sending email:', error);
        // Optionally, display an error message
      }
    );}
    else{
      alert("please enter valid credentials");
    }
  }
}