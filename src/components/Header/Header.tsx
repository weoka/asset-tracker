
import { Button } from 'primereact/button';
import Search from '../search/search';
        
function Header() {
    return (
        <div className="header flex justify-content-between align-items-center">
            <h1>Asset Tracker</h1>
            <Search></Search>
            <div className="h-full">
                <Button label="Connect wallet" />
            </div>
        </div>
    )
}

export {Header};