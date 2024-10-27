import type { Component } from 'solid-js';

// query builder lib import
import { QueryBuilder } from 'src';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <h1>SolidJS based Query Builder Demo</h1>
      <section>
        <QueryBuilder />
      </section>
    </div>
  );
};

export default App;
