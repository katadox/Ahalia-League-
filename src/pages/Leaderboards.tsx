
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { tournaments, teams } from "@/lib/sampleData";

const Leaderboards = () => {
  // Get active tournaments
  const activeTournaments = tournaments.filter(
    tournament => tournament.status === 'active'
  );
  
  // Default to first active tournament
  const defaultTournament = activeTournaments[0]?.id || '';
  
  // Get teams for each tournament
  const tournamentTeams = activeTournaments.reduce((acc, tournament) => {
    acc[tournament.id] = teams.filter(team => team.tournamentId === tournament.id)
      .sort((a, b) => b.points - a.points);
    return acc;
  }, {} as Record<string, typeof teams>);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Leaderboards</h1>
        <p className="text-muted-foreground">
          View team standings across all tournaments
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tournament Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tournament</label>
              <Select defaultValue={defaultTournament}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tournament" />
                </SelectTrigger>
                <SelectContent>
                  {activeTournaments.map(tournament => (
                    <SelectItem key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Standings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {activeTournaments.length > 0 ? (
        <Tabs defaultValue={defaultTournament} className="space-y-4">
          <TabsList>
            {activeTournaments.map(tournament => (
              <TabsTrigger key={tournament.id} value={tournament.id}>
                {tournament.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {activeTournaments.map(tournament => (
            <TabsContent key={tournament.id} value={tournament.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Team Standings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Pos</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-center">Played</TableHead>
                          <TableHead className="text-center">Won</TableHead>
                          <TableHead className="text-center">Drawn</TableHead>
                          <TableHead className="text-center">Lost</TableHead>
                          <TableHead className="text-center">GD</TableHead>
                          <TableHead className="text-center">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournamentTeams[tournament.id]?.map((team, index) => {
                          const played = team.wins + team.draws + team.losses;
                          // Placeholder for goal difference (would be calculated from actual match data)
                          const goalDifference = team.wins * 2 - team.losses;
                          
                          return (
                            <TableRow key={team.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell className="font-medium">{team.name}</TableCell>
                              <TableCell className="text-center">{played}</TableCell>
                              <TableCell className="text-center">{team.wins}</TableCell>
                              <TableCell className="text-center">{team.draws}</TableCell>
                              <TableCell className="text-center">{team.losses}</TableCell>
                              <TableCell className="text-center">
                                {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
                              </TableCell>
                              <TableCell className="text-center font-bold">{team.points}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Could add more cards here for other stats like top scorers, etc. */}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No active tournaments available</p>
            <Button>Create Tournament</Button>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
};

export default Leaderboards;
