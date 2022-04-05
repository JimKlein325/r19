export interface ProjectSummary {
    title: string;
    division: Division;
    project_owner: string;
    budget: number;
    status: Status;
    created: string;
    modified: string | null;
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
    archived: 'Archived', 
    delivered: 'Delivered', 
    new: 'New', 
    working: 'Working'
  }
  
  export function calculateBudgetTotal(projects: ProjectSummary[]) {
    return projects.reduce((total, project) => {
      return total + parseInt(`${project.budget}`, 10) || 0;
    }, 0);
  }
  const incrementTotal = (target: number) : number  => {
    return target++
  }
  export function calculateStatusSummary(projects: ProjectSummary[]): StatusReport {
    return projects.reduce((acc, project) => {
      const newTotal = acc.total+1
      console.log('newtotal', newTotal)
      switch (project.status) {
        case 'archived':
          acc =  {...acc, archived: acc.archived+1, total: newTotal}
          console.log('acc', acc)
          return acc
        case 'delivered':
          acc =  {...acc, delivered: acc.delivered+1, total: newTotal}
          console.log('acc', acc)
          return acc
        case 'new':
          acc =  {...acc, new: acc.new+1, total: newTotal}
          console.log('acc', acc)
          return acc
        case 'working':
          acc =  {...acc, working: acc.working+1, total: newTotal}
          console.log('acc', acc)
          return acc
        default:
          return acc;
      }
    }, {archived: 0, delivered: 0, new: 0, working: 0, total: 0} as StatusReport);
  }
  