import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

// Import icons
import homeIcon from '../assets/images/home.png';
import productsIcon from '../assets/images/order.png';
import cartIcon from '../assets/images/cart.png';

// The Header is now much simpler. It only needs the cart count.
const Header = ({ cartItemCount }) => {
    return (
        <header className="header">
            <NavLink to="/" className="logo">Stylo</NavLink>
            <nav className="nav-menu">
                <ul className="nav-links">
                    <li>
                        {/* No more onClick handlers! */}
                        <NavLink to="/" title="Home" end>
                            <img src={homeIcon} alt="Home" className="nav-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" title="Products">
                            <img src={productsIcon} alt="Products" className="nav-icon" />
                        </NavLink>
                    </li>
                    <li className="cart-link-container">
                        <NavLink to="/cart" title="Cart">
                            <img src={cartIcon} alt="Cart" className="nav-icon" />
                            {cartItemCount > 0 && (
                                <span className="cart-counter">{cartItemCount}</span>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
