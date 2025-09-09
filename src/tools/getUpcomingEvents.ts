import axios from 'axios';

const API_BASE_URL = process.env.AULA_API_URL;

export async function getUpcomingEvents() {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        const events = res.data;

        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error(`Failed to fetch events: ${error instanceof Error ? error.message : String(error)}`);
    }
}