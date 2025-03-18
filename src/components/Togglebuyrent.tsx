
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Property Types",
    sale: [
      { name: "Apartments", url: "/properties-for-sale?type=apartment" },
      { name: "Independent Houses", url: "/properties-for-sale?type=house" },
      { name: "Villas", url: "/properties-for-sale?type=villa" },
      { name: "Plots", url: "/properties-for-sale?type=plot" },
      { name: "Farm Houses", url: "/properties-for-sale?type=farmhouse" }
    ],
    rent: [
      { name: "Apartments", url: "/properties-for-rent?type=apartment" },
      { name: "Independent Houses", url: "/properties-for-rent?type=house" },
      { name: "Villas", url: "/properties-for-rent?type=villa" },
      { name: "Commercial Spaces", url: "/properties-for-rent?type=commercial" },
      { name: "PG & Co-living", url: "/properties-for-rent?type=pg" }
    ]
  },
  {
    title: "Popular Locations",
    sale: [
      { name: "Mumbai", url: "/properties-for-sale?city=Mumbai" },
      { name: "Thane", url: "/properties-for-sale?city=Thane" },
      { name: "Navi Mumbai", url: "/properties-for-sale?city=Navi Mumbai" },
      { name: "Pune", url: "/properties-for-sale?city=Pune" },
      { name: "Bangalore", url: "/properties-for-sale?city=Bangalore" }
    ],
    rent: [
      { name: "Mumbai", url: "/properties-for-rent?city=Mumbai" },
      { name: "Thane", url: "/properties-for-rent?city=Thane" },
      { name: "Navi Mumbai", url: "/properties-for-rent?city=Navi Mumbai" },
      { name: "Pune", url: "/properties-for-rent?city=Pune" },
      { name: "Bangalore", url: "/properties-for-rent?city=Bangalore" }
    ]
  },
  {
    title: "By Budget",
    sale: [
      { name: "Under ₹50 Lakhs", url: "/properties-for-sale?maxPrice=5000000" },
      { name: "₹50 Lakhs - ₹1 Crore", url: "/properties-for-sale?minPrice=5000000&maxPrice=10000000" },
      { name: "₹1 Crore - ₹2 Crore", url: "/properties-for-sale?minPrice=10000000&maxPrice=20000000" },
      { name: "Above ₹2 Crore", url: "/properties-for-sale?minPrice=20000000" }
    ],
    rent: [
      { name: "Under ₹20,000", url: "/properties-for-rent?maxPrice=20000" },
      { name: "₹20,000 - ₹40,000", url: "/properties-for-rent?minPrice=20000&maxPrice=40000" },
      { name: "₹40,000 - ₹60,000", url: "/properties-for-rent?minPrice=40000&maxPrice=60000" },
      { name: "Above ₹60,000", url: "/properties-for-rent?minPrice=60000" }
    ]
  }
];

export default function FlatsListing() {
  const [activeTab, setActiveTab] = useState("buying");

  return (
    <div className="bg-[#f8f9fa] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md ${
                activeTab === "buying" ? "bg-black text-white" : "bg-transparent text-gray-700"
              } font-medium transition-all`}
              onClick={() => setActiveTab("buying")}
            >
              Buying
            </button>
            <button
              className={`px-6 py-2 rounded-md ${
                activeTab === "renting" ? "bg-black text-white" : "bg-transparent text-gray-700"
              } font-medium transition-all`}
              onClick={() => setActiveTab("renting")}
            >
              Renting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-lg font-semibold mb-4">{category.title}</h2>
              <div className="space-y-2">
                {(activeTab === "buying" ? category.sale : category.rent).map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.url}
                    className="block text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
