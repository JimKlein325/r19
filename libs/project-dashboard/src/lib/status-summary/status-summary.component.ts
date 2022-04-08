import { Component, Input } from '@angular/core';
import { StatusReport } from '@r19/shared/models';

@Component({
  selector: 'r19-status-summary',
  templateUrl: './status-summary.component.html',
  styleUrls: ['./status-summary.component.scss']
})
export class StatusSummaryComponent  {
  @Input() summary: StatusReport | null = null;


}
