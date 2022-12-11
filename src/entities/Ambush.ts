import type IGameEntity from "../entities/IGameEntity";

export default class Ambush implements IGameEntity{
    name = "Ambush";
    image_url = "/cards/ambush.jpg";
    details = "Odrzuć wszystkie punkty znajdujące się na karcie i zyskaj 1 punkt, następnie odrzuć kartę. Po zabiciu przez przeciwnika, odrzuć kartę i otrzymaj 4 punkty.";
    reveal() {
        return "xd";
    }
}