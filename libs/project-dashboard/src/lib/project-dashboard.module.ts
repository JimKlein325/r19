import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardShellComponent } from './dashboard-shell/dashboard-shell.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { SharedMaterialModule } from '@r19/shared/material';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    DashboardShellComponent,
    BudgetSummaryComponent
  ],
  exports:  [
    DashboardShellComponent,
  ]
})
export class ProjectDashboardModule {}
