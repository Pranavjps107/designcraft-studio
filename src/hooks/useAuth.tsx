import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api, { User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; full_name: string; tenant_name: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = api.getToken();
    if (token) {
      // Verify token and fetch user profile
      api.verifyToken(token)
        .then((verifiedData) => {
          // Token is valid, now get full profile
          return api.getUserProfile();
        })
        .then((profile) => {
          setUser({
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name,
            role: profile.role,
            tenant_id: 'default', // We'll need to get this from verify response or profile
            avatar_url: profile.avatar_url,
          });
        })
        .catch(() => {
          // Token might be expired or invalid
          api.clearToken();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    // After login, fetch user profile to get user data
    const profile = await api.getUserProfile();
    setUser({
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role,
      tenant_id: 'default', // Need to get from verify token or profile
      avatar_url: profile.avatar_url,
    });
    navigate('/dashboard');
  };

  const register = async (data: { email: string; password: string; full_name: string; tenant_name: string }) => {
    await api.register(data);
    // After registration, user needs to login
    toast.success("Account created successfully! Please login.");
    navigate('/login');
  };

  const logout = () => {
    api.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
