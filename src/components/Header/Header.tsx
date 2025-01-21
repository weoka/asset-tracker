
import { Button } from 'primereact/button';
import Search from '../search/search';
        
function Header() {
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

export {Header};