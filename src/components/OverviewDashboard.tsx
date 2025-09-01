import { Activity, Users, TrendingUp, AlertTriangle, Target, BarChart3 } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TeamHealthGrid } from './TeamHealthGrid';
import { AlertFeed } from './AlertFeed';
import { MoraleChart } from './MoraleChart';
import { mockTeams, mockAlerts, mockTrendData, getOverallMetrics } from '@/data/mockData';

export function OverviewDashboard() {
  const metrics = getOverallMetrics();
  
  const handleTeamClick = (team: any) => {
    console.log('Team clicked:', team);
    // Here you would navigate to team details or open a modal
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Morale Score"
          value={metrics.overallMorale}
          subtitle="Across all teams"
          trend={{ value: -2, label: 'vs last month' }}
          status={metrics.overallMorale >= 80 ? 'healthy' : metrics.overallMorale >= 60 ? 'warning' : 'critical'}
          icon={<Activity className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Flight Risk Alerts"
          value={metrics.flightRiskCount}
          subtitle="High risk employees"
          status={metrics.flightRiskCount === 0 ? 'healthy' : metrics.flightRiskCount <= 2 ? 'warning' : 'critical'}
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Response Rate"
          value={metrics.overallResponseRate}
          subtitle="Survey participation"
          trend={{ value: 1, label: 'vs last month' }}
          status={metrics.overallResponseRate >= 80 ? 'healthy' : 'warning'}
          icon={<Target className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Team Health Index"
          value="B+"
          subtitle="Composite score"
          trend={{ value: 0, label: 'vs last month' }}
          status="healthy"
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </div>

      {/* Charts and Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoraleChart data={mockTrendData} />
        </div>
        <div>
          <AlertFeed alerts={mockAlerts} maxItems={4} />
        </div>
      </div>

      {/* Team Health Heatmap Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Team Health Overview</h2>
            <p className="text-muted-foreground">
              Click on any team to view detailed insights and individual team member status
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Healthy (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>At Risk (60-79%)</span>  
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-danger rounded-full"></div>
              <span>Critical (&lt;60%)</span>
            </div>
          </div>
        </div>
        
        <TeamHealthGrid teams={mockTeams} onTeamClick={handleTeamClick} />
      </div>

      {/* Summary Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {mockTeams.filter(t => t.health_score >= 80).length}
            </div>
            <p className="text-muted-foreground">Teams performing well</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {mockTeams.filter(t => t.health_score >= 60 && t.health_score < 80).length}
            </div>
            <p className="text-muted-foreground">Teams needing attention</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger mb-1">
              {mockTeams.filter(t => t.health_score < 60).length}
            </div>
            <p className="text-muted-foreground">Teams requiring immediate action</p>
          </div>
        </div>
      </div>
    </div>
  );
}