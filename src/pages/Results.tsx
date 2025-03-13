
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowUpDown, Download, Calendar } from "lucide-react";
import { tournaments, completedMatches } from "@/lib/sampleData";
import { format } from "date-fns";

const Results = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Match Results</h1>
        <p className="text-muted-foreground">
          View and manage match results across all tournaments
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Result Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tournament</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Tournaments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tournaments</SelectItem>
                {tournaments.map(tournament => (
                  <SelectItem key={tournament.id} value={tournament.id}>
                    {tournament.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">League</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Leagues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leagues</SelectItem>
                <SelectItem value="asl">ASL</SelectItem>
                <SelectItem value="apl">APL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="table" className="mb-6">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-auto font-medium flex items-center">
                      Date
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedMatches.map(match => (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">
                      {format(new Date(match.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {tournaments.find(t => t.id === match.tournamentId)?.name}
                    </TableCell>
                    <TableCell>
                      {match.homeTeam?.name} vs {match.awayTeam?.name}
                    </TableCell>
                    <TableCell className="font-bold">
                      {match.homeScore} - {match.awayScore}
                    </TableCell>
                    <TableCell>{match.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{match.round}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedMatches.map(match => (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {tournaments.find(t => t.id === match.tournamentId)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(match.date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="py-4">
                  <div className="text-center mb-3">
                    <Badge variant="outline">{match.round}</Badge>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-right flex-1">
                      <div className="font-semibold">{match.homeTeam?.name}</div>
                    </div>
                    <div className="mx-6 px-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-bold text-xl">{match.homeScore}</span>
                          <span className="mx-2 text-muted-foreground">-</span>
                          <span className="font-bold text-xl">{match.awayScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">{match.awayTeam?.name}</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {match.location}
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Results;
