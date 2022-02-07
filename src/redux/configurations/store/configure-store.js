import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const history = createHashHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  })
  : compose;

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export {
  store, history, middlewares, rootReducer,
};
