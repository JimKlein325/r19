import { createAction, props } from '@ngrx/store';
import { ProjectSummary } from '@r19/shared/models';

export const enter = createAction('[Dashboard Page] Enter');
  
  export const updateProject = createAction(
    '[Projects Page] Update Project',
    props<{ title: string; changes: ProjectSummary }>()
  );
  
  
