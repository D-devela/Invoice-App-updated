import React, { useEffect, useRef } from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }) => {
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current.querySelectorAll('button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement?.focus();
      
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
      
      document.addEventListener('keydown', handleTab);
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleTab);
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <h2 className="heading-m">Confirm Deletion</h2>
        <p className="body">
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn-secondary" ref={cancelButtonRef} onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;