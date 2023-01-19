import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Ambush extends Card implements IGameEntity{
    id = CardId.AMBUSH;
    name = "Ambush";
    imageUrl = "/cards/ambush.jpg";
    details = "Odrzuć wszystkie punkty znajdujące się na karcie i zyskaj 1 punkt, następnie odrzuć kartę. Po zabiciu przez przeciwnika, odrzuć kartę i otrzymaj 4 punkty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}