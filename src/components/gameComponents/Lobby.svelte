<script lang="ts">
    import type { Socket } from "socket.io-client";
    import type { PlayerSyncPacket } from "src/types/PlayerSyncPacket";
    import { onMount } from "svelte";
    import DisconnectButton from "../DisconnectButton.svelte";
    export let globalSocket: Socket;
    export let apiUrl: string;
    let lobby: Array<PlayerSyncPacket> = new Array<PlayerSyncPacket>();

    async function syncLobby() {
        let query = await fetch(`${apiUrl}/api/lobby`, {
            "headers": {
                "Authorization": globalSocket.id
            }
        });
        lobby = await query.json();
    }

    globalSocket.on("lobby-sync", syncLobby);

    onMount(async ()=>{
        await syncLobby();
    });

    async function getPlayerName(maxLen: number, name: string) {
        if(name.length < maxLen) return name;
        return `${name.slice(0, maxLen-1)}...`;
    }

</script>

<div class="lobby">
    <div class="lobbyInfo">
        {lobby.length} / 5
    </div>
    {#each lobby as player}
        <div class="playerInfo {player.color}-player-bg">
            <div class="details">
                {#await getPlayerName(20, player.name) then name}
                    <div class="username">{name} 
                    <div class="connected-{player.connectionStatus}"></div></div>
                {/await}
            </div>
        </div>
    {/each}
    
    <DisconnectButton globalSocket={globalSocket}/>
</div>

<style lang="scss">
    .lobby {
        .lobbyInfo {
            font-size: 1.5rem;
            padding: 1rem 0 1rem 0;
        }
        height: 100%;
        padding: 1rem;
        .playerInfo {
            border-radius: 1rem;
            display: grid;
            margin: 1rem 0 1rem 0;
            .color {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
            .details {
                font-size: 1.6rem;
                padding: 1rem;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .username {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .connected-true {
                    width: 1rem;
                    height: 1rem;
                    background-color: green;
                    border-radius: 50%;
                    border: 1px solid black;
                }
                .connected-false {
                    width: 1rem;
                    height: 1rem;
                    background-color: red;
                    border-radius: 50%;
                    border: 1px solid black;
                }
            }
            
        }
    }
</style>