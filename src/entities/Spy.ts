import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Spy extends Card implements IGameEntity{
    id = CardId.SPY;
    name = "Spy";
    imageUrl = "/cards/spy.jpg";
    details = "Ukradnij 1 punkt graczowi, który jest właścicielem sąsiadującej karty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}