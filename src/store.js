import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/rootReducer';

// For integrating Chrome Extension for redux with react app
// const reduxChromeExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = {};
const middleware = [thunk];

// const store = createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middleware),
//     reduxChromeExtension
// ));

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default store;