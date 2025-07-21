import React, { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard/EventCard";
import { Link } from "react-router";
import axios from "axios";

// Event type
type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  archived: boolean;
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get<EventType[]>(
          "http://localhost:3000/events"
        );

        const sorted = res.data.sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`).getTime() -
            new Date(`${b.date}T${b.time}`).getTime()
        );
        setEvents(sorted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Archived
  const handleArchiveToggle = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, archived: !e.archived } : e))
    );
    // Optionally:PUT request to persist archive status
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Events</h1>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={handleDelete}
          onToggleArchive={handleArchiveToggle}
        />
      ))}

      <Link to="/addEventForm">
        <button className="btn text-xl">Add Events</button>
      </Link>
    </div>
  );
};

export default EventsPage;
