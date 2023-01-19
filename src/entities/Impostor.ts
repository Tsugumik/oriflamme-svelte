import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Impostor extends Card implements IGameEntity{
    id = CardId.IMPOSTOR;
    name = "Impostor";
    imageUrl = "/cards/impostor.jpg";
    details = "Skopiuj zdolność sąsiadującej ujawnionej karty postaci.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}