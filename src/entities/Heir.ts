import type IGameEntity from "../entities/IGameEntity";

export default class Heir implements IGameEntity{
    name = "Heir";
    image_url = "/cards/heir.jpg";
    details = "Jeżeli nie ma innej ujawnionej karty o tej nazwie, otrzymujesz dwa punkty.";
    reveal() {
        return "xd";
    }
}