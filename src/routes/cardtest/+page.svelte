<script lang="ts">
    import Card from "../../components/gameComponents/Card.svelte";
    import Archer from "../../entities/Archer";
    import Knight from "../../entities/Knight";
    import Heir from "../../entities/Heir";
    import Spy from "../../entities/Spy";
    import LinkButton from "../../components/LinkButton.svelte";
    import type IGameEntity from "../../entities/IGameEntity";
    import RoyalDecree from "../../entities/RoyalDecree";
    import Lord from "../../entities/Lord";
    import Impostor from "../../entities/Impostor";
    import Ambush from "../../entities/Ambush";
    import Assasination from "../../entities/Assassination";
    import Conspiracy from "../../entities/Conspiracy";
    import type { playercolortype } from "../../types/playerTypes";
    let playercolor: playercolortype = "red";
    const cards = new Array<IGameEntity>(
        new Knight("UNKNOWN", playercolor),
        new Archer("UNKNOWN", playercolor),
        new Heir("UNKNOWN", playercolor),
        new Spy("UNKNOWN", playercolor),
        new RoyalDecree("UNKNOWN", playercolor),
        new Lord("UNKNOWN", playercolor),
        new Impostor("UNKNOWN", playercolor),
        new Ambush("UNKNOWN", playercolor),
        new Assasination("UNKNOWN", playercolor),
        new Conspiracy("UNKNOWN", playercolor), 
    );
</script>

<main>
    <div class="cards">
        {#each cards as card}
            <Card card={card} playercolor={playercolor} onTable={true} playerId="UNKNOWN"/>
        {/each}
    </div>
    <div class="testSection">
        <LinkButton url="/" value="Back"/>
        <select bind:value={playercolor}>
            <option value="red">Red</option>
            <option value="gray">Gray</option>
            <option value="yellow">Yellow</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
        </select>
    </div>
</main>

<style lang="scss">
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #577590;
        .cards {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
        .testSection {
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            select {
                padding: 0.5rem;
            }
        }
    }
</style>