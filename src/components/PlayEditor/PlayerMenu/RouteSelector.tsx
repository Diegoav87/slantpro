import { Button } from "@/components/ui/button";
import { Redo, MoveUp, X } from "lucide-react";
import { usePlayEditorStore } from "@/store/playEditor";

const RouteSelector = () => {
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const routes = usePlayEditorStore((state) => state.routes);

  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );
  const players = usePlayEditorStore((state) => state.players);
  const clearRoutes = usePlayEditorStore((state) => state.clearRoutes);

  const addRoute = (type: string) => {
    const player = players.find((player) => player.id === selectedPlayer);

    if (player !== undefined && selectedPlayer !== null) {
      if (player.id in routes) {
        updatePlayerRoute(selectedPlayer, {
          type: type,
          style: routes[player.id].style,
          tip: routes[player.id].tip,
          color: "black",
          points: [
            ...routes[player.id].points,
            {
              x:
                routes[player.id].points[routes[player.id].points.length - 1]
                  .x - 50,
              y:
                routes[player.id].points[routes[player.id].points.length - 1]
                  .y - 50,
            },
          ],
        });
      } else {
        if (type === "straight") {
          updatePlayerRoute(selectedPlayer, {
            type: type,
            style: "solid",
            tip: "arrow",
            color: "black",
            points: [
              { x: player.x, y: player.y },
              { x: player.x, y: player.y - 50 },
            ],
          });
        } else {
          updatePlayerRoute(selectedPlayer, {
            type: type,
            style: "solid",
            tip: "arrow",
            color: "black",
            points: [
              { x: player.x, y: player.y },
              { x: player.x, y: player.y - 50 },
              { x: player.x - 50, y: player.y - 100 },
            ],
          });
        }
      }
    }
  };

  const deleteRoutes = () => {
    const player = players.find((player) => player.id === selectedPlayer);

    if (player !== undefined && selectedPlayer !== null) {
      if (player.id in routes) {
        clearRoutes(selectedPlayer);
      }
    }
  };

  return (
    <div className={`transform transition-transform p-8 bg-white`}>
      <div className="flex items-center space-x-4 justify-center">
        <Button
          variant="default"
          size="icon"
          onClick={() => addRoute("straight")}
        >
          <MoveUp />
        </Button>
        <Button variant="default" size="icon" onClick={() => addRoute("curve")}>
          <Redo />
        </Button>
        <Button variant="default" size="icon" onClick={() => deleteRoutes()}>
          <X />
        </Button>
      </div>
    </div>
  );
};
export default RouteSelector;
