<div class="dragWindowsContainer">
    <slot/>
</div>

<style lang="scss">
    .dragWindowsContainer {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 1rem;
        background: gray;
        border: 2px solid black;
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-direction: column;
    }
</style>