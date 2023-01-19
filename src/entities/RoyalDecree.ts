import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class RoyalDecree extends Card implements IGameEntity{
    id = CardId.ROYALDECREE;
    name = "Royal Decree";
    imageUrl = "/cards/royaldecree.jpg";
    details = "Przenieś i umieść kartę w dowolnym miejscu w kolejce, za wyjątkiem umieszczenia jej na innej karcie. Odrzuć tą kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}