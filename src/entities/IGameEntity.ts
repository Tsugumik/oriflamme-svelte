import type { playercolortype } from "src/types/playerTypes";
import type { CardId } from "./CardsUtils";

export default interface IGameEntity {
    id: CardId;
    name: string;
    imageUrl: string;
    details: string;
    ownerId: string;
    color: playercolortype;
    reveal(): void;
}