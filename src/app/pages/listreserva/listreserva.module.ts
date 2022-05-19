import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListreservaPageRoutingModule } from './listreserva-routing.module';

import { ListreservaPage } from './listreserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListreservaPageRoutingModule
  ],
  declarations: [ListreservaPage]
})
export class ListreservaPageModule {}
