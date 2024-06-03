import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [show, setShow] = useState(false);
  const [newPermission, setNewPermission] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNewPermission(e.target.value);
  };

  const handleSubmit = () => {
    setPermissions([...permissions, newPermission]);
    setNewPermission('');
    handleClose();
  };

  return (
    <div>
      <h2>Permission Management</h2>
      <Button variant="primary" onClick={handleShow}>Add Permission</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index}>
              <td>{permission}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPermissionName">
              <Form.Label>Permission</Form.Label>
              <Form.Control type="text" value={newPermission} onChange={handleChange} />
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

export default PermissionManagement;
