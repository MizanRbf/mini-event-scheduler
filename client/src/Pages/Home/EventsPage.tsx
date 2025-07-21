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
        setEvents(res.data);
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
  const handleArchiveToggle = async (id: string) => {
    try {
      const eventToUpdate = events.find((e) => e.id === id);
      if (!eventToUpdate) return;

      const updatedArchivedStatus = !eventToUpdate.archived;

      await axios.put(`http://localhost:3000/events/${id}`, {
        archived: updatedArchivedStatus,
      });

      setEvents((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, archived: updatedArchivedStatus } : e
        )
      );
    } catch (error) {
      console.log("Error archiving event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001950] to-[#100014] text-white px-4 py-10">
      <div className="border rounded-sm border-[#7b56d3] max-w-3xl mx-auto">
        <p className="text-center text-3xl font-bold py-5 bg-[#4f3ee7]">
          📅 My Events
        </p>
        <div className="m-4">
          <div className="grid gap-2">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDelete={handleDelete}
                  onToggleArchive={handleArchiveToggle}
                />
              ))
            ) : (
              <p className="text-center text-lg text-gray-300 mt-10">
                No events found. Please add some.
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <Link to="/addEventForm">
              <button className="btn text-lg px-6 py-2 rounded-full shadow hover:shadow-lg transition duration-300 font-bold">
                ➕ Add Event
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
