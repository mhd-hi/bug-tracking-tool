import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  {path:'acceuil', component:AcceuilComponent},   //Page acceuil
  {path:'probleme', component:ProblemeComponent},   //Page probleme

  {path:'', redirectTo:'acceuil', pathMatch:'full'}, //Page rediction directement qd touvre le site
  
  {path:'**', redirectTo:'acceuil', pathMatch:'full'},  //Page qd ladresse est inexistance -> rediriger vers acceuil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
