import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo, AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';

const redirectToHome = () => redirectUnauthorizedTo(['/'])
const routes: Routes = [
  { 
    path: 'manage', 
    component: ManageComponent, 
    data: { 
      authOnly: true,
      authGuardPipe: redirectToHome
    },
    canActivate: [AngularFireAuthGuard]
  },
  { 
    path: 'upload', 
    component: UploadComponent, 
    data: { 
      authOnly: true,
      authGuardPipe: redirectToHome
    },
    canActivate: [AngularFireAuthGuard]
  },
  { path: 'manage-clips', redirectTo: 'manage'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }

