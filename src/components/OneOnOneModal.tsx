import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Mail, ExternalLink } from 'lucide-react';
import { Employee, mockTeams } from '@/data/mockData';

interface OneOnOneModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MeetingData {
  subject: string;
  body: string;
  employeeEmail: string;
  duration: number;
}

export function OneOnOneModal({ employee, isOpen, onClose }: OneOnOneModalProps) {
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);

  useEffect(() => {
    if (employee && isOpen) {
      const data = generateMeetingData(employee);
      setMeetingData(data);
    }
  }, [employee, isOpen]);

  const generateMeetingSubject = (employeeName: string): string => {
    return `One On One Meeting with ${employeeName}`;
  };

  const getTeamName = (teamId: string): string => {
    const team = mockTeams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown Team';
  };

  const calculateDaysBetween = (dateString: string): number => {
    const lastDate = new Date(dateString);
    const today = new Date();
    const timeDiff = today.getTime() - lastDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  };

  const generateMeetingAgenda = (employee: Employee): string => {
    const daysSinceLastMeeting = calculateDaysBetween(employee.last_response);
    let agenda = `Hi ${employee.name},\n\nLet's discuss the following agenda in our meeting:\n\n`;

    const agendaItems: string[] = [];

    // High priority items based on pulse data (limit to 3-4 most important)
    if (employee.morale_score < 70) {
      agendaItems.push('• Current workload and project satisfaction');
    }

    if (employee.happiness_tenets.recognition_growth < 70) {
      agendaItems.push('• Career development goals and growth opportunities');
    }

    if (employee.happiness_tenets.work_life_balance < 70) {
      agendaItems.push('• Personal well-being and work-life balance');
    }

    // Add most critical concern-based item
    if (employee.key_concerns.includes('workload') && agendaItems.length < 4) {
      agendaItems.push('• Current workload distribution and priorities');
    } else if (employee.key_concerns.includes('growth_opportunities') && agendaItems.length < 4) {
      agendaItems.push('• Learning and development opportunities');
    } else if (employee.key_concerns.includes('management_support') && agendaItems.length < 4) {
      agendaItems.push('• Management support and communication');
    }

    // Always include recent wins if space allows
    if (agendaItems.length < 4) {
      agendaItems.push('• Recent wins and achievements');
    }

    // Limit to maximum 4 items
    const limitedItems = agendaItems.slice(0, 4);
    agenda += limitedItems.join('\n') + '\n\n';

    // Add supportive closing based on risk level
    if (employee.flight_risk === 'high') {
      agenda += 'I want to make sure you feel supported and engaged. Looking forward to our conversation.\n\n';
    } else if (employee.flight_risk === 'medium') {
      agenda += 'Looking forward to catching up and hearing your thoughts.\n\n';
    } else {
      agenda += 'Excited to hear about your progress and discuss what is next!\n\n';
    }

    agenda += 'Best regards,\n[Your Name]';

    return agenda;
  };

  const generateMeetingData = (employee: Employee): MeetingData => {
    const subject = generateMeetingSubject(employee.name);
    const body = generateMeetingAgenda(employee);
    const employeeEmail = `${employee.name.toLowerCase().replace(' ', '.')}@company.com`;

    return {
      subject,
      body,
      employeeEmail,
      duration: 30
    };
  };

  const openOutlookMeeting = () => {
    if (!meetingData) return;

    const { subject, body, employeeEmail } = meetingData;

    // Create Outlook deep link parameters
    const outlookParams = new URLSearchParams({
      subject: subject,
      body: body.replace(/\n/g, '%0D%0A'), // Convert line breaks for URL
      to: employeeEmail,
      location: 'Microsoft Teams / Conference Room'
    });

    // Outlook web deep link
    const outlookWebUrl = `https://outlook.live.com/calendar/0/deeplink/compose?${outlookParams.toString()}`;
    
    // Outlook desktop deep link (fallback)
    const outlookDesktopUrl = `outlook://calendar/new?${outlookParams.toString()}`;

    // Try desktop first, fallback to web
    try {
      // Create a temporary anchor element to trigger the desktop app
      const tempLink = document.createElement('a');
      tempLink.href = outlookDesktopUrl;
      tempLink.click();

      // Fallback to web version after short delay if desktop doesn't open
      setTimeout(() => {
        const confirmFallback = confirm('If Outlook desktop did not open, click OK to use Outlook Web');
        if (confirmFallback) {
          window.open(outlookWebUrl, '_blank');
        }
      }, 2000);
    } catch (error) {
      // Direct to web version on error
      window.open(outlookWebUrl, '_blank');
    }

    // Close modal after opening Outlook
    onClose();
  };

  const getRiskColor = (risk: Employee['flight_risk']) => {
    switch (risk) {
      case 'high':
        return 'bg-danger-light text-danger border border-danger/20';
      case 'medium':
        return 'bg-warning-light text-warning border border-warning/20';
      case 'low':
        return 'bg-success-light text-success border border-success/20';
      default:
        return 'bg-success-light text-success border border-success/20';
    }
  };

  if (!employee || !meetingData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] bg-modal-background border border-modal-border p-0 flex flex-col [&>button]:hidden">
        {/* Custom Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b border-modal-border">
          <div className="flex-1">
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-xl font-semibold text-modal-text-header flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule One-on-One Meeting
              </DialogTitle>
              <div className="flex items-center gap-3">
                <p className="text-modal-text-body">
                  with <strong className="text-modal-text-header">{employee.name}</strong> • {employee.role}
                </p>
                <Badge className={getRiskColor(employee.flight_risk)}>
                  {employee.flight_risk} risk
                </Badge>
              </div>
            </DialogHeader>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="space-y-6">
            {/* Employee Context */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-modal-text-header mb-3">Employee Context</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-modal-text-body">Team:</span>
                  <span className="ml-2 font-medium text-modal-text-header">{getTeamName(employee.team_id)}</span>
                </div>
                <div>
                  <span className="text-modal-text-body">Morale Score:</span>
                  <span className="ml-2 font-medium text-modal-text-header">{employee.morale_score}%</span>
                </div>
                <div>
                  <span className="text-modal-text-body">Last Response:</span>
                  <span className="ml-2 font-medium text-modal-text-header">
                    {new Date(employee.last_response).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-modal-text-body">Key Concerns:</span>
                  <span className="ml-2 font-medium text-modal-text-header">
                    {employee.key_concerns.length > 0 ? employee.key_concerns.length : 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Meeting Subject */}
            <div>
              <label className="block text-sm font-medium text-modal-text-header mb-2">
                📋 Meeting Subject
              </label>
              <div className="bg-muted/20 rounded-lg p-3 border border-modal-border">
                <p className="text-modal-text-body font-medium">{meetingData.subject}</p>
              </div>
            </div>

            {/* Meeting Agenda */}
            <div>
              <label className="block text-sm font-medium text-modal-text-header mb-2">
                📝 Meeting Agenda
              </label>
              <div className="bg-muted/20 rounded-lg p-4 border border-modal-border">
                <pre className="whitespace-pre-wrap text-sm text-modal-text-body font-mono leading-relaxed">
                  {meetingData.body}
                </pre>
              </div>
            </div>

            {/* Key Concerns Highlights */}
            {employee.key_concerns.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-modal-text-header mb-2">
                  🎯 Focus Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {employee.key_concerns.map((concern, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {concern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-4 border-t border-modal-border bg-modal-background">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-modal-border hover:bg-muted/50"
          >
            Cancel
          </Button>
          <Button 
            onClick={openOutlookMeeting}
            className="bg-modal-blue hover:bg-modal-blue-hover text-modal-blue-foreground"
          >
            <Mail className="h-4 w-4 mr-2" />
            Open in Outlook
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}