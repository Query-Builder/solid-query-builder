import { createStore, reconcile } from 'solid-js/store';

type Reducer<State, Action> = (state: State, action: Action) => State;

export const useReducer = <State extends object, Action>(
  reducer: Reducer<State, Action>,
  initialState: State,
): [State, (action: Action) => void] => {
  const [store, setStore] = createStore(initialState);

  const dispatch = (action: Action) => {
    const newState = reducer(store, action);
    setStore(reconcile(newState));
  };

  return [store, dispatch];
};
