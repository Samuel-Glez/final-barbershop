import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewservicioPage } from './newservicio.page';

const routes: Routes = [
  {
    path: '',
    component: NewservicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewservicioPageRoutingModule {}
