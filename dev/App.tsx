import { createSignal, type Component } from 'solid-js';

// query builder lib import
import { QueryBuilder, type Not_Selection } from 'src';

import { MOCK_QUERY_DATA } from './mock-query-data';
import { FIELDSDATA, OPERATORS_DATA } from './mock-rule-data';

import styles from './App.module.css';

const App: Component = () => {
  const [disableQB, setDisableQB] = createSignal(false);
  const [showShiftActions, setShowShiftActions] = createSignal(true);
  const [allowDragAndDrop, setAllowDragAndDrop] = createSignal(true);
  const [addSingleRuleToGroup, setAddSingleRuleToGroup] = createSignal(true);
  const [showNotToggle, setShowNotToggle] = createSignal<Not_Selection>('both');

  return (
    <div class="app">
      <header class="header">
        <h1>SolidJS Query Builder</h1>
        <div class="right-header">
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
          <h2>Query Builder is an UI component to create complex queries and filters</h2>
          <h3>Supported features out of the box:</h3>
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
        <h3>Demo</h3>
        <section class="demo">
          <section class="left__section">
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
            <label class="label">
              <input
                type="radio"
                name="showNotToggle"
                value="both"
                checked={showNotToggle() === 'both'}
                onChange={() => setShowNotToggle('both')}
              />
              Show Not Toggle - Both
            </label>
            <label class="label">
              <input
                type="radio"
                name="showNotToggle"
                value="rule"
                checked={showNotToggle() === 'rule'}
                onChange={() => setShowNotToggle('rule')}
              />
              Show Not Toggle - Rule
            </label>
            <label class="label">
              <input
                type="radio"
                name="showNotToggle"
                value="rule_group"
                checked={showNotToggle() === 'rule_group'}
                onChange={() => setShowNotToggle('rule_group')}
              />
              Show Not Toggle - Rule Group
            </label>
            <label class="label">
              <input
                type="radio"
                name="showNotToggle"
                value="none"
                checked={showNotToggle() === 'none'}
                onChange={() => setShowNotToggle('none')}
              />
              Show Not Toggle - None
            </label>
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
      </main>
    </div>
  );
};

export default App;
