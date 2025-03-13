
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, MoreHorizontal, Medal, UsersRound, UserPlus } from "lucide-react";
import { teams } from "@/lib/sampleData";

const Teams = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Teams Management</h1>
        <p className="text-muted-foreground">
          Register and manage teams participating in tournaments
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Button className="justify-start">
            <UserPlus className="mr-2 h-4 w-4" />
            Register New Team
          </Button>
          <Button variant="outline" className="justify-start">
            <UsersRound className="mr-2 h-4 w-4" />
            Import Team List
          </Button>
          <Button variant="outline" className="justify-start">
            <Medal className="mr-2 h-4 w-4" />
            Assign Tournament
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Registered Teams</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teams..."
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Team
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Team Name</TableHead>
              <TableHead>Tournament</TableHead>
              <TableHead>Captain</TableHead>
              <TableHead className="text-center">Players</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>Tournament {team.tournamentId.slice(0, 6)}</TableCell>
                <TableCell>{team.captain || "Not assigned"}</TableCell>
                <TableCell className="text-center">{team.playerCount}</TableCell>
                <TableCell className="text-center">{team.wins}</TableCell>
                <TableCell className="text-center">{team.draws}</TableCell>
                <TableCell className="text-center">{team.losses}</TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Team</DropdownMenuItem>
                      <DropdownMenuItem>Manage Players</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default Teams;
