
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match } from "@/lib/types";
import { Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LiveScoreCardProps {
  match: Match;
}

export function LiveScoreCard({ match }: LiveScoreCardProps) {
  // Calculate match duration if it's live
  const matchStartTime = new Date(match.date + ' ' + match.time);
  const duration = formatDistanceToNow(matchStartTime, { addSuffix: false });

  return (
    <Card className="overflow-hidden border-primary/20">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Live Match</CardTitle>
          <Badge variant="default" className="bg-red-500 animate-pulse flex items-center gap-1">
            <Zap className="h-3 w-3" /> Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-center items-center mb-2">
          <Badge variant="outline">{match.round}</Badge>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <div className="font-semibold truncate">{match.homeTeam?.name}</div>
          </div>
          <div className="px-4 py-2 flex flex-col items-center">
            <div className="text-2xl font-bold">
              {match.homeScore} - {match.awayScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{duration}</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-semibold truncate">{match.awayTeam?.name}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <span>{match.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
