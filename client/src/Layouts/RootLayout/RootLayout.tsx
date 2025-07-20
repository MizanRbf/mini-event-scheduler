import React from 'react';
import AddEventForm from '../../Components/AddEventForm/AddEventForm';

const RootLayout = () => {
  return (
    <div>
      {/* Add Event Form */}
      <div className='max-w-[1200px] mx-auto px-4 mt-20'>
      <AddEventForm></AddEventForm>
      </div>
    </div>
  );
};

export default RootLayout;