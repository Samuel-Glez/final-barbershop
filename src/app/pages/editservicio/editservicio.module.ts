import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditservicioPageRoutingModule } from './editservicio-routing.module';

import { EditservicioPage } from './editservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditservicioPageRoutingModule
  ],
  declarations: [EditservicioPage]
})
export class EditservicioPageModule {}
