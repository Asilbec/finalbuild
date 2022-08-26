import React from 'react';
import { StateContext } from './context';
import Layout from './components/Layer';
import './App.css'
import './components/CssFolder/input.css'

const App = () => (
  <StateContext>
    <Layout>
    </Layout>
  </StateContext>
);

export default App;