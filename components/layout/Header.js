import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = () => {
    // const x = 1; >>> esto lo pongo temporalmente porque sino se queja porque tengo curly braces innecesarios

    return <header className="header" data-testid="header">
        <nav>
            <div className="logo">
                <img src="/images/logo.png" alt="To do list"/>
            </div>
            <div className="settings">
                <ul>
                    <li>+</li>
                    <li><FaPizzaSlice/></li>
                </ul>
            </div>
        </nav>
    </header>;
};
