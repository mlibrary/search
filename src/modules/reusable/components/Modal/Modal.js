import React from 'react'
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './Modal.css'

ReactModal.setAppElement('#root') // TODO make this configurable?

const Modal = ({
  children,
  isOpen,
  className,
  ...other
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="Modal__Content"
      overlayClassName="Modal__Overlay"
      {...other}
    >
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  className: PropTypes.string
};

Modal.defaultProps = {
  isOpen: false
};

export default Modal;
