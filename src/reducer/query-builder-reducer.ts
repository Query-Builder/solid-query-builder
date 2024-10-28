import type { Query, QueryBuilderActions } from 'src/types';

export const queryBuilderReducer = (state: Query, action: QueryBuilderActions): Query => {
  switch (action.type) {
    case 'add-rule': {
      return state;
    }
    default: {
      return state;
    }
  }
};
