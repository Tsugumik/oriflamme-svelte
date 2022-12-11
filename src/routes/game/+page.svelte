<script lang="ts">
    import Button from "../../components/Button.svelte";
    import { io, Socket } from 'socket.io-client';
    import LinkButton from "../../components/LinkButton.svelte";
    import { gameState } from "../../types/gameState";
    import DragWindow from "../../components/DragWindow.svelte";
    import Chat from "../../components/gameComponents/Chat.svelte";
    import DragWindowsContainer from "../../components/dragWindowsContainer.svelte";
    import Lobby from "../../components/gameComponents/Lobby.svelte";
    import type { ErrorPacket } from "src/types/ErrorPacket";
    let gameStatus: gameState = gameState.CONNECT;
    // Form Data
    let webSocketIp: string;
    let webSocketPort: string;
    let playerId: string = "";
    let userName: string;
    // Form Data
    let globalSocket: Socket;
    let error: boolean = false;
    let latestError: ErrorPacket;
    async function connect(event: SubmitEvent) {
        event.preventDefault();
        let webSocketUrl = `ws://${webSocketIp}:${webSocketPort}`;

        globalSocket = io(webSocketUrl);

        globalSocket.on("connect", async ()=>{
            globalSocket.emit("player-create", JSON.stringify({name: userName, id: playerId}));
        });

        globalSocket.on("connection-accept", async msg=>{
            gameStatus = gameState.PLAYING;
            playerId = msg;
        });

        globalSocket.on("disconnect", async ()=>{
            if(gameStatus != gameState.ERROR) {
                gameStatus = gameState.CONNECT;
            }
            globalSocket.close();
        });

        globalSocket.on("error", async msg=>{
            const ERR_PACKET: ErrorPacket = JSON.parse(msg);
            await throwError(ERR_PACKET);
            return;
        });
    }

    

    async function throwError(errorPacket: ErrorPacket) {
        latestError = errorPacket;
        gameStatus = gameState.ERROR;
        error = true;
        globalSocket.close();
    }

</script>

<main>
    {#if gameStatus != gameState.PLAYING}
        <div class="banner STATUS-{gameStatus}" class:error>            
            {#if gameStatus == gameState.ERROR}
                <h2>An unexpected error occurred! ID: {latestError.id}</h2>
                <p>{latestError.msg}</p>
                <LinkButton value="Back" url="/"/>
            {:else if gameStatus == gameState.CONNECT}
            <form on:submit={(e)=>{connect(e)}}>
                <p>
                    <label for="ip">Server IP: </label>
                    <input required type="text" name="ip" id="ip" bind:value={webSocketIp}>
                </p>
                <p>
                    <label for="port">Server port: </label>
                    <input required type="text" name="port" id="port" bind:value={webSocketPort}>
                </p>
                <p>
                    <label for="id">Username: </label>
                    <input required type="text" name="username" id="username" bind:value={userName}>
                </p>
                <p>
                    <label for="id">Player ID: </label>
                    <input type="text" name="id" id="id" bind:value={playerId}>
                </p>
                
                <Button value="Connect"/>
                <LinkButton value="Back" url="/"/>
                
            </form>
            {/if}
        </div>
    {/if}
    <DragWindowsContainer>
        {#if gameStatus == gameState.PLAYING}
            <DragWindow windowname="Chat">
                <Chat globalSocket={globalSocket} gameStatus={gameStatus}/>
            </DragWindow>
            
            <DragWindow windowname="Settings">
                <h1>XDD</h1>
            </DragWindow>

            <DragWindow windowname="Lobby">
                <Lobby gameStatus={gameStatus} globalSocket={globalSocket} />
            </DragWindow>
        {/if}
    </DragWindowsContainer>
</main>

<style lang="scss">
    main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        position: relative;
        .banner {
            background: rgba(255, 255, 255, 0.5);
            padding: 2rem;
            h2, p {
                font-size: 1.6rem;
            }
            form {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 1rem;
                font-size: 1.6rem;
                input {
                    padding: 0.5rem;
                }
                p {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    justify-items: center;
                }
                
            }
        }
        .banner.STATUS-1, .banner.STATUS-2 {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
    
</style>