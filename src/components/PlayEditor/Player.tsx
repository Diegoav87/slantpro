"use client";

import {
  Group,
  Circle,
  Text,
  Rect,
  Star,
  Arrow,
  Line,
  Shape,
} from "react-konva";
import { useState, useEffect, useRef } from "react";
import Konva from "konva";
import { usePlayEditorStore } from "@/store/playEditor";
import { KonvaEventObject } from "konva/lib/Node";
import Route from "./Route";

type PlayerProps = {
  id: number;
  x: number;
  y: number;
  tag: string;
  shape: string;
  color: string;
};

const Player = ({ id, x, y, tag, shape, color }: PlayerProps) => {
  const setPlayerMenu = usePlayEditorStore((state) => state.setPlayerMenu);
  const setPlayer = usePlayEditorStore((state) => state.setPlayer);
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const updatePlayer = usePlayEditorStore((state) => state.updatePlayer);
  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );
  const routes = usePlayEditorStore((state) => state.routes);

  const playerProps = {
    fill: "white",
    stroke: color,
    strokeWidth: 3,
  };

  let playerShape;

  const handlePlayerClick = () => {
    if (selectedPlayer === null) {
      setPlayerMenu();
      setPlayer(id);
    } else {
      if (selectedPlayer === id) {
        setPlayerMenu();
        setPlayer(null);
      } else {
        setPlayer(id);
      }
    }
  };

  const handlePlayerDrag = (e: KonvaEventObject<DragEvent>) => {
    const newPlayer = { id, x, y, tag, shape, color };

    newPlayer.x = e.target.x();
    newPlayer.y = e.target.y();

    updatePlayer(id, newPlayer);

    if (routes[id]) {
      const newPlayerRoute = { ...routes[id] };

      newPlayerRoute.points[0] = { x: e.target.x(), y: e.target.y() };
      updatePlayerRoute(id, newPlayerRoute);
    }
  };

  switch (shape) {
    case "square":
      playerShape = (
        <Group>
          <Rect {...playerProps} x={-15} y={-15} width={30} height={30} />
        </Group>
      );
      break;
    case "star":
      playerShape = (
        <Group>
          <Star
            {...playerProps}
            numPoints={5}
            innerRadius={12}
            outerRadius={18}
          />
        </Group>
      );
      break;
    case "circle":
    default:
      playerShape = <Circle {...playerProps} radius={15} />;
      break;
  }

  return (
    <Group>
      <Route id={id} />

      <Group
        x={x}
        y={y}
        draggable
        onMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
        onClick={handlePlayerClick}
        onDragMove={(e) => handlePlayerDrag(e)}
      >
        {playerShape}
        <Text
          text={tag}
          fontSize={15}
          fontStyle="bold"
          align="center"
          verticalAlign="middle"
          width={30}
          height={30}
          x={-15}
          y={-15}
          fontFamily="Arial, sans-serif"
        />
      </Group>
    </Group>
  );
};

export default Player;
