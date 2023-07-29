import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingSidebarComponent } from './trending-sidebar/trending-sidebar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    TrendingSidebarComponent,
    UserSidebarComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
