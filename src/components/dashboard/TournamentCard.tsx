
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Calendar, Users, ArrowRight } from "lucide-react";
import { Tournament } from "@/lib/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const progress = Math.round((tournament.completedMatchesCount / tournament.matchesCount) * 100);
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'upcoming': return 'secondary';
      case 'completed': return 'outline';
      default: return 'default';
    }
  };
  
  return (
    <Card className="tournament-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{tournament.name}</CardTitle>
          <Badge variant={getBadgeVariant(tournament.status)} className="capitalize">
            {tournament.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Trophy className="mr-1 h-4 w-4" />
          <span className="font-medium text-foreground">{tournament.league}</span>
          <span className="mx-2">•</span>
          <Calendar className="mr-1 h-4 w-4" />
          <span>
            {format(new Date(tournament.startDate), "MMM d")} - {format(new Date(tournament.endDate), "MMM d, yyyy")}
          </span>
        </div>
        
        {tournament.description && (
          <p className="text-sm mb-3">{tournament.description}</p>
        )}
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Users className="mr-1 h-4 w-4" />
          <span>{tournament.teamsCount} Teams</span>
          <span className="mx-2">•</span>
          <span>{tournament.matchesCount} Matches</span>
        </div>
        
        {tournament.status === 'active' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full mt-2" size="sm" asChild>
          <Link to={`/tournaments/${tournament.id}`}>
            <span>View Details and Register</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
