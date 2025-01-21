import React from 'react';
import { Button } from 'primereact/button';
import Search from '../search/search';
        
const Header: React.FC = () => {
    return (
        <div className="header flex justify-content-between align-items-center">
            <h1>Asset Tracker</h1>
            <div className="flex gap-4 h-full">
                <Search></Search>
                <Button label="Connect wallet" />
            </div>
        </div>
    )
}

export default Header;