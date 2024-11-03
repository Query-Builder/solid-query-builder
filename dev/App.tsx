import type { Component } from 'solid-js';

// query builder lib import
import { QueryBuilder } from 'src';

import { MOCK_QUERY_DATA } from './mock-query-data';
import { FIELDSDATA, OPERATORS_DATA } from './mock-rule-data';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <h1>SolidJS based Query Builder Demo</h1>
      <section class="query-builder__section">
        <QueryBuilder
          initialQuery={MOCK_QUERY_DATA}
          fields={FIELDSDATA}
          operators={OPERATORS_DATA}
        />
      </section>
    </div>
  );
};

export default App;
