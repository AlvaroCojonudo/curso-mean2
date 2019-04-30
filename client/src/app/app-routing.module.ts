import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: DahsboardComponent,    
  },
  {
    path: 'mis-datos',
    component: UserEditComponent,    
  },
  {
    path: '**',
    component: ErrorComponent,    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
