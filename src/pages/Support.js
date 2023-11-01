import React, { useState } from 'react';
import './Support.css'; // Import the support-specific CSS

function Support() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement code to send the message to customer service
    console.log('Sending message:', message);
    setMessage(''); // Clear the input field after sending

    // You can add logic to send the message to your server or perform any other action
  };

  return (
    <div className='support-container'>
      <h1 className='support-header'>Support</h1>
      <form onSubmit={handleSubmit} className='support-form'>
        <label>
          Message:
          <textarea
            value={message}
            onChange={handleMessageChange}
            rows="4"
            cols="50"
            placeholder="Type your message here"
          />
        </label>
        <br />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Support;
