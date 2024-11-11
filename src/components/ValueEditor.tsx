import type { Option } from 'src/types/options';

import type { FieldsEditorProps } from 'src/types';

const getFirstOption = (arr: Option) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  return arr[0].value ?? arr[0].name;
};

export const ValueEditor = (allProps: FieldsEditorProps) => {
  const {
    isDisabled,
    fieldData,
    handleOnChange,
    inputType = 'text',
    listsAsArrays = false,
    operator,
    separator = ',',
    title = '',
    valueEditorType = 'text',
    values = [],
    value,
    selectorComponent: SelectorComponent,
    ...propsForValueSelector
  } = allProps;

  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  const placeHolderText = fieldData?.placeholder ?? '';
  const inputTypeCoerced = ['in', 'notIn'].includes(operator) ? 'text' : inputType || 'text';

  if (
    (operator === 'between' || operator === 'notBetween') &&
    (valueEditorType === 'select' || valueEditorType === 'text')
  ) {
    const editors = ['from', 'to'].map(() => {
      if (valueEditorType === 'text') {
        return (
          <input
            name="input-text"
            type={inputTypeCoerced}
            placeholder={placeHolderText}
            value={value}
            disabled={isDisabled()}
            onChange={e => e.target.value}
          />
        );
      }
      return (
        <SelectorComponent
          {...propsForValueSelector}
          handleOnChange={(v: any) => v.target.value}
          disabled={isDisabled()}
          value={value ?? getFirstOption(values)}
          options={values}
          listsAsArrays={listsAsArrays}
        />
      );
    });
    return (
      <span title={title}>
        {editors[0]}
        {separator}
        {editors[1]}
      </span>
    );
  }

  switch (valueEditorType) {
    case 'select':
    case 'multiselect':
      return (
        <SelectorComponent
          {...propsForValueSelector}
          title={title}
          handleOnChange={handleOnChange}
          disabled={isDisabled()}
          value={value}
          options={values}
          multiple={valueEditorType === 'multiselect'}
          listsAsArrays={listsAsArrays}
        />
      );

    case 'textarea':
      return (
        <textarea
          name="input-textarea"
          placeholder={placeHolderText}
          value={value}
          title={title}
          disabled={isDisabled()}
          onChange={e => handleOnChange(e.target.value)}
        />
      );

    case 'switch':
    case 'checkbox':
      return (
        <input
          name="input-checkbox"
          type="checkbox"
          title={title}
          onChange={e => handleOnChange(e.target.checked)}
          checked={!!value}
          disabled={isDisabled()}
        />
      );

    case 'radio':
      return (
        <span title={title}>
          {values.map((v: any) => (
            <label>
              <input
                name="input-radio"
                type="radio"
                value={v.name}
                disabled={isDisabled()}
                checked={value === v.name}
                onChange={e => handleOnChange(e.target.value)}
              />
              {v.label}
            </label>
          ))}
        </span>
      );
  }

  return (
    <input
      name="input-text"
      type={inputTypeCoerced}
      placeholder={placeHolderText}
      value={value}
      title={title}
      disabled={isDisabled()}
      onChange={e => handleOnChange(e.target.value)}
    />
  );
};
