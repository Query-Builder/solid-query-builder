import { createSignal, type Component, createResource, Show } from 'solid-js';

// query builder lib import
import { QueryBuilder, type Not_Selection } from 'src';

import { ThemeToggle } from './components/ThemeToggle';

import { MOCK_QUERY_DATA } from './mock-query-data';
import { FIELDSDATA, OPERATORS_DATA } from './mock-rule-data';

const fetchPackageVersion = () => {
  return fetch(`https://registry.npmjs.org/@query-builder/solid-query-builder/latest`).then(
    response => {
      if (!response.ok) {
        throw new Error('Failed to fetch package data');
      }
      return response.json();
    },
  );
};

const App: Component = () => {
  const [packageVersion] = createResource(fetchPackageVersion);

  const [disableQB, setDisableQB] = createSignal(false);
  const [showShiftActions, setShowShiftActions] = createSignal(true);
  const [allowDragAndDrop, setAllowDragAndDrop] = createSignal(true);
  const [addSingleRuleToGroup, setAddSingleRuleToGroup] = createSignal(true);
  const [showNotToggle, setShowNotToggle] = createSignal<Not_Selection>('both');

  return (
    <div class="app container-fluid">
      <header class="header">
        <h1>SolidJS Query Builder</h1>
        <div class="right-header">
          <div>
            <Show when={packageVersion()} fallback={<div aria-busy="true"></div>}>
              <div>Version: {packageVersion()?.version ?? '- -'}</div>
            </Show>
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/Query-Builder/solid-query-builder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="./github-mark.png"
              alt="github repo for solid query builder"
              class="github-logo"
            />
          </a>
        </div>
      </header>
      <main class="main">
        <section class="intro">
          <h3>Query Builder is an UI component to create complex queries and filters</h3>
          <h4>Supported features out of the box:</h4>
          <ul class="list">
            <li>
              <strong>Customizable:</strong> Query Builder with default options that can be
              customized.
            </li>
            <li>
              <strong>Nested Groups and Rules:</strong> Supports creating nested groups and rules.
            </li>
            <li>
              <strong>Operations:</strong> Add, clone, delete, shift, and more operations on rules
              and groups.
            </li>
            <li>
              <strong>Styling:</strong> Tweak default styles or provide custom styles for the Query
              Builder.
            </li>
            <li>
              <strong>JSON Output:</strong> Outputs structured JSON of rules and groups for creating
              complex queries.
            </li>
            <li>
              <strong>Accessibility:</strong> Keyboard navigation and screen reader support.
            </li>
            <li>
              <strong>Drag and Drop:</strong> Reorder groups and rules with drag and drop support.
            </li>
            <li>
              <strong>Custom Operators and Editors:</strong> Supports custom operators and value
              editors.
            </li>
          </ul>
        </section>
        <h3>Demo</h3>
        <section class="demo">
          <section class="override">
            <details open={false}>
              <summary>Override Props</summary>
              <div class="options">
                <label class="label">
                  <input
                    name="disable-qb"
                    type="checkbox"
                    checked={disableQB()}
                    onChange={() => setDisableQB(!disableQB())}
                  />
                  Disable Query Builder
                </label>
                <label class="label">
                  <input
                    name="toggle-shift-actions"
                    type="checkbox"
                    checked={showShiftActions()}
                    onChange={() => setShowShiftActions(!showShiftActions())}
                  />
                  Show Shift Actions
                </label>
                <label class="label">
                  <input
                    name="toggle-drag-drop"
                    type="checkbox"
                    checked={allowDragAndDrop()}
                    onChange={() => setAllowDragAndDrop(!allowDragAndDrop())}
                  />
                  Allow Drag and Drop
                </label>
                <label class="label">
                  <input
                    name="toggle-single-rule"
                    type="checkbox"
                    checked={addSingleRuleToGroup()}
                    onChange={() => setAddSingleRuleToGroup(!addSingleRuleToGroup())}
                  />
                  Add Single Rule to Group
                </label>
                <select
                  name="show-not-toggle"
                  value={showNotToggle()}
                  onChange={event => {
                    setShowNotToggle(event?.target.value as Not_Selection);
                  }}
                >
                  <option value="both">Show Not Toggle - Both</option>
                  <option value="rule">Show Not Toggle - Rule</option>
                  <option value="rule_group">Show Not Toggle - Group</option>
                  <option value="none">Show Not Toggle - None</option>
                </select>
              </div>
            </details>
            <hr />
          </section>
          <section class="right__section">
            <QueryBuilder
              initialQuery={MOCK_QUERY_DATA}
              fields={FIELDSDATA}
              operators={OPERATORS_DATA}
              showShiftActions={showShiftActions()}
              allowDragAndDrop={allowDragAndDrop()}
              disabled={disableQB()}
              addSingleRuleToGroup={addSingleRuleToGroup()}
              showNotToggle={showNotToggle()}
            />
          </section>
        </section>
        <hr />
        <section class="installation-section">
          <section>
            <h3>Installation:</h3>
            <div class="installation">
              <pre class="pre">
                <code>npm install @query-builder/solid-query-builder</code>
                <button
                  class="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText('npm install @query-builder/solid-query-builder')
                  }
                >
                  <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
                </button>
              </pre>
              <div class="or-container">
                <span>or</span>
              </div>
              <pre class="pre">
                <code>yarn add @query-builder/solid-query-builder</code>
                <button
                  class="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText('yarn add @query-builder/solid-query-builder')
                  }
                >
                  <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
                </button>
              </pre>
              <div class="or-container">
                <span>or</span>
              </div>
              <pre class="pre">
                <code>pnpm add @query-builder/solid-query-builder</code>
                <button
                  class="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText('pnpm add @query-builder/solid-query-builder')
                  }
                >
                  <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
                </button>
              </pre>
            </div>
          </section>
          <hr />
          <section>
            <h5>Import:</h5>
            <div class="import">
              <pre class="pre">
                <code>
                  import &#123; QueryBuilder &#125; from '@query-builder/solid-query-builder';
                </code>
                <button
                  class="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `import { QueryBuilder } from '@query-builder/solid-query-builder`,
                    )
                  }
                >
                  <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
                </button>
              </pre>
            </div>
          </section>
          <hr />
          <section>
            <details>
              <summary>Optional Import: (default styling)</summary>
              <div class="import">
                <pre class="pre">
                  <code>import '@query-builder/solid-query-builder/dist/index.css';</code>
                  <button
                    class="copy-button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `import '@query-builder/solid-query-builder/dist/index.css'`,
                      )
                    }
                  >
                    <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
                  </button>
                </pre>
              </div>
            </details>
          </section>
          <hr />
          <section>
            <details>
              <summary>
                <h5>Usage: App.tsx</h5>
              </summary>
              <pre class="pre">
                <code>
                  {`<QueryBuilder
  initialQuery={QUERY_DATA}
  fields={FIELDSDATA}
  operators={OPERATORS_DATA}
  showShiftActions
  allowDragAndDrop
  disabled={false}
  addSingleRuleToGroup={false}
  showNotToggle="both"
/>`}
                </code>
              </pre>
            </details>
          </section>
          <hr />
          <section id="JSON-Data">
            <details>
              <summary>
                <h5>JSON Data:</h5>
              </summary>
              <pre class="pre">
                <code>{JSON.stringify(MOCK_QUERY_DATA, null, 2)}</code>
              </pre>
            </details>
          </section>
          <hr />
        </section>
        <section class="API reference">
          <h4>API Reference:</h4>
          <p>The Query Builder component accepts the following props.</p>
          <table class="table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>initialQuery</td>
                <td>
                  <a href="#Query-section">Query</a>
                </td>
                <td>
                  Initial query object to be displayed in the Query Builder. The query object should
                  follow the <a href="#JSON-Data">Query object structure</a>. This prop is optional
                  unless you want to display some initial query.
                </td>
              </tr>
              <tr>
                <td>fields</td>
                <td>
                  <a href="#Fields-section">Fields</a>
                </td>
                <td>
                  Array of field objects. Each field object should have a name and label property.
                  This prop is required.
                </td>
              </tr>
              <tr>
                <td>operators</td>
                <td>
                  <a href="#Operators-section">Operators</a>
                </td>
                <td>
                  Array of operator objects. Each operator object should have a value and label
                  property. Thi prop is optional.
                </td>
              </tr>
              <tr>
                <td>showShiftActions</td>
                <td>boolean</td>
                <td>
                  Show shift actions like shift up and shift down. Default is <code>false</code>.
                  This prop is optional.
                </td>
              </tr>
              <tr>
                <td>allowDragAndDrop</td>
                <td>boolean</td>
                <td>
                  Allow drag and drop to reorder groups and rules. This prop is optional. Default is{' '}
                  <code>false</code>.
                </td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>
                  Disable the Query Builder. This prop is optional. Default is <code>false</code>.
                </td>
              </tr>
              <tr>
                <td>addSingleRuleToGroup</td>
                <td>boolean</td>
                <td>
                  Add a single rule to a new group. This prop is optional. Default is{' '}
                  <code>false</code>.
                </td>
              </tr>
              <tr>
                <td>showNotToggle</td>
                <td>Not_Selection</td>
                <td>
                  Show the not toggle for rules and groups. This prop is optional. Default is{' '}
                  <code>both</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section class="TypeScript Reference">
          <h4>TypeScript Reference:</h4>
          <p>
            The Query Builder component is written in TypeScript and exports the following types.
          </p>
          <h5 id="Query-section">Query:</h5>
          <pre class="pre">
            <code>
              {`type Query = {
  id: string;
  type: 'group' | 'rule';
  rules?: Query[];
  field?: string;
  operator?: string;
  value?: any;
  not?: boolean;
};`}
            </code>
          </pre>
          <h5 id="Fields-section">Fields:</h5>
          <pre class="pre">
            <code>
              {`type Fields = {
  name: string;
  label: string;
  type?: string;
  operators?: OperatorsList;
  valueEditorType?: string;
  inputType?: string;
  values?: Option[];
  defaultOperator?: string;
  defaultValue?: any;
  validator?: RuleValidator;
  separator?: string;
  title?: string;
  listAsArrays?: boolean;
  comparator?: string;
};`}
            </code>
          </pre>
          <h5 id="Operators-section">Operators:</h5>
          <pre class="pre">
            <code>
              {`type Operators = {
  name: string;
  label: string;
  inputType?: string;
  values?: Option[];
  defaultValue?: any;
  comparator?: string;
};`}
            </code>
          </pre>
          <h5 class="Option-section">Option:</h5>
          <pre class="pre">
            <code>
              {`type Option = {
  value: string;
  label: string;
};`}
            </code>
          </pre>
          <h5 class="ValueEditorType-section">ValueEditorType:</h5>
          <pre class="pre">
            <code>
              {`type ValueEditorType = | 'text' | 'switch' | 'checkbox' | 'radio' | 'textarea' | 'select' | 'multiselect' | 'date' | 'datetime-local' | 'time' | null;`}
            </code>
          </pre>
          <h5 class="FieldsEditorProps-section">FieldsEditorProps:</h5>
          <pre class="pre">
            <code>
              {`type FieldsEditorProps = {
  title?: string;
  isDisabled: () => boolean | undefined;
  handleOnChange: (value: FieldsValue) => void;
  value: any;
  values?: any;
  valueEditorType?: ValueEditorType;
  listsAsArrays?: boolean;
  fieldData: Fields | undefined;
  inputType?: InputType | undefined | null;
  operator: string;
  separator?: string;
  selectorComponent: any;
};`}
            </code>
          </pre>
          <h5 id="CustomValueEditorProps-section">CustomValueEditorProps:</h5>
          <pre class="pre">
            <code>
              {`type CustomValueEditorProps = {
  fieldData: Fields | undefined;
  operator: string | null;
  value: string | null;
  handleOnChange: (value: FieldsValue) => void;
};`}
            </code>
          </pre>
          <h5></h5>
        </section>

        <section class="Styling-section">
          <h4>Styling:</h4>
          <p>
            The Query Builder component comes with default styles. You can override the default
            styles by providing custom styles. The Query Builder component uses the following CSS
            classes.
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>query-builder</td>
                <td>Root class for the Query Builder component.</td>
              </tr>
              <tr>
                <td>group</td>
                <td>Class for the group container.</td>
              </tr>
              <tr>
                <td>rule</td>
                <td>Class for the rule container.</td>
              </tr>
              <tr>
                <td>group-header</td>
                <td>Class for the group header.</td>
              </tr>
              <tr>
                <td>rule-header</td>
                <td>Class for the rule header.</td>
              </tr>
              <tr>
                <td>group-body</td>
                <td>Class for the group body.</td>
              </tr>
              <tr>
                <td>rule-body</td>
                <td>Class for the rule body.</td>
              </tr>
              <tr>
                <td>group-actions</td>
                <td>Class for the group actions.</td>
              </tr>
              <tr>
                <td>rule-actions</td>
                <td>Class for the rule actions.</td>
              </tr>
              <tr>
                <td>add-rule</td>
                <td>Class for the add rule button.</td>
              </tr>
              <tr>
                <td>add-group</td>
                <td>Class for the add</td>
              </tr>
              <tr>
                <td>delete-group</td>
                <td>Class for the delete group button.</td>
              </tr>
              <tr>
                <td>delete-rule</td>
                <td>Class for the delete rule button.</td>
              </tr>
              <tr>
                <td>clone-group</td>
                <td>Class for the clone group button.</td>
              </tr>
              <tr>
                <td>clone-rule</td>
                <td>Class for the clone rule button.</td>
              </tr>
              <tr>
                <td>shift-up</td>
                <td>Class for the shift up button.</td>
              </tr>
              <tr>
                <td>shift-down</td>
                <td>Class for the shift down button.</td>
              </tr>
              <tr>
                <td>lock-group</td>
                <td>Class for the lock group button.</td>
              </tr>
              <tr>
                <td>lock-rule</td>
                <td>Class for the lock rule button.</td>
              </tr>
              <tr>
                <td>not-rule-toggle</td>
                <td>Class for the not rule toggle checkbox.</td>
              </tr>
              <tr>
                <td>not-rule-group</td>
                <td>Class for the not</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="Accessibility-section">
          <h4>Accessibility:</h4>
          <p>
            The Query Builder component is built with accessibility in mind. The component supports
            keyboard navigation and screen reader support. The component uses the following ARIA
            attributes.
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>aria-label</td>
                <td>Label for the button or element.</td>
              </tr>
              <tr>
                <td>aria-description</td>
                <td>Description for the button or element.</td>
              </tr>
              <tr>
                <td>aria-busy</td>
                <td>Indicates that the element is busy.</td>
              </tr>
              <tr>
                <td>aria-disabled</td>
                <td>Indicates that the element is disabled.</td>
              </tr>
            </tbody>
          </table>
          <section class="Control-elements-section">
            <h5>Control Elements:</h5>
            <p>
              The Query Builder component provides control elements like customOperators and
              customValueEditor components. These control elements can be customized by providing
              custom components to the Query Builder component.
            </p>
            <p>
              The Query Builder component provides the following control elements that can be
              customized.
            </p>
            <ul class="list">
              <li>
                <strong>CustomOperators:</strong> Custom operators component to provide custom
                operators. This component should return a JSX element. It takes the current
                <a href="#Fields-section"> Field </a> data as an argument.
              </li>
              <li>
                <strong>CustomValueEditor:</strong> Custom value editor component to provide custom
                value editors. This component should return a JSX element. It takes
                <a href="#CustomValueEditorProps-section"> CustomValueEditorProps</a> as an
                argument.
              </li>
            </ul>
          </section>
        </section>
        <section>
          <section class="DragNDrop-Section">
            <h4>Drag and Drop:</h4>
            <p>
              The Query Builder component supports drag and drop to reorder groups and rules. The
              component uses the <a href="https://solid-dnd.com/">solid-dnd</a> library for drag and
              drop support.
            </p>
            <p>
              The Query Builder component provides the following drag and drop classes that can be
              used to customize the drag and drop feature.
            </p>
            <table class="table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>draggable-container</td>
                  <td>Class for the draggable container.</td>
                </tr>
                <tr>
                  <td>rule-drop-top</td>
                  <td>Class for the rule drop top container.</td>
                </tr>
                <tr>
                  <td>rule-drop-bottom</td>
                  <td>Class for the rule drop bottom container.</td>
                </tr>
              </tbody>
            </table>
          </section>
          <h5>Todo/Future Updates:</h5>
          <ul class="list">
            <li>
              <label>
                <input name="todo-1" type="checkbox" readOnly disabled />
                Improved Drag and Drop support for both rule and groups.
              </label>
            </li>
            <li>
              <label>
                <input name="todo-2" type="checkbox" readOnly disabled />
                Ability to override control elements like Add, Clone, Delete buttons, etc.
              </label>
            </li>
            <li>
              <label>
                <input name="todo-3" type="checkbox" readOnly disabled />
                More parsing options for the JSON output like SQL, MongoDB, etc.
              </label>
            </li>
            <li>
              <label>
                <input name="todo-4" type="checkbox" readOnly disabled />
                Better documentation
              </label>
            </li>
            <li>
              and many more.. Create an PR/Issues in our{' '}
              <a
                href="https://github.com/Query-Builder/solid-query-builder"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>{' '}
              to provide more usecases, so we can plan those accordingly.
            </li>
          </ul>
        </section>
        <section class="links">
          <h4>Links:</h4>
          <ul class="list">
            <li>
              <a
                href="https://github.com/Query-Builder/solid-query-builder"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repo
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@query-builder/solid-query-builder"
                target="_blank"
                rel="noopener noreferrer"
              >
                NPM Package
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h5>Inspiration:</h5>
          <p>
            This project is inspired by the{' '}
            <a href="https://react-querybuilder.js.org/" target="_blank" rel="noopener noreferrer">
              React Query Builder
            </a>{' '}
            and the{' '}
            <a href="https://querybuilder.js.org/" target="_blank" rel="noopener noreferrer">
              JQuery Query Builder
            </a>{' '}
            library.
          </p>
        </section>
      </main>
      <footer class="footer">
        <div class="copyright">Copyright © 2024 SolidJS Query Builder authors.</div>
        <div class="authors">
          Made by{' '}
          <a href="https://github.com/Swappea" target="_blank" rel="noopener noreferrer">
            Swapnesh Sangle
          </a>
          , and{' '}
          <a href="https://github.com/s-siddiqui" target="_blank" rel="noopener noreferrer">
            Salman Siddiqui
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
