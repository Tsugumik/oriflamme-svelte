import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class UnknownCard extends Card implements IGameEntity{
    id: CardId = CardId.UNKNOWN;
    name = "UNKNOWN";
    imageUrl = "";
    details = "UNKNOWN";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}