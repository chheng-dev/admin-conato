import React from "react";
import Layout from "../Layouts/Layout";
import FormCategory from "./FormCategory";

export default class EditCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categories: []
    }
  }

  render(){
    return (
      <Layout>
        <FormCategory mode='edit' categoryId={this.props.match.params.id} />
      </Layout>
    )
  }
}