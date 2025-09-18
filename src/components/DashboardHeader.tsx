import { Bell, User, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount: number;
}

const navigationTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'teams', label: 'Team View' },
  { id: 'individuals', label: 'Individual View' },
  { id: 'insights', label: 'Insights & Recommendations' },
  { id: 'trends', label: 'Historical Trends' }
];

export function DashboardHeader({ activeTab, onTabChange, alertCount }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Pulse Check Agent</h1>
                <p className="text-sm text-muted-foreground">Leadership Dashboard</p>
              </div>
            </div>
          </div>

          {/* User Profile and Notifications */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {alertCount > 0 && (
                <Badge className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center bg-danger text-danger-foreground text-xs p-0">
                  {alertCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=DavidLamb" />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">David Lamb</p>
                    <p className="text-xs text-muted-foreground">VP Engineering</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 border-b border-border">
          <div className="flex space-x-8 overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}