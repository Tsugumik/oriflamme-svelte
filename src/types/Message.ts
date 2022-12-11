export default class Message {
    msgcontent: string;
    sender: string;
    time: string;
    constructor(content: string, sender: string, time: string) {
        this.msgcontent = content;
        this.sender = sender;
        this.time = time;
    }
}