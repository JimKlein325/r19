import { createAction, props } from '@ngrx/store';
import { ProjectRequiredProps } from '@r19/shared/models';

export const enter = createAction('[Dashboard Page] Enter');

export const selectProject = createAction(
    '[Projects Page] Select Project',
    props<{ title: string }>()
  );
  
  export const clearSelectedProject = createAction(
    '[Projects Page] Clear Selected Project'
  );
  
  export const updateProject = createAction(
    '[Projects Page] Update Project',
    props<{ title: string; changes: ProjectRequiredProps }>()
  );
  
  
