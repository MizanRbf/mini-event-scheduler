import React from "react";

type EventProps = {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    notes?: string;
    category: string;
    archived: boolean;
  };
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
};

const EventCard: React.FC<EventProps> = ({ event, onDelete, onToggleArchive }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-4 border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            event.category === "Work"
              ? "bg-blue-100 text-blue-800"
              : event.category === "Personal"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {event.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {event.date} at {event.time}
      </p>
      {event.notes && <p className="mt-2 text-gray-700">{event.notes}</p>}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onDelete(event.id)}
          className="px-4 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Delete
        </button>
        <button
          onClick={() => onToggleArchive(event.id)}
          className={`px-4 py-1 text-sm rounded ${
            event.archived
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {event.archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
