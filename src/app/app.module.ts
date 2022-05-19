import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { PagePipe } from './page.pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';








@NgModule({
  declarations: [AppComponent, PagePipe],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy,  useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
