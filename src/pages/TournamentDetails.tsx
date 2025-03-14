
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// Sample tournament data (in a real app, this would come from an API call)
const tournament = {
  id: "tournament-1",
  name: "Asian Sports League - Season 5",
  league: "ASL",
  startDate: "2023-11-15",
  endDate: "2023-12-20",
  status: "upcoming",
  description: "Join the prestigious Asian Sports League for its fifth season! This tournament brings together the best teams from across Asia to compete for the championship title.",
  location: "National Stadium, Singapore",
  registrationDeadline: "2023-10-30",
  registrationFee: "$500",
  prizePool: "$10,000",
  teamsCount: 0,
  matchesCount: 0,
  completedMatchesCount: 0,
};

// Form validation schema
const formSchema = z.object({
  teamName: z.string().min(3, { message: "Team name is required" }),
  captainName: z.string().min(3, { message: "Captain name is required" }),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  contactPhone: z.string().min(10, { message: "Valid phone number is required" }),
  teamSize: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().min(11).max(15)
  ),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TournamentDetails = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { id } = useParams();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      captainName: "",
      contactEmail: "",
      contactPhone: "",
      teamSize: 11,
      additionalNotes: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    
    // In a real app, this would be an API call to register the team
    setTimeout(() => {
      toast({
        title: "Registration submitted",
        description: `Your team ${data.teamName} has been registered for the tournament.`,
      });
      setIsRegistering(false);
      form.reset();
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Tournament Details */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{tournament.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{tournament.league}</Badge>
                <Badge variant="outline" className="capitalize">{tournament.status}</Badge>
              </div>
            </div>
            {!isRegistering && (
              <Button onClick={() => setIsRegistering(true)}>
                Register Team
              </Button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Dates</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.startDate} to {tournament.endDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Prize Pool</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.prizePool}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Registration Deadline</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.registrationDeadline}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Registration Fee</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.registrationFee}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {tournament.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Registration Form */}
        {isRegistering && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Team Registration</CardTitle>
              <CardDescription>
                Fill out the form below to register your team for {tournament.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
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
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter contact email" 
                              {...field} 
                            />
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
                            <Input 
                              placeholder="Enter contact phone number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={11}
                              max={15}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Team size must be between 11-15 players
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional information about your team..."
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsRegistering(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit Registration
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default TournamentDetails;
