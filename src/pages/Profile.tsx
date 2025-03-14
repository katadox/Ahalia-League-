
import { AppLayout } from "@/components/layout/AppLayout";
import { useUser } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trophy, Medal, Star, Edit, Calendar, Users, Activity } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Player } from "@/lib/types";

// Sample player stats
const playerStats = {
  goals: 12,
  assists: 8,
  centuries: 3,
  matchesPlayed: 24,
  winRate: "67%",
  achievements: [
    { title: "Top Scorer", date: "2023", description: "Highest goal scorer in APL 2023" },
    { title: "MVP", date: "2023", description: "Most valuable player in ASL tournament" },
    { title: "Team Captain", date: "2022-Present", description: "Led team to finals twice" }
  ]
};

// Sample match history
const matchHistory = [
  { id: 1, date: "2023-10-15", tournament: "APL 2023", opponent: "Panthers", result: "Won 3-1", performance: "2 goals" },
  { id: 2, date: "2023-10-08", tournament: "APL 2023", opponent: "Tigers", result: "Draw 2-2", performance: "1 goal, 1 assist" },
  { id: 3, date: "2023-09-30", tournament: "APL 2023", opponent: "Eagles", result: "Won 4-0", performance: "1 goal, 2 assists" },
  { id: 4, date: "2023-09-23", tournament: "APL 2023", opponent: "Lions", result: "Lost 1-2", performance: "1 assist" }
];

const Profile = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<"stats" | "history" | "achievements">("stats");
  
  if (!currentUser) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p>Please log in to view your profile</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="/placeholder.svg" alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-sm">
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Team ID: {currentUser.teamId}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2">Player ID: {currentUser.id}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold">{playerStats.goals}</h3>
              <p className="text-sm text-muted-foreground">Goals</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold">{playerStats.centuries}</h3>
              <p className="text-sm text-muted-foreground">Centuries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold">{playerStats.matchesPlayed}</h3>
              <p className="text-sm text-muted-foreground">Matches Played</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Activity className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="text-2xl font-bold">{playerStats.winRate}</h3>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-b">
          <Button 
            variant={activeTab === "stats" ? "default" : "ghost"} 
            className="rounded-none rounded-t-lg"
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </Button>
          <Button 
            variant={activeTab === "history" ? "default" : "ghost"} 
            className="rounded-none rounded-t-lg"
            onClick={() => setActiveTab("history")}
          >
            Match History
          </Button>
          <Button 
            variant={activeTab === "achievements" ? "default" : "ghost"} 
            className="rounded-none rounded-t-lg"
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "stats" && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Goals</span>
                    <span className="font-medium">{playerStats.goals}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Assists</span>
                    <span className="font-medium">{playerStats.assists}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Centuries</span>
                    <span className="font-medium">{playerStats.centuries}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Matches Played</span>
                    <span className="font-medium">{playerStats.matchesPlayed}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-medium">{playerStats.winRate}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Team</span>
                    <span className="font-medium">Team {currentUser.teamId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Match History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Opponent</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchHistory.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>{match.tournament}</TableCell>
                      <TableCell>{match.opponent}</TableCell>
                      <TableCell>{match.result}</TableCell>
                      <TableCell>{match.performance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "achievements" && (
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {playerStats.achievements.map((achievement, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Medal className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      <p className="text-sm mt-1">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
