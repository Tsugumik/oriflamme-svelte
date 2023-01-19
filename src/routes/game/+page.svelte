<script lang="ts">
    import Button from "../../components/Button.svelte";
    import { io, Socket } from 'socket.io-client';
    import LinkButton from "../../components/LinkButton.svelte";
    import { gameState } from "../../types/gameState";
    import DragWindow from "../../components/DragWindow.svelte";
    import Chat from "../../components/gameComponents/Chat.svelte";
    import DragWindowsContainer from "../../components/dragWindowsContainer.svelte";
    import Lobby from "../../components/gameComponents/Lobby.svelte";
    import type { ErrorPacket } from "../../types/ErrorPacket";
    import Settings from "../../components/gameComponents/Settings.svelte";
    import { onMount, onDestroy } from "svelte";
    import Game from "../../components/Game.svelte";
    let gameStatus: gameState = gameState.CONNECT;

    // Form Data +
    let webSocketIp: string;
    let webSocketPort: string;
    let playerId: string = "";
    let connectionId: string = "";
    let userName: string;
    let connectionType: "secure" | "unsecure" = "unsecure";
    let apiProtocol: "http://" | "https://";
    let reconnect: boolean = false;
    $: connectionType, toggleConnectionType();

    // Urls
    let apiUrl: string;

    async function toggleConnectionType() {
        if(connectionType) {
            if(connectionType == "secure") {
                apiProtocol = "https://";
            } else if(connectionType == "unsecure") {
                apiProtocol = "http://";
            } else {
                apiProtocol = "http://";        
            }
        }
    }

    // Form Data -
    let globalSocket: Socket;
    let error: boolean = false;
    let latestError: ErrorPacket;
    
    async function connect() {
        gameStatus = gameState.CONNECTING;
        apiUrl = `${apiProtocol}${webSocketIp}:${webSocketPort}`

        globalSocket = io(apiUrl);

        globalSocket.on("connect", async ()=>{
            if(reconnect) {
                globalSocket.emit("player-create", JSON.stringify({name: userName, id: connectionId}));
            } else {
                globalSocket.emit("player-create", JSON.stringify({name: userName, id: ""}));
            }
        });

        globalSocket.on("connection-accept", async msg=>{
            
            const REQUEST = await fetch(`${apiUrl}/api/game/state`, {
                headers: {
                    "Authorization": globalSocket.id
                }
            });

            const REQUEST_OBJ = await REQUEST.json();

            if(REQUEST_OBJ) {
                if(REQUEST_OBJ.state == 0) {
                    gameStatus = gameState.LOBBY;
                } else if(REQUEST_OBJ.state == 1) {
                    gameStatus = gameState.PLAYING;
                } else {
                    gameStatus = gameState.LOBBY;
                }
            } else {
                gameStatus = gameState.LOBBY;
            }
            
            const MSG_OBJ = await JSON.parse(msg);

            playerId = MSG_OBJ.playerId;
            connectionId = MSG_OBJ.connectionId;

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

        globalSocket.on("connect_error", async ()=>{
            gameStatus = gameState.CONNECTIONERROR;
            globalSocket.disconnect();
        });

        globalSocket.on("game_init", async()=>{
            gameStatus = gameState.PLAYING;
        });
    }

    onMount(async()=>{
        if(globalSocket) {
            if(globalSocket.connected) {
                globalSocket.close();
            }
        }
        let url: URL = new URL(window.location.href);
        webSocketIp = url.hostname;
    });
    

    async function throwError(errorPacket: ErrorPacket) {
        latestError = errorPacket;
        gameStatus = gameState.ERROR;
        error = true;
        globalSocket.close();
    }

    onDestroy(async ()=>{
        if(globalSocket) {
            globalSocket.close();
        }
    });

</script>

<main>
    {#if gameStatus != gameState.PLAYING && gameStatus != gameState.LOBBY}
        <div class="banner STATUS-{gameStatus}" class:error>            
            {#if gameStatus == gameState.ERROR}
                <h2>An unexpected error occurred! ID: {latestError.id}</h2>
                <p>{latestError.msg}</p>
                <LinkButton value="Back" url="/"/>
            {:else if gameStatus == gameState.CONNECT}
            <form on:submit|preventDefault={connect}>
                <p>
                    <label for="ip">Server: </label>
                    <input required type="text" name="ip" id="ip" bind:value={webSocketIp}>
                </p>
                <p>
                    <label for="port">Port: </label>
                    <input required type="text" name="port" id="port" bind:value={webSocketPort}>
                </p>
                <p>
                    <label for="username">Username: </label>
                    <input required type="text" name="username" id="username" bind:value={userName}>
                </p>
                <p>
                    <label for="ssl">Connection type</label>
                    <select name="ssl" id="ssl" required bind:value={connectionType}>
                        <option value="unsecure" selected>Unsecure</option>
                        <option value="secure">Secure</option>
                    </select>
                </p>
                <p>
                    <label for="reconnect">Reconnect</label>
                    <input type="checkbox" name="reconnect" id="reconnect" bind:checked={reconnect}>
                </p>
                <p>
                    <label for="id">Connection ID: </label>
                    <input type="text" name="id" id="id" bind:value={connectionId} required disabled={reconnect == false}>
                </p>
                
                <Button value="Connect"/>
                <LinkButton value="Back" url="/"/>
                
            </form>
            {:else if gameStatus == gameState.CONNECTING}
            <h2>Connecting to the server...</h2>
            {:else if gameStatus == gameState.CONNECTIONERROR}
            <h2>Connection refused</h2>
            <LinkButton value="Back" url="/"/>
            {/if}
        </div>
    {/if}
    {#if gameStatus == gameState.PLAYING}
    <Game apiUrl={apiUrl} globalSocket={globalSocket} gameStatus={gameStatus} playerId={playerId}/>
    {/if}
    {#if gameStatus == gameState.PLAYING || gameStatus == gameState.LOBBY}
    <DragWindowsContainer>
        
            <DragWindow windowname="Chat">
                <Chat globalSocket={globalSocket} gameStatus={gameStatus} apiUrl={apiUrl} playerId={playerId}/>
            </DragWindow>
            
            <DragWindow windowname="Settings">
                <Settings globalSocket={globalSocket} gameStatus={gameStatus} apiUrl={apiUrl}/>
            </DragWindow>

            <DragWindow windowname="Lobby">
                <Lobby globalSocket={globalSocket} apiUrl={apiUrl}/>
            </DragWindow>
    </DragWindowsContainer>
    {/if}
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
                select {
                    padding: 0.5rem;
                    width: 100%;
                }
                select, input[type="checkbox"] {
                    cursor: pointer;
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

        .banner.STATUS-5 {
            p {
                margin: 1rem 0 1rem 0;
            }
        }
    }
    
</style>