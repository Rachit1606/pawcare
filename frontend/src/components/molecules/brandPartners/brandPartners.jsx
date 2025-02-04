import React, { useState } from 'react';
import pedigreePhoto from '../../../../../images/pedigree.jpg';
import ruffwearPhoto from '../../../../../images/ruffwear.jpg';
import goughnutsPhoto from '../../../../../images/goughnuts.jpg';
import naturalDogCompanyPhoto from '../../../../../images/naturalDogCompany.jpg';

const brands = [
  {
    name: 'Pedigree',
    photo: pedigreePhoto,
    info: 'All Pedigree dry and wet complete main meal food is 100% nutritionally complete and balanced. In addition, it contains ingredients to support Oral Care & Healthy bones, Digestion, Skin & Coat and Immune System',
  },
  {
    name: 'Ruffwear',
    photo: ruffwearPhoto,
    info: 'Ruffwear has been dedicated to building gear for outdoor athletes and their human companions.',
  },
  {
    name: 'Goughnuts',
    photo: goughnutsPhoto,
    info: 'Goughnut toys are made from 100% natural rubber. These chew toys are built knowing that safety and fun go hand in hand',
  },
  {
    name: 'Natural Dog Company',
    photo: naturalDogCompanyPhoto,
    info: 'Our soothing balms, grooming products, and treats provide health & wellness solutions for dogs and peace of mind for their humans',
  },
];

const BrandPartner = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleClick = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#F5F5F5' }}>
      <h1 style={{ color: '#3f51b5' }}>Our Brand Partners</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => handleClick(brand)}
            style={{
              margin: '20px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#FFF1E0',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              width: 'calc(33% - 40px)', // Adjusted for 3 items per row with margins
              boxSizing: 'border-box',
              flex: '0 1 calc(33% - 40px)',
            }}
          >
            <img
              src={brand.photo}
              alt={brand.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
      {selectedBrand && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#CB976F', borderRadius: '10px' }}>
          <h2>{selectedBrand.name}</h2>
          <p>{selectedBrand.info}</p>
        </div>
      )}
    </div>
  );
};

export default BrandPartner;
