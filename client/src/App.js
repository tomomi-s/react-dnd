import React from 'react'

import { Provider } from 'react-redux';
import store from './store';
import './assets/style/style.css';

import Home from './components/Home'
const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App