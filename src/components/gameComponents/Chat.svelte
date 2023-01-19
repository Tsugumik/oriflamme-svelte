<script lang="ts">
    import type { Socket } from "socket.io-client";
    import type { Message } from "../../types/Message";
    import { gameState } from "../../types/gameState";
    import { onMount } from "svelte";
    
    export let globalSocket: Socket;
    export let gameStatus: gameState;
    export let apiUrl: string;
    export let playerId: string;
    let message: string = "";
    let messages = new Array<Message>();
    
    let audiosrc: string;

    $: messages, setTimeout(async()=>{await scrollToBottom()});

    let ul: HTMLUListElement;
    let chat: HTMLDivElement;
    let audio: HTMLAudioElement;

    async function sendMessage() {
        fetch(`${apiUrl}/api/chat`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'Authorization': globalSocket.id},
            body: JSON.stringify({message: message})
        }).then(async ()=>{
            message = "";
        });
    }

    async function syncChat(firstSync?: boolean) {
        const REQUEST = await fetch(`${apiUrl}/api/chat`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });
        const REQUEST_OBJ = await REQUEST.json();
        messages = REQUEST_OBJ;
        if(messages.length > 0) {
            if(!firstSync && (messages[messages.length - 1].senderid != playerId && messages[messages.length - 1].senderid != "Server")) {
                audiosrc="/sounds/new_message.mp3";
                audio.load();
                setTimeout(async () => {
                    await audio.play();
                }, 150);
            }
        }
    }

    onMount(async ()=>{
        
        globalSocket.on("chat-sync", syncChat);

        globalSocket.on("server_sound", async()=>{
            audiosrc="/sounds/new_server_message.mp3";
            setTimeout(async () => {
                audio.load();
                await audio.play();
            }, 150);
        });

        await syncChat(true);
    });

    async function getPlayerName(maxLen: number, name: string) {
        if(name.length < maxLen) return name;
        return `${name.slice(0, maxLen-1)}...`;
    }

    async function scrollToBottom() {
        if(ul){
            ul.scroll({top: ul.scrollHeight, behavior: 'smooth'});
        }
    }
    
</script>

{#if gameStatus == gameState.PLAYING || gameStatus == gameState.LOBBY}
    <div class="chat" bind:this={chat}>
        <audio src={audiosrc} bind:this={audio}/>
        <ul bind:this={ul}>
            {#each messages as msg}
                <li class="message sender-{msg.senderid}">
                    <div class="send-details">
                        {#await getPlayerName(20, msg.sender) then name}
                        <div class="sender">{name}:</div>
                        {/await}
                    </div>
                    <p class="content">
                        {msg.message}
                    </p>
                </li>
            {/each}
        </ul>
        <form on:submit|preventDefault={sendMessage}>
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
                .content {
                    overflow-wrap: anywhere;
                }
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
            li.message.sender-Server {
                border-bottom: gold 2px solid;
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