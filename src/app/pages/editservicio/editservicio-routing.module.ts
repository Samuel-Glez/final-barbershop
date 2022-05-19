import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditservicioPage } from './editservicio.page';

const routes: Routes = [
  {
    path: '',
    component: EditservicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditservicioPageRoutingModule {}
