
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Search, Filter, MapPin, Clock, Trophy } from "lucide-react";
import { matches, tournaments } from "@/lib/sampleData";
import { format } from "date-fns";

const Matches = () => {
  // Group matches by date
  const matchesByDate = matches.reduce((acc, match) => {
    if (!acc[match.date]) {
      acc[match.date] = [];
    }
    acc[match.date].push(match);
    return acc;
  }, {} as Record<string, typeof matches>);

  // Sort dates
  const sortedDates = Object.keys(matchesByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'secondary';
      case 'live': return 'destructive';
      case 'completed': return 'default';
      case 'cancelled': return 'outline';
      default: return 'default';
    }
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Match Schedule</h1>
        <p className="text-muted-foreground">
          View and manage all tournament matches
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Schedule Management</CardTitle>
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
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search matches..."
                className="pl-8"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Match
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        {sortedDates.map(date => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matchesByDate[date].map(match => (
                <Card key={match.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {tournaments.find(t => t.id === match.tournamentId)?.name || 'Unknown Tournament'}
                        </span>
                      </div>
                      <Badge variant={getStatusColor(match.status)} className="capitalize">
                        {match.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-right flex-1">
                        <div className="font-semibold">{match.homeTeam?.name}</div>
                      </div>
                      <div className="mx-4 px-6">
                        {match.status === 'completed' ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center">
                              <span className="font-bold text-lg">{match.homeScore}</span>
                              <span className="mx-1 text-muted-foreground">-</span>
                              <span className="font-bold text-lg">{match.awayScore}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Final Score
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-sm font-medium">VS</div>
                            <div className="text-xs text-muted-foreground">
                              {match.time}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">{match.awayTeam?.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{match.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      {match.status === 'completed' ? 'View Details' : 'Manage Match'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Matches;
