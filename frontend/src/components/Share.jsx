import zIndex from '@mui/material/styles/zIndex';
import React, { useState } from 'react'
import { FaCopy, FaWhatsapp, FaSms } from 'react-icons/fa';
import { IoMdShare, IoIosCloseCircle } from "react-icons/io";

const Share = () => {
  const [showSharePopup, setShowSharePopup] = useState(false);

  const shareUrl = window.location.href;
  const windowMessage = 'Attention all dog lovers! Explore our specially curated products for dogs that are designed to keep your furry friends happy and healthy. From premium dog food to fun toys and grooming essentials, we have everything your dog needs! Spread the word and give your pets the love they deserve! Woof Woof!\n\nCheck out our amazing dog products';
  const shareMessage = `${windowMessage}:${shareUrl}`;

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const closePopup = () => {
    setShowSharePopup(false);
  };

  return (
    <div>
      {showSharePopup ? (
        <div style={styles.sharePopup}>
          <div style={styles.shareHeader}>
            <h3>Share This Product</h3>
            <button onClick={closePopup} style={styles.closeButton}><IoIosCloseCircle size={"25px"} /></button>
          </div>
          <p>{windowMessage}</p>
          <button style={styles.shareOption} onClick={copyToClipboard}>
            <FaCopy size={22} style={styles.icon} /> Copy to Clipboard
          </button>
          <button style={styles.shareOption}>
            <a href={`sms:?body=${encodeURIComponent(shareMessage)}`} style={{ ...styles.shareLink, ...styles.smsButton }}>
              <FaSms size={22} style={styles.icon} /> Messages
            </a>
          </button>
          <button style={styles.shareOption}>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" style={{ ...styles.shareLink, ...styles.whatsappButton }}>
              <FaWhatsapp size={22} style={styles.icon} /> WhatsApp
            </a>
          </button>
        </div>
      ) : <button onClick={handleShare} style={styles.shareButton}><IoMdShare size={"30px"} /></button>
      }
    </div>
  )
}

const styles = {
  sharePopup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    backgroundColor: '#FFF1E0',
    border: '1px solid #ddd',
    borderRadius: '2rem',
    shadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    zIndex: '9999',
  },
  shareHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: '0px',
  },
  shareOption: {
    color: 'black',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '1em',
    display: 'block',
    marginTop: '20px'
  },
  shareLink: {
    textDecoration: 'none',
    color: 'black',
  },
  smsButton: {
    color: 'blue',
  },
  whatsappButton: {
    color: 'green',
  },
  shareButton: {
    marginTop: '20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1em',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'fixed',
    bottom: '5rem',
    right: '25px',
    padding: '4px',
    zIndex: '9990'
  }
}

export default Share;