import { usePlayEditorStore } from "@/store/playEditor";

const PlayerColorSelector = () => {
  const colors = ["#0f172a", "#4338ca", "#b91c1c", "#65a30d", "#ca8a04"];

  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const players = usePlayEditorStore((state) => state.players);
  const updatePlayer = usePlayEditorStore((state) => state.updatePlayer);

  const player = players.find((player) => player.id === selectedPlayer);

  const changePlayerColor = (color: string) => {
    if (selectedPlayer && player) {
      const newPlayer = { ...player, color: color };
      updatePlayer(selectedPlayer, newPlayer);
    }
  };

  return (
    <div className={`transform transition-transform p-8 bg-white`}>
      <div className="flex space-x-4 justify-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-white hover:ring-blue-500 ${
              color === player?.color &&
              "ring-2 ring-offset-2 ring-offset-white ring-blue-500"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => changePlayerColor(color)}
          />
        ))}
      </div>
    </div>
  );
};
export default PlayerColorSelector;
