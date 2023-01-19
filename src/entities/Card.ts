import type { playercolortype } from "src/types/playerTypes";

export default class Card {
    ownerId: string;
    color: playercolortype;
    constructor(ownerId: string, color: playercolortype) {
        this.ownerId = ownerId;
        this.color = color;
    }
}