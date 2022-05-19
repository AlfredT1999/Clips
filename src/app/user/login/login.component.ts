import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! We are logging you in.'
  inSubmission = false

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! We are logging you in.'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } 
    catch (error) {
     console.error(error)  
     this.inSubmission = false
     this.alertMsg = 'An unexpected error occurred. Please try again later!.'
     this.alertColor = 'red'

     return
    }

    this.alertColor = 'green'
    this.alertMsg = 'You are succesfully logged in!!.'
  }
}
