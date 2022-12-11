import type IGameEntity from "../entities/IGameEntity";

export default class Assasination implements IGameEntity{
    name = "Assasination";
    image_url = "/cards/assassination.jpg";
    details = "Zlikwiduj dowolną kartę w kolejce, następnie odrzuć kartę.";
    reveal() {
        return "xd";
    }
}