<script lang="ts">
    export let value: string;
</script>

<button>{value}</button>

<style lang="scss">
    button {
        font-size: 1.5rem;
        min-width: 10rem;
        text-align: center;
        padding: 0.5rem 1rem 0.5rem 1rem;
        cursor: pointer;
        color: black;
        text-decoration: none;
        background: lightgray;
        border: black 1px solid;
        transition: background 0.5s ease;
        cursor: pointer;border-radius: 0.5rem;
        font-family: 'Merriweather', serif;
        &:hover {
            background: gray;
        }
    }
</style>