import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PredictComponent } from './components/predict/predict.component';
import { RegisterComponent } from './components/register/register.component';
import { isAuthGuard } from './services/is-auth.guard';

export const routes: Routes = [{
  path : "",
  component : LoginComponent
},
{
  path : "form",
  component : FormComponent
},{
  path : "dashboard",
  component : DashboardComponent,
  canActivate : [isAuthGuard]
},{
  path : "predict",
  component : PredictComponent
},{
  path: "register",
  component : RegisterComponent
}
];
