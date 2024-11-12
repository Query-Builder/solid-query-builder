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
          fieldValue: 33,
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
      field: 'is Subscribed',
      fieldValue: 'ABC-4',
      operator: '=',
    },
    {
      id: uuidv4(),
      field: 'Range value',
      fieldValue: 'ABC-5',
      operator: 'between',
    },
    {
      id: uuidv4(),
      field: 'Subscription Terms',
      fieldValue: 'Subscription Terms and Conditions: Some long text',
      operator: '=',
    },
  ],
};
