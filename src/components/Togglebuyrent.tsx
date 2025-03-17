import { useState } from "react";

const categories = [
  {
    title: "Flats for sale in Mumbai",
    locations: [
      "Andheri West", "Mahim", "Mira Road", "Mulund", "Vile Parle West",
      "Goregaon West", "Malabar Hill", "Byculla", "Andheri East", "Kurla",
      "Bhayandar", "Bhandup", "Juhu", "Borivali East", "Colaba", "Kanjurmarg",
      "Marol", "BKC", "Worli", "Ghatkopar West", "Jogeshwari East",
      "Borivali West", "Haware City", "Mahalaxmi", "Powai", "Ghatkopar East",
      "Matunga East", "Sion", "Jogeshwari West", "Dahisar", "Tardeo", "Grant Road"
    ]
  },
  {
    title: "Flats for sale in Thane",
    locations: [
      "Thane East", "Kolshet", "Waghbil", "Dombivli", "Beyond Thane", "Manpada",
      "Anand Nagar", "Korum Mall", "Hiranandani Estate", "Ghodbunder Road",
      "Majiwada", "Suraj Water Park", "Thane West"
    ]
  },
  {
    title: "Flats for sale in Navi Mumbai",
    locations: [
      "Panvel", "Kharghar", "Turbhe", "Nerul", "Khandaeshwar", "Ulwe", "Airoli",
      "Taloja", "Vashi", "Seawood Darave", "Bamandongri", "Shilphata", "Ghansoli",
      "Koparkhairane", "Sanpada", "Belapur CBD", "Kharkopar", "Navi Mumbai",
      "Rabale", "Juinagar", "Mansarovar", "Diva"
    ]
  }
];

export default function FlatsListing() {
  const [activeTab, setActiveTab] = useState("buying");

  return (
    <div className="bg-[#f3f4f6]">
    <div className="max-w-7xl  p-[59px] mx-5 bg-[#f3f4f6]">
      <div className="flex gap-2 mb-9">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "buying" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("buying")}
        >
          Buying
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "renting" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("renting")}
        >
          Renting
        </button>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
          <div className="grid grid-cols-3 gap-4 text-gray-700">
            {category.locations.map((location, idx) => (
              <p key={idx} className="hover:text-blue-500 cursor-pointer">
                Flats for sale in {location}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
