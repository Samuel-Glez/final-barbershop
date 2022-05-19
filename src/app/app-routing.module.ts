import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'newuser',
    loadChildren: () => import('./pages/newuser/newuser.module').then( m => m.NewuserPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'edituser/:id',
    loadChildren: () => import('./pages/edituser/edituser.module').then( m => m.EdituserPageModule)
  },
  {
    path: 'servicio',
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule)
  },
  {
    path: 'newservicio',
    loadChildren: () => import('./pages/newservicio/newservicio.module').then( m => m.NewservicioPageModule)
  },
  {
    path: 'editservicio/:id',
    loadChildren: () => import('./pages/editservicio/editservicio.module').then( m => m.EditservicioPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./pages/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'newreview',
    loadChildren: () => import('./pages/newreview/newreview.module').then( m => m.NewreviewPageModule)
  },
  {
    path: 'reserva/:id',
    loadChildren: () => import('./pages/reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'inicioadmin',
    loadChildren: () => import('./pages/inicioadmin/inicioadmin.module').then( m => m.InicioadminPageModule)
  },
  {
    path: 'listreserva',
    loadChildren: () => import('./pages/listreserva/listreserva.module').then( m => m.ListreservaPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
