import React from "react";
import Layout from "../Layouts/Layout";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Space, Table, Modal } from 'antd';
import { toast } from 'react-toastify';
import BrandServiceApi from "../../services/BrandServices";


export default class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      openPopOver: false,
      showConfirmModal: false,
      deleteRecordSlug: null,
    };
    this.handleOpenPopOverChange = this.handleOpenPopOverChange.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    this.fetchBrands();
  }

  async fetchBrands() {
    try {
      const result = await BrandServiceApi.getBrandList();
      this.setState({ brands: result });
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  onClickNewCategory(){
    window.location = "/brand/new";
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
      await BrandServiceApi.deleteBrandBySlug(deleteRecordSlug);
      this.fetchBrands();
      toast.success('Category deleted successfully.');
    } catch (error) {
      console.error('Error executing delete category:', error);
      toast.error('Failed to delete category.');
    }
    this.setState({ showConfirmModal: false });
  }

  render() {
    const columns = [
      {
        title: 'Id',
        key: 'id',
        render: (text, record, index) => index + 1
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => <img src={text} width={60}/>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href={`/brand/edit/${record.slug}`}>{text}</a>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        responsive: ['md'],
        render: (text) => text,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space>
            <a href={`/brand/edit/${record.slug}`}>
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
            <h4>Brands</h4>
            <button className="btn btn-sm btn-primary" onClick={this.onClickNewCategory}>New Brand</button>
          </div>
          </CCardHeader>
          <CCardBody>
            <Table columns={columns} dataSource={this.state.brands} />
            <Modal
              title="Confirm Delete"
              visible={this.state.showConfirmModal}
              onOk={this.handleConfirmDelete}id
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
