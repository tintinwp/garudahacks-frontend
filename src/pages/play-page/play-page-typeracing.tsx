import { TyperacingCard } from "@/components/typeracing-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Video from "@/components/ui/video";
import { GameInfoResponse } from "@/types/backend/game-info-response";
import { GameSuccessSkipResponse } from "@/types/backend/game-success-skip-response";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface TyperacerPlayPageProps {
  gameId: string;
  gameInformation: GameInfoResponse;
}

export const TyperacerPlayPage = (props: TyperacerPlayPageProps) => {
  const APIKEY = localStorage.getItem(
    import.meta.env.VITE_AUTHORIZATION_SESSION
  );
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        import.meta.env.VITE_BACKEND_WS_API_URL + "/games",
        {
          extraHeaders: {
            Authorization: APIKEY ?? "",
          },
          query: {
            roomName: props.gameId,
          },
          forceNew: true,
        }
      );

      socketRef.current.on("connect", () => {
        console.log("Connected to the server");
        socketRef.current!.on(
          "another-participant-success",
          (data: GameSuccessSkipResponse) => {
            console.log(data);
          }
        );
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [APIKEY, props.gameId]);
  return (
    <div className="flex flex-col h-full">
      <div className="h-1/3 flex justify-center items-center flex-wrap p-2">
        {props.gameInformation.question.split("").map((chr) => {
          return (
            <>
              <TyperacingCard questionChr={chr} />
            </>
          );
        })}
      </div>

      <div className="p-4">
        <Button className="bg-primary w-full text-xl font-semibold">
          Skip
        </Button>
      </div>
      <div className="p-4">
        <Separator className="bg-gray-400" />
      </div>
      <div className="p-4 w-full h-full">
        <Video />
      </div>
    </div>
  );
};
