import { Division, ProjectSummary, projectSummaryKeys, Status } from '@r19/shared/models';

export interface ProjectSummaryColumnFilters {
    title: string;
    division: Division;
    project_owner: string;
    budget: number;
    status: Status;
    created: string | null;
    modified: string | null;
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
            default:
              return true;
          }
    });
  };