import React from "react";
import Layout from "../Layouts/Layout";
import FormCategory from "./FormCategory";

export default class NewCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categories: []
    }
  }

  render(){
    return (
      <Layout>
        <FormCategory mode="new" categories={this.state.categories} />
      </Layout>
    )
  }
}