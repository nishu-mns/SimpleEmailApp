import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrl: './email-compose.component.css'
})
export class EmailComposeComponent {
  emailData = {
    to: '',
    name:'',
    password: '',
    flag: "0"
  };

  constructor(private http: HttpClient) { }

  // function to request backend
  sendEmail(data:any): Observable<any> {
    // console.log("Request..")
    console.log(this.emailData);
    return this.http.post<any>('https://localhost:7283/api/Email', this.emailData);
  }

  onSubmit(formdata:NgForm) {
    if(formdata.form.valid){
    
    this.sendEmail(formdata.form.value).subscribe(
      response => {
        console.log('Email sent successfully:', response);
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
      alert("Please enter valid credentials");
    }
  }
}