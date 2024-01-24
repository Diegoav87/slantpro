"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { usePlayEditorStore } from "@/store/playEditor";
import PlayerColorSelector from "./PlayerMenu/PlayerColorSelector";
import RouteSelector from "./PlayerMenu/RouteSelector";
import RouteStyleSelector from "./PlayerMenu/RouteStyleSelector";
import RouteTipSelector from "./PlayerMenu/RouteTipSelector";

import { TrendingUp, CircleUser, ArrowUp, Minus } from "lucide-react";

const PlayerMenu = () => {
  const [currentSelector, setCurrentSelector] = useState<string | null>(null);

  const showPlayerMenu = usePlayEditorStore((state) => state.showPlayerMenu);
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const routes = usePlayEditorStore((state) => state.routes);

  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );
  const players = usePlayEditorStore((state) => state.players);

  const changeSelector = (selector: string) => {
    if (selector === currentSelector) {
      setCurrentSelector(null);
    } else {
      setCurrentSelector(selector);
    }
  };

  const changeRouteStyle = (style: string) => {
    const player = players.find((player) => player.id === selectedPlayer);

    if (player !== undefined && selectedPlayer !== null) {
      if (player.id in routes) {
        updatePlayerRoute(selectedPlayer, {
          ...routes[player.id],
          style: style,
        });
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white  border-t transform transition-transform ${
        showPlayerMenu && currentSelector !== null
          ? "translate-y-0"
          : showPlayerMenu && currentSelector === null
          ? "translate-y-0"
          : "translate-y-full"
      }`}
    >
      <div className="flex items-center space-x-4 justify-center py-8 border-b">
        <Button
          variant="default"
          size="icon"
          onClick={() => changeSelector("playerColor")}
        >
          <CircleUser />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeSelector("route")}
        >
          <TrendingUp />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeSelector("routeStyle")}
        >
          <Minus />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeSelector("routeTip")}
        >
          <ArrowUp />
        </Button>
      </div>

      {currentSelector === "playerColor" && <PlayerColorSelector />}
      {currentSelector === "route" && <RouteSelector />}
      {currentSelector === "routeStyle" && <RouteStyleSelector />}
      {currentSelector === "routeTip" && <RouteTipSelector />}
    </div>
  );
};
export default PlayerMenu;
