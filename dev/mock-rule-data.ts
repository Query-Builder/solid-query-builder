import type { Fields } from 'src/types';
import { defaultOperators } from 'src/constants';

export const FIELDSDATA: Fields[] = [
  {
    name: 'First Name',
    label: 'First Name',
    placeholder: 'Enter first name',
    id: '1',
    operators: [{ name: 'equals', value: 'equals', label: 'Equals' }],
    valueEditorType: 'text',
    inputType: 'text',
    values: { value: 'John', label: 'John' },
    defaultOperator: 'equals',
    defaultValue: 'John',
    comparator: 'string',
  },
  {
    name: 'Last Name',
    label: 'Last Name',
    placeholder: 'Enter last name',
    id: '2',
    valueEditorType: 'text',
    inputType: 'text',
    values: { value: 'Doe', label: 'Doe' },
    defaultOperator: 'equals',
    defaultValue: 'Doe',
    comparator: 'string',
  },
  {
    name: 'Age',
    label: 'Age',
    placeholder: 'Enter age',
    id: '3',
    operators: [{ name: 'greater_than', value: 'greater_than', label: 'Greater Than' }],
    valueEditorType: 'text',
    inputType: 'number',
    values: { value: '30', label: '30' },
    defaultOperator: 'greater_than',
    defaultValue: 30,
    comparator: 'number',
  },
  {
    name: 'Email',
    label: 'Email',
    placeholder: 'Enter email address',
    id: '4',
    operators: [{ name: 'contains', value: 'contains', label: 'Contains' }],
    valueEditorType: 'text',
    inputType: 'email',
    values: { value: 'example@example.com', label: 'example@example.com' },
    defaultOperator: 'contains',
    defaultValue: 'example@example.com',
    comparator: 'string',
  },
  {
    name: 'Subscription',
    label: 'Subscribed to Newsletter',
    id: '5',
    operators: [{ name: 'equals', value: 'equals', label: 'Equals' }],
    valueEditorType: 'checkbox',
    inputType: 'checkbox',
    values: { value: 'true', label: 'Yes' },
    defaultOperator: 'equals',
    defaultValue: true,
    comparator: 'boolean',
  },
];

export const OPERATORS_DATA = [
  { name: '=', value: '=', label: '=' },
  { name: '!=', value: '!=', label: '!=' },
  { name: '<', value: '<', label: '<' },
  { name: '>', value: '>', label: '>' },
  { name: '<=', value: '<=', label: '<=' },
  { name: '>=', value: '>=', label: '>=' },
  { name: 'contains', value: 'contains', label: 'contains' },
  { name: 'beginsWith', value: 'beginsWith', label: 'begins with' },
];

export const getOperators = (
  fieldName: string,
  { misc: { fieldData } }: { misc: { fieldData: Fields } },
) => {
  switch (fieldData.datatype) {
    case 'text':
      return [
        { name: '=', label: 'is' },
        { name: '!=', label: 'is not' },
        ...defaultOperators.filter(op =>
          [
            'contains',
            'beginsWith',
            'endsWith',
            'doesNotContain',
            'doesNotBeginWith',
            'doesNotEndWith',
            'null',
            'notNull',
            'in',
            'notIn',
          ].includes(op.name),
        ),
      ];
    case 'number':
      return [
        ...defaultOperators.filter(op => ['=', '!='].includes(op.name)),
        { name: '<', label: 'less than' },
        { name: '<=', label: 'less than or equal to' },
        { name: '>', label: 'greater than' },
        { name: '>=', label: 'greater than or equal to' },
        ...defaultOperators.filter(op => ['null', 'notNull'].includes(op.name)),
      ];
    case 'date':
      return [
        { name: '=', label: 'on' },
        { name: '!=', label: 'not on' },
        { name: '<', label: 'before' },
        { name: '<=', label: 'on or before' },
        { name: '>', label: 'after' },
        { name: '>=', label: 'on or after' },
        ...defaultOperators.filter(op => ['null', 'notNull'].includes(op.name)),
      ];
  }
  return defaultOperators;
};
