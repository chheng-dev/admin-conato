import React from "react";
import Layout from "../Layouts/Layout";
import { CCard, CCardBody, CCardHeader, CBadge } from "@coreui/react";
import { Space, Table, Modal } from 'antd';
import CategoryServiceApi from "../../services/CategoryServices";
import { toast } from 'react-toastify';
import ProductServiceApi from "../../services/ProductServices";
import ProductCategoryBadge from "../sd/ProductCategoryBadge";
import moment from 'moment';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      openPopOver: false,
      showConfirmModal: false,
      deleteRecordSlug: null,
    };
    this.handleOpenPopOverChange = this.handleOpenPopOverChange.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    this.fetchProductList();
  }

  async fetchProductList() {
    try {
      const result = await ProductServiceApi.getProductList();
      this.setState({ products: result });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  onClickNewProduct(){
    window.location = "/product/new";
  }

  handleOpenPopOverChange(visible){
    this.setState({openPopOver: visible})
  }

  handleCancelDelete(){
    this.setState({ showConfirmModal: false });
  }

  async handleConfirmDelete(){
    const { deleteRecordSlug } = this.state;
    try {
      await ProductServiceApi.deleteProductBySlug(deleteRecordSlug);
      this.fetchProductList();
      toast.success('Product deleted successfully.');
    } catch (error) {
      console.error('Error executing delete product:', error);
      toast.error('Failed to delete product.');
    }
    this.setState({ showConfirmModal: false });
  }

  render() {
    const columns = [
      {
        title: 'Id',
        key: 'id',
        width: 80,
        render: (text, record, index) => index + 1
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href={`/product/edit/${record.slug}`}>{text}</a>,
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key:  'image',
        render: (text, record) => <img src={text} width={60}/>,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        responsive: ['md'],
      },
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty',
        responsive: ['md'],
      },
      {
        title: 'Category',
        dataIndex: 'category_id',
        key: 'category_id',
        responsive: ['md'],
        render: (text, record) => (
          <ProductCategoryBadge category={record.category} />
        ),
      },
      {
        title: 'Brand',
        dataIndex: 'brand_id',
        key: 'brand_id',
        responsive: ['md'],
        render: (text, record) => record.brand.name,
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        responsive: ['md'],
        render: (createdAt) => moment(createdAt).format('YYYY-MM-DD')
      },
      {
        title: 'Update At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        responsive: ['md'],
        render: (createdAt) => moment(createdAt).format('YYYY-MM-DD')
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: 100,    
        render: (text, record) => (
          <Space>
            <a href={`/product/edit/${record.slug}`}>
              Edit
            </a>
            <a
              type="danger"
              className="text-danger"
              onClick={() => {
                this.setState({
                  showConfirmModal: true,
                  deleteRecordSlug: record.slug,
                });
              }}
            >
              Delete
            </a>
          </Space>
        ),
        responsive: ['lg'],
      },
    ];

    return (
      <Layout>
        <CCard className="mt-4">
          <CCardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h4>Product List</h4>
            <button className="btn btn-sm btn-primary" onClick={this.onClickNewProduct}>New Product</button>
          </div>
          </CCardHeader>
          <CCardBody>
            <Table columns={columns} 
              dataSource={this.state.products} 
              scroll={{
                x: 1300,
              }}/>
            <Modal
              title="Confirm Delete"
              visible={this.state.showConfirmModal}
              onOk={this.handleConfirmDelete}
              onCancel={this.handleCancelDelete}
            >
          <p>Are you sure you want to delete this category?</p>
        </Modal>
          </CCardBody>
        </CCard>
      </Layout>
    );
  }
}
