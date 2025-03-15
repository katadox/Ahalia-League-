
import React, { createContext, useContext, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";

// Define user type
interface User {
  id: string;
  name: string;
  teamId: string;
  role: 'player' | 'captain' | 'admin';
}

// Create context with default values
interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

// Hook to use the context
export const useUser = () => useContext(UserContext);

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // In a real app, this would be fetched from an auth service
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "user-1",
    name: "Arrow Thomas",
    teamId: "team-1", // This should match an ID in the teams array
    role: 'player',
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <TopBar />
            <main className="flex-1 p-6 pt-0">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </UserContext.Provider>
  );
}
