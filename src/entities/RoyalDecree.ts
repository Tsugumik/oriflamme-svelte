import type IGameEntity from "../entities/IGameEntity";

export default class RoyalDecree implements IGameEntity{
    name = "Royal Decree";
    image_url = "/cards/royaldecree.jpg";
    details = "Przenieś i umieść kartę w dowolnym miejscu w kolejce, za wyjątkiem umieszczenia jej na innej karcie. Odrzuć tą kartę.";
    reveal() {
        return "xd";
    }
}