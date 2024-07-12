import PlayerIcon from "@/components/icons/player-icon";
import Navbar from "@/components/navbar";
import useApi from "@/context/api-context";
import { GameSuccessSkipResponse } from "@/types/backend/game-success-skip-response";
import { connect, io } from "socket.io-client";
import { TyperacerPlayPage } from "./play-page-typeracing";
import { useEffect, useState } from "react";
import endpoints from "@/api/endpoint";
import { GameInfoResponse } from "@/types/backend/game-info-response";

export interface GamePlayPageProps {
  gameId: string;
}
export const GamePlayPage = (props: GamePlayPageProps) => {
  const [gameInformation, setGameInformation] = useState<
    GameInfoResponse | undefined
  >();

  const APIKEY = localStorage.getItem(
    import.meta.env.VITE_AUTHORIZATION_SESSION
  );

  const { get, user } = useApi();
  useEffect(() => {
    const getGameInformation = async () => {
      const data = (await get(
        endpoints.typeracingGameEndpoint.getGameInformation,
        props.gameId
      )) as GameInfoResponse;
      if (data) {
        setGameInformation(data);
      }
    };
    getGameInformation();
  }, []);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="h-1/5 bg-primary flex justify-center items-center">
          <div className="text-white text-center">
            <div>You are facing</div>
            <div className="flex">
              <PlayerIcon className="size-6" />
              <div className="text-white font-semibold">
                {gameInformation &&
                  user &&
                  gameInformation.gameParticipants.filter(
                    (participant) => participant.userId !== user.id
                  )[0].username}
              </div>
            </div>
          </div>
        </div>
        {gameInformation && (
          <TyperacerPlayPage
            gameInformation={gameInformation}
            gameId={props.gameId}
          />
        )}
      </div>
      <Navbar />
    </>
  );
};
