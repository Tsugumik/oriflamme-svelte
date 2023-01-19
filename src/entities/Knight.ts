import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Knight extends Card implements IGameEntity{
    id = CardId.KNIGHT;
    name = "Knight";
    imageUrl = "/cards/knight.jpg";
    details = "Zlikwiduj sąsiadującą kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}