import { For, Show } from 'solid-js';
import type { Component } from 'solid-js';

interface ValueSelectorProps {
  title: string;
  disabled: boolean;
  multiple: string;
  listAsArrays: boolean;
  options: { value: string; label: string }[];
  value: string;
  handleOnChange: (event: Event) => void;
}

const ValueSelector: Component<ValueSelectorProps> = props => {
  return (
    <select
      name="input-select"
      title={props.title}
      value={props.value}
      onChange={props.handleOnChange}
      disabled={props.disabled}
    >
      <Show when={!props.value}>
        <option>----</option>
      </Show>
      <For each={props.options}>
        {option => <option value={option.value}>{option.label}</option>}
      </For>
    </select>
  );
};

export default ValueSelector;
