// App.js
import React from 'react';
import './App.css';
import './components/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CardsDetails from './components/CardsDetails';
import Cards from './components/Cards';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </>
  );
}

export default App;
