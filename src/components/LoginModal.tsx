import React, { useState } from 'react';

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
      style={{ backgroundColor: '#F4E5C0', borderRadius: '12px' }}
      >
        <button 
            className="modal-close" 
            onClick={onClose}>&times;
        </button>
        
        <h2 className='mb-4 font-semibold'>Log In</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Email:</label>
            <div>
                <input 
                className='mt-2 w-full p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AA9766]'
                style={{ backgroundColor: '#C7B996' }}
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                />
            </div>
          </div>

          <div className='mt-2'>
            <label >Password:</label>
            <div>
                <input 
                className='mt-2 w-full p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AA9766]'
                style={{ backgroundColor: '#C7B996' }}
                type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            className='block mt-4 mx-auto w-[40%]  bg-[#C7B996] p-2 rounded-md transition-colors hover:bg-[#AA9766] hover:cursor-pointer'
            type="submit">Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
