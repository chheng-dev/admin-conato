import React from "react";
import Layout from "../Layouts/Layout";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { Space, Table, Modal } from 'antd';
import CategoryServiceApi from "../../services/CategoryServices";
import { toast } from 'react-toastify';


export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      openPopOver: false,
      showConfirmModal: false,
      deleteRecordId: null,
    };
    this.handleOpenPopOverChange = this.handleOpenPopOverChange.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    try {
      const result = await CategoryServiceApi.getCategoriesList();
      this.setState({ categories: result });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  onClickNewCategory(){
    window.location = "/category/new";
  }

  handleOpenPopOverChange(visible){
    this.setState({openPopOver: visible})
  }

  handleCancelDelete(){
    this.setState({ showConfirmModal: false });
  }

  async handleConfirmDelete(){
    const { deleteRecordId } = this.state;
    try {
      await CategoryServiceApi.deleteCategoryById(deleteRecordId);
      this.fetchCategories();
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a href={`/category/edit/${record.id}`}>{text}</a>,
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        responsive: ['md'],
        render: (text) => <input type="color" value={text} width={80} disabled/>
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space>
            <a href={`/category/edit/${record.id}`}>
              Edit
            </a>
            <a
              type="danger"
              className="text-danger"
              onClick={() => {
                this.setState({
                  showConfirmModal: true,
                  deleteRecordId: record.id,
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
            <h4>Categories List</h4>
            <button className="btn btn-sm btn-primary" onClick={this.onClickNewCategory}>New Category</button>
          </div>
          </CCardHeader>
          <CCardBody>
            <Table columns={columns} dataSource={this.state.categories} />
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
