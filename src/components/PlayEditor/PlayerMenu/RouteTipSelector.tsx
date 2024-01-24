import { Button } from "@/components/ui/button";
import { MousePointer2, Circle, RectangleHorizontal } from "lucide-react";
import { usePlayEditorStore } from "@/store/playEditor";

const RouteTipSelector = () => {
  const players = usePlayEditorStore((state) => state.players);
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const routes = usePlayEditorStore((state) => state.routes);
  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );

  const changeRouteTip = (tip: string) => {
    const player = players.find((player) => player.id === selectedPlayer);

    if (player !== undefined && selectedPlayer !== null) {
      if (player.id in routes) {
        updatePlayerRoute(selectedPlayer, {
          ...routes[player.id],
          tip: tip,
        });
      }
    }
  };

  return (
    <div className={`transform transition-transform p-8 bg-white`}>
      <div className="flex items-center space-x-4 justify-center">
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteTip("arrow")}
        >
          <MousePointer2 />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteTip("round")}
        >
          <Circle />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteTip("block")}
        >
          <RectangleHorizontal />
        </Button>
      </div>
    </div>
  );
};
export default RouteTipSelector;
