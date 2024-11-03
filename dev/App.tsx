import { createSignal, type Component } from 'solid-js';

// query builder lib import
import { QueryBuilder, type Not_Selection } from 'src';

import { MOCK_QUERY_DATA } from './mock-query-data';

import styles from './App.module.css';

const App: Component = () => {
  const [disableQB, setDisableQB] = createSignal(false);
  const [showShiftActions, setShowShiftActions] = createSignal(true);
  const [allowDragAndDrop, setAllowDragAndDrop] = createSignal(true);
  const [addSingleRuleToGroup, setAddSingleRuleToGroup] = createSignal(true);
  const [showNotToggle, setShowNotToggle] = createSignal<Not_Selection>('both');

  return (
    <div class={styles.App}>
      <h1>SolidJS based Query Builder Demo</h1>
      <main class="main">
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
        <section class="query-builder__section">
          <QueryBuilder
            initialQuery={MOCK_QUERY_DATA}
            showShiftActions={showShiftActions()}
            allowDragAndDrop={allowDragAndDrop()}
            disabled={disableQB()}
            addSingleRuleToGroup={addSingleRuleToGroup()}
            showNotToggle={showNotToggle()}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
