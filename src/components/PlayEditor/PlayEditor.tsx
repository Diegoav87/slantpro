"use client";

import { Stage, Layer, Image, Circle } from "react-konva";
import { useState, useEffect, useRef } from "react";
import Formation from "./Formation";
import PlayerMenu from "@/components/PlayEditor/PlayerMenu";
import { usePlayEditorStore } from "@/store/playEditor";
import Konva from "konva";

import { KonvaEventObject } from "konva/lib/Node";

const PlayEditor = () => {
  const stageRef = useRef<Konva.Stage>(null);

  const players = usePlayEditorStore((state) => state.players);
  const [isClient, setIsClient] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isClient) {
      const img = new window.Image();
      img.src = "/bg.png";
      img.alt = "bg";
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setImageWidth(window.innerWidth);
        setImageHeight(window.innerWidth / aspectRatio);
        setBackgroundImage(img);
      };
    }
  }, [isClient]);

  useEffect(() => {
    const handleResize = () => {
      if (backgroundImage) {
        const aspectRatio = backgroundImage.width / backgroundImage.height;
        setImageWidth(window.innerWidth);
        setImageHeight(window.innerWidth / aspectRatio);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [backgroundImage]);

  return (
    <>
      {isClient && (
        <>
          <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            draggable
            dragBoundFunc={(pos) => {
              const y = pos.y;
              const currentY = stageRef.current?.position().y || 0;

              const minY = -(imageHeight / 2 - window.innerHeight); // Add an offset

              if (currentY >= imageHeight / 2 || currentY <= minY) {
                return {
                  x: stageRef.current?.absolutePosition().x || 0,
                  y: currentY, // Keep the current position
                };
              }

              return {
                x: stageRef.current?.absolutePosition().x || 0,
                y: y,
              };
            }}
          >
            <Layer>
              <Image
                x={-imageWidth / 2}
                y={-imageHeight / 2}
                image={backgroundImage}
                width={imageWidth}
                height={imageHeight}
              />

              <Formation players={players} />
            </Layer>
          </Stage>
          <PlayerMenu />
        </>
      )}
    </>
  );
};

export default PlayEditor;
