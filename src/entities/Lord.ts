import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Lord extends Card implements IGameEntity{
    id = CardId.LORD;
    name = "Lord";
    imageUrl = "/cards/lord.jpg";
    details = "Otrzymujesz 1 punkt i dodatkowo 1 punkt za każdą sąsiedującą kartę, która należy do twojego rodu.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}