<script lang="ts">
    import type { Socket } from "socket.io-client";
    import { CardId, CardsConstructors } from "../entities/CardsUtils";
    import { onMount } from "svelte";
    import type IGameEntity from "../entities/IGameEntity";
    import type { gameState } from "../types/gameState";
    import Card from "./gameComponents/Card.svelte";
    import type { playercolortype } from "src/types/playerTypes";
    import type { TableSyncObject } from "src/types/TableSyncObject";
    export let gameStatus: gameState;
    export let apiUrl: string;
    export let globalSocket: Socket;
    export let playerId: string;
    let playerColor: playercolortype;

    let TABLE: Array<IGameEntity> = new Array<IGameEntity>();
    let HAND: Array<IGameEntity> = new Array<IGameEntity>();

    onMount(async ()=>{
        
        const HAND_REQUEST = await fetch(`${apiUrl}/api/game/hand`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });

        const TABLE_REQUEST = await fetch(`${apiUrl}/api/game/table`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });

        const HAND_DATA: Array<CardId> = await HAND_REQUEST.json();
        const TABLE_DATA: Array<TableSyncObject> = await TABLE_REQUEST.json();

        HAND_DATA.forEach(async cardId=>{
            HAND = [...HAND, new CardsConstructors[cardId](playerId, playerColor)];
        });

        TABLE_DATA.forEach(async card=>{
            TABLE = [...TABLE, new CardsConstructors[card.id](card.ownerId, card.color)];
        });

        const COLOR_REQUEST = await fetch(`${apiUrl}/api/game/color`, {
            headers: {
                "Authorization": globalSocket.id
            }
        });

        const COLOR_DATA = await COLOR_REQUEST.json();

        playerColor = COLOR_DATA.color;

    });

</script>

<div id="game">
    <div id="table">
    {#each TABLE as card}
        <Card card={card} playercolor={card.color} onTable={true} playerId={playerId}/>
    {/each}
    </div>
    <div id="hand">
    {#each HAND as card}
        <Card card={card} playercolor={playerColor} onTable={false} playerId={playerId}/>
    {/each}
    </div>
    
</div>

<style lang="scss">
    #game {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        #table, #hand {
            display: flex;
            align-items: center;
            border: 2px solid gray;
            background: lightgray;
            width: 80%;
            min-height: 430px;
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            flex-direction: row;
            padding: 1rem;

            scrollbar-width: thin;
            scrollbar-color: #90A4AE #CFD8DC;
            &::-webkit-scrollbar {
                width: 11px;
            }
            &::-webkit-scrollbar-track {
                background: #CFD8DC;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #90A4AE;
                border-radius: 6px;
                border: 3px solid #CFD8DC;
            }
        }
        #table {
            justify-content: safe center;
        }
    }
</style>