import React from "react";

interface CategoryDisplayProps {
  category: string;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ category }) => {
  return (
    <div className="text-sm text-gray-600">
      <strong>Category:</strong> {category || "Will be auto-generated"}
    </div>
  );
};

export default CategoryDisplay;
