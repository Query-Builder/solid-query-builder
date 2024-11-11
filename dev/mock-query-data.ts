import { v4 as uuidv4 } from 'uuid';

import type { Query } from 'src';

export const MOCK_QUERY_DATA: Query = {
  id: uuidv4(),
  combinator: 'OR',
  rules: [
    {
      id: uuidv4(),
      field: 'First Name',
      fieldValue: 'ABC-1',
      operator: '=',
    },
    {
      id: uuidv4(),
      field: 'Last Name',
      fieldValue: 'ABC-2',
      operator: '=',
    },
    {
      id: uuidv4(),
      combinator: 'OR',
      rules: [
        {
          id: uuidv4(),
          field: 'Age',
          fieldValue: 'ABC-3',
          operator: '=',
        },
        {
          id: uuidv4(),
          field: 'Email',
          fieldValue: 'john@doe.com',
          operator: '=',
        },
      ],
    },
    {
      id: uuidv4(),
      field: 'Subscription',
      fieldValue: 'ABC-4',
      operator: '=',
    },
  ],
};
