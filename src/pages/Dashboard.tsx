
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Building2, 
  Plus, 
  Home, 
  Users, 
  Bell, 
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  DollarSign,
  List,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return null; // Protected route should handle this
  }

  const renderDashboardContent = () => {
    switch (user.role) {
      case "buyer":
        return <BuyerDashboard activeTab={activeTab} />;
      case "owner":
        return <OwnerDashboard activeTab={activeTab} />;
      case "agent":
        return <AgentDashboard activeTab={activeTab} />;
      case "admin":
        return <AdminDashboard activeTab={activeTab} />;
      default:
        return <BuyerDashboard activeTab={activeTab} />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-estate-primary" strokeWidth={2.5} />
              <span className="font-bold text-xl">FindHome</span>
            </Link>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar || "https://via.placeholder.com/40"} 
                alt={user.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "overview" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Overview
            </Button>
            
            {user.role === "buyer" && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "favorites" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("favorites")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Favorites
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "search" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("search")}
                >
                  <List className="mr-2 h-5 w-5" />
                  Property Search
                </Button>
              </>
            )}
            
            {(user.role === "owner" || user.role === "agent") && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "properties" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("properties")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  My Properties
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "listings" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("listings")}
                >
                  <List className="mr-2 h-5 w-5" />
                  Listings
                </Button>
              </>
            )}
            
            {user.role === "agent" && (
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === "clients" ? "bg-gray-100" : ""}`}
                onClick={() => setActiveTab("clients")}
              >
                <Users className="mr-2 h-5 w-5" />
                Clients
              </Button>
            )}
            
            {user.role === "admin" && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "users" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Users
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === "analytics" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveTab("analytics")}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Analytics
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "messages" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
            </Button>
            
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "notifications" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </Button>
            
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "settings" ? "bg-gray-100" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {(user.role === "owner" || user.role === "agent") && (
              <Button 
                className="bg-estate-primary hover:bg-estate-primary/90"
                onClick={() => navigate("/add-property")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            )}
          </div>
          
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
