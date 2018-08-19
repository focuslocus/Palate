import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const render = Component => {
  ReactDOM.render(
		<BrowserRouter>
    	<Component />
		</BrowserRouter>,
    document.getElementById('root')
  )
}

render(App);

// TODO setup environment distinctions
module.hot.accept('./App', () => {
  render(App)
})
