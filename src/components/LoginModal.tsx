import React, { useState } from 'react';
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setError('');
    alert('Login berhasil (dummy)!');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative top-0 right-0 p-6 shadow-lg w-full max-w-md mx-auto"
      style={{ backgroundColor: 'var(--kuning1)', borderRadius: '12px' }}
      >
        <div className='flex justify-items items-center justify-between mb-3'>
          <h2 className='font-semibold justify-center mb-1'>Log In</h2>
          <button
              onClick={onClose}
              className="p-1 rounded-md transition-colors hover:cursor-pointer hover:bg-[var(--kuning2)]"
              aria-label="Close modal"
              >
              <X size={20} />
          </button>
        </div>

          <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <div>
                <input 
                className='mt-2 w-full p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--coklat)]'
                style={{ backgroundColor: 'var(--kuning2)' }}
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                />
            </div>
          </div>

          <div className='mt-2'>
            <label >Password:</label>
            <div>
                <input 
                className='mt-2 w-full p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--coklat)]'
                style={{ backgroundColor: 'var(--kuning2)' }}
                type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            className='block mt-4 mx-auto w-[40%]  bg-[var(--kuning2)] p-2 rounded-md transition-colors hover:bg-[var(--coklat)] hover:cursor-pointer'
            type="submit">Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
