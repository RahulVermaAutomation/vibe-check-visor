import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  status?: 'healthy' | 'warning' | 'critical';
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, subtitle, trend, status, icon }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value > 0) {
      return <TrendingUp className="h-4 w-4 text-success" />;
    } else if (trend.value < 0) {
      return <TrendingDown className="h-4 w-4 text-danger" />;
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend.value > 0 ? 'text-success' : trend.value < 0 ? 'text-danger' : 'text-muted-foreground';
  };

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-danger';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold mb-1 ${getStatusColor()}`}>
          {value}
          {typeof value === 'number' && title.toLowerCase().includes('score') && '%'}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}