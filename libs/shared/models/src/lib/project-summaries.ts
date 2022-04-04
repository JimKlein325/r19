export interface ProjectSummary {
    id: number
    title: string;
    division: Division;
    project_owner: string;
    budget: number;
    status: Status;
    created: Date;
    modified: Date | null;
  }
  
  export type Division =
    | 'Accounting'
    | 'Administration'
    | 'Marketing'
    | 'Production'
    | 'Sales';
  
  export type Status = 'archived' | 'delivered' | 'new' | 'working';
  
  export type StatusOptions = Record<Status, string>;
  
  export const statusOptions: StatusOptions  = {
    archived: 'Archived', 
    delivered: 'Delivered', 
    new: 'New', 
    working: 'Working'
  }
  