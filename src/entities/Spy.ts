import type IGameEntity from "../entities/IGameEntity";

export default class Spy implements IGameEntity{
    name = "Spy";
    image_url = "/cards/spy.jpg";
    details = "Ukradnij 1 punkt graczowi, który jest właścicielem sąsiadującej karty.";
    reveal() {
        return "xd";
    }
}