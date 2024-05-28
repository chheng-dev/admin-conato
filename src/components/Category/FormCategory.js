import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CategoryServiceApi from "../../services/CategoryServices";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';



export default class FormCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      categoryName: '',
      categoryColor: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.mode === "edit"){
      this.fetchCategory(this.props.categoryId);
    }
  }

  async fetchCategory(id){
    try {
      const category = await CategoryServiceApi.getCategoryById(id);
      this.setState({
        categoryName: category.name || "",
        categoryColor: category.color || ""
      });
    } 
    catch (error){
      console.error("Error fetching category:", error);
      toast.error('Failed to submit category');
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const { categoryName, categoryColor } = this.state;

    if (!categoryName) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      if (this.props.mode === 'new') {
        const formData ={
          name: categoryName, 
          color: categoryColor
        }

        await CategoryServiceApi.createCategory(formData);
      } else if (this.props.mode === 'edit') {
        await CategoryServiceApi.updateCategoryById(this.props.categoryId, {
          name: categoryName,
          color: categoryColor,
        });
      }

      toast.success(`${this.props.mode === 'new' ? 'Created' : 'Updated'} category successfully`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit category');
    }
  }


  render(){
    return (
      <CCard className="mt-4">
        <CCardHeader>
          {
            this.props.mode == 'edit' ? 
            <h5>Edit Category</h5>
            : <h5>Create Category</h5>
          }
        </CCardHeader>
        <CCardBody>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={this.state.categoryName}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategoryColor" className="my-2">
              <Form.Label>Category Color</Form.Label>
              <Form.Control
                type="color"
                name="categoryColor"
                value={this.state.categoryColor}
                onChange={this.handleInputChange}
                width='200px'
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {this.props.mode === "new" ? "Create" : "Update"}
            </Button>
          </Form>
        </CCardBody>
      </CCard>
    )
  }
}