import React, { useState } from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import CategoryDisplay from "./CategoryDisplay";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

interface EventFormData {
  title: string;
  date: string;
  time: string;
  notes: string;
  category: string;
}

const AddEventForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "",
  });

  // Handle Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, date, time } = formData;

    if (!title || !date || !time) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Title, date and time are required.",
      });
      return;
    }

    // Data post to Server
    try {
      const res = await axios.post("http://localhost:3000/events", {
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

      // Success Alert
      await Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your event has been created successfully.",
        timer: 3000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      // Error Alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create event. Please try again.",
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" bg-white rounded-sm shadow text-black"
      >
        <p className="text-center text-3xl font-bold py-5 text-white bg-[#4f3ee7]">
          Add New Event
        </p>
        <div className="space-y-4 p-4">
          {/* Event Title */}
          <FormInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
          />

          {/* Event Date */}
          <FormInput
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          {/* Event Time */}
          <FormInput
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          {/* Event Notes */}
          <FormTextarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
          />

          {/* Event Category */}
          <CategoryDisplay category={formData.category} />

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-gradient-to-br from-[#5f0085] to-[#030129] text-lg text-white w-full rounded-full"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
