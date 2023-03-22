export interface DecodedData {
  firstName: string,
  lastName: string,
  role: string;
  teamId: string
}

export interface TokenValidity {
  tokenData : DecodedData | null,
  isValid: boolean
}