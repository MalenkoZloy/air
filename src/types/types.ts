export interface TicketTime {
    startTime: string;
    endTime: string;
}

export interface Ticket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: 'RUB';
    time: TicketTime;
    duration: string;
    connectionAmount: string;
}

export interface TicketsState {
    tickets: Ticket[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface SortTabsProps {
    onSortChange: (sortType: string) => void;
}