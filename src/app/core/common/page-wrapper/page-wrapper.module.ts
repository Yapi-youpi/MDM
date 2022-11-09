import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';

@NgModule({
  declarations: [PageWrapperComponent, NavSidebarComponent],
  imports: [RouterModule],
  exports: [PageWrapperComponent],
})
export class PageWrapperModule {}
