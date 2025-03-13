
import { Trophy, Users, Calendar, BarChart } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TournamentCard } from "@/components/dashboard/TournamentCard";
import { UpcomingMatchCard } from "@/components/dashboard/UpcomingMatchCard";
import { RecentResultCard } from "@/components/dashboard/RecentResultCard";
import { TeamStandingsTable } from "@/components/dashboard/TeamStandingsTable";
import { tournaments, teams, upcomingMatches, completedMatches } from "@/lib/sampleData";

const Index = () => {
  // Get active tournaments
  const activeTournaments = tournaments.filter(
    (tournament) => tournament.status === "active"
  );
  
  // Get only upcoming tournaments
  const upcomingTournaments = tournaments.filter(
    (tournament) => tournament.status === "upcoming"
  );
  
  // Get teams for the first active tournament (for leaderboard)
  const tournamentTeams = teams.filter(
    (team) => team.tournamentId === activeTournaments[0]?.id
  );
  
  // Get next 3 upcoming matches
  const nextMatches = upcomingMatches.slice(0, 3);
  
  // Get recent results
  const recentResults = completedMatches.slice(0, 3);
  
  // Calculate total stats
  const totalTournaments = tournaments.length;
  const totalTeams = teams.length;
  const totalMatches = upcomingMatches.length + completedMatches.length;
  const completedMatchesCount = completedMatches.length;

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Tournament Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your tournaments, teams, and matches in one place
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Tournaments"
          value={totalTournaments}
          icon={Trophy}
          description="Across all leagues"
        />
        <StatCard
          title="Registered Teams"
          value={totalTeams}
          icon={Users}
          description="Active participants"
        />
        <StatCard
          title="Scheduled Matches"
          value={totalMatches}
          icon={Calendar}
          description={`${completedMatchesCount} completed`}
        />
        <StatCard
          title="Completion Rate"
          value={`${Math.round((completedMatchesCount / totalMatches) * 100)}%`}
          icon={BarChart}
          description="Overall progress"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Active Tournaments</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {activeTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
          <div className="space-y-4">
            {nextMatches.length > 0 ? (
              nextMatches.map((match) => (
                <UpcomingMatchCard key={match.id} match={match} />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No upcoming matches</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Leaderboard: {activeTournaments[0]?.name || 'No Active Tournament'}
          </h2>
          {tournamentTeams.length > 0 ? (
            <TeamStandingsTable teams={tournamentTeams} />
          ) : (
            <p className="text-muted-foreground text-sm">No teams in this tournament</p>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
          <div className="space-y-4">
            {recentResults.length > 0 ? (
              recentResults.map((match) => (
                <RecentResultCard key={match.id} match={match} />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent match results</p>
            )}
          </div>
        </div>
      </div>
      
      {upcomingTournaments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tournaments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Index;
