import React from "react";

import "./scss/app.scss";

import Header from "./components/Header";

import Home from "./pages/Home";

import NotFound from "./pages/NotFound";

import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

export const SearchContext = React.createContext("");
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="pizza/:id" element={<FullPizza />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
