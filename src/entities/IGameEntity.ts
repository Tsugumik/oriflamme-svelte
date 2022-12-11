export default interface IGameEntity {
    name: string;
    image_url: string;
    details: string;
    reveal(): void;
}