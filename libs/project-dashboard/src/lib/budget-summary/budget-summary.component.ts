import { Component, Input } from '@angular/core';
import { StatusReport } from '@r19/shared/models';


@Component({
  selector: 'r19-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.scss']
})
export class BudgetSummaryComponent  {
  @Input() summary: StatusReport | null = null;


}
