export interface GameInfoResponse{
    secureId: string,
    question: string,
    gameParticipants: {
        userId: string;
        username : string
        successes: number[];
        skips: number[];
    }[],
    expired: bigint,
}