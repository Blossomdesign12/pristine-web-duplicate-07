
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Building2, 
  ArrowLeft, 
  Home, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Upload, 
  Plus, 
  X 
} from "lucide-react";
import { propertyTypes } from "@/lib/data";

const AddProperty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [status, setStatus] = useState("for-sale");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newImageUrls = fileArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would connect to Supabase in a real app
      // For now, just simulate a successful property creation
      
      const propertyData = {
        title,
        description,
        price: parseFloat(price),
        features: {
          propertyType,
          status,
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          area: parseInt(area)
        },
        location: {
          street,
          city,
          state,
          zipCode
        },
        featured,
        images
      };
      
      console.log("Creating property:", propertyData);
      
      // Simulate API delay
      setTimeout(() => {
        toast({
          title: "Property Added",
          description: "Your property has been successfully listed."
        });
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Error",
        description: "There was a problem adding your property.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-semibold">Add New Property</h1>
          </div>
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-estate-primary" strokeWidth={2.5} />
            <span className="font-bold text-xl">FindHome</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-estate-primary" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g. Modern Apartment in Downtown"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="price" 
                      type="number" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      placeholder="e.g. 250000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Describe your property in detail..."
                    className="min-h-32"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Square className="w-5 h-5 mr-2 text-estate-primary" />
                Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Select Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Listing Status</Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured">Featured</Label>
                  <div className="flex items-center h-10 space-x-2">
                    <input 
                      type="checkbox" 
                      id="featured" 
                      checked={featured} 
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-estate-primary focus:ring-estate-primary"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Show in featured properties
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Bed className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="bedrooms" 
                      type="number" 
                      value={bedrooms} 
                      onChange={(e) => setBedrooms(e.target.value)} 
                      placeholder="e.g. 3"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Bath className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="bathrooms" 
                      type="number" 
                      value={bathrooms} 
                      onChange={(e) => setBathrooms(e.target.value)} 
                      placeholder="e.g. 2"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Square className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="area" 
                      type="number" 
                      value={area} 
                      onChange={(e) => setArea(e.target.value)} 
                      placeholder="e.g. 1500"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-estate-primary" />
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input 
                    id="street" 
                    value={street} 
                    onChange={(e) => setStreet(e.target.value)} 
                    placeholder="e.g. 123 Main St"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="e.g. New York"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    placeholder="e.g. NY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)} 
                    placeholder="e.g. 10001"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Images */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-estate-primary" />
                Property Images
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="mb-1 font-medium">Click to upload images</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 10MB each)</p>
                </label>
              </div>
              
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-estate-primary hover:bg-estate-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Property"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
