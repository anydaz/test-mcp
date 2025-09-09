import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export async function getEventSeat(eventSlug: string){
    try {
        const res = await axios.get(`${API_BASE_URL}/api/events/${eventSlug}/seats`);
        const eventSeats = res.data;

        return eventSeats;
    } catch (error) {
        console.error('Error fetching event seats:', error);
        throw new Error(`Failed to fetch event seats: ${error instanceof Error ? error.message : String(error)}`);
    }
}