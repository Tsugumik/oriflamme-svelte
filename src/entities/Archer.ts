import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Archer extends Card implements IGameEntity{
    id = CardId.ARCHER;
    name = "Archer";
    imageUrl = "/cards/archer.jpg";
    details = "Zlikwiduj pierwszą albo ostatnią kartę w kolejce.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}