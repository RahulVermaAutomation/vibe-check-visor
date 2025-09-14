import { useState } from 'react';
import { Search, Filter, User, TrendingDown, AlertTriangle, Calendar, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { mockEmployees, mockTeams, Employee } from '@/data/mockData';
import { OneOnOneModal } from '@/components/OneOnOneModal';

export function IndividualsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('morale_score');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort employees
  const filteredEmployees = mockEmployees
    .filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = teamFilter === 'all' || employee.team_id === teamFilter;
      const matchesRisk = riskFilter === 'all' || employee.flight_risk === riskFilter;
      return matchesSearch && matchesTeam && matchesRisk;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'morale_score':
          return a.morale_score - b.morale_score; // Low to high for attention
        case 'name':
          return a.name.localeCompare(b.name);
        case 'flight_risk':
          const riskOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return riskOrder[b.flight_risk] - riskOrder[a.flight_risk];
        case 'last_response':
          return new Date(a.last_response).getTime() - new Date(b.last_response).getTime();
        default:
          return 0;
      }
    });

  const getTeamName = (teamId: string) => {
    const team = mockTeams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown Team';
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

  const getRiskIcon = (risk: Employee['flight_risk']) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Individual Insights</h1>
          <p className="text-muted-foreground">
            Monitor individual employee wellbeing and identify intervention opportunities
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {mockTeams.map(team => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morale_score">Morale Score (Low First)</SelectItem>
              <SelectItem value="flight_risk">Flight Risk</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="last_response">Last Response</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Individual Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold">{filteredEmployees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-danger/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">High Risk</p>
              <p className="text-2xl font-bold text-danger">
                {filteredEmployees.filter(emp => emp.flight_risk === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <TrendingDown className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Medium Risk</p>
              <p className="text-2xl font-bold text-warning">
                {filteredEmployees.filter(emp => emp.flight_risk === 'medium').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <User className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Risk</p>
              <p className="text-2xl font-bold text-success">
                {filteredEmployees.filter(emp => emp.flight_risk === 'low').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Employee Overview ({filteredEmployees.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Sorted by {sortBy.replace('_', ' ')}
          </p>
        </div>
        
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No employees found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {getTeamName(employee.team_id)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getRiskBadgeClass(employee.flight_risk)}>
                        {getRiskIcon(employee.flight_risk)}
                        {employee.flight_risk} risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Morale Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Morale Score</span>
                      <span className={`text-lg font-bold ${getHealthColor(employee.morale_score)}`}>
                        {employee.morale_score}%
                      </span>
                    </div>
                    <Progress value={employee.morale_score} className="h-2" />
                  </div>

                  {/* Happiness Tenets Mini Chart */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Happiness Breakdown</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(employee.happiness_tenets).map(([key, value]) => {
                        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground truncate">{label}</span>
                            <span className={`font-medium ${getHealthColor(value)}`}>{value}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Concerns */}
                  {employee.key_concerns.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Concerns</h4>
                      <div className="flex flex-wrap gap-1">
                        {employee.key_concerns.map((concern, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {concern.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Last Response */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Last response: {new Date(employee.last_response).toLocaleDateString()}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsModalOpen(true);
                      }}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Schedule 1:1
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* One-on-One Modal */}
      <OneOnOneModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
      />
    </div>
  );
}