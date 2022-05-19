import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewservicioPageRoutingModule } from './newservicio-routing.module';

import { NewservicioPage } from './newservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewservicioPageRoutingModule
  ],
  declarations: [NewservicioPage]
})
export class NewservicioPageModule {}
