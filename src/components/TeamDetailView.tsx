import { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, Calendar, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Team, Employee } from '@/data/mockData';

interface TeamDetailViewProps {
  team: Team;
  teamMembers: Employee[];
  onBack: () => void;
}

export function TeamDetailView({ team, teamMembers, onBack }: TeamDetailViewProps) {
  const getHealthStatus = (score: number) => {
    if (score >= 80) return 'healthy';
    if (score >= 60) return 'warning';
    return 'critical';
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getRiskBadgeClass = (risk: Employee['flight_risk']) => {
    switch (risk) {
      case 'low':
        return 'status-indicator status-healthy';
      case 'medium':
        return 'status-indicator status-warning';
      case 'high':
        return 'status-indicator status-critical';
      default:
        return 'status-indicator status-healthy';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Teams
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <p className="text-muted-foreground">{team.department} • Managed by {team.manager}</p>
        </div>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getHealthColor(team.health_score)}`}>
              {team.health_score}%
            </div>
            <p className="text-sm text-muted-foreground">Overall team health</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{team.members_count}</div>
            <p className="text-sm text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{team.response_rate}%</div>
            <p className="text-sm text-muted-foreground">Survey participation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {teamMembers.filter(m => m.flight_risk === 'high').length}
            </div>
            <p className="text-sm text-muted-foreground">High-risk members</p>
          </CardContent>
        </Card>
      </div>

      {/* Happiness Tenets Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Happiness Tenets Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of team satisfaction across key areas
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(team.happiness_tenets).map(([key, value]) => {
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{label}</span>
                  <span className={`font-semibold ${getHealthColor(value)}`}>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Individual team member status and risk assessment
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{member.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Morale Score</span>
                        <span className={`text-sm font-semibold ${getHealthColor(member.morale_score)}`}>
                          {member.morale_score}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Flight Risk</span>
                        <Badge className={getRiskBadgeClass(member.flight_risk)}>
                          {member.flight_risk}
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Last response: {new Date(member.last_response).toLocaleDateString()}
                      </div>
                      
                      {member.key_concerns.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium mb-1">Key Concerns:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.key_concerns.map((concern, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {concern.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-generated suggestions to improve team health
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.filter(m => m.flight_risk === 'high').length > 0 && (
            <div className="p-4 rounded-lg bg-danger-light border border-danger/20">
              <h4 className="font-semibold text-danger mb-2">Immediate Action Required</h4>
              <p className="text-sm text-danger mb-3">
                {teamMembers.filter(m => m.flight_risk === 'high').length} team member(s) at high flight risk
              </p>
              <Button size="sm" className="bg-danger hover:bg-danger/90">
                Schedule 1:1 Meetings
              </Button>
            </div>
          )}
          
          <div className="p-4 rounded-lg bg-warning-light border border-warning/20">
            <h4 className="font-semibold text-warning mb-2">Improve Work-Life Balance</h4>
            <p className="text-sm text-warning mb-3">
              Team scoring below average on work-life balance ({team.happiness_tenets.work_life_balance}%)
            </p>
            <Button variant="outline" size="sm">
              Explore Flexible Options
            </Button>
          </div>
          
          <div className="p-4 rounded-lg bg-success-light border border-success/20">
            <h4 className="font-semibold text-success mb-2">Recognition Opportunity</h4>
            <p className="text-sm text-success mb-3">
              Strong team collaboration score - consider team recognition
            </p>
            <Button variant="outline" size="sm">
              Send Team Appreciation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}