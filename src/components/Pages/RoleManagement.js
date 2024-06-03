import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [newRole, setNewRole] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = () => {
    setRoles([...roles, newRole]);
    setNewRole('');
    handleClose();
  };

  return (
    <div>
      <h2>Role Management</h2>
      <Button variant="primary" onClick={handleShow}>Add Role</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoleName">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={newRole} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleManagement;
