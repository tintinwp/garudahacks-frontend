export interface GameInfoResponse{
    secureId: string,
    question: string,
    gameParticipants: {
        userId: string;
        username : string
        successes: number[];
        skips: number[];
    }[],
    expired: number,
}

export interface UserGameInfo{
    userId: string;
    username : string
    successes: number[];
    skips: number[];
}