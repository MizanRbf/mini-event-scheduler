import React from "react";
import AddEventForm from "../../Components/AddEventForm/AddEventForm";

const AddEventFormPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#36014b] to-[#030129]">
      <div className="max-w-[1200px] mx-auto px-4 pt-40  text-white">
        <AddEventForm></AddEventForm>
      </div>
    </div>
  );
};

export default AddEventFormPage;
