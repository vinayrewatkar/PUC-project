// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

export const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/invokeModel', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle the response data from the backend
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT Company</p>
              <h1>Welcome to MERN website</h1>
              <p>
                Are you ready to take your business to the next level with cutting-edge IT solutions? Look no further! In Mern, we specialize in providing innovative IT services and solutions tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
            {/* hero images */}
            <div className="hero-image">
              <img
                src="https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?w=740&t=st=1706439269~exp=1706439869~hmac=aa55e839d0e7397b0ea1f33cca8e01e3768744374f907423c815fa39ff08e506"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
        {/* 2nd section */}
        {/* 3rd section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            {/* hero images */}
            {/* image div, not to be changed */}
            <div className="hero-image">
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : 'https://via.placeholder.com/400x500'}
                alt="User-uploaded image"
                width="400"
                height="500"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button onClick={handleSubmit}>Submit Image</button>
            </div>
            
            <div className="hero-content">
              <p>We are here to help you</p>
              <h1>Get Started Today</h1>
              <p>
                Ready to take the first step towards a more efficient and secure IT infrastructure? Contact us today for a free consultation and discuss how Thapa Technical can help your business thrive in the digital age.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
