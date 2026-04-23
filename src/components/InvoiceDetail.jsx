import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import DeleteModal from './DeleteModal';

const InvoiceDetail = ({ invoices, onUpdate, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = invoices.find(inv => inv.id === id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!invoice) return <div>Invoice not found</div>;

  const handleMarkAsPaid = () => {
    if (invoice.status === 'pending') {
      onUpdate({ ...invoice, status: 'paid' });
    }
  };

  const canMarkAsPaid = invoice.status === 'pending';
  const canEdit = invoice.status !== 'paid';

  return (
    <>
      <Link to="/" className="go-back">
        <span>←</span> Go back
      </Link>

      <div className="status-bar">
        <div className="status-label">
          <span className="body">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="action-buttons">
          {canEdit && (
            <button className="btn-secondary" onClick={() => navigate(`/invoice/edit/${id}`)}>
              Edit
            </button>
          )}
          <button className="btn-delete" onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
          {canMarkAsPaid && (
            <button className="btn-primary" onClick={handleMarkAsPaid}>
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="details-card">
        <div className="details-header">
          <div>
            <h2 className="heading-s">#{invoice.id}</h2>
            <p className="body">{invoice.projectDescription || 'Graphic Design'}</p>
          </div>
          <div className="address">
            <p className="body">19 Union Terrace</p>
            <p className="body">London</p>
            <p className="body">E1 3EZ</p>
            <p className="body">United Kingdom</p>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <p className="body-variant">Invoice Date</p>
            <p className="heading-s">{invoice.invoiceDate || '21 Aug 2021'}</p>
            <p className="body-variant" style={{ marginTop: 16 }}>Payment Due</p>
            <p className="heading-s">{invoice.dueDate}</p>
          </div>
          <div>
            <p className="body-variant">Bill To</p>
            <p className="heading-s">{invoice.clientName}</p>
            <p className="body">84 Church Way</p>
            <p className="body">Bradford</p>
            <p className="body">BD1 9PB</p>
            <p className="body">United Kingdom</p>
          </div>
          <div>
            <p className="body-variant">Sent to</p>
            <p className="heading-s">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="items-table">
          <div className="items-header">
            <span>Item Name</span><span>QTY</span><span>Price</span><span>Total</span>
          </div>
          {invoice.items && invoice.items.length > 0 ? invoice.items.map((item, idx) => (
            <div key={idx} className="item-row">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>£ {item.price.toFixed(2)}</span>
              <span>£ {(item.quantity * item.price).toFixed(2)}</span>
            </div>
          )) : (
            <>
              <div className="item-row"><span>Banner Design</span><span>1</span><span>£ 156.00</span><span>£ 156.00</span></div>
              <div className="item-row"><span>Email Design</span><span>2</span><span>£ 200.00</span><span>£ 400.00</span></div>
            </>
          )}
          <div className="grand-total">
            <span>Amount Due</span>
            <span>£ {invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(id);
          navigate('/');
        }}
        invoiceId={invoice.id}
      />
    </>
  );
};

export default InvoiceDetail;