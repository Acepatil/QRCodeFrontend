import { useState } from 'react';
import './Form.css'; // Import the CSS file

function Form() {
  const [formData, setFormData] = useState({
    URL: '',
    name: '',
    phoneNumber: '',
    isOpen: true // Include isOpen in formData state
  });
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClick = () => {
    setFormData({
      URL: '',
      name: '',
      phoneNumber: '',
      isOpen: !formData.isOpen
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://qrcodebackend-ri0q.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="background">
      <div className="mt-5 form-container">
        {image && (
          <div className="image-container">
            <img src={image} alt="QR Code" className='qr-image'/>
          </div>
        )}
        <div>
          <input 
            type="radio" 
            checked={formData.isOpen} 
            id="URL" 
            name="isOpen" 
            onChange={handleClick} 
          />{formData.isOpen} URL
          <input 
            type="radio" 
            checked={!formData.isOpen} 
            id="IDCard" 
            name="isOpen" 
            onChange={handleClick} 
          />{formData.isOpen} ID CARD
        </div>
        {formData.isOpen ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-group">
              <label htmlFor="URL" className="form-label"> URL </label>
              <input
                type="text"
                className="form-control"
                id="URL"
                name="URL"
                value={formData.URL}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary submit-button">Submit</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-group">
              <label htmlFor="name" className="form-label"> Name </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="phoneNumber" className="form-label"> Phone Number </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary submit-button">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
