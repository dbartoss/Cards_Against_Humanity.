export interface IRoomCreationDTO {
  name: string;
  userId: string;
  ableToStartGame?: boolean;
}

export interface IRoomJoinDTO {
  userId: string;
}

export interface IRoomUpdateChoiceDTO {
  userId: string;
  cardText: string;
}

export interface IRoomFinishRoundDTO {
  userId: string;
  victorId: string;
}
