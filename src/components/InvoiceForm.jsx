import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = ({ onSubmit, initialData = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    clientName: '',
    clientEmail: '',
    dueDate: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    paymentTerms: 'Net 30 Days',
    projectDescription: '',
    items: [{ name: '', quantity: 1, price: 0 }]
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName?.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.clientEmail?.trim()) {
      newErrors.clientEmail = 'Client email is required';
    } else if (!emailRegex.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Valid email is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.items?.length) {
      newErrors.items = 'At least one item is required';
    } else {
      formData.items.forEach((item, idx) => {
        if (!item.name?.trim()) {
          newErrors[`items.${idx}.name`] = 'Item name required';
        }
        if (item.quantity <= 0) {
          newErrors[`items.${idx}.quantity`] = 'Quantity must be positive';
        }
        if (item.price <= 0) {
          newErrors[`items.${idx}.price`] = 'Price must be positive';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, status = 'pending') => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    onSubmit({ ...formData, status, total });
    navigate('/');
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { name: '', quantity: 1, price: 0 }] });
  };

  return (
    <form className="invoice-form" onSubmit={(e) => e.preventDefault()}>
      <h2 className="heading-m">{initialData ? `Edit #${initialData.id}` : 'New Invoice'}</h2>

      <div className="form-section">
        <h3 className="heading-s-variant">Bill From</h3>
        <div className="form-group">
          <label>Street Address <span className="required-star">*</span></label>
          <input defaultValue="19 Union Terrace" />
        </div>
        <div className="form-grid">
          <div className="form-group"><label>City</label><input defaultValue="London" /></div>
          <div className="form-group"><label>Post Code</label><input defaultValue="E1 3EZ" /></div>
          <div className="form-group"><label>Country</label><input defaultValue="United Kingdom" /></div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="heading-s-variant">Bill To</h3>
        <div className="form-group">
          <label>Client's Name <span className="required-star">*</span></label>
          <input 
            className={errors.clientName ? 'error' : ''}
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
          {errors.clientName && <span className="error-message">{errors.clientName}</span>}
        </div>
        <div className="form-group">
          <label>Client's Email <span className="required-star">*</span></label>
          <input 
            type="email"
            className={errors.clientEmail ? 'error' : ''}
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          />
          {errors.clientEmail && <span className="error-message">{errors.clientEmail}</span>}
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input defaultValue="84 Church Way" />
        </div>
        <div className="form-grid">
          <div className="form-group"><label>City</label><input defaultValue="Bradford" /></div>
          <div className="form-group"><label>Post Code</label><input defaultValue="BD1 9PB" /></div>
          <div className="form-group"><label>Country</label><input defaultValue="United Kingdom" /></div>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Invoice Date <span className="required-star">*</span></label>
          <input 
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Due Date <span className="required-star">*</span></label>
          <input 
            type="date"
            className={errors.dueDate ? 'error' : ''}
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Payment Terms</label>
        <select 
          value={formData.paymentTerms}
          onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
        >
          <option>Net 1 Day</option><option>Net 7 Days</option><option>Net 14 Days</option>
          <option>Net 30 Days</option><option>Net 60 Days</option>
        </select>
      </div>

      <div className="form-group">
        <label>Project Description</label>
        <input 
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          placeholder="e.g. Graphic Design Service"
        />
      </div>

      <div className="items-section">
        <h3 className="heading-s">Item List</h3>
        <div className="items-header">
          <span>Item Name</span><span>Qty.</span><span>Price</span><span>Total</span>
        </div>
        {formData.items.map((item, idx) => (
          <div key={idx} className="item-row">
            <input 
              placeholder="Item name"
              className={errors[`items.${idx}.name`] ? 'error' : ''}
              value={item.name}
              onChange={(e) => updateItem(idx, 'name', e.target.value)}
            />
            <input 
              type="number" 
              className={errors[`items.${idx}.quantity`] ? 'error' : ''}
              value={item.quantity}
              onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)}
            />
            <input 
              type="number" 
              className={errors[`items.${idx}.price`] ? 'error' : ''}
              value={item.price}
              onChange={(e) => updateItem(idx, 'price', parseFloat(e.target.value) || 0)}
            />
            <span>£ {(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
        <button type="button" className="add-item-btn" onClick={addItem}>+ Add New Item</button>
        {errors.items && <span className="error-message">{errors.items}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        <button type="button" className="btn-draft" onClick={(e) => handleSubmit(e, 'draft')}>Save as Draft</button>
        <button type="button" className="btn-primary" onClick={(e) => handleSubmit(e, 'pending')}>Save & Send</button>
      </div>
    </form>
  );
};

export default InvoiceForm;