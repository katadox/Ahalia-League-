
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match } from "@/lib/types";
import { format } from "date-fns";

interface RecentResultCardProps {
  match: Match;
}

export function RecentResultCard({ match }: RecentResultCardProps) {
  if (!match.homeScore || !match.awayScore) return null;
  
  const homeWon = match.homeScore > match.awayScore;
  const draw = match.homeScore === match.awayScore;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium">
            {format(new Date(match.date), "MMM d")}
          </span>
          <Badge variant="outline">{match.round}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-right flex-1">
            <div className={`font-semibold truncate ${homeWon ? 'text-primary' : draw ? '' : 'text-muted-foreground'}`}>
              {match.homeTeam?.name}
            </div>
          </div>
          <div className="mx-4 px-4 flex items-center justify-center">
            <span className="font-bold text-lg">{match.homeScore}</span>
            <span className="mx-1 text-muted-foreground">-</span>
            <span className="font-bold text-lg">{match.awayScore}</span>
          </div>
          <div className="text-left flex-1">
            <div className={`font-semibold truncate ${!homeWon && !draw ? 'text-primary' : draw ? '' : 'text-muted-foreground'}`}>
              {match.awayTeam?.name}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
