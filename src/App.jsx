import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';
import ThemeToggle from './components/ThemeToggle';

const STORAGE_KEY = 'invoices';

// Navbar Component
const Navbar = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Invoice App</span>
        </Link>
        <div className="navbar-right">
          <ThemeToggle />
          <div className="profile-section">
            <span className="profile-id">John Doe</span>
            <div className="profile-avatar">JD</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'RT3080', clientName: 'Jensen Huang', clientEmail: 'jensen@example.com', dueDate: '19 Aug 2021', invoiceDate: '19 Aug 2021', total: 1800.90, status: 'paid', items: [{ name: 'Banner Design', quantity: 1, price: 1800.90 }] },
      { id: 'XM9141', clientName: 'Alex Grim', clientEmail: 'alex@example.com', dueDate: '20 Sep 2021', invoiceDate: '21 Aug 2021', total: 556.00, status: 'pending', items: [{ name: 'Banner Design', quantity: 1, price: 156.00 }, { name: 'Email Design', quantity: 2, price: 200.00 }] },
      { id: 'RG0314', clientName: 'John Morrison', clientEmail: 'john@example.com', dueDate: '01 Oct 2021', invoiceDate: '01 Sep 2021', total: 14002.33, status: 'pending', items: [] },
      { id: 'RT2080', clientName: 'Alysa Werner', clientEmail: 'alysa@example.com', dueDate: '12 Oct 2021', invoiceDate: '12 Sep 2021', total: 102.04, status: 'pending', items: [] },
      { id: 'AA1449', clientName: 'Melissa Clarke', clientEmail: 'melissa@example.com', dueDate: '14 Oct 2021', invoiceDate: '14 Sep 2021', total: 4032.33, status: 'pending', items: [] },
      { id: 'TY9141', clientName: 'Thomas Wayne', clientEmail: 'thomas@example.com', dueDate: '31 Oct 2021', invoiceDate: '01 Oct 2021', total: 6155.91, status: 'pending', items: [] },
      { id: 'FV2353', clientName: 'Anita Weimwright', clientEmail: 'anita@example.com', dueDate: '12 Nov 2021', invoiceDate: '12 Oct 2021', total: 3102.04, status: 'draft', items: [] }
    ];
  });

  const saveInvoices = (newInvoices) => {
    setInvoices(newInvoices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newInvoices));
  };

  const createInvoice = (invoice) => {
    const newInvoice = { 
      ...invoice, 
      id: `RT${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString()
    };
    saveInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    saveInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  };

  const deleteInvoice = (id) => {
    saveInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <InvoiceList 
                invoices={invoices} 
                onDelete={deleteInvoice}
                onMarkAsPaid={(id) => updateInvoice({ ...invoices.find(i => i.id === id), status: 'paid' })}
              />
            } />
            <Route path="/invoice/:id" element={
              <InvoiceDetail 
                invoices={invoices}
                onUpdate={updateInvoice}
                onDelete={deleteInvoice}
              />
            } />
            <Route path="/invoice/new" element={
              <InvoiceForm onSubmit={createInvoice} />
            } />
            <Route path="/invoice/edit/:id" element={
              <InvoiceForm 
                onSubmit={updateInvoice} 
                initialData={invoices.find(i => i.id === window.location.pathname.split('/')[3])}
              />
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;