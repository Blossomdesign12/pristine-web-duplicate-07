
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Search,
  Send,
  Clock,
  Check,
  CheckCheck,
  Plus,
  User,
  MoreVertical
} from "lucide-react";
import messagingService from "@/services/messagingService";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  isOnline: boolean;
}

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock contacts data
  const [contacts] = useState<Contact[]>([
    {
      id: "agent-1",
      name: "Michael Scott",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastMessage: "I'll check the availability of that apartment for you.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unread: 2,
      isOnline: true
    },
    {
      id: "owner-1",
      name: "Jennifer Kim",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastMessage: "Thank you for your interest in my property.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      unread: 0,
      isOnline: false
    },
    {
      id: "agent-2",
      name: "David Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastMessage: "Let me know when you'd like to schedule a viewing.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unread: 0,
      isOnline: true
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Use a mock user ID if no user is logged in
  const mockUserId = "user-1";
  const currentUserId = user?.id || mockUserId;

  useEffect(() => {
    if (selectedContact) {
      // Fetch conversation between users
      const fetchMessages = async () => {
        try {
          const conversation = await messagingService.getConversation(
            currentUserId,
            selectedContact.id
          );
          setMessages(conversation);
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast({
            title: "Error",
            description: "Could not load conversation history.",
            variant: "destructive"
          });
        }
      };

      fetchMessages();
    }
  }, [selectedContact, currentUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;

    try {
      // Send message using the messaging service
      await messagingService.sendMessage(
        currentUserId,
        selectedContact.id,
        newMessage
      );

      // Update local state with the new message
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        receiverId: selectedContact.id,
        content: newMessage,
        timestamp: new Date(),
        read: false
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      
      // Update the contact's last message in the UI
      // In a real app, you would handle this better, possibly with real-time updates
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Could not send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today, show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // Within a week, show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // More than a week, show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with top navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messages</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-200px)] min-h-[500px]">
          {/* Contacts List */}
          <div className="md:col-span-1 border-r border-gray-200">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search contacts"
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-76px)]">
              {filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <User className="h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">No contacts found</p>
                </div>
              ) : (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className={`flex items-center p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedContact?.id === contact.id ? 'bg-gray-50' : ''
                    } ${contact.unread > 0 ? 'font-medium' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="relative">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">
                          {formatMessageTime(contact.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                    </div>
                    
                    {contact.unread > 0 && (
                      <div className="ml-2 bg-estate-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={selectedContact.avatar} 
                        alt={selectedContact.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {selectedContact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedContact.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <p className="text-gray-500 mb-2">No messages yet</p>
                      <p className="text-sm text-gray-400">
                        Start the conversation with {selectedContact.name}
                      </p>
                    </div>
                  ) : (
                    messages.map(message => {
                      const isMine = message.senderId === currentUserId;
                      
                      return (
                        <div 
                          key={message.id}
                          className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-lg px-4 py-2 ${
                              isMine 
                                ? 'bg-estate-primary text-white rounded-br-none' 
                                : 'bg-gray-100 rounded-bl-none'
                            }`}
                          >
                            <p>{message.content}</p>
                            <div 
                              className={`text-xs mt-1 flex justify-end items-center ${
                                isMine ? 'text-estate-primary-foreground/70' : 'text-gray-500'
                              }`}
                            >
                              <span>{formatMessageTime(new Date(message.timestamp))}</span>
                              {isMine && (
                                <span className="ml-1">
                                  {message.read ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* Input Area */}
                <div className="p-4 border-t flex items-center">
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="mx-2"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    variant="primary" 
                    size="icon" 
                    className="bg-estate-primary text-white hover:bg-estate-primary/90"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-gray-700 text-lg font-medium mb-2">Your Messages</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Select a contact to start chatting or send a new message to property owners and agents.
                </p>
                <Button className="bg-estate-primary hover:bg-estate-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const MessageSquare = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

export default Messages;
