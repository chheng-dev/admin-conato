import React from "react";
import Layout from "../Layouts/Layout";
import FormBrand from "./FormBrand";

export default class NewBrand extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      brands: []
    }
  }

  render(){
    return (
      <Layout>
        <FormBrand mode="new" brands={this.state.brands} />
      </Layout>
    )
  }
}