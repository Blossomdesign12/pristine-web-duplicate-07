import { useState } from "react";

type Listing = {
  id: number;
  location: string;
  type: "Buying" | "Renting";
};

const flatListings: Listing[] = [
  // Sample listings for demonstration
  { id: 1, location: "Andheri West", type: "Buying" },
  { id: 2, location: "Goregaon West", type: "Renting" },
  { id: 3, location: "Dadar", type: "Buying" },
  { id: 4, location: "Bandra", type: "Renting" },
];

const ToggleBuyRent = () => {
  const [selected, setSelected] = useState<"Buying" | "Renting">("Buying");

  // Filtered listings based on selected option
  const filteredListings = flatListings.filter((listing) => listing.type === selected);

  return (
    <div className="p-6">
      {/* Toggle Button */}
      <div className="flex bg-gray-200 rounded-lg p-1 w-max mb-6">
        {["Buying", "Renting"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              selected === option
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-500"
            }`}
            onClick={() => setSelected(option as "Buying" | "Renting")}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Flat Listings */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="font-semibold text-gray-800">
                Flats for {selected} in {listing.location}
              </h2>
              {/* You can add more details to listings */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToggleBuyRent;
