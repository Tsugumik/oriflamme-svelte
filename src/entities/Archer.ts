import type IGameEntity from "../entities/IGameEntity";

export default class Archer implements IGameEntity{
    name = "Archer";
    image_url = "/cards/archer.jpg";
    details = "Zlikwiduj pierwszą albo ostatnią kartę w kolejce.";
    reveal() {
        return "xd";
    }
}