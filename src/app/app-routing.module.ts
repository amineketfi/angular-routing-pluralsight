import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';


const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products',
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () =>
      import('./products/product.module').then(m => m.ProductModule)
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy } /*, { enableTracing: true } // shows detailled logs for routing */)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
