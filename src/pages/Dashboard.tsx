import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { OverviewDashboard } from '@/components/OverviewDashboard';
import { TeamsView } from '@/components/TeamsView';
import { IndividualsView } from '@/components/IndividualsView';
import { mockAlerts, Team } from '@/data/mockData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTeamClick = (team: Team) => {
    // Navigate to teams tab and show team details
    setActiveTab('teams');
    // Pass team data to TeamsView - this will be handled by TeamsView state
  };

  const handleNavigateToTeams = () => {
    setActiveTab('teams');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewDashboard 
            onTeamClick={handleTeamClick}
            onNavigateToTeams={handleNavigateToTeams}
          />
        );
      case 'teams':
        return <TeamsView />;
      case 'individuals':
        return <IndividualsView />;
      case 'insights':
        return (
          <div className="flex items-center justify-center h-96 bg-card rounded-lg border border-border">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">AI Insights & Recommendations</h3>
              <p className="text-muted-foreground">Smart recommendations coming soon</p>
            </div>
          </div>
        );
      case 'trends':
        return (
          <div className="flex items-center justify-center h-96 bg-card rounded-lg border border-border">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Historical Trends</h3>
              <p className="text-muted-foreground">Time-series analysis coming soon</p>
            </div>
          </div>
        );
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <DashboardHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        alertCount={mockAlerts.filter(alert => alert.type === 'critical').length}
      />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
}