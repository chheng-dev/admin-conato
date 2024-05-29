import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { CFormInput } from "@coreui/react";
import BrandServiceApi from "../../services/BrandServices";
import Select from 'react-select';
import CategoryServiceApi from "../../services/CategoryServices";
import PriceInput from "../sd/PriceInput";
import ProductServiceApi from "../../services/ProductServices";

export default class FormProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      qty: 1,
      image: null,
      imagePreviewUrl: "",
      images: [],
      imagesPreviewUrls: [],
      categoryOptions: [],
      brandOptions: [],
      amount: 1,
      selectedCategory: null,
      selectedBrand: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImagesChange = this.handleImagesChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === "edit") {
      this.fetchProductById(this.props.productId);
    }
    this.fetchCategoryOptions();
    this.fetchBrandOptions();
  }

  async fetchProductById(id) {
    try {
      const product = await ProductServiceApi.getProductById(id);
      this.setState({
        name: product.name || "",
        description: product.description || "",
        qty: product.qty || 1,
        amount: product.price || 1,
        image: product.image || null,
        imagePreviewUrl: product.image || null,
        imagesPreviewUrls: product.images || null,
        selectedCategory: {
          label: product.category.name,
          value: product.category.name,
          id: product.category.id
        },
        selectedBrand : {
          label: product.brand.name,
          value: product.brand.name,
          id: product.brand.id
        }
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

  handleImagesChange(event) {
    const files = Array.from(event.target.files);
    if(files.length) {
      const previewUrls = files.map(file => URL.createObjectURL(file));
      this.setState({ images: files, imagesPreviewUrls: previewUrls });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, description, image, images, selectedCategory, selectedBrand, qty, amount } = this.state;

    if (!name || !image || !selectedCategory || !selectedBrand || !qty || !amount) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category_id', selectedCategory.id);
      formData.append('brand_id', selectedBrand.id);
      formData.append('price', amount);
      formData.append('qty', qty);

      if (image) formData.append('image', image);

      if(images.length) {
        images.forEach((image, idx) => {
          formData.append(`images`, image)
        });
      } 

      if (this.props.mode === 'new') {
        await ProductServiceApi.createProduct(formData);
        this.setState({
          name: "",
          description: "",
          image: null,
          images: [],
          imagePreviewUrl: null,
          imagesPreviewUrls: [],
          selectedCategory: null,
          selectedBrand: null,
        });
      } else if (this.props.mode === 'edit') {
        await ProductServiceApi.updateProduct(this.props.productId, formData);
      }

      toast.success(`${this.props.mode === 'new' ? 'Created' : 'Updated'} product successfully`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit product');
    }
  }

  async fetchCategoryOptions(){
    try {
      const result = await CategoryServiceApi.getCategoriesList();
      const categoryOptions = result.map((item) => ({
        id: item.id,
        value: item.name.toLowerCase().replace(/\s+/g, '-'),
        label: item.name,
      }));        
      this.setState({ categoryOptions: categoryOptions });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async fetchBrandOptions(){
    try {
      const result = await BrandServiceApi.getBrandList();
      const brandOptions = result.map((item) => ({
        id: item.id,
        value: item.name.toLowerCase().replace(/\s+/g, '-'),
        label: item.name,
      }));  
      
      this.setState({ brandOptions: brandOptions });
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  handleCategoryChange(selectedOption){
    this.setState({ selectedCategory: selectedOption });
  }

  handleBrandChange(selectedOption){
    this.setState({ selectedBrand: selectedOption });
  }

  render() {
    return (
      <CCard className="mt-4">
        <CCardHeader>
          {this.props.mode === 'edit' ? <h5>Edit Product</h5> : <h5>Create Product</h5>}
        </CCardHeader>
        <CCardBody>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
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
              />
            </Form.Group>

            <div className="d-flex justify-content-between gap-4">
              <Form.Group controlId="formPrice" className="my-2 w-50">
                <Form.Label>Price</Form.Label>
                <PriceInput
                  value={this.state.amount}
                  onChange={(value) => this.setState({ amount: value })}
                />
              </Form.Group>

              <Form.Group controlId="formQty" className="my-2 w-50">
                <Form.Label>Qty</Form.Label>
                <CFormInput type="number" 
                  min={1} 
                  placeholder="Qty" 
                  name="qty"
                  value={this.state.qty}
                  onChange={this.handleInputChange}
                  />
              </Form.Group>
            </div>

            <div className="d-flex justify-content-between gap-4">
              <Form.Group controlId="formCateogry" className="my-2 w-50">
                <Form.Label>Cateogry</Form.Label>
                <Select 
                  value={this.state.selectedCategory}
                  onChange={this.handleCategoryChange}
                  options={this.state.categoryOptions} 
                />
              </Form.Group>

              <Form.Group controlId="formBrand" className="my-2 w-50">
                <Form.Label>Brand</Form.Label>
                <Select 
                  value={this.state.selectedBrand}
                  onChange={this.handleBrandChange}
                  options={this.state.brandOptions} 
                />
              </Form.Group>
            </div>

            <Form.Group controlId="formImage" className="my-2">
              <CFormInput
                type="file"
                id="formImage"
                label="Image"
                onChange={this.handleImageChange}
              />

              {this.state.imagePreviewUrl && (
                <Form.Group className="my-4">
                  <img src={this.state.imagePreviewUrl} width={100} alt="Product Image" className="img-card" />
                </Form.Group>
              )}
            </Form.Group>

            <Form.Group controlId="formImage" className="my-2">
              <CFormInput
                type="file"
                id="formImages"
                label="Images"
                multiple
                onChange={this.handleImagesChange}
              />

              {this.state.imagesPreviewUrls.length > 0 && (
                <Form.Group className="my-4">
                  {this.state.imagesPreviewUrls.map((url, index) => (
                    <img key={index} src={url} width={100} alt={`Preview ${index}`} className="img-card" />
                  ))}
                </Form.Group>
              )}

            </Form.Group>
            
            <Button variant="primary" type="submit">
              {this.props.mode === "new" ? "Create" : "Update"}
            </Button>
          </Form>
        </CCardBody>
      </CCard>
    );
  }
}
