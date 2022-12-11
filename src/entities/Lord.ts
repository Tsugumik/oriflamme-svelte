import type IGameEntity from "../entities/IGameEntity";

export default class Lord implements IGameEntity{
    name = "Lord";
    image_url = "/cards/lord.jpg";
    details = "Otrzymujesz 1 punkt i dodatkowo 1 punkt za każdą sąsiedującą kartę, która należy do twojego rodu.";
    reveal() {
        return "xd";
    }
}