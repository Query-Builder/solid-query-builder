import { createSignal, type Component } from 'solid-js';

// query builder lib import
import { QueryBuilder, type Not_Selection } from 'src';

import { ThemeToggle } from './components/ThemeToggle';

import { MOCK_QUERY_DATA } from './mock-query-data';
import { FIELDSDATA, OPERATORS_DATA } from './mock-rule-data';

const App: Component = () => {
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
          <ul class="intro-list">
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
            <div>Override:</div>
            <div class="options">
              <label class="label">
                <input
                  type="checkbox"
                  checked={disableQB()}
                  onChange={() => setDisableQB(!disableQB())}
                />
                Disable Query Builder
              </label>
              <label class="label">
                <input
                  type="checkbox"
                  checked={showShiftActions()}
                  onChange={() => setShowShiftActions(!showShiftActions())}
                />
                Show Shift Actions
              </label>
              <label class="label">
                <input
                  type="checkbox"
                  checked={allowDragAndDrop()}
                  onChange={() => setAllowDragAndDrop(!allowDragAndDrop())}
                />
                Allow Drag and Drop
              </label>
              <label class="label">
                <input
                  type="checkbox"
                  checked={addSingleRuleToGroup()}
                  onChange={() => setAddSingleRuleToGroup(!addSingleRuleToGroup())}
                />
                Add Single Rule to Group
              </label>
              <select
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
        <section class="installation">
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
          <section>
            <h5>Import:</h5>
            <pre class="pre">
              <code>
                import &#123; QueryBuilder &#125; from '@query-builder/solid-query-builder';
              </code>
              <button
                class="copy-button"
                onClick={() =>
                  navigator.clipboard.writeText('npm install @query-builder/solid-query-builder')
                }
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
            <h6>Optional Import: (default styling)</h6>
            <pre class="pre">
              <code>import '@query-builder/solid-query-builder/dist/index.css';</code>
              <button
                class="copy-button"
                onClick={() =>
                  navigator.clipboard.writeText('npm install @query-builder/solid-query-builder')
                }
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
          </section>
          <section>
            <h5>Usage:</h5>
            <pre class="pre">
              <code>
                {`<QueryBuilder
  initialQuery={MOCK_QUERY_DATA}
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
            <h5>JSON Data:</h5>
            <pre class="pre">
              <code>{JSON.stringify(MOCK_QUERY_DATA, null, 2)}</code>
            </pre>
          </section>
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
