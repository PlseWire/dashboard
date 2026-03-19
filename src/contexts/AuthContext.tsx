import React, { createContext, useContext, useMemo } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface User {
  username: string;
  email: string;
  clearance: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  const user = useMemo(() => {
    if (!isLoaded || !clerkUser) return null;
    
    return {
      username: clerkUser.username || clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress.split('@')[0] || 'Operator',
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      clearance: (clerkUser.publicMetadata.clearance as string) || 'Level 1',
      id: clerkUser.id || 'PW-RAND-X'
    };
  }, [clerkUser, isLoaded]);

  const login = () => {
    // handled by Clerk redirection/hooks
  };

  const logout = async () => {
    await signOut({ redirectUrl: '/login' });
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!clerkUser) return;
    
    if (userData.username) {
      // In a real app, you might update Clerk's profile here
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
