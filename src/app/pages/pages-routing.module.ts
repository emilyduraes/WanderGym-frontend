import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { IndexComponent } from './index/index.component';
import { Index2Component } from './index2/index2.component';
import { Index3Component } from './index3/index3.component';
import { Index4Component } from './index4/index4.component';
import { Index5Component } from './index5/index5.component';
import { Index6Component } from './index6/index6.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'index1',
    component:IndexComponent
  },
  {
    path:'index2',
    component:Index2Component
  },
  {
    path:'index3',
    component:Index3Component
  },
  {
    path:'index4',
    component:Index4Component
  },
  {
    path:'index5',
    component:Index5Component
  },
  {
    path:'index6',
    component:Index6Component
  },
  {
    path:'blog-list',
    component:BloglistComponent
  },
  {
    path:'blog-details',
    component:BlogdetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
