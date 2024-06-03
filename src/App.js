// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Pages/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import Settings from './components/Pages/Setting';

import Category from './components/Pages/Category';
import NewCategory from './components/Category/NewCategory';
import EditCategory from './components/Category/EditCategory';

import Brand from './components/Pages/Brand';
import NewBrand from './components/Brand/NewBrand';
import EditBrand from './components/Brand/EditBrand';

import Product from './components/Pages/Product';
import NewProduct from './components/Product/NewProduct';
import EditProduct from './components/Product/EditProduct';

import UserProfile from "./components/Pages/Profile";

import withAuthorization from './withAuthorization';
import { permissions } from './roles';

import { UserProvider } from './UserContext';

const App = () => {

  const ProtectedDashboard = withAuthorization(Dashboard, permissions.VIEW_DASHBOARD);
  const ProtectedEditProduct = withAuthorization(EditProduct, permissions.EDIT_PRODUCT);
  

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={ProtectedDashboard} />

          <PrivateRoute exact path="/settings" component={Settings} />

          <PrivateRoute exact path="/categories" component={Category} />
          <PrivateRoute path="/category/new" component={NewCategory} />
          <PrivateRoute path="/category/edit/:id" component={EditCategory} />

          <PrivateRoute exact path="/brands" component={Brand} />
          <PrivateRoute path="/brand/new" component={NewBrand} />
          <PrivateRoute path="/brand/edit/:id" component={EditBrand} />

          <PrivateRoute path="/products" component={Product} />
          <PrivateRoute path="/product/new" component={NewProduct} />
          <PrivateRoute path="/product/edit/:id" component={ProtectedEditProduct} />

          <PrivateRoute exact path="/user/profile" component={UserProfile} />

          <PrivateRoute exact path="/users" component={UserProfile} />


        </Switch>
      </Router>
    </UserProvider>

  );
};

export default App;
