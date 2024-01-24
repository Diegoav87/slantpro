import { create } from "zustand";

import { PlayerType } from "@/types/Player";
import { RouteType } from "@/types/Route";

type StoreState = {
  showPlayerMenu: boolean;
  players: PlayerType[];
  selectedPlayer: number | null;
  routes: Record<number, RouteType>;
  setPlayer: (playerId: number | null) => void;
  setPlayerMenu: () => void;
  updatePlayer: (playerId: number, player: PlayerType) => void;
  setPlayers: (players: PlayerType[]) => void;
  updatePlayerRoute: (playerId: number, route: RouteType) => void;
  clearRoutes: (playerId: number) => void;
};

const players = [
  { id: 1, x: 0, y: 0, tag: "C", shape: "square", color: "#0f172a" },
  { id: 2, x: -40, y: 0, tag: "L", shape: "circle", color: "#0f172a" },
  { id: 3, x: 40, y: 0, tag: "L", shape: "circle", color: "#0f172a" },
  { id: 4, x: 80, y: 0, tag: "L", shape: "circle", color: "#0f172a" },
  { id: 5, x: -80, y: 0, tag: "L", shape: "circle", color: "#0f172a" },
  { id: 6, x: -360, y: 0, tag: "X", shape: "circle", color: "#4338ca" },
  { id: 7, x: 360, y: 0, tag: "Z", shape: "star", color: "#4338ca" },
  { id: 8, x: 0, y: 40, tag: "Q", shape: "circle", color: "#b91c1c" },
  { id: 9, x: 0, y: 120, tag: "H", shape: "circle", color: "#65a30d" },
  { id: 10, x: 200, y: 20, tag: "Y", shape: "circle", color: "#ca8a04" },
];

export const usePlayEditorStore = create<StoreState>((set) => ({
  showPlayerMenu: false,
  players: players,
  selectedPlayer: null,
  routes: {},
  setPlayer: (playerId: number | null) => {
    set({ selectedPlayer: playerId });
  },
  setPlayerMenu: () => {
    set((state) => ({ showPlayerMenu: !state.showPlayerMenu }));
  },
  setPlayers: (players: PlayerType[]) => {
    set({ players: players });
  },
  updatePlayerRoute: (playerId: number, route: RouteType) => {
    set((state) => ({
      routes: {
        ...state.routes,
        [playerId]: route,
      },
    }));
  },
  updatePlayer: (playerId: number, newPlayer: PlayerType) => {
    set((state) => ({
      players: state.players.map((player) => {
        if (player.id === playerId) {
          return newPlayer;
        } else {
          return player;
        }
      }),
    }));
  },
  clearRoutes: (playerId: number) => {
    set((state) => {
      const newRoutes = { ...state.routes };
      delete newRoutes[playerId];
      return { routes: newRoutes };
    });
  },
}));
