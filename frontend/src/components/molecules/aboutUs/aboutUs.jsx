import React from 'react';

const teamMembers = [
  {
    name: 'Disha Anand',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/D4E35AQF_y4AvUKSRQQ/profile-framedphoto-shrink_100_100/0/1716333687632?e=1723060800&v=beta&t=kfgp4hKSV9BjY8GaHZi1G5x0HCBBk_Ad7FZqUu1qtZs',
    linkedIn: 'https://www.linkedin.com/in/disha-anand2299/',
  },
  {
    name: 'Freya Jayant Vora',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/D4D35AQGSP3tgCYCSnQ/profile-framedphoto-shrink_800_800/0/1693273996088?e=1723309200&v=beta&t=VenEag4V_HH-e9YrQ7p7AdMGIeWFmRS0vLtdbKBh12k',
    linkedIn: 'https://www.linkedin.com/in/freya-vora/',
  },
  {
    name: 'Gautam Mundada',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/C5603AQGAv-SMryfqag/profile-displayphoto-shrink_400_400/0/1641787216725?e=1723680000&v=beta&t=ShIYC-ouakj_dsaWMDKb3by_EGN3GA3rNvZGM0AyS3Y',
    linkedIn: 'https://www.linkedin.com/in/gautam-mundada-33638b182/',
  },
  {
    name: 'Pooja Chauhan',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/C5603AQGFBxx7VrylrA/profile-displayphoto-shrink_400_400/0/1597007600350?e=1723680000&v=beta&t=0kMSlyc8RllsVzh-Ztw9Q1QnJIuNYneyD5O4Dki9JXg',
    linkedIn: 'https://www.linkedin.com/in/pooja-chauhan-8b04a8165/',
  },
  {
    name: 'Priyatam Somagattu',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/D5603AQFdUvll9ElJ6Q/profile-displayphoto-shrink_800_800/0/1707025952462?e=1727913600&v=beta&t=1DptoP26rAtYzTAaahL8IkWjO5zlSWstzZGy9NMSR-0',
    linkedIn: 'https://www.linkedin.com/in/priyatam-reddy-somagattu-043a17172/',
  },
  {
    name: 'Rachit Khanna',
    role: 'Developer',
    photo: 'https://media.licdn.com/dms/image/D4E35AQFJstm_sKKXWw/profile-framedphoto-shrink_800_800/0/1720578798636?e=1723309200&v=beta&t=aB_CtfbfeP4jiakj9Z2biL7oQjGJs84RXRxCazYMH-E',
    linkedIn: 'https://www.linkedin.com/in/rachit-khanna-961b5816b/',
  },
];

const AboutUs = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#F4F9F4', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#3f51b5' }}>About Us</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '40px', color: '#555', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        PawCare is a dedicated pet management company focused on revolutionizing the way pet owners manage their pets' care. Our mission is to make pet care easy and convenient for everyone. We offer a comprehensive booking system that allows pet owners to schedule appointments, manage pet records, and access a wide range of pet care services. Whether it's scheduling a visit, booking a grooming session, or finding a reliable pet sitter, PawCare is your one-stop solution for all pet management needs. Our team of passionate and experienced professionals is committed to ensuring that every pet receives the best care possible, giving pet owners peace of mind. At PawCare, we believe that happy pets make happy owners, and we strive to create a seamless experience that enhances the bond between pets and their owners. We are a group of passionate students building "PawCare", a pet management booking system designed to make pet care easy and convenient for everyone.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{ margin: '20px', textAlign: 'center', backgroundColor: '#FFF1E0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '250px', transition: 'transform 0.2s' }}>
            <img
              src={member.photo}
              alt={`${member.name}`}
              style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '15px' }}
            />
            <h3 style={{ fontSize: '1.4em', margin: '10px 0', color: '#333' }}>{member.name}</h3>
            <p style={{ fontSize: '1em', margin: '10px 0', color: '#777' }}>{member.role}</p>
            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;