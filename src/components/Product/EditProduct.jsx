import React from "react";
import Layout from "../Layouts/Layout";
import FormProduct from "./FormProduct";

export default class EditProduct extends React.Component{
  render(){
    return (
      <Layout>
        <FormProduct mode='edit' slug={this.props.match.params.id} />
      </Layout>
    )
  }
}