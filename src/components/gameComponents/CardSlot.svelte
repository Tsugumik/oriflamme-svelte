<script lang="ts">
    import type { Socket } from "socket.io-client";
    import type { CardId } from "../../entities/CardsUtils";


    export let index: number;
    export let apiUrl: string;
    export let globalSocket: Socket;
    let dragOver: boolean;

    async function handleDrop(event: DragEvent) {
        event.preventDefault();
        let cid: CardId;
        if(event.dataTransfer?.getData("text")) {
            console.log(Number(event.dataTransfer.getData("text")));
            if(!isNaN(Number(event.dataTransfer.getData("text")))) {
                console.log(event.dataTransfer.getData("text"));
                cid = Number(event.dataTransfer.getData("text"));
                console.log(`Card id is ${cid}, dropped on slot id ${index}`);
                await fetch(`${apiUrl}/api/game/table`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json', 'Authorization': globalSocket.id},
                    body: JSON.stringify({id: cid, slotIndex: index})
                });
            }
        }

        dragOver = false;
    }

    async function dragEnter(event: DragEvent) {
        dragOver = true;
    }

    async function dragLeave(event: DragEvent) {
        dragOver = false;
    }
</script>

<div
    class="cardSlot" 
    class:dragOver 
    id="slot{index}" 
    on:dragover={async event=>event.preventDefault()} 
    on:dragenter={dragEnter} 
    on:dragleave={dragLeave} 
    on:drop={handleDrop}
></div>

<style lang="scss">
    .cardSlot {
        height: 400px;
        min-width: 30px;
        border-radius: 1rem;
        &.dragOver {
            background: green;
        }
    }
</style>