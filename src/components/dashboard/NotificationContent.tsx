
import { useState, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationContent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        // If API doesn't return notifications yet, use empty array
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      
      // For development/demo purposes - use empty array until backend is ready
      setNotifications([]);
      
      toast({
        title: 'Error',
        description: 'Could not load notifications. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      // Update local state
      setNotifications(
        notifications.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
      
      toast({
        title: 'Success',
        description: 'Notification marked as read',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Error',
        description: 'Could not update notification. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
      
      // Remove from local state
      setNotifications(notifications.filter(notification => notification.id !== id));
      
      toast({
        title: 'Success',
        description: 'Notification deleted',
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: 'Error',
        description: 'Could not delete notification. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
      
      // Update all notifications to read
      setNotifications(
        notifications.map(notification => ({ ...notification, isRead: true }))
      );
      
      toast({
        title: 'Success',
        description: 'All notifications marked as read',
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Error',
        description: 'Could not update notifications. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="p-2 bg-green-100 rounded-full"><Check className="h-5 w-5 text-green-600" /></div>;
      case 'warning':
        return <div className="p-2 bg-yellow-100 rounded-full"><Bell className="h-5 w-5 text-yellow-600" /></div>;
      case 'error':
        return <div className="p-2 bg-red-100 rounded-full"><Bell className="h-5 w-5 text-red-600" /></div>;
      case 'info':
      default:
        return <div className="p-2 bg-blue-100 rounded-full"><Bell className="h-5 w-5 text-blue-600" /></div>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated on important events</CardDescription>
          </div>
          {notifications.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={notifications.every(n => n.isRead)}
            >
              Mark all as read
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
              <p className="text-gray-500 mt-1">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  {renderNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.timestamp)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationContent;
