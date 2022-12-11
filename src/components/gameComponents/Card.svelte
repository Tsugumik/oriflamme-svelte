<script lang="ts">
    import type IGameEntity from "../../entities/IGameEntity";
    import InfoButton from "./InfoButton.svelte";
    import type { playercolortype } from "../../types/playerTypes";
    export let card: IGameEntity;
    export let playercolor: playercolortype = "yellow";
    let visible: boolean = true;
    async function revealCard() {
        visible=!visible;
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" class:visible draggable="true" on:click={revealCard}>
    <div class="card-inner">
      <div class="card-front {playercolor}">
        <img src="./icons/svelte.svg" alt="svelte logo">
      </div>
      <div class="card-back {playercolor}">
        <h2>{card.name} <InfoButton/></h2>
        <div class="img">
            <img src={card.image_url} alt="">
        </div>
        <div class="details">
            <p>{card.details}</p>
        </div>
      </div>
    </div>
  </div>

<style lang="scss">
    .card {
        font-family: 'Merriweather', serif;
        background-color: transparent;
        width: 250px;
        height: 400px;
        perspective: 1000px;
        margin: 1rem;
        cursor: grab;
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .card.visible .card-inner {
        transform: rotateY(180deg);
        .card-back {
            h2, .img, .details {
                opacity: 1;
            }
        }
    }

    .card {
        .card-back {
            h2, .img, .details {
                opacity: 0;
            }
        }
    }

    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .card-front {
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100px;
            pointer-events: none;
        }
    }
    .card-back {
        color: white;
        transform: rotateY(180deg);
        display: grid;
        grid-template-rows: 0.3fr 1.5fr 1fr;
        h2, .img, .details {
            transition: opacity 0.8s ease;
        }
        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: lightgray 1px solid;
        }
        .img {
            padding: 1rem 0 1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 150px;
                width: 150px;
                border: lightgray 2px solid;
                pointer-events: none;
            }
            border-bottom: lightgray 1px solid;
        }
        .details {
            padding: 0 1rem 0 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 1.4rem;
        }
    }
    .card-back, .card-front {
        border-radius: 1rem;
    }
    .card-front, .card-back {
        &.red {
            background: rgb(140,12,23);
            background: linear-gradient(90deg, rgba(140,12,23,1) 21%, rgba(64,32,32,1) 100%);
        }
        &.gray {     
            background: rgb(46,46,38);
            background: linear-gradient(90deg, rgba(46,46,38,1) 21%, rgba(131,131,129,1) 100%);
        }
        &.yellow {
            background: rgb(191,128,65);
            background: linear-gradient(90deg, rgba(191,128,65,1) 21%, rgba(205,167,8,1) 100%);
        }
        &.blue {
            background: rgb(34,75,195);
            background: linear-gradient(0deg, rgba(34,75,195,1) 1%, rgba(26,20,96,1) 100%);
        }
        &.green {
            background: rgb(36,128,39);
            background: linear-gradient(90deg, rgba(36,128,39,1) 21%, rgba(24,45,14,1) 100%);
        }
    }
</style>