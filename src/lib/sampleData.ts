
import { Tournament, Team, Match } from './types';
import { v4 as uuidv4 } from 'uuid';

export const tournaments: Tournament[] = [
  {
    id: uuidv4(),
    name: 'Ahalia Soccer League 2023',
    league: 'ASL',
    startDate: '2023-10-15',
    endDate: '2023-12-10',
    status: 'active',
    description: 'Annual soccer tournament for Ahalia colleges',
    teamsCount: 12,
    matchesCount: 24,
    completedMatchesCount: 10,
  },
  {
    id: uuidv4(),
    name: 'Ahalia Premier League 2023',
    league: 'APL',
    startDate: '2023-09-05',
    endDate: '2023-11-20',
    status: 'active',
    description: 'Premier league competition between departments',
    teamsCount: 8,
    matchesCount: 16,
    completedMatchesCount: 12,
  },
  {
    id: uuidv4(),
    name: 'Ahalia Soccer League 2022',
    league: 'ASL',
    startDate: '2022-10-10',
    endDate: '2022-12-05',
    status: 'completed',
    description: 'Previous year\'s soccer tournament',
    teamsCount: 10,
    matchesCount: 20,
    completedMatchesCount: 20,
  },
  {
    id: uuidv4(),
    name: 'Summer Cup 2024',
    league: 'ASL',
    startDate: '2024-05-10',
    endDate: '2024-06-30',
    status: 'upcoming',
    description: 'Special summer tournament',
    teamsCount: 6,
    matchesCount: 12,
    completedMatchesCount: 0,
  },
];

const tournamentId = tournaments[0].id;
const tournamentId2 = tournaments[1].id;

export const teams: Team[] = [
  {
    id: uuidv4(),
    name: 'CS Tigers',
    tournamentId: tournamentId,
    playerCount: 16,
    wins: 3,
    losses: 1,
    draws: 0,
    points: 9,
    captain: 'John Smith',
  },
  {
    id: uuidv4(),
    name: 'EC Eagles',
    tournamentId: tournamentId,
    playerCount: 15,
    wins: 2,
    losses: 1,
    draws: 1,
    points: 7,
    captain: 'Michael Brown',
  },
  {
    id: uuidv4(),
    name: 'ME Warriors',
    tournamentId: tournamentId,
    playerCount: 14,
    wins: 2,
    losses: 2,
    draws: 0,
    points: 6,
    captain: 'David Wilson',
  },
  {
    id: uuidv4(),
    name: 'CE United',
    tournamentId: tournamentId,
    playerCount: 16,
    wins: 1,
    losses: 2,
    draws: 1,
    points: 4,
    captain: 'James Johnson',
  },
  {
    id: uuidv4(),
    name: 'BT Wolves',
    tournamentId: tournamentId2,
    playerCount: 15,
    wins: 4,
    losses: 0,
    draws: 0,
    points: 12,
    captain: 'Robert Davis',
  },
  {
    id: uuidv4(),
    name: 'Pharmacy FC',
    tournamentId: tournamentId2,
    playerCount: 16,
    wins: 3,
    losses: 1,
    draws: 0,
    points: 9,
    captain: 'Thomas Miller',
  },
];

const teamId1 = teams[0].id;
const teamId2 = teams[1].id;
const teamId3 = teams[2].id;
const teamId4 = teams[3].id;
const teamId5 = teams[4].id;
const teamId6 = teams[5].id;

export const matches: Match[] = [
  {
    id: uuidv4(),
    tournamentId: tournamentId,
    homeTeamId: teamId1,
    awayTeamId: teamId2,
    homeTeam: teams.find(team => team.id === teamId1),
    awayTeam: teams.find(team => team.id === teamId2),
    date: '2023-10-20',
    time: '15:00',
    location: 'Main Ground',
    status: 'completed',
    homeScore: 2,
    awayScore: 1,
    round: 'Group Stage',
  },
  {
    id: uuidv4(),
    tournamentId: tournamentId,
    homeTeamId: teamId3,
    awayTeamId: teamId4,
    homeTeam: teams.find(team => team.id === teamId3),
    awayTeam: teams.find(team => team.id === teamId4),
    date: '2023-10-22',
    time: '16:30',
    location: 'Sports Complex',
    status: 'completed',
    homeScore: 3,
    awayScore: 0,
    round: 'Group Stage',
  },
  {
    id: uuidv4(),
    tournamentId: tournamentId,
    homeTeamId: teamId1,
    awayTeamId: teamId3,
    homeTeam: teams.find(team => team.id === teamId1),
    awayTeam: teams.find(team => team.id === teamId3),
    date: '2023-11-05',
    time: '15:00',
    location: 'Main Ground',
    status: 'scheduled',
    round: 'Group Stage',
  },
  {
    id: uuidv4(),
    tournamentId: tournamentId,
    homeTeamId: teamId2,
    awayTeamId: teamId4,
    homeTeam: teams.find(team => team.id === teamId2),
    awayTeam: teams.find(team => team.id === teamId4),
    date: '2023-11-07',
    time: '16:30',
    location: 'Sports Complex',
    status: 'scheduled',
    round: 'Group Stage',
  },
  {
    id: uuidv4(),
    tournamentId: tournamentId2,
    homeTeamId: teamId5,
    awayTeamId: teamId6,
    homeTeam: teams.find(team => team.id === teamId5),
    awayTeam: teams.find(team => team.id === teamId6),
    date: '2023-10-12',
    time: '14:00',
    location: 'Department Ground',
    status: 'completed',
    homeScore: 3,
    awayScore: 1,
    round: 'Quarter Finals',
  },
];

export const upcomingMatches = matches.filter(match => match.status === 'scheduled')
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const completedMatches = matches.filter(match => match.status === 'completed')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
