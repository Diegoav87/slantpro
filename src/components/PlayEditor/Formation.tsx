"use client";

import { PlayerType } from "@/types/Player";
import Player from "./Player";

type FormationProps = {
  players: PlayerType[];
};

const Formation = ({ players }: FormationProps) => {
  return (
    <>
      {players.map((player, index) => (
        <Player
          key={index}
          id={player.id}
          x={player.x}
          y={player.y}
          tag={player.tag}
          shape={player.shape}
          color={player.color}
        />
      ))}
    </>
  );
};
export default Formation;
