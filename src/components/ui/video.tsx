import {
  Category,
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

interface VideoProps {
  onGetGesture?: (gesture: Category) => void;
}

export default function Video({ onGetGesture }: VideoProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [recognizer, setRecognizer] = useState<GestureRecognizer>();

  function predict() {
    if (
      !recognizer ||
      !webcamRef.current ||
      !webcamRef.current.video ||
      !canvasRef.current ||
      !divRef.current
    ) {
      return;
    }

    if (webcamRef.current.video.readyState !== 4) {
      return;
    }

    const result = recognizer.recognizeForVideo(
      webcamRef.current.video,
      Date.now()
    );

    const WIDTH = divRef.current.clientWidth;
    const HEIGHT = divRef.current.clientHeight;
    webcamRef.current.video.width = WIDTH;
    webcamRef.current.video.height = HEIGHT;

    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    canvasEl.width = WIDTH;
    canvasEl.height = HEIGHT;
    for (const landmarks of result.landmarks) {
      const x = landmarks.map((l) => l.x);
      const y = landmarks.map((l) => l.y);

      if (result.gestures.length > 0) {
        const gesture = result.gestures[0][0];
        if (gesture) {
          onGetGesture && onGetGesture(gesture);
          // const {categoryName, score} = gesture;
          // const categoryScore = parseFloat(
          //   (score * 100).toString()
          // ).toFixed(2);
          // const handedness = result.handednesses[0][0].displayName;
          // ctx.fillStyle = '#ff0000';
          // ctx.font = '24px serif';
          // ctx.fillText(
          //   categoryName.toUpperCase(),
          //   canvasEl.width * Math.min(...x),
          //   canvasEl.height * Math.min(...y) - 15
          // );
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        landmarks[i].visibility = 1;
      }

      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        color: "#00ffff",
        lineWidth: 2,
      });
      drawLandmarks(ctx, landmarks, {
        color: "#ffff29",
        lineWidth: 1,
      });
      ctx.restore();
    }
    requestAnimationFrame(predict);
  }

  async function loadRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/model.task",
        delegate: "CPU",
      },
      numHands: 2,
      runningMode: "VIDEO",
    });
    setRecognizer(recognizer);
  }

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      webcamRef.current.video.addEventListener("loadeddata", () => {
        predict();
      });
    }
    return () => {
      if (webcamRef.current && webcamRef.current.video) {
        webcamRef.current.video.removeEventListener("loadeddata", predict);
      }
    };
  }, [recognizer]);

  useEffect(() => {
    loadRecognizer();
  }, []);

  return (
    <div
      ref={divRef}
      className="overflow-hidden rounded-xl relative w-full h-full"
    >
      <Webcam
        ref={webcamRef}
        className="overflow-hidden rounded-xl absolute top-0 left-0 w-full h-full"
      />
      <canvas
        ref={canvasRef}
        className="absolute z-10 top-0 left-0 w-full h-full"
      ></canvas>
    </div>
  );
}
