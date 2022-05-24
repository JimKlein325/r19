import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SharedMaterialModule } from '@r19/shared/material';

import { ProjectEditComponent } from './project-edit.component';
import { ProjectSummary } from '@r19/shared/models';
import { ReactiveFormsModule } from '@angular/forms';

const projectSummary = {
  "title": "Dazzlesphere",
  "division": "Accounting",
  "project_owner": "Jimmie",
  "budget": 21443.97,
  "status": "archived",
  "created": "07/20/2015",
  "modified": "10/01/2015"
}

describe('ProjectEditComponent', () => {

  it('should create', async () => {
    const updateSpy = jest.fn();

    await render(ProjectEditComponent , {
      imports: [ReactiveFormsModule, SharedMaterialModule],
        componentProperties: {
          projectOwners: ['Buddy', 'Jimmie', 'Louie'],
          currentProjectSummary: projectSummary as ProjectSummary,
          projectUpdate: {
              emit: updateSpy
        } as any,
      },
    })
    // const status = screen.getByLabelText(/status/i);
    // userEvent.selectOptions(status, 'archived')
    
    // const selectField = screen.queryByRole('combobox', { name: 'status'});
    const selectField = screen.getByTestId('status-select');
    userEvent.click(selectField);
    const option = screen.getByText('archived')
    userEvent.click(option);
    // userEvent.selectOptions(selectField, 'archived')


    const options = screen.queryAllByRole('options');
    console.log('options', option.innerHTML)
    // const pO = screen.getByLabelText(/project Owner/i);
    // screen.getByText(/Jimmie/i)
      // screen.getByText(/Archived/i)
      // screen.getAllByText(/10/i)
      // screen.getByText(/40/i)

      // const shirtSize = screen.getByLabelText(/Status/i);

      // userEvent.click(status);
      // userEvent.click(status);
      // const t = screen.getByTestId('status-select')

      // const t = screen.getByRole('combobox', {name: /Product Owner Jimmie/i})
      // userEvent.click(t);



        // an easier way to select options is to use the `selectOptions` event
      // userEvent.selectOptions(shirtSize, inputValues.shwirtSize);
      // userEvent.click(screen.getByText('Jimmie'));
      //userEvent.click(screen.getByText('new'));
    });

  it('should dispatch a "Update Project" action when the user selects a different Project Owner', () => {
    // expect(component).toBeTruthy();

    // const expectedAction = BooksPageActions.selectBook({ bookId: mockBook.id });
    // const booksListComponent = fixture.debugElement.query(
    //   By.css('bco-books-list')
    // );

    // booksListComponent.triggerEventHandler('select', mockBook);

    // expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
