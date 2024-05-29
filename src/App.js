// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Pages/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import Profile from './components/Pages/Profile';
import Settings from './components/Pages/Setting';

import Category from './components/Pages/Category';
import NewCategory from './components/Category/NewCategory';
import EditCategory from './components/Category/EditCategory';

import Brand from './components/Pages/Brand';
import NewBrand from './components/Brand/NewBrand';
import EditBrand from './components/Brand/EditBrand';

import Product from './components/Pages/Product';
import NewProduct from './components/Product/NewProduct';
import EditProduct from './components/Product/EditProduct.jsx';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Dashboard} />

        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/settings" component={Settings} />

        <PrivateRoute exact path="/categories" component={Category} />
        <PrivateRoute path="/category/new" component={NewCategory} />
        <PrivateRoute path="/category/edit/:id" component={EditCategory} />

        <PrivateRoute exact path="/brands" component={Brand} />
        <PrivateRoute path="/brand/new" component={NewBrand} />
        <PrivateRoute path="/brand/edit/:id" component={EditBrand} />

        <PrivateRoute path="/products" component={Product} />
        <PrivateRoute path="/product/new" component={NewProduct} />
        <PrivateRoute path="/product/edit/:id" component={EditProduct} />


      </Switch>
    </Router>
  );
};

export default App;
