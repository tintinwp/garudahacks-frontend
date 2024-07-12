import { TyperacingCard } from "@/components/typeracing-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Video from "@/components/ui/video";
import { GameInfoResponse } from "@/types/backend/game-info-response";
import { GameSuccessSkipResponse } from "@/types/backend/game-success-skip-response";
import { User } from "@/types/backend/user";
import { Category } from "@mediapipe/tasks-vision";
import { userInfo } from "os";
import { useEffect, useMemo, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { io, Socket } from "socket.io-client";
import TimerAnimation from "../../animations/timer-animation.json";

interface TyperacerPlayPageProps {
  gameId: string;
  gameInformation: GameInfoResponse;
  user: User;
}

export const TyperacerPlayPage = (props: TyperacerPlayPageProps) => {
  const APIKEY = localStorage.getItem(
    import.meta.env.VITE_AUTHORIZATION_SESSION
  );
  const socketRef = useRef<Socket | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
        socketRef.current!.on(
          "another-participant-skip",
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

  const [currentTimeDiff, setCurrentTimeDiff] = useState(0);

  useEffect(() => {
    const updateTimeDiff = () => {
      const expiredTime = props.gameInformation.expired; // Unix time in seconds
      const currentTime = Math.floor(Date.now()); // Current time in Unix timestamp (seconds)
      const diffSeconds = expiredTime - currentTime;
      setCurrentTimeDiff(Math.round(diffSeconds / 1000));
    };

    updateTimeDiff(); // Initial calculation

    const intervalId = setInterval(updateTimeDiff, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [props.gameInformation.expired]);

  useEffect(() => {
    const userInformation = props.gameInformation.gameParticipants.filter(
      (participant) => participant.userId === props.user.id
    );
    console.log(userInformation);
    const currentIndex =
      userInformation[0].skips.length + userInformation[0].successes.length - 1;
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex);
    }
  }, []);

  const predictOnVideo = (category: Category) => {
    if (socketRef.current) {
      if (
        category.categoryName.toUpperCase() ==
        props.gameInformation.question.split("")[currentIndex].toUpperCase()
      ) {
        console.log("Success");
        socketRef.current.emit("participant-success", {
          gameId: props.gameId,
          index: currentIndex,
        });
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const skipCharacter = () => {
    if (socketRef.current) {
      console.log("SKIP");
      socketRef.current.emit("participant-skip", {
        gameId: props.gameId,
        index: currentIndex,
      });
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex text-center w-full items-center justify-center">
        <Lottie animationData={TimerAnimation} className="size-8" play />
        {currentTimeDiff}
      </div>
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
        <Button
          onClick={skipCharacter}
          className="bg-primary w-full text-xl font-semibold"
        >
          Skip
        </Button>
      </div>
      <div className="p-4">
        <Separator className="bg-gray-400" />
      </div>
      <div className="p-4 w-full h-full">
        <Video onGetGesture={predictOnVideo} />
      </div>
    </div>
  );
};
