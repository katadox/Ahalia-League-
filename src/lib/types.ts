
export interface Tournament {
  id: string;
  name: string;
  league: 'ASL' | 'APL';
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  description?: string;
  teamsCount: number;
  matchesCount: number;
  completedMatchesCount: number;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  tournamentId: string;
  playerCount: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  captain?: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam?: Team;
  awayTeam?: Team;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
  round?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  number: number;
  goals: number;
  assists: number;
}
