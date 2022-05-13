import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [
    AuthModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  // Everytime that we create a new modal, all the new 
  // components related to the modal needs to be exported to 
  // the app.module.ts:
  exports: [
    AuthModalComponent
  ]
})
export class UserModule { }
