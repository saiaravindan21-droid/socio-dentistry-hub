import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  appointments: Appointment[];
}

export interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (appointmentId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login function (in a real app this would call an API)
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials against the backend
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Check localStorage to see if user exists
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find((u: any) => u.email === email);
    
    if (!foundUser) {
      throw new Error('User not found');
    }
    
    if (foundUser.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Remove password before storing in state
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    navigate('/dashboard');
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, send data to the backend
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((u: any) => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
      appointments: []
    };
    
    // Add to users list
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    // Remove password before storing in state
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    if (!user) return;
    
    const newAppointment = {
      id: Date.now(),
      ...appointmentData
    };
    
    const updatedUser = {
      ...user,
      appointments: [...(user.appointments || []), newAppointment]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update in the users array
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map((u: any) => {
      if (u.id === user.id) {
        return { 
          ...u, 
          appointments: [...(u.appointments || []), newAppointment] 
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const cancelAppointment = (appointmentId: number) => {
    if (!user) return;
    
    // Filter out the appointment to be canceled
    const updatedAppointments = user.appointments.filter(
      appointment => appointment.id !== appointmentId
    );
    
    const updatedUser = {
      ...user,
      appointments: updatedAppointments
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update in the users array
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map((u: any) => {
      if (u.id === user.id) {
        return { 
          ...u, 
          appointments: updatedAppointments 
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    addAppointment,
    cancelAppointment
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
