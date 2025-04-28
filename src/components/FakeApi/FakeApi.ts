import {Ticket} from '../../types/types.ts';

export const tickets: Ticket[] = [
    {
        id: 1,
        from: 'SVO',
        to: 'LED',
        company: 'pobeda',
        price: 12680,
        currency: 'RUB',
        time: {
            startTime: '12:00',
            endTime: '16:30',
        },
        duration: '4 ч 30 мин',
        connectionAmount: '1 пересадка',
    },
    {
        id: 2,
        from: 'SVO',
        to: 'LED',
        company: 'red_wings',
        price: 21500,
        currency: 'RUB',
        time: {
            startTime: '14:00',
            endTime: '16:00',
        },
        duration: '2 ч 0 мин',
        connectionAmount: 'Без пересадок',
    },
    {
        id: 3,
        from: 'SVO',
        to: 'LED',
        company: 's7',
        price: 23995,
        currency: 'RUB',
        time: {
            startTime: '04:50',
            endTime: '13:30',
        },
        duration: '8 ч 40 мин',
        connectionAmount: '2 пересадки',
    },
];

export const getTickets = (): Ticket[] => {
    return tickets;
};