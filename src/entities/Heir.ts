import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Heir extends Card implements IGameEntity{
    id = CardId.HEIR;
    name = "Heir";
    imageUrl = "/cards/heir.jpg";
    details = "Jeżeli nie ma innej ujawnionej karty o tej nazwie, otrzymujesz dwa punkty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}