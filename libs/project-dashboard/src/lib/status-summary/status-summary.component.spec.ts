import { render, screen } from '@testing-library/angular';
import { SharedMaterialModule } from '@r19/shared/material';
import { StatusReport } from '@r19/shared/models';
import { StatusSummaryComponent } from './status-summary.component';

const status: StatusReport = {
  archived: 10,
  delivered: 10,
  new: 10,
  working: 10,
  total: 40
}

describe('StatusSummaryComponent', () => {
  it('should create', async () => {
    await render(StatusSummaryComponent , {
      imports: [SharedMaterialModule],
      componentProperties: {
        summary: status
      }
    })

    screen.getByText(/Status Summary/i)
    screen.getByText(/Archived/i)
    screen.getAllByText(/10/i)
    screen.getByText(/40/i)
  });
});
