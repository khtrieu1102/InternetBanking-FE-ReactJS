import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
// import thunk from "redux-thunk";

import reducer from "./reducers/index";

const store = createStore(
	reducer,
	applyMiddleware(
		promise,
		logger // lets us dispatch() functions
		// thunk // neat middleware that logs actions
	)
);

export default store;
