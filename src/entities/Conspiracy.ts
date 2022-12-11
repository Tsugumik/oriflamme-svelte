import type IGameEntity from "../entities/IGameEntity";

export default class Conspiracy implements IGameEntity{
    name = "Conspiracy";
    image_url = "/cards/conspiracy.jpg";
    details = "Otrzymujesz dwukrotność punktów zgromadzonych na karcie, następnie ją odrzuć.";
    reveal() {
        return "xd";
    }
}