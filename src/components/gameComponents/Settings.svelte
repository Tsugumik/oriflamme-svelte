<script lang="ts">
    import type { Socket } from "socket.io-client";
    import { gameState } from "../../types/gameState";
    import type { PlayerPermissionPacket } from "../../types/PlayerPermissionPacket";
    import { onMount } from "svelte";
    import Button from "../Button.svelte";
    let permissionLevel: number = 0;
    export let globalSocket: Socket;
    export let apiUrl: string;
    export let gameStatus: gameState;
    let adminKey: string;
    let statusMessage: string = "";

    let gameInitButton: HTMLButtonElement;

    async function syncPermission() {
        const REQUEST = await fetch(`${apiUrl}/api/admin/permission`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });

        const PERMISSION_PACKET: PlayerPermissionPacket = await REQUEST.json();

        permissionLevel = PERMISSION_PACKET.status;
    }

    onMount(async()=>{
        await syncPermission();
        if(gameStatus != gameState.LOBBY) {
            if(gameInitButton) gameInitButton.disabled = true;
        }
    });

    globalSocket.on("permission_sync", async ()=>{
        await syncPermission();
    });

    async function grantAdmin() {
        const REQUEST = await fetch(`${apiUrl}/api/admin/permission`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": globalSocket.id
            },
            body: JSON.stringify({admin_key: adminKey})
        });
        
        if(!REQUEST.ok) {
            statusMessage = REQUEST.statusText;
        }

        adminKey = "";
    }
    
    async function clearChat() {
        await fetch(`${apiUrl}/api/settings/chat/clear`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });
    }

    async function initGame() {
        
        await fetch(`${apiUrl}/api/settings/game/init`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });



    }

    $: if((gameStatus != gameState.LOBBY && permissionLevel) && gameInitButton) {
        gameInitButton.disabled = true;
    }

</script>


{#if permissionLevel == 0}
    <form on:submit|preventDefault={grantAdmin} method="post">
        <label for="adminkey">Enter admin key to continue</label>
        <input required type="password" name="adminkey" id="adminkey" bind:value={adminKey}>
        <Button value="Login" />
        <p>{statusMessage}</p>
    </form>
{/if}

{#if permissionLevel == 1}
    <section>
        <h2>Admin tools</h2>
        <ul>
            <li>
                <button on:click={clearChat}>Clear chat</button>
            </li>
        </ul>
    </section>
    <section>
        <h2>Game tools</h2>
        <ul>
            <li>
                <button on:click={initGame} bind:this={gameInitButton}>Init game</button>
            </li>
        </ul>
    </section>
    
{/if}


<style lang="scss">
    section {
        &:not(:first-child) {
            border-top: 2px solid black;
        }
    }
    form {
        text-align: center;
        padding: 1.5rem;
        label {
            font-size: 1.5rem;
        }
        input[type="password"] {
            height: 80%;
            width: 90%;
            padding: 1rem;
            font-size: 1.5rem;
            border-radius: 1rem;
            border: 1px dashed black;
            margin: 1rem 0 1rem 0;
            &:focus {
                border: 1px solid black;
                outline: none;
            }
        }

        p {
            font-size: 1.5rem;
            padding: 1rem;
        }
    }
    h2 {
        text-align: center;
        padding: 1rem;
        font-size: 2rem;
        border-bottom: 2px solid black;
        
    }
    ul {
        list-style: none;
        padding: 1rem;
        display: flex;
        justify-content: center;
        li {
            button {
                font-size: 1.5rem;
                min-width: 10rem;
                text-align: center;
                padding: 0.5rem 1rem 0.5rem 1rem;
                cursor: pointer;
                color: black;
                text-decoration: none;
                background: #DDDDDD;
                border: #555555 2px solid;
                transition: background 0.5s ease;
                cursor: pointer;border-radius: 0.5rem;
                font-family: 'Merriweather', serif;
                &:hover {
                    background: #8C8C8C;
                }

                &:disabled {
                    background: green;
                    cursor: not-allowed;
                }
            }
        }
    }
    
</style>