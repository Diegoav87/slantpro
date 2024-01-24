import { Button } from "@/components/ui/button";
import { RailSymbol, Minus, GripHorizontal } from "lucide-react";
import { usePlayEditorStore } from "@/store/playEditor";

const RouteStyleSelector = () => {
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const routes = usePlayEditorStore((state) => state.routes);

  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );

  const changeRouteStyle = (style: string) => {
    if (selectedPlayer && selectedPlayer in routes) {
      updatePlayerRoute(selectedPlayer, {
        ...routes[selectedPlayer],
        style: style,
      });
    }
  };

  return (
    <div className={`transform transition-transform p-8 bg-white`}>
      <div className="flex items-center space-x-4 justify-center">
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteStyle("solid")}
        >
          <Minus />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteStyle("dashed")}
        >
          <GripHorizontal />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => changeRouteStyle("jagged")}
        >
          <RailSymbol />
        </Button>
      </div>
    </div>
  );
};
export default RouteStyleSelector;
