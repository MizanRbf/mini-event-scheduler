import React from "react";
import HomePage from "../../Pages/Home/HomePage";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Home Page */}
      <div>
        <HomePage></HomePage>
      </div>
    </div>
  );
};

export default RootLayout;
