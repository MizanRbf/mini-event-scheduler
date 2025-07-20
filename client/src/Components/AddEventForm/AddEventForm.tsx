import React, { useState } from "react";
import axios from "axios";

interface EventFormData {
  title: string;
  date: string;
  time: string;
  notes: string;
  category: string;
}

const AddEventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, date, time } = formData;

    if (!title || !date || !time) {
      setError("Title, date, and time are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/events", {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      });

      const newEvent = res.data;
      setFormData({
        title: "",
        date: "",
        time: "",
        notes: "",
        category: newEvent.category || "",
      });
      setSuccessMessage("Event created successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to create event.");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold">Add New Event</h2>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        className="input input-bordered w-full"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        className="input input-bordered w-full"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        className="input input-bordered w-full"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <textarea
        name="notes"
        placeholder="Additional Notes"
        className="textarea textarea-bordered w-full"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      <div className="text-sm text-gray-600">
        <strong>Category:</strong> {formData.category || "Will be auto-generated"}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add Event
      </button>

      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
    </form>
    </div>
  );
};

export default AddEventForm;
