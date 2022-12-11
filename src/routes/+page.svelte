<script lang="ts">
    import LinkButton from "../components/LinkButton.svelte";
    import Logo from "../components/Logo.svelte";
</script>

<main>
    <div class="banner">
        <h1>Welcome to <Logo/></h1>
        <p class="description">Open source implementation of the Oriflamme board game</p>
        <div class="buttonHolder">
            <LinkButton value="Play" url="/game"/>
            <LinkButton value="About" url="/play"/>
            <LinkButton value="Settings" url="/play"/>
            <LinkButton value="Server" url="/play"/>
            <LinkButton value="Cards test" url="/cardtest"/>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        $bg-color: #1D4E89;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $bg-color;
        .banner {
            background: rgba(255, 255, 255, 0.5);
            padding: 2rem;
            h1 {
                font-weight: 400;
            }
            p.description, h1 {
                font-family: sans-serif;
                font-size: 2rem;
                text-align: center;
            }
            p.description {
                border-bottom: 1px solid black;
            }
            .buttonHolder {
                display: flex;
                justify-content: space-around;
                gap: 1rem;
                align-items: center;
                padding-top: 1rem;
                padding-bottom: 1rem;
                flex-wrap: wrap;
            }

        }
    }
    
</style>