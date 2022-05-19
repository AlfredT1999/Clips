import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Your account is being created.'
  inSubmission = false

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  async register() {
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your account is being created.'
    this.inSubmission = true

    const { email, password } = this.registerForm.value

    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(email, password)
      
      await this.db.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value
      })
    } 
    catch (error) {
      console.error(error)

      this.alertMsg = 'An unexpected error occurred. Please try again later!'
      this.alertColor = 'red'
      this.inSubmission = false

      return
    }

    this.alertMsg = 'Your account has been created!'
    this.alertColor = 'green'
  }
}
