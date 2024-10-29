import { v4 as uuidv4 } from 'uuid';

import type { Query, QueryBuilderActions, RulesType } from 'src/types';

export const queryBuilderReducer = (draftState: Query, action: QueryBuilderActions): Query => {
  switch (action.type) {
    case 'add-rule': {
      const parentPath = action.payload.path;
      let parentGroup: RulesType = draftState.rules;
      if (parentPath.length > 0) {
        // adding a new
        for (let index = 0; index < parentPath.length; index++) {
          const activePath = parentPath[index]!;
          const temp = parentGroup[activePath];
          if (temp && 'rules' in temp) {
            parentGroup = temp.rules;
          } else {
            // TODO: should I define undefined?? idk ?
            break;
          }
        }
      }
      parentGroup.push({
        id: uuidv4(),
        field: 'new-rule-2',
        fieldValue: 'new-value-2',
        operator: '!=',
      });
      return draftState;
    }
    case 'add-rule-group': {
      const parentPath = action.payload.path;
      let parentGroup: RulesType = draftState.rules;
      if (parentPath.length > 0) {
        // adding a new
        for (let index = 0; index < parentPath.length; index++) {
          const activePath = parentPath[index]!;
          const temp = parentGroup[activePath];
          if (temp && 'rules' in temp) {
            parentGroup = temp.rules;
          } else {
            // TODO: should I define undefined?? idk ?
            break;
          }
        }
      }
      parentGroup.push({
        id: uuidv4(),
        combinator: 'AND',
        rules: [],
      });
      return draftState;
    }
    default: {
      return draftState;
    }
  }
};
