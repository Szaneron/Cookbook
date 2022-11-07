import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Recipes } from './components/recipes';
import { RecipesForm } from './components/recipes/create';
import { Recipe } from './components/recipeDetails';
import { Products } from './components/products/products';
import { Product } from './components/productDetails/product';
import { RecipeEdit } from './components/recipeEdit/recipeEdit';
import { Login } from './components/userAuth/login';
import { Register } from './components/userAuth/register';
import { AddIngredients } from './components/recipeIngredients/addIngredients';
import { HomePage } from './components/homePage/homePage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="recipes" element={<Recipes />}></Route>
          <Route path="recipe/create" element={<RecipesForm />}></Route>
          <Route path="recipe/:id" element={<Recipe />}></Route>
          <Route path="recipe/:id/edit" element={<RecipeEdit />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<Product />}></Route>
          <Route path="auth/sign_in" element={<Login />}></Route>
          <Route path="auth/sign_up" element={<Register />}></Route>
          <Route
            path="recipe/:id/addIngredients"
            element={<AddIngredients />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
