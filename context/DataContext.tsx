import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { db } from '@/utils/firebase';
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
  // const [isLoading, setIsLoading] = useState(true); // Removed in favor of derived state
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(DEFAULT_PROFILE);

  // Migration Logic
  useEffect(() => {
    const migrateData = async () => {
      if (localStorage.getItem('nesty_migration_done_v2')) return;

      try {
        // Check if Firestore is empty to avoid duplicating or overwriting
        const propSnap = await getDocs(collection(db, 'properties'));
        if (propSnap.empty) {
          const localProps = localStorage.getItem('nesty_properties');
          if (localProps) {
            const parsed = JSON.parse(localProps);
            for (const item of parsed) {
              const { id, ...data } = item; // Remove old ID
              await addDoc(collection(db, 'properties'), data);
            }
          }
        }

        const msgSnap = await getDocs(collection(db, 'messages'));
        if (msgSnap.empty) {
          const local = localStorage.getItem('nesty_messages');
          if (local) {
            const parsed = JSON.parse(local);
            for (const item of parsed) {
              const { id, ...data } = item;
              await addDoc(collection(db, 'messages'), data);
            }
          }
        }

        // Admin Profile
        const profileRef = doc(db, 'settings', 'profile');
        // Actually direct doc check is better but for migration flow:
        const localProfile = localStorage.getItem('nesty_admin_profile');
        if (localProfile) {
          // We overwrite or set initial only? Let's set if not exists, but 'settings' might not allow list.
          await setDoc(profileRef, JSON.parse(localProfile), { merge: true });
        }

        localStorage.setItem('nesty_migration_done_v2', 'true');
        console.log("Migration completed");
      } catch (err) {
        console.error("Migration failed:", err);
      }
    };

    migrateData();
  }, []);

  // Separate loading states
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(true);

  // Derived global loading
  const isLoading = loadingProps && loadingMsgs;

  // Subscriptions
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'properties'), (snap) => {
      setProperties(snap.docs.map(d => ({ ...d.data(), id: d.id } as Property)));
      setLoadingProps(false);
    }, (err) => {
      console.error("Properties subscription error:", err);
      setLoadingProps(false); // Fail safe
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snap) => {
      setTestimonials(snap.docs.map(d => ({ ...d.data(), id: d.id } as Testimonial)));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'messages'), (snap) => {
      setMessages(snap.docs.map(d => ({ ...d.data(), id: d.id } as Message)));
      setLoadingMsgs(false);
    }, (err) => {
      console.error("Messages subscription error:", err);
      setLoadingMsgs(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'profile'), (snap) => {
      if (snap.exists()) {
        setAdminProfile(snap.data() as AdminProfile);
      }
    });
    return unsub;
  }, []);


  // Actions
  // Actions
  const addProperty = async (property: Property) => {
    try {
      const { id, ...data } = property; // Ensure no ID is sent if it exists
      await addDoc(collection(db, 'properties'), data);
    } catch (error) {
      console.error("Error adding property: ", error);
      throw error;
    }
  };

  const updateProperty = async (id: string | number, updatedProperty: Property) => {
    try {
      const { id: _, ...data } = updatedProperty;
      await updateDoc(doc(db, 'properties', String(id)), data);
    } catch (error) {
      console.error("Error updating property: ", error);
      throw error;
    }
  };

  const deleteProperty = async (id: string | number) => {
    try {
      await deleteDoc(doc(db, 'properties', String(id)));
    } catch (error) {
      console.error("Error deleting property: ", error);
      throw error;
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    await addDoc(collection(db, 'messages'), {
      ...msg,
      date: new Date().toISOString(),
      read: false
    });
  };

  const markMessageRead = async (id: string | number) => {
    await updateDoc(doc(db, 'messages', String(id)), { read: true });
  };

  const deleteMessage = async (id: string | number) => {
    await deleteDoc(doc(db, 'messages', String(id)));
  };

  const updateAdminProfile = async (profile: AdminProfile) => {
    await setDoc(doc(db, 'settings', 'profile'), profile);
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