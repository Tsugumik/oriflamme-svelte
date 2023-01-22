import type { playercolortype } from "./playerTypes";

export type PlayerSyncPacket = {name: string, connectionStatus: boolean, permission: number, color: playercolortype, id: string, active: boolean};