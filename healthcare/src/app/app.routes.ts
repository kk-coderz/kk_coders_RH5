import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [{
  path : "",
  component : LoginComponent
},
{
  path : "form",
  component : FormComponent
},{
  path : "dashboard",
  component : DashboardComponent
}
];
