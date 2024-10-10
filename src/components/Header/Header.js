import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.jpg";

function Header() {
    return (
        <div className="flex mt-4 justify-between items-center mx-5">
            <img src={logo} alt="logo" width={150} height={75} /> {/* Reduced size of the logo */}
            <h1 className='text-2xl'>Artihcus Global</h1> {/* Reduced font size */}
        </div>
    );
}

export default Header;
