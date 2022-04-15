import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange, Division, ProjectSummary, projectSummaryKeys, Status } from '@r19/shared/models';
import { isWithinInterval } from 'date-fns'

export interface ProjectSummaryColumnFilters {
    title: string;
    division: Division;
    project_owner: string;
    budget: number;
    status: Status;
    created: DateRange;
    modified: DateRange;
  }

export const projectColumnFilter = (
    project: ProjectSummary,
    filter: ProjectSummaryColumnFilters
  ): boolean => {
      
    return projectSummaryKeys.every(key => {
        // TODO add operator to budget filter,  created + modified filters
        switch (key) {
            case 'budget':
                return key ? project[key] > (filter[key]) : true
            case 'division':
            case 'project_owner':
            case 'status':
            case 'title':
              return key ? (project[key] + '').includes(filter[key]) : true
            case 'created':
              // return isWithinRange(project[key], filter[key])
              return true;
              // break;
            default:
            return true;
          }
    });
  };

  export const isWithinRange = ( date: string | null, range: DateRange): boolean => {
    if(date && range.start
      && range.end){
        debugger
        return isWithinInterval( new Date(date), {start: range.start, end: range.end })

      }
      return false;
    // isWithinInterval(
    //   new Date(2014, 0, 3),
    //   { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
    // )
  }


  // export const createDateRangePickerFormGroup = (
  //   dateRange: DateRange = { start: new Date(), end: new Date() }
  // ): FormGroup =>
  //   new FormGroup(
  //     {
  //       start: new FormControl(dateRange.start, Validators.required),
  //       end: new FormControl(dateRange.end, Validators.required)
  //     },
  //     (group: FormGroup) => dateRangeValidation(group.value as DateRange)
  //   );
  
  // export const createDateRangePickerFormControl = (
  //   dateRange: DateRange = { start: new Date(), end: new Date() }
  // ): FormControl =>
  //   new FormControl(dateRange);
  