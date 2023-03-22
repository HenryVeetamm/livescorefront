export interface AddTeamDto {
  name: string;
  homeStadium: string;
}

export interface TeamDto{
  id: string;
  name: string;
  homeStadium: string;
  lambiNumber?: number | null
  teamLogoUri?: string | null
}

export interface UpdateTeamDto {
  id: string;
  name: string;
  homeStadium: string;
}