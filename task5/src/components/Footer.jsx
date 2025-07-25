import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// 1. Import your social media icons
import facebookIcon from '../assets/images/facebook.png';
import instagramIcon from '../assets/images/instagram.png';
import twitterIcon from '../assets/images/twitter.png';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column about">
                    <h3 className="footer-logo">Stylo</h3>
                    <p>
                        Your destination for curated fashion. We believe in style, quality,
                        and comfort for the modern wardrobe.
                    </p>
                </div>

                <div className="footer-column links">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">Your Cart</Link></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-column links">
                    <h4 className="footer-heading">Support</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer-column social">
                    <h4 className="footer-heading">Follow Us</h4>
                    <div className="social-icons">
                        {/* Replace # with your actual social media links */}
                        <a href="#" title="Facebook" className="social-icon" ><img src={facebookIcon} alt="Facebook"/></a>
                        <a href="#" title="Instagram" className="social-icon"><img src={instagramIcon} alt="Instagram" /></a>
                        <a href="#" title="Twitter" className="social-icon"><img src={twitterIcon} alt="Twitter" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Stylo. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
