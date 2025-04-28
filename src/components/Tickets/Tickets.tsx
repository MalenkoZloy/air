import './Tickets.scss';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {fetchTickets} from '../../store/store';
import LogoPobeda from '../../images/logo/logo_pobeda.png';
import LogoRedWings from '../../images/logo/logo_Red Wings.png';
import LogoS7 from '../../images/logo/logo_S7 Airlines.png';
import SortTabs from "../SortTabs/SortTabs.tsx";
import TransferFilter, {airCompany, stopsLabels} from "../TransferFilter/TransferFilter.tsx";
import {Ticket} from "../../types/types.ts";

const companyLogos: Record<string, string> = {
    pobeda: LogoPobeda,
    red_wings: LogoRedWings,
    s7: LogoS7,
};

const durationToMinutes = (duration: string): number => {
    const matches = duration.match(/(\d+)\s*ч\s*(\d+)\s*мин/);
    if (matches) {
        const hours = parseInt(matches[1], 10);
        const minutes = parseInt(matches[2], 10);
        return hours * 60 + minutes;
    }
    return 0;
};

const Tickets = () => {
    const dispatch = useAppDispatch();
    const { tickets, status, error } = useAppSelector(state => state.tickets);
    
    const [sortedTickets, setSortedTickets] = useState<Ticket[]>([]);
    const [selectedStops, setSelectedStops] = useState<number[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [sortType, setSortType] = useState<string>('cheap');
    
    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);
    
    useEffect(() => {
        applyFiltersAndSort();
    }, [tickets, selectedStops, selectedCompanies, sortType]);
    
    const handleStopsChange = (stops: number[]) => {
        setSelectedStops(stops);
    };
    
    const handleCompaniesChange = (companies: string[]) => {
        setSelectedCompanies(companies);
    };
    
    const handleSortChange = (sortType: string) => {
        setSortType(sortType);
    };
    
    const applyFiltersAndSort = () => {
        let filtered = [...tickets];
        
        if (selectedStops.length > 0) {
            filtered = filtered.filter(ticket =>
                selectedStops.some(stop => stopsLabels[stop] === ticket.connectionAmount)
            );
        }
        
        if (selectedCompanies.length > 0) {
            filtered = filtered.filter(ticket =>
                selectedCompanies.includes(ticket.company)
            );
        }
        
        if (sortType === 'cheap') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortType === 'fast') {
            filtered.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
        } else if (sortType === 'optimal') {
            filtered.sort((a, b) => a.price - b.price);
        }
        
        setSortedTickets(filtered);
    };
    
    if (status === 'loading') {
        return <p>Загрузка билетов...</p>;
    }
    
    if (status === 'failed') {
        return <p>Ошибка: {error}</p>;
    }
    
    return (
        <div className="tickets_container">
            <div className='filter_container'>
                <TransferFilter
                    onFilterChange={handleStopsChange}
                    onCompaniesChange={handleCompaniesChange}
                />
            </div>
            <div className='filter_container'>
                <SortTabs onSortChange={handleSortChange} />
                {sortedTickets.length > 0 ? (
                    sortedTickets.map(ticket => (
                        <div className="tickets_card" key={ticket.id}>
                            <div className="container_price_company">
                                <p className="tickets_price">
                                    {ticket.price} {ticket.currency}
                                </p>
                                <div className="tickets_company">
                                    <img src={companyLogos[ticket.company]} alt={airCompany[ticket.company]} />
                                </div>
                            </div>
                            <div className="container_info">
                                <p>{ticket.from} → {ticket.to}</p>
                                <p>В пути</p>
                                <p>Пересадки</p>
                            </div>
                            <div className="container_get-info">
                                <p>{ticket.time.startTime} – {ticket.time.endTime}</p>
                                <p>{ticket.duration}</p>
                                <p>{ticket.connectionAmount}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Билеты не найдены</p>
                )}
            </div>
        </div>
    );
};

export default Tickets;