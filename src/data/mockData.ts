// Mock data for AI Pulse Check Agent Dashboard

export interface Employee {
  id: string;
  name: string;
  role: string;
  team_id: string;
  avatar: string;
  morale_score: number;
  flight_risk: 'low' | 'medium' | 'high';
  last_response: string;
  key_concerns: string[];
  happiness_tenets: {
    work_fulfillment: number;
    work_life_balance: number;
    recognition_growth: number;
    team_collaboration: number;
    management_support: number;
  };
}

export interface Team {
  id: string;
  name: string;
  department: string;
  health_score: number;
  members_count: number;
  response_rate: number;
  manager: string;
  happiness_tenets: {
    work_fulfillment: number;
    work_life_balance: number;
    recognition_growth: number;
    team_collaboration: number;
    management_support: number;
  };
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  employee_id?: string;
  team_id?: string;
  created_at: string;
  priority: number;
}

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Frontend Development',
    department: 'Engineering',
    health_score: 78,
    members_count: 15,
    response_rate: 87.5,
    manager: 'David Lamb',
    happiness_tenets: {
      work_fulfillment: 82,
      work_life_balance: 75,
      recognition_growth: 80,
      team_collaboration: 85,
      management_support: 70
    }
  },
  {
    id: 'team-2',
    name: 'Backend Development',
    department: 'Engineering',
    health_score: 85,
    members_count: 6,
    response_rate: 100,
    manager: 'Marcus Rodriguez',
    happiness_tenets: {
      work_fulfillment: 88,
      work_life_balance: 82,
      recognition_growth: 85,
      team_collaboration: 90,
      management_support: 80
    }
  },
  {
    id: 'team-3',
    name: 'Product Design',
    department: 'Design',
    health_score: 72,
    members_count: 5,
    response_rate: 80,
    manager: 'Emily Watson',
    happiness_tenets: {
      work_fulfillment: 75,
      work_life_balance: 68,
      recognition_growth: 70,
      team_collaboration: 78,
      management_support: 69
    }
  },
  {
    id: 'team-4',
    name: 'DevOps',
    department: 'Engineering',
    health_score: 91,
    members_count: 4,
    response_rate: 100,
    manager: 'Alex Thompson',
    happiness_tenets: {
      work_fulfillment: 93,
      work_life_balance: 89,
      recognition_growth: 88,
      team_collaboration: 92,
      management_support: 93
    }
  },
  {
    id: 'team-5',
    name: 'Product Management',
    department: 'Product',
    health_score: 65,
    members_count: 7,
    response_rate: 71.4,
    manager: 'Jessica Park',
    happiness_tenets: {
      work_fulfillment: 70,
      work_life_balance: 58,
      recognition_growth: 65,
      team_collaboration: 68,
      management_support: 64
    }
  },
  {
    id: 'team-6',
    name: 'QA Engineering',
    department: 'Engineering',
    health_score: 83,
    members_count: 5,
    response_rate: 80,
    manager: 'David Kim',
    happiness_tenets: {
      work_fulfillment: 85,
      work_life_balance: 80,
      recognition_growth: 82,
      team_collaboration: 87,
      management_support: 81
    }
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sarah Hale',
    role: 'Senior Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahHale',
    morale_score: 72,
    flight_risk: 'medium',
    last_response: '2024-08-28',
    key_concerns: ['workload', 'growth_opportunities'],
    happiness_tenets: {
      work_fulfillment: 75,
      work_life_balance: 65,
      recognition_growth: 70,
      team_collaboration: 80,
      management_support: 70
    }
  },
  {
    id: 'emp-2',
    name: 'Riley Chen',
    role: 'Product Designer',
    team_id: 'team-3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley',
    morale_score: 58,
    flight_risk: 'high',
    last_response: '2024-08-27',
    key_concerns: ['work_life_balance', 'management_support', 'recognition'],
    happiness_tenets: {
      work_fulfillment: 60,
      work_life_balance: 45,
      recognition_growth: 55,
      team_collaboration: 65,
      management_support: 50
    }
  },
  {
    id: 'emp-3',
    name: 'Sam Johnson',
    role: 'DevOps Engineer',
    team_id: 'team-4',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    morale_score: 95,
    flight_risk: 'low',
    last_response: '2024-08-29',
    key_concerns: [],
    happiness_tenets: {
      work_fulfillment: 95,
      work_life_balance: 92,
      recognition_growth: 90,
      team_collaboration: 98,
      management_support: 95
    }
  },
  {
    id: 'emp-4',
    name: 'Alex Rodriguez',
    role: 'Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRodriguez',
    morale_score: 81,
    flight_risk: 'low',
    last_response: '2024-08-29',
    key_concerns: ['technical_debt'],
    happiness_tenets: {
      work_fulfillment: 85,
      work_life_balance: 78,
      recognition_growth: 75,
      team_collaboration: 88,
      management_support: 82
    }
  },
  {
    id: 'emp-5',
    name: 'Jamie Park',
    role: 'UI/UX Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamiePark',
    morale_score: 67,
    flight_risk: 'medium',
    last_response: '2024-08-28',
    key_concerns: ['workload', 'design_feedback_delays'],
    happiness_tenets: {
      work_fulfillment: 70,
      work_life_balance: 60,
      recognition_growth: 68,
      team_collaboration: 72,
      management_support: 65
    }
  },
  {
    id: 'emp-6',
    name: 'Morgan Chen',
    role: 'Junior Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MorganChen',
    morale_score: 88,
    flight_risk: 'low',
    last_response: '2024-08-29',
    key_concerns: [],
    happiness_tenets: {
      work_fulfillment: 92,
      work_life_balance: 85,
      recognition_growth: 90,
      team_collaboration: 88,
      management_support: 85
    }
  },
  {
    id: 'emp-7',
    name: 'Taylor Kim',
    role: 'Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TaylorKim',
    morale_score: 55,
    flight_risk: 'high',
    last_response: '2024-08-26',
    key_concerns: ['career_progression', 'work_life_balance', 'team_communication'],
    happiness_tenets: {
      work_fulfillment: 58,
      work_life_balance: 45,
      recognition_growth: 50,
      team_collaboration: 60,
      management_support: 52
    }
  },
  {
    id: 'emp-8',
    name: 'Casey Williams',
    role: 'Senior Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CaseyWilliams',
    morale_score: 79,
    flight_risk: 'low',
    last_response: '2024-08-29',
    key_concerns: ['mentoring_workload'],
    happiness_tenets: {
      work_fulfillment: 82,
      work_life_balance: 75,
      recognition_growth: 78,
      team_collaboration: 85,
      management_support: 80
    }
  },
  {
    id: 'emp-9',
    name: 'Jordan Lee',
    role: 'Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanLee',
    morale_score: 74,
    flight_risk: 'medium',
    last_response: '2024-08-28',
    key_concerns: ['project_deadlines', 'skill_development'],
    happiness_tenets: {
      work_fulfillment: 76,
      work_life_balance: 68,
      recognition_growth: 72,
      team_collaboration: 80,
      management_support: 74
    }
  },
  {
    id: 'emp-10',
    name: 'River Martinez',
    role: 'Frontend Developer',
    team_id: 'team-1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiverMartinez',
    morale_score: 63,
    flight_risk: 'medium',
    last_response: '2024-08-27',
    key_concerns: ['remote_work_isolation', 'career_direction'],
    happiness_tenets: {
      work_fulfillment: 65,
      work_life_balance: 70,
      recognition_growth: 58,
      team_collaboration: 62,
      management_support: 60
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'critical',
    title: 'High Flight Risk Detected',
    description: 'Riley Chen shows significant morale decline and may leave within 30 days',
    employee_id: 'emp-2',
    team_id: 'team-3',
    created_at: '2024-08-29T10:30:00Z',
    priority: 1
  },
  {
    id: 'alert-2',
    type: 'warning',
    title: 'Team Response Rate Below Target',
    description: 'Product Management team response rate dropped to 71% (target: 80%)',
    team_id: 'team-5',
    created_at: '2024-08-29T09:15:00Z',
    priority: 2
  },
  {
    id: 'alert-3',
    type: 'warning',
    title: 'Work-Life Balance Concern',
    description: 'Product Design team showing declining work-life balance scores',
    team_id: 'team-3',
    created_at: '2024-08-28T16:45:00Z',
    priority: 3
  }
];

export const mockTrendData = [
  { month: 'Mar', overall_morale: 76, response_rate: 82 },
  { month: 'Apr', overall_morale: 78, response_rate: 84 },
  { month: 'May', overall_morale: 75, response_rate: 86 },
  { month: 'Jun', overall_morale: 79, response_rate: 83 },
  { month: 'Jul', overall_morale: 77, response_rate: 85 },
  { month: 'Aug', overall_morale: 74, response_rate: 81 }
];

export const getOverallMetrics = () => {
  const totalEmployees = mockTeams.reduce((sum, team) => sum + team.members_count, 0);
  const overallMorale = Math.round(
    mockTeams.reduce((sum, team) => sum + (team.health_score * team.members_count), 0) / totalEmployees
  );
  const overallResponseRate = Math.round(
    mockTeams.reduce((sum, team) => sum + (team.response_rate * team.members_count), 0) / totalEmployees
  );
  const flightRiskCount = mockEmployees.filter(emp => emp.flight_risk === 'high').length;
  
  return {
    overallMorale,
    overallResponseRate,
    flightRiskCount,
    totalEmployees,
    criticalAlerts: mockAlerts.filter(alert => alert.type === 'critical').length
  };
};