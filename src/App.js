import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/configurations/store/configure-store';
import AppRouter from './appRouter';

const App = () => (
  <div className="fullHeight">
    <Provider store={store}>
      <AppRouter history={history} />
    </Provider>
  </div>
);

export default App;
