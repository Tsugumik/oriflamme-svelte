<script lang="ts">
    import Button from "../Button.svelte";

    let watching: boolean = false;
    let videoId: string;
    async function handleForm() {
        if(!videoId) {
            videoId = "dQw4w9WgXcQ";
        }
        watching = true;
    }
</script>


{#if watching}
    <iframe src="https://www.youtube.com/embed/{videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:else}
    <form on:submit|preventDefault={handleForm}>
        <label for="videoid">Youtube VideoID:</label>
        <input type="text" name="videoid" id="videoid" bind:value={videoId}>
        <Button value="Load"/>
    </form>
{/if}
<style lang="scss">
    iframe {
        height: 100%;
        width: 100%;
    }
    form {
        text-align: center;
        padding: 1.5rem;
        label {
            font-size: 1.5rem;
        }
        input[type="text"] {
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
    }
</style>