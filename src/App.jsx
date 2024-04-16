import React from 'react'
import Todos from './components/Todos';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTodos from './components/AddTodos';

const App = () => {
  return (
    <BrowserRouter>
    <Provider store={store}>
<Routes>

<Route path='/' element={ <Todos/>}/>
<Route path='/add' element={<AddTodos/>}/>
</Routes>
    </Provider>
    </BrowserRouter>
  )
}

export default App