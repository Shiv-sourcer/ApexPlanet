
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Import images
import heroBackgroundImage from '../assets/images/cloths.jpg';
import updateImage from '../assets/images/update.jpg';
import summerSaleImage from '../assets/images/summer_sale.jpg';
import newArrivalsImage from '../assets/images/arrival_new.jpg';
import exclusiveOffer from '../assets/images/exclusive.jpg';

const FeatureSection = ({ image, alt, title, text, buttonText, buttonLink, reversed, isLink }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const ButtonComponent = isLink ? Link : 'a';

    return (
        <section 
            ref={ref} 
            className={`feature-section ${reversed ? 'layout-reversed' : ''} ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="feature-image">
                <img src={image} alt={alt} />
            </div>
            <div className="feature-text">
                <h2>{title}</h2>
                <p>{text}</p>
                <ButtonComponent to={buttonLink} href={buttonLink} className="feature-button">
                    {buttonText}
                </ButtonComponent>
            </div>
        </section>
    );
};

// The component is now very simple. No more onLoaded or onNavigate props.
const HomePage = () => {
    const heroStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackgroundImage})`
    };

    // The useEffect and handleShopNowClick function have been removed.
    
    return (
        <div className="home-page">
            <section className="hero-section" style={heroStyle}>
                <div className="hero-content">
                    <h1 className="hero-title">Style Meets Comfort</h1>
                    <p className="hero-subtitle">
                        Discover our new collection of curated fashion essentials.
                    </p>
                    {/* The "Shop Now" button is now a simple Link component */}
                    <Link to="/products" className="hero-cta-button">
                        Shop Now
                    </Link>
                </div>
            </section>

            <div className="page-content">
                 <FeatureSection
                    image={updateImage} alt="Company update" title="Fresh Perspectives, Same Quality"
                    text="We're excited to announce a fresh new look for Stylo! As we grow, our commitment to providing high-quality, sustainable fashion remains stronger than ever."
                    buttonText="Learn More" buttonLink="#"
                />
                <FeatureSection
                    image={summerSaleImage} alt="Upcoming sale" title="The Summer Sale Is Coming!"
                    text="Get ready for our biggest sale of the season. Enjoy up to 50% off on select items. From breezy summer dresses to essential accessories, find your perfect look."
                    buttonText="Preview the Sale" buttonLink="#" reversed
                />
                <FeatureSection
                    image={newArrivalsImage} alt="New Arrivals" title="Just Dropped: The Autumn Collection"
                    text="Embrace the new season with our latest arrivals. Featuring cozy knits, tailored coats, and versatile layers designed to elevate your everyday look."
                    buttonText="Check It Out" buttonLink="/products" isLink
                />
                <FeatureSection
                    image={exclusiveOffer} alt="Exciting Offers" title="Exclusive Offer for Members"
                    text="Sign up for our newsletter and receive an exclusive 15% discount on your first order. Be the first to know about special promotions and new arrivals."
                    buttonText="Sign Up Now" buttonLink="#" reversed
                />
            </div>
        </div>
    );
};

export default HomePage;
