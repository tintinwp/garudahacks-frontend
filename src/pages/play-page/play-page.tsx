import React, { useEffect, useState } from "react";

import { HomePlayPage } from "./play-page-home";
import { FindingPlayPage } from "./play-page-finding";
import { MatchFoundPlayPage } from "./play-page-match-found";
import { GamePlayPage } from "./play-page-game";

export default function PlayPage() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      {!isFinding && !gameId && (
        <>
          <HomePlayPage setIsFinding={setIsFinding} />
        </>
      )}
      {isFinding && !gameId && (
        <>
          <FindingPlayPage setIsFinding={setIsFinding} setGameId={setGameId} />
        </>
      )}
      {!isFinding && gameId && !isPlaying && (
        <>
          <MatchFoundPlayPage setIsPlaying={setIsPlaying} />
        </>
      )}
      {isPlaying && gameId && <GamePlayPage gameId={gameId} />}
    </>
  );
}
