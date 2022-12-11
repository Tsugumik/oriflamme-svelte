<script lang="ts">
    import type { Socket } from "socket.io-client";
    import Message from "../../types/Message";
    import { gameState } from "../../types/gameState";
    import { fade } from 'svelte/transition';
    
    export let globalSocket: Socket;
    export let gameStatus: gameState;
    let message: string = "";
    let messages = new Array<Message | any>();
    async function sendMessage(event: SubmitEvent) {
        event.preventDefault();
        globalSocket.emit("chat-message", message);
        message = "";
    }

    if(globalSocket) {
        globalSocket.emit("chat-sync");
        globalSocket.on("chat-sync-response", packet=>{
            const parsedPacket: Array<any> = JSON.parse(packet);
            parsedPacket.forEach(msgpacketobj => {
                const msgObject = new Message(msgpacketobj.message, msgpacketobj.sender, msgpacketobj.time);
                messages = [...messages, msgObject];
            });
        });
        globalSocket.on("new-message", msgpacket=>{
            const msgpacketobj: any = JSON.parse(msgpacket);
            const msgObject = new Message(msgpacketobj.message, msgpacketobj.sender, msgpacketobj.time);
            messages = [...messages, msgObject];
        });
    }
    
</script>

{#if gameStatus == gameState.PLAYING}
    <div class="chat">
        <ul>
            {#each messages as msg}
                <li class="message">
                    <div class="send-details">
                        <div class="sender">{msg.sender}:</div>
                    </div>
                    <p class="content">
                        {msg.msgcontent}
                    </p>
                </li>
            {/each}
        </ul>
        <form on:submit={sendMessage}>
            <input autocomplete="off" required type="text" name="message" id="message" bind:value={message} maxlength="100">
            <button type="submit">Send</button>
        </form>
    </div>
{:else}
    <div class="connect-info">
        Please connect to the server to access the chat.
    </div>
{/if}



<style lang="scss">
    .chat {
        height: 100%;
        ul {
            height: 90%;
            display: flex;
            flex-direction: column;
            list-style: none;
            overflow-y: auto;
            li.message {
                font-size: 1.3rem;
                background: white;
                padding: 1rem;
                border-radius: 1rem;
                display: flex;
                flex-direction: row;
                gap: 1rem;
                margin: 1rem;
                align-items: center;
                .send-details {
                    display: flex;
                    justify-content: c;
                    align-items: center;
                    gap: 1rem;
                    .sender {
                        background: lightgray;
                        padding: 0.5rem;
                    }
                }
            }
        }
        form {
            height: 10%;
            display: grid;
            grid-template-columns: 3fr 1fr;
            align-items: center;
            justify-items: center;
            border-top: 2px solid black;
            input[type="text"] {
                height: 80%;
                width: 90%;
                padding: 1rem;
                font-size: 1.5rem;
                border-radius: 1rem;
                border: none;
                &:focus {
                    border: 1px solid black;
                    outline: none;
                }
            }
            button{
                font-size: 1.5rem;
                padding: 1rem;
                border-radius: 1rem;
                outline: none;
                border: 1px solid black;
                cursor: pointer;
            }
        }
    }
    .connect-info {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        text-align: center;
    }
</style>