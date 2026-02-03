import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '@/utils/config';
import { Property, Testimonial, Message } from '../types';

export interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar?: string;
  notifications: {
    reservations: boolean;
    messages: boolean;
  };
}

const DEFAULT_PROFILE: AdminProfile = {
  firstName: 'Admin',
  lastName: 'Nesty',
  email: 'admin@nesty.ma',
  bio: '',
  notifications: { reservations: true, messages: true }
};

interface DataContextType {
  isLoading: boolean;
  properties: Property[];
  testimonials: Testimonial[];
  messages: Message[];
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (id: string | number, property: Property) => Promise<void>;
  deleteProperty: (id: string | number) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => Promise<void>;
  markMessageRead: (id: string | number) => Promise<void>;
  deleteMessage: (id: string | number) => Promise<void>;
  adminProfile: AdminProfile;
  updateAdminProfile: (profile: AdminProfile) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(DEFAULT_PROFILE);
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(true);

  // Helper to fetch data
  const fetchData = async () => {
    try {
      const [propsRes, msgsRes, testRes] = await Promise.all([
        fetch(`${API_BASE_URL}/properties.php`),
        fetch(`${API_BASE_URL}/messages.php`),
        fetch(`${API_BASE_URL}/testimonials.php`)
      ]);

      if (propsRes.ok) setProperties(await propsRes.json());
      if (msgsRes.ok) setMessages(await msgsRes.json());
      if (testRes.ok) setTestimonials(await testRes.json());

      // Attempt to load profile from local storage as fallback or server if implemented
      const savedProfile = localStorage.getItem('nesty_admin_profile');
      if (savedProfile) {
        setAdminProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingProps(false);
      setLoadingMsgs(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isLoading = loadingProps || loadingMsgs;

  // Actions
  const addProperty = async (property: Property) => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
      });
      if (!response.ok) throw new Error('Failed to add property');
      await fetchData(); // Refresh data
    } catch (error) {
      console.error("Error adding property: ", error);
      throw error;
    }
  };

  const updateProperty = async (id: string | number, updatedProperty: Property) => {
    try {
      // API currently doesn't support PUT in the basic version generated, 
      // but assuming we extend it or for now just re-add (which is bad)
      // Implementation assumes the API handles updates or we use a specific update endpoint.
      // For this migration level, let's assume we might need to improve the API side 
      // or just handle it as a 'delete then create' if API doesn't support update yet.
      // BUT, let's try to send a POST with ID or similar if we enhanced the API.
      // Given the current properties.php, it only has POST (create) and DELETE.
      // We need to UPDATE api/properties.php to handle PUT/Update, or sending an ID in POST.
      console.warn("Update property not fully implemented in basic API yet");
    } catch (error) {
      console.error("Error updating property: ", error);
      throw error;
    }
  };

  const deleteProperty = async (id: string | number) => {
    try {
      await fetch(`${API_BASE_URL}/properties.php?id=${id}`, { method: 'DELETE' });
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting property: ", error);
      throw error;
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    try {
      await fetch(`${API_BASE_URL}/messages.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      // We don't refresh messages here usually as this is called by public side
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const markMessageRead = async (id: string | number) => {
    // API endpoint needs update to support 'mark read' (Update)
    // For now update local state
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = async (id: string | number) => {
    // API messages.php needs DELETE support
    // For now update local
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const updateAdminProfile = async (profile: AdminProfile) => {
    setAdminProfile(profile);
    localStorage.setItem('nesty_admin_profile', JSON.stringify(profile));
  };

  return (
    <DataContext.Provider value={{
      isLoading,
      properties,
      testimonials,
      messages,
      addProperty,
      updateProperty,
      deleteProperty,
      addMessage,
      markMessageRead,
      deleteMessage,
      adminProfile,
      updateAdminProfile
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};