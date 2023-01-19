<script lang="ts">
    import type { Socket } from "socket.io-client";
    export let globalSocket: Socket;
</script>

<button on:click={async ()=>{globalSocket.disconnect()}}>Disconnect</button>

<style lang="scss">
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
}
</style>