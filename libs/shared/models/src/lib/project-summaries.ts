export interface ProjectSummary {
    title: string;
    division: Division;
    project_owner: string;
    budget: number;
    status: Status;
    created: string | null;
    modified: string | null;
  }

  export type ProjectSummaryKey = keyof ProjectSummary;
  
  export type ProjectSummaryHearders = Record<ProjectSummaryKey, string>;

  export type ProjectSummaryControlValues = Record<ProjectSummaryKey, string | boolean | Date | null>

  export const  projectSummaryKeys: (keyof ProjectSummary)[] =  [ 'title', 'division', 'project_owner', 'budget', 'status', 'created', 'modified'];

  export const projectSummaryColumnHeaders: ProjectSummaryHearders = {
    "title": "Title",
    "division": "Division",
    "project_owner": "Project Owner",
    "budget": "Budget",
    "status": "Status",
    "created": "Created",
    "modified": "Modified"
  }

  export const projectSummaryControlInitialValues: ProjectSummaryControlValues = {
    "title": "",
    "division": "",
    "project_owner": "",
    "budget": "",
    "status": "null",
    "created": null,
    "modified": null
  }

  export type Division =
    | 'Accounting'
    | 'Administration'
    | 'Marketing'
    | 'Production'
    | 'Sales';
  
  export type Status = 'archived' | 'delivered' | 'new' | 'working';
  
  export type StatusOptions = Record<Status, string>;

  export type StatusReportList = Record<Status, number>

  export type Total = {
    total: number
  }

  export type StatusReport = StatusReportList & Total
  
  export const statusOptions: StatusOptions  = {
    archived: 'archived', 
    delivered: 'delivered', 
    new: 'new', 
    working: 'working'
  }

  export interface ProjectsTableFormValue {
    columnFilters: boolean;
  }

  
  export function calculateBudgetTotal(projects: ProjectSummary[]) {
    return projects.reduce((total, project) => {
      return total + parseInt(`${project.budget}`, 10) || 0;
    }, 0);
  }

  export function calculateStatusSummary(projects: ProjectSummary[]): StatusReport {
    return projects.reduce((acc, project) => {
      const newTotal = acc.total+1
      switch (project.status) {
        case 'archived':
          acc =  {...acc, archived: acc.archived+1, total: newTotal}
          return acc
        case 'delivered':
          acc =  {...acc, delivered: acc.delivered+1, total: newTotal}
          return acc
        case 'new':
          acc =  {...acc, new: acc.new+1, total: newTotal}
          return acc
        case 'working':
          acc =  {...acc, working: acc.working+1, total: newTotal}
          return acc
        default:
          return acc;
      }
    }, {archived: 0, delivered: 0, new: 0, working: 0, total: 0} as StatusReport);
  }
  export function calculateBudgetSummary(projects: ProjectSummary[]): StatusReport {
    return projects.reduce((acc, project) => {
      const budget = project.budget;

      switch (project.status) {
        case 'archived':
          acc =  {...acc, archived: addProjectBudget(acc.archived, budget), total: addProjectBudget(acc.total, budget)}
          return acc
        case 'delivered':
          acc =  {...acc, delivered: addProjectBudget(acc.archived, budget), total: addProjectBudget(acc.total, budget)}
          return acc
        case 'new':
          acc =  {...acc, new: addProjectBudget(acc.archived, budget), total: addProjectBudget(acc.total, budget)}
          return acc
        case 'working':
          acc =  {...acc, working: addProjectBudget(acc.archived, budget), total: addProjectBudget(acc.total, budget)}
          return acc
        default:
          return acc;
      }
    }, {archived: 0, delivered: 0, new: 0, working: 0, total: 0} as StatusReport);
  }

  const addProjectBudget =  (currentTotal: number, currentValue: number ) => {
    return currentTotal+currentValue
  }

  