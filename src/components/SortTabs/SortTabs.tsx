import './SortTabs.scss'
import * as React from "react";
import {JSX} from "react";
import {SortTabsProps} from '../../types/types.ts';


const tabs = [
    { id: 'cheap', label: 'Самый дешевый' },
    { id: 'fast', label: 'Самый быстрый' },
    { id: 'optimal', label: 'Самый оптимальный' },
];


function SortTabs( {onSortChange}: SortTabsProps ): JSX.Element {
    const[activeTab, setActiveTab] = React.useState<string>('cheap');
    
    const handleTabClick = (id: string) => {
        setActiveTab(id)
        onSortChange(id)
    };
    
    return (
        <>
            <div className='sort_tabs'>
                {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={activeTab === tab.id ? 'active' : 'not_active'}
                    onClick={() => handleTabClick(tab.id)}
                >
                    {tab.label}
                </button>
                ))}
            </div>
        </>
    )
}

export default SortTabs