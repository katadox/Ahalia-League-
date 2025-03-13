
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpcomingMatchCard } from "@/components/dashboard/UpcomingMatchCard";
import { Calendar, Timer, Trophy, Gamepad } from "lucide-react";
import { Match, Team } from "@/lib/types";
import { useUser } from "@/components/layout/AppLayout";

interface UserMatchesCardProps {
  upcomingMatches: Match[];
  allMatches: Match[];
  teams: Team[];
}

export function UserMatchesCard({ upcomingMatches, allMatches, teams }: UserMatchesCardProps) {
  const { currentUser } = useUser();
  
  if (!currentUser) return null;
  
  // Get user's team
  const userTeam = teams.find(team => team.id === currentUser.teamId);
  
  if (!userTeam) return null;

  // Filter matches for user's team
  const userUpcomingMatches = upcomingMatches.filter(
    match => match.homeTeamId === userTeam.id || match.awayTeamId === userTeam.id
  ).slice(0, 2); // Show max 2 upcoming matches
  
  // Calculate statistics
  const userAllMatches = allMatches.filter(
    match => match.homeTeamId === userTeam.id || match.awayTeamId === userTeam.id
  );
  
  const played = userAllMatches.filter(match => match.status === 'completed').length;
  const wins = userAllMatches.filter(match => {
    if (match.status !== 'completed') return false;
    if (match.homeTeamId === userTeam.id) {
      return match.homeScore! > match.awayScore!;
    } else {
      return match.awayScore! > match.homeScore!;
    }
  }).length;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Team: {userTeam.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-md">
            <Gamepad className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">{played}</span>
            <span className="text-xs text-muted-foreground">Played</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-md">
            <Trophy className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">{wins}</span>
            <span className="text-xs text-muted-foreground">Wins</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-md">
            <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-2xl font-bold">{userUpcomingMatches.length}</span>
            <span className="text-xs text-muted-foreground">Upcoming</span>
          </div>
        </div>
        
        {userUpcomingMatches.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Your Upcoming Matches</h3>
            </div>
            <div className="space-y-3">
              {userUpcomingMatches.map(match => (
                <UpcomingMatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming matches</p>
        )}
      </CardContent>
    </Card>
  );
}
