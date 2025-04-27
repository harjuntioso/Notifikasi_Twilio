import { useState } from 'react';
import axios from 'axios';

function App() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/api/send-whatsapp', {
        phone,
        message
      });

      setResult({
        success: true,
        message: response.data.message
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || 'Failed to send message'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>WhatsApp Notifier</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number (with country code):</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 15551234567"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send WhatsApp Message'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: result.success ? '#dff0d8' : '#f2dede',
          border: `1px solid ${result.success ? '#d6e9c6' : '#ebccd1'}`,
          borderRadius: '4px',
          color: result.success ? '#3c763d' : '#a94442'
        }}>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default App;