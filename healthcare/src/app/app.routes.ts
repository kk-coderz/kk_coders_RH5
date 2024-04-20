import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PredictComponent } from './components/predict/predict.component';
import { RegisterComponent } from './components/register/register.component';
import { isAuthGuard } from './services/is-auth.guard';
import { ResourcesComponent } from './components/resources/resources.component';

export const routes: Routes = [{
  path : "",
  component : LoginComponent,
},
{
  path : "form",
  component : FormComponent,
  canActivate : [isAuthGuard]
},{
  path : "dashboard",
  component : DashboardComponent,
  canActivate : [isAuthGuard]
},{
  path : "predict",
  component : PredictComponent,
  canActivate : [isAuthGuard]
},{
  path: "register",
  component : RegisterComponent,
},{
  path : "resources",
  component : ResourcesComponent
},{ path: '**', redirectTo: '/' }
];
