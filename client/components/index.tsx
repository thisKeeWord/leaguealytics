import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
// import store from './store'
import App from './App'


// <ReduxProvider store={store}>
// </ReduxProvider>
ReactDOM.render(<App />,
  document.getElementById('content')
)