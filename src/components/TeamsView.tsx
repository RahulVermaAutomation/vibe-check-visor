import { useState } from 'react';
import { Search, Filter, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeamHealthGrid } from './TeamHealthGrid';
import { TeamDetailView } from './TeamDetailView';
import { mockTeams, mockEmployees, Team } from '@/data/mockData';

export function TeamsView() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('health_score');

  // Get unique departments for filter
  const departments = [...new Set(mockTeams.map(team => team.department))];

  // Filter and sort teams
  const filteredTeams = mockTeams
    .filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || team.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'health_score':
          return b.health_score - a.health_score;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.members_count - a.members_count;
        case 'response_rate':
          return b.response_rate - a.response_rate;
        default:
          return 0;
      }
    });

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleBackToTeams = () => {
    setSelectedTeam(null);
  };

  // Get team members for selected team
  const getTeamMembers = (teamId: string) => {
    return mockEmployees.filter(emp => emp.team_id === teamId);
  };

  if (selectedTeam) {
    return (
      <TeamDetailView 
        team={selectedTeam} 
        teamMembers={getTeamMembers(selectedTeam.id)}
        onBack={handleBackToTeams}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage team health across your organization
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams or managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health_score">Health Score</SelectItem>
              <SelectItem value="name">Team Name</SelectItem>
              <SelectItem value="size">Team Size</SelectItem>
              <SelectItem value="response_rate">Response Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Teams</p>
              <p className="text-2xl font-bold">{filteredTeams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Healthy Teams</p>
              <p className="text-2xl font-bold text-success">
                {filteredTeams.filter(t => t.health_score >= 80).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">At Risk</p>
              <p className="text-2xl font-bold text-warning">
                {filteredTeams.filter(t => t.health_score >= 60 && t.health_score < 80).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-danger/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold text-danger">
                {filteredTeams.filter(t => t.health_score < 60).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredTeams.length === mockTeams.length ? 'All Teams' : `Filtered Teams (${filteredTeams.length})`}
          </h2>
          <p className="text-sm text-muted-foreground">
            Click on any team to view detailed insights
          </p>
        </div>
        
        {filteredTeams.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <TeamHealthGrid teams={filteredTeams} onTeamClick={handleTeamClick} />
        )}
      </div>
    </div>
  );
}