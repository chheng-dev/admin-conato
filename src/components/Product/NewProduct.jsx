import React from "react";
import Layout from "../Layouts/Layout";
import FormProduct from "./FormProduct";

export default class NewProduct extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }

  }

  render(){
    return (
      <Layout>
        <FormProduct mode="new" />
      </Layout>
    )
  }
}