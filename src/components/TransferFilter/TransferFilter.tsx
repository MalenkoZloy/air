import './TransferFilter.scss';
import {useEffect, useState} from "react";

export const stopsLabels: Record<number, string> = {
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки',
};

export const airCompany: Record<string, string> = {
    pobeda: 'Победа',
    red_wings: 'Red Wings',
    s7: 'S7 Airlines',
};

const stops = [0, 1, 2, 3];
const companies = ['pobeda', 'red_wings', 's7'];

interface TransferFilterProps {
    onFilterChange: (stops: number[]) => void;
    onCompaniesChange: (companies: string[]) => void;
}

function TransferFilter({ onFilterChange, onCompaniesChange }: TransferFilterProps) {
    const [selectedStops, setSelectedStops] = useState<number[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    
    useEffect(() => {
        onFilterChange(selectedStops);
    }, [selectedStops]);
    
    useEffect(() => {
        onCompaniesChange(selectedCompanies);
    }, [selectedCompanies]);
    
    function checkBoxFilter(stop: number) {
        selectedStops.includes(stop)
            ? setSelectedStops(selectedStops.filter(item => item !== stop))
            : setSelectedStops([...selectedStops, stop]);
    }
    
    function checkBoxCompany(company: string) {
        selectedCompanies.includes(company)
            ? setSelectedCompanies(selectedCompanies.filter(item => item !== company))
            : setSelectedCompanies([...selectedCompanies, company]);
    }
    
    return (
        <div className="filter_container">
            <div className="transferFilter">
                <h2 className="transferFilter_title">Количество пересадок</h2>
                <ul className="transferFilter_ul">
                    {stops.map(stop => (
                        <li key={stop}>
                            <label className="transferFilter__label">
                                <input
                                    type="checkbox"
                                    className="transferFilter__checkbox"
                                    checked={selectedStops.includes(stop)}
                                    onChange={() => checkBoxFilter(stop)}
                                />
                                {stopsLabels[stop]}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="transferFilter">
                <h2 className="transferFilter_title">Компании</h2>
                <ul className="transferFilter_ul">
                    {companies.map(company => (
                        <li key={company}>
                            <label className="transferFilter__label">
                                <input
                                    type="checkbox"
                                    className="transferFilter__checkbox"
                                    checked={selectedCompanies.includes(company)}
                                    onChange={() => checkBoxCompany(company)}
                                />
                                {airCompany[company]}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TransferFilter;