
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Team } from "@/lib/types";

interface TeamStandingsTableProps {
  teams: Team[];
}

export function TeamStandingsTable({ teams }: TeamStandingsTableProps) {
  // Sort teams by points (highest first)
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Pos</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">P</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-right">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team, index) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell className="text-right">{team.wins + team.losses + team.draws}</TableCell>
              <TableCell className="text-center">{team.wins}</TableCell>
              <TableCell className="text-center">{team.draws}</TableCell>
              <TableCell className="text-center">{team.losses}</TableCell>
              <TableCell className="text-right font-bold">{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
