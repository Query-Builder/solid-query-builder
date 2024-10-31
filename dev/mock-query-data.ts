import { v4 as uuidv4 } from 'uuid';

import type { Combinator, Query } from 'src';

export const MOCK_QUERY_DATA: Query = {
  id: uuidv4(),
  combinator: 'OR',
  rules: [
    {
      id: uuidv4(),
      field: 'XYZ-1',
      fieldValue: 'ABC-1',
      operator: '=',
    },
    {
      id: uuidv4(),
      combinator: 'OR',
      rules: [
        {
          id: uuidv4(),
          field: 'XYZ-3',
          fieldValue: 'ABC-3',
          operator: '=',
        },
      ],
    },
    {
      id: uuidv4(),
      field: 'XYZ-2',
      fieldValue: 'ABC-2',
      operator: '=',
    },
  ],
};
