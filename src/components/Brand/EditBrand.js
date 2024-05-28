import React from "react";
import Layout from "../Layouts/Layout";
import FormBrand from "./FormBrand";

export default class EditBrand extends React.Component{
  render(){
    return (
      <Layout>
        <FormBrand mode='edit' brandId={this.props.match.params.id} />
      </Layout>
    )
  }
}