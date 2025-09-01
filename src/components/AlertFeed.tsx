import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/data/mockData';

interface AlertFeedProps {
  alerts: Alert[];
  maxItems?: number;
}

export function AlertFeed({ alerts, maxItems = 5 }: AlertFeedProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'text-danger bg-danger-light border-danger/20';
      case 'warning':
        return 'text-warning bg-warning-light border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const sortedAlerts = alerts
    .sort((a, b) => b.priority - a.priority || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Alerts</span>
          <Badge variant="secondary">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-2">
              <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
              No alerts at this time
            </div>
            <p className="text-sm text-muted-foreground">All teams are performing well!</p>
          </div>
        ) : (
          sortedAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              <div className={`p-1 rounded-full ${getAlertColor(alert.type)}`}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm leading-5">{alert.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(alert.created_at)}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 leading-5">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between mt-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getAlertColor(alert.type)}`}
                  >
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </Badge>
                  
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {alerts.length > maxItems && (
          <div className="text-center pt-2">
            <Button variant="outline" size="sm">
              View All {alerts.length} Alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}