
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match } from "@/lib/types";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

interface UpcomingMatchCardProps {
  match: Match;
}

export function UpcomingMatchCard({ match }: UpcomingMatchCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {format(new Date(match.date), "EEE, MMM d")} • {match.time}
            </span>
          </div>
          <Badge variant="outline">{match.round}</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-right flex-1">
            <div className="font-semibold truncate">{match.homeTeam?.name}</div>
          </div>
          <div className="mx-4 flex flex-col items-center">
            <div className="text-xs text-muted-foreground mb-1">VS</div>
            <div className="text-xs bg-secondary/10 text-secondary px-1.5 py-0.5 rounded">
              Match {match.id.substring(0, 4)}
            </div>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold truncate">{match.awayTeam?.name}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{match.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
