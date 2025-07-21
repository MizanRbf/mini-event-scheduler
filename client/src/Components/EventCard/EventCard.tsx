import React from "react";
import { Trash2, ArchiveRestore, Archive } from "lucide-react"; // You can also use Heroicons

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

const EventCard: React.FC<EventProps> = ({
  event,
  onDelete,
  onToggleArchive,
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            📅 {event.date} ⏰ {event.time}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
            event.category === "Work"
              ? "bg-blue-100 text-blue-700"
              : event.category === "Personal"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {event.category}
        </span>
      </div>

      {event.notes && (
        <p className="text-sm text-gray-600 mt-3 border-t pt-3">
          {event.notes}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        {/* Delete Button */}
        <button
          onClick={() => onDelete(event.id)}
          className="flex items-center gap-1 px-4 py-1.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition"
        >
          <Trash2 size={16} /> Delete
        </button>

        {/* Archive / Unarchive Button */}
        <button
          onClick={() => onToggleArchive(event.id)}
          className={`flex items-center gap-1 px-4 py-1.5 text-sm rounded transition ${
            event.archived
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
              : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          {event.archived ? (
            <ArchiveRestore size={16} />
          ) : (
            <Archive size={16} />
          )}
          {event.archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
