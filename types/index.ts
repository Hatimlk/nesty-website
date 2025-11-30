export interface Property {
  id: number;
  image: string;
  images: string[];
  title: string;
  location: string;
  type: string;
  rawPrice: number;
  displayPrice: string;
  specs: {
    surface: string;
    rooms: number;
    roomsDisplay: string;
    roi: string;
  };
  amenities: string[];
  description: string;
  isSold?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
