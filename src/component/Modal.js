import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ModalCustom = ({ open, title, children, toggle }) => {
  return (
    <div>
        
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
};

export default ModalCustom;
