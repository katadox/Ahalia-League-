
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Calendar, Users, MapPin, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { tournaments } from "@/lib/sampleData";
import { useUser } from "@/components/layout/AppLayout";

// Form validation schema
const teamRegistrationSchema = z.object({
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  captainName: z.string().min(3, { message: "Captain name is required" }),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  contactPhone: z.string().min(10, { message: "Valid phone number is required" }),
  teamSize: z.string().transform((val) => parseInt(val, 10)),
  additionalNotes: z.string().optional(),
});

type TeamRegistrationValues = z.infer<typeof teamRegistrationSchema>;

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { currentUser } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Find the tournament based on the ID from the URL
  const tournament = tournaments.find(t => t.id === id);
  
  const form = useForm<TeamRegistrationValues>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      teamName: "",
      captainName: currentUser?.name || "",
      contactEmail: "",
      contactPhone: "",
      teamSize: "11",
      additionalNotes: "",
    },
  });

  if (!tournament) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Tournament not found</h1>
          <p className="mb-6">The tournament you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/tournaments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tournaments
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const onSubmit = (data: TeamRegistrationValues) => {
    // In a real app, this would send the registration to a backend API
    console.log("Registration data:", data);
    
    // Show success message
    toast({
      title: "Registration Submitted",
      description: `Your team "${data.teamName}" has been registered for ${tournament.name}`,
    });
    
    // Reset form
    form.reset();
    setIsRegistering(false);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/tournaments">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Tournaments
            </Link>
          </Button>
          <Badge variant="secondary" className="capitalize">
            {tournament.league}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {tournament.status}
          </Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
        <p className="text-muted-foreground">{tournament.description}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tournament Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Dates</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(tournament.startDate), "MMMM d, yyyy")} - {format(new Date(tournament.endDate), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Ahalia Campus, Palakkad</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Registration Deadline</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(tournament.startDate), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Prize Pool</p>
                <p className="text-sm text-muted-foreground">₹10,000</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Teams</p>
                <p className="text-sm text-muted-foreground">{tournament.teamsCount} registered (max 16)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Rules & Guidelines</CardTitle>
            <CardDescription>Important information for all participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Team Composition</h3>
              <p className="text-sm text-muted-foreground">Each team must have 11 players including substitutes. All players must be current students of the college.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Match Format</h3>
              <p className="text-sm text-muted-foreground">Matches will consist of two 30-minute halves with a 10-minute break. Tournament follows standard FIFA rules with modifications.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Equipment</h3>
              <p className="text-sm text-muted-foreground">Teams must provide their own uniforms with numbers. Match balls will be provided by the organizers.</p>
            </div>
            
            <div>
              <h3 className="font-medium">Discipline</h3>
              <p className="text-sm text-muted-foreground">Yellow and red card rules apply. Players receiving two yellow cards or one red card will be suspended for the next match.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      {tournament.status === 'upcoming' ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Tournament Registration</h2>
            <p className="text-muted-foreground">Register your team for {tournament.name}</p>
          </div>
          
          {!isRegistering ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Join the Competition!</h3>
                    <p className="text-muted-foreground">Register your team and compete in this exciting tournament.</p>
                  </div>
                  <Button onClick={() => setIsRegistering(true)}>Register Your Team</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Team Registration Form</CardTitle>
                <CardDescription>Please fill out all required fields to register your team</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter team name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="captainName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Captain Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter captain name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter contact email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter contact phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Players</FormLabel>
                          <FormControl>
                            <Input type="number" min="11" max="15" {...field} />
                          </FormControl>
                          <FormDescription>
                            Minimum 11 players required, maximum 15 players allowed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requirements or information we should know" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Optional: Add any additional information about your team.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsRegistering(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit Registration</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <h2 className="text-xl font-bold mb-2">Registration Closed</h2>
          <p className="text-muted-foreground mb-4">
            Registration for this tournament is {tournament.status === 'active' ? 'already closed' : 'no longer available'}.
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default TournamentDetails;
