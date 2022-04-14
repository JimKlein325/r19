import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardShellComponent } from './dashboard-shell/dashboard-shell.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { SharedMaterialModule } from '@r19/shared/material';
import { SharedStateModule } from '@r19/shared/state';
import { ProjectsGridComponent } from './projects-grid/projects-grid.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { StatusSummaryComponent } from './status-summary/status-summary.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedStateModule,
    // SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    DashboardShellComponent,
    BudgetSummaryComponent,
    ProjectsGridComponent,
    ProjectsTableComponent,
    DatePickerComponent,
    StatusSummaryComponent,
    ProjectEditComponent
  ],
  exports:  [
    DashboardShellComponent,
  ]
})
export class ProjectDashboardModule {}
