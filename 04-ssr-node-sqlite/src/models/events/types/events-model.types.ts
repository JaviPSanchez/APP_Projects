/**
 * Represents an event in the system
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  address: string;
  date: string;
  user_id: string;
  image: string | null;
}

export type CreateEventData = Omit<Event, 'id'>;
export type UpdateEventData = Event;
