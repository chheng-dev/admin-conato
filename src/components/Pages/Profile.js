import React from 'react';
import Layout from '../Layouts/Layout';
import { CCard, CCardBody, CAvatar } from '@coreui/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Form, Button } from "react-bootstrap";
import UserService from '../../services/UserService';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      imagePreviewUrl: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImagesChange = this.handleImagesChange.bind(this);
  }

  componentDidMount(){
    this.getUserProfile();
  }

  async getUserProfile(){
    const token = sessionStorage.getItem('token');
    try{
      const result = await UserService.getUserProfile(token);
      this.setState({ 
      username: result.username,
        email: result.email,
        password: result.password,
        image: result.image,
        imagePreviewUrl: result.image || null
       });
    } catch(err){
      console.error('Token not found', err);
    }
  }

  handleInputChange(event){
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleImagesChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ image: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }

  renderProfile(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <div className='row justify-content-between align-items-center'>
          <div className='col-8'>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder='Enter username'
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className='mt-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder='email@gmail.com'
              />
            </Form.Group>
          </div>
          <div className='col-4 text-center'>
            {this.state.imagePreviewUrl && (
              <CAvatar color="primary" style={{ "width": "8rem", "height": "8rem" }}>
                <img src={this.state.imagePreviewUrl} className='avatar-img' />
              </CAvatar>
            )}
          </div>
        </div>

        <Form.Group controlId="formEmail" className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder='Enter password'
          />
        </Form.Group>

        <Form.Group controlId="formImage" className='mt-2'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={this.handleImagesChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-4'>
          Update Setting
        </Button>
      </Form>
    )
  }

  render(){
    return(
      <Layout>
        <h4 className='mt-4'>Profile Settings</h4>
        <CCard className='mt-4'>
          <CCardBody className='my-4'>
          <Tabs>
            <div className='d-flex justify-content-between align-items-start'>
              <TabList className="tab-title">
                <Tab>General</Tab>
                <Tab>User Management</Tab>
                <Tab>Roles</Tab>
                <Tab>Permissions</Tab>
              </TabList>

              <div className='tab-panel'>
                <TabPanel>
                  { this.renderProfile() }
                </TabPanel>
                <TabPanel>
                  <UserManagement/>
                </TabPanel>
                <TabPanel>
                  <RoleManagement/>
                </TabPanel>
                <TabPanel>
                  <PermissionManagement/>
                </TabPanel>
              </div>
            </div>
          </Tabs>
          </CCardBody>
        </CCard>
      </Layout>
    )
  }
}
