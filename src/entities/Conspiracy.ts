import type IGameEntity from "../entities/IGameEntity";
import type { playercolortype } from "src/types/playerTypes";
import Card from "./Card";
import { CardId } from "./CardsUtils";

export default class Conspiracy extends Card implements IGameEntity{
    id = CardId.CONSPIRACY;
    name = "Conspiracy";
    imageUrl = "/cards/conspiracy.jpg";
    details = "Otrzymujesz dwukrotność punktów zgromadzonych na karcie, następnie ją odrzuć.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: playercolortype) {
        super(ownerId, color);
    }
}