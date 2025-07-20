// src/pages/EventsPage.tsx
import React, { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard";
import { Link, useNavigate } from "react-router";

type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  archived: boolean;
};

const EventsPage = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
  console.log("Fetching events...");
  fetch("http://localhost:3000/events")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched Events:", data); 
      const sorted = data.sort(
        (a: EventType, b: EventType) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );
      setEvents(sorted);
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
    });
}, []);


  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    }).then(() => setEvents(events.filter((e) => e.id !== id)));
  };

  const handleArchiveToggle = (id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, archived: !e.archived } : e
      )
    );
    // Optionally: make PUT request to persist archive status
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
