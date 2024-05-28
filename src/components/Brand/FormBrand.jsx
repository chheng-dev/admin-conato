import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { CFormInput } from "@coreui/react";
import BrandServiceApi from "../../services/BrandServices";

export default class FormBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      imagePreviewUrl: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === "edit") {
      this.fetchBrand(this.props.brandId);
    }
  }

  async fetchBrand(id) {
    try {
      const brand = await BrandServiceApi.getBrandById(id);
      this.setState({
        name: brand.name || "",
        description: brand.description || "",
        image: null,
        imagePreviewUrl: brand.image || ""
      });
    } catch (error) {
      console.error("Error fetching brand:", error);
      toast.error('Failed to fetch brand');
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ image: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, description, image } = this.state;

    if (!name || !description) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) formData.append('image', image);

      if (this.props.mode === 'new') {
        await BrandServiceApi.createBrand(formData);
        this.setState({
          name: "",
          description: "",
          image: null,
          imagePreviewUrl: ""
        });
      } else if (this.props.mode === 'edit') {
        await BrandServiceApi.updateBrand(this.props.brandId, formData);
      }

      toast.success(`${this.props.mode === 'new' ? 'Created' : 'Updated'} brand successfully`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit brand');
    }
  }

  render() {
    return (
      <CCard className="mt-4">
        <CCardHeader>
          {this.props.mode === 'edit' ? <h5>Edit Brand</h5> : <h5>Create Brand</h5>}
        </CCardHeader>
        <CCardBody>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="my-2">
              <CFormInput type="file" id="formImage" label="Image" onChange={this.handleImageChange} />
            </Form.Group>

            {this.state.imagePreviewUrl && (
              <Form.Group className="my-4">
                <img src={this.state.imagePreviewUrl} width={100} alt="Brand" />
              </Form.Group>
            )}

            <Button variant="primary" type="submit">
              {this.props.mode === "new" ? "Create" : "Update"}
            </Button>
          </Form>
        </CCardBody>
      </CCard>
    );
  }
}
