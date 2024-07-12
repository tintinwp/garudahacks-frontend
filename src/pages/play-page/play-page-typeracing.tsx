import { TyperacingCard } from "@/components/typeracing-cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Video from "@/components/ui/video";
import { UserGameInfo } from "@/types/backend/game-info-response";
import { GameSuccessSkipResponse } from "@/types/backend/game-success-skip-response";
import { User } from "@/types/backend/user";
import { Category } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { io, Socket } from "socket.io-client";
import TimerAnimation from "../../animations/timer-animation.json";
import { useNavigate } from "react-router-dom";

interface TyperacerPlayPageProps {
  gameId: string;
  user: User;
  expired: number;
  questions: string;
  userGameInformation: UserGameInfo;
}

export const TyperacerPlayPage = (props: TyperacerPlayPageProps) => {
  const APIKEY = localStorage.getItem(
    import.meta.env.VITE_AUTHORIZATION_SESSION
  );
  const socketRef = useRef<Socket | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [enemyCurrentIndex, setEnemyCurrentIndex] = useState<number>(0);
  const [currentTimeDiff, setCurrentTimeDiff] = useState(1000);
  const [userGameInformation, setUserGameInformation] = useState<UserGameInfo>(
    props.userGameInformation
  );
<<<<<<< HEAD

  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(()=> {
    setRefresh((prev) => !prev)
  }, [currentIndex])

=======
  const nav = useNavigate();
>>>>>>> multiplayer-v3
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
        socketRef.current!.on(
          "another-participant-success",
          (data: GameSuccessSkipResponse) => {
            setEnemyCurrentIndex(data.index + 1);
          }
        );
        socketRef.current!.on(
          "another-participant-skip",
          (data: GameSuccessSkipResponse) => {
            setEnemyCurrentIndex(data.index + 1);
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

  useEffect(() => {
    const updateTimeDiff = () => {
      const expiredTime = props.expired; // Unix time in seconds
      const currentTime = Math.floor(Date.now()); // Current time in Unix timestamp (seconds)
      const diffSeconds = expiredTime - currentTime;
      setCurrentTimeDiff(Math.round(diffSeconds / 1000));
    };

    updateTimeDiff(); // Initial calculation

    const intervalId = setInterval(updateTimeDiff, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [props.expired]);

  useEffect(() => {
    if (currentTimeDiff <= 0) {
      nav("/home");
    }
  }, [currentTimeDiff]);

  useEffect(() => {
    if (userGameInformation) {
      const userInformation = userGameInformation;
      const currentIndex =
        userInformation.skips.length + userInformation.successes.length - 1;
      if (currentIndex >= 0) {
        setCurrentIndex(currentIndex);
      }
    }
  }, []);

  const predictOnVideo = (category: Category) => {
<<<<<<< HEAD
    console.log('gesture : ', category.categoryName, ' socket ref : ', socketRef.current)
=======
    console.log(currentIndex);
>>>>>>> multiplayer-v3
    if (socketRef.current) {
      console.log(`${category.categoryName.toUpperCase()} === ${props.questions.split("")[currentIndex].toUpperCase()}`)
      if (
        category.categoryName.toUpperCase() ==
        props.questions.split("")[currentIndex].toUpperCase()
      ) {
        socketRef.current.emit("participant-success", {
          gameId: props.gameId,
          index: currentIndex,
        });
        setUserGameInformation((prevState) => ({
          ...prevState,
          successes: [...prevState.successes, currentIndex],
        }));
<<<<<<< HEAD
        // console.log('next index!')
=======
        console.log("Success beneran ini mah parah");
>>>>>>> multiplayer-v3
        setCurrentIndex(currentIndex + 1);
      }
    }
  };


  const skipCharacter = () => {
    if (socketRef.current) {
      socketRef.current.emit("participant-skip", {
        gameId: props.gameId,
        index: currentIndex,
      });
      setUserGameInformation((prevState) => ({
        ...prevState,
        skips: [...prevState.skips, currentIndex],
      }));
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex text-center w-full items-center justify-center">
        <Lottie animationData={TimerAnimation} className="size-8" play />
        {currentTimeDiff}
      </div>
      <div className="h-1/3 flex justify-center items-center flex-wrap p-2">
        {userGameInformation &&
          props.questions.split("").map((chr, i) => {
            return (
              <TyperacingCard
                key={i}
                questionChr={chr}
                isCurrent={enemyCurrentIndex === i || currentIndex === i}
                userCurrentIndex={currentIndex}
                enemyCurrentIndex={enemyCurrentIndex}
                index={i}
                successes={userGameInformation.successes}
                skips={userGameInformation.skips}
              />
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
        <Video refresh={refresh} onGetGesture={predictOnVideo} />
      </div>
    </div>
  );
};
