<div class="dragWindowsContainer">
    <slot/>
</div>

<style lang="scss">
    .dragWindowsContainer {
        position: fixed;
        right: 0;
        bottom: 0;
        background: #71797E;
        border-left: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-direction: column;
        height: 100%;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
</style>