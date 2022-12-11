import type IGameEntity from "../entities/IGameEntity";

export default class Knight implements IGameEntity{
    name = "Knight";
    image_url = "/cards/knight.jpg";
    details = "Zlikwiduj sąsiadującą kartę.";
    reveal() {
        return "xd";
    }
}