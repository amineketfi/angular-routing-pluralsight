import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';

import { SharedModule } from '../shared/shared.module';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { RouterModule } from '@angular/router';

import { ProductResolverService } from './product-resolver.service';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
          {
            path: '',
            component: ProductListComponent,
          },
          {
            path: ':id',
            component: ProductDetailComponent,
            resolve: {resolvedData: ProductResolverService}
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            canDeactivate: [ProductEditGuard],
            resolve: {resolvedData: ProductResolverService},
            children: [
              {
                 path: '',
                 pathMatch: 'full',
                 redirectTo: 'info'
              },
              {
                path: 'info',
                component: ProductEditInfoComponent
              },
              {
                path: 'tags',
                component: ProductEditTagsComponent
              }
            ]
          },
      ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent

  ]
})
export class ProductModule { }
