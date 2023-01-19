import type { CardId } from "src/entities/CardsUtils";
import type { playercolortype } from "./playerTypes";

export type TableSyncObject = {
    id: CardId,
    ownerId: string,
    color: playercolortype,
};