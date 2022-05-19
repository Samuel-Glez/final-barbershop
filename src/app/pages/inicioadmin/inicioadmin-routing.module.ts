import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioadminPage } from './inicioadmin.page';

const routes: Routes = [
  {
    path: '',
    component: InicioadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioadminPageRoutingModule {}
