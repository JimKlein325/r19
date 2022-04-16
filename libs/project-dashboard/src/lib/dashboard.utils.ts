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

        switch (key) {
            case 'budget':
                return key ? project[key] > (filter[key]) : true
            case 'division':
            case 'project_owner':
            case 'status':
            case 'title':
              return key && filter[key] ? (project[key] + '').includes(filter[key]) : true
            case 'modified':
            case 'created':
              return isWithinRange(project[key], filter[key])
            default:
            return true;
          }
    });
  };

  export const isWithinRange = ( date: string | null, range: DateRange): boolean => {
    if(date && range.start && range.end){
        return isWithinInterval( new Date(date), {start: range.start, end: range.end });
      }
      return true;
  }

