import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Team } from '@/data/mockData';

interface TeamHealthGridProps {
  teams: Team[];
  onTeamClick?: (team: Team) => void;
}

export function TeamHealthGrid({ teams, onTeamClick }: TeamHealthGridProps) {
  const getHealthStatus = (score: number) => {
    if (score >= 80) return 'healthy';
    if (score >= 60) return 'warning';
    return 'critical';
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-danger text-danger-foreground';
  };

  const getHealthBadgeClass = (score: number) => {
    const status = getHealthStatus(score);
    return `status-indicator status-${status}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <Card 
          key={team.id} 
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          onClick={() => onTeamClick?.(team)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${getHealthColor(team.health_score)}`} />
            </div>
            <p className="text-sm text-muted-foreground">{team.department}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Health Score */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Health Score</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${
                  team.health_score >= 80 ? 'text-success' : 
                  team.health_score >= 60 ? 'text-warning' : 'text-danger'
                }`}>
                  {team.health_score}%
                </span>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{team.members_count} members</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Response Rate</span>
                <div className="font-medium">{team.response_rate}%</div>
              </div>
            </div>

            {/* Manager */}
            <div className="text-sm">
              <span className="text-muted-foreground">Manager: </span>
              <span className="font-medium">{team.manager}</span>
            </div>

            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <Badge className={getHealthBadgeClass(team.health_score)}>
                {getHealthStatus(team.health_score).charAt(0).toUpperCase() + getHealthStatus(team.health_score).slice(1)}
              </Badge>
              
              {/* Quick trend indicator */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {Math.random() > 0.5 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-success">Improving</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-danger" />
                    <span className="text-danger">Declining</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}