import React from "react";
import {render} from "react-dom";
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Main from "./components/main";
import reducers from "./reducers";




let initialState = '';

const store = applyMiddleware()(createStore,initialState);



render(

	<Provider store={store(reducers)}>
		<Main/>
	</Provider>
	,document.getElementById('root')

);

