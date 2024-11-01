import { createStore, produce } from 'solid-js/store';

type Reducer<State, Action> = (state: State, action: Action) => State;

export const useReducer = <State extends object, Action>(
  reducer: Reducer<State, Action>,
  initialState: State,
): [State, (action: Action) => void] => {
  const [store, setStore] = createStore<State>(initialState);

  const dispatch = (action: Action) => {
    setStore(
      produce(store => {
        reducer(store, action);
      }),
    );
  };

  return [store, dispatch];
};
