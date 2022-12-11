import type IGameEntity from "../entities/IGameEntity";

export default class Impostor implements IGameEntity{
    name = "Impostor";
    image_url = "/cards/impostor.jpg";
    details = "Skopiuj zdolność sąsiadującej ujawnionej karty postaci.";
    reveal() {
        return "xd";
    }
}