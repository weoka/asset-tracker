
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
        
        
function Header() {
    return (
        <div className="header flex justify-content-between align-items-center">
            <h1>Asset Tracker</h1>
            <AutoComplete placeholder='Search...'></AutoComplete>
            <div className="h-full">
                <Button label="Connect wallet" />
            </div>
        </div>
    )
}

export {Header};