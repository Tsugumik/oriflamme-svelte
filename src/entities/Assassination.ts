import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Assasination extends Card implements IGameEntity{
    id = CardId.ASSASSINATION;
    name = "Assasination";
    imageUrl = "/cards/assassination.jpg";
    details = "Zlikwiduj dowolną kartę w kolejce, następnie odrzuć kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}