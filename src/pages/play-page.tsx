import React, { useEffect, useState } from "react";

import { HomePlayPage } from "./parts/play-page-home";
import { FindingPlayPage } from "./parts/play-page-finding";
import { MatchFoundPlayPage } from "./parts/play-page-match-found";

export default function PlayPage() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      {!isFinding && !isMatchFound && (
        <>
          <HomePlayPage setIsFinding={setIsFinding} />
        </>
      )}
      {isFinding && !isMatchFound && (
        <>
          <FindingPlayPage
            setIsFinding={setIsFinding}
            setIsMatchFound={setIsMatchFound}
          />
        </>
      )}
      {!isFinding && isMatchFound && !isPlaying && (
        <>
          <MatchFoundPlayPage setIsPlaying={setIsPlaying} />
        </>
      )}
      {isPlaying && <>Play Page</>}
    </>
  );
}
