<script lang="ts">
	let left = -500;
	let top = 0;
	export let windowname: string;
	export let reRenderButton: boolean = false;
	export let iconSrc: string;
	let moving = false;
	let zindex = 10;
	let opacity = 100;
	let visible: boolean = false;
	let rr: boolean = true;

	async function onMouseDown() {
		moving = true;
	}
	
	async function onMouseMove(e: MouseEvent) {
		if (moving) {
			if(top >= 0 && top <= window.innerHeight && left <= 0 && left >= -window.innerWidth - 200) {
				left += e.movementX;
				top += e.movementY;	
			} else if (top < 0) {
				top = 0;
			} else if (top > window.innerHeight) {
				top = window.innerHeight - 100;
			} else if (left > 0) {
				left = -20;
			} else if (left < -window.innerWidth - 200) {
				left = -window.innerWidth + 20;
			}
		}
	}

	async function zindexPlus() {
		zindex++;
	}

	async function zindexMinus() {
		if(zindex>10) {
			zindex--;
		}
	}

	async function opacityPlus() {
		if(opacity<100) {
			opacity+=10;
		}
	}
	
	async function opacityMinus() {
		if(opacity>50) {
			opacity-=10;
		}
	}

	async function onMouseUp() {
		moving = false;
	}

	async function reRender() {
		rr = false;
		setTimeout(async () => {
			rr = true;	
		});
	}
</script>

<button class="show" class:visible on:click={()=>{visible=true}}><img src={iconSrc} alt="{windowname} icon"></button>


	<section style="left: {left}px; top: {top}px; z-index: {zindex}; opacity: {opacity}%;" class="window" class:visible>
		<div class="moveHeader" on:mousedown={onMouseDown}>
			<div class="window-name">{windowname}</div>
			<div class="buttonHolder">
				<button class="hide" class:visible on:click={()=>{visible=false}}>H</button>
				<button class="zindexplus" on:click={zindexPlus}>Z+</button>
				<button class="zindexminus" on:click={zindexMinus}>Z-</button>
				<button class="opacityplus" on:click={opacityPlus}>O+</button>
				<button class="opacityminus" on:click={opacityMinus}>O-</button>
				{#if reRenderButton}
					<button class="rerender" on:click={reRender}>RR</button>
				{/if}
			</div>
		</div>
		{#if rr}
			<div class="slot">
				<slot/>
		</div>
		{/if}
	</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
	.window.visible {
		-webkit-box-shadow: 8px 8px 24px 0px black;
		-moz-box-shadow: 8px 8px 24px 0px black;
		box-shadow: 8px 8px 24px 0px black;
		user-select: none;
		border: solid 2px black;
		position: absolute;
        width: 400px;
        height: 500px;
        background: lightgray;
		display: block;
        .moveHeader {
			border-bottom: 2px solid black;
            cursor: move;
            background: white;
            height: 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .buttonHolder button {
                font-size: 1.5rem;
				background: white;
				border: none;
				padding-right: 1rem;
                cursor: pointer;
				width: min-content;
				border-radius: 1rem;
				font-weight: bold;
            }
			.window-name {
				margin: 1rem;
				font-size: 1.5rem;
			}
        }
		.slot {
			height: 95%;
		}
	}
	.window{
		display: none;
	}
	.show {
		font-size: 1.6rem;
		cursor: pointer;
		visibility: visible;
		background: white;
		border-bottom: none;
		border-left: none;
		border-right: none;
		border-top: 1px solid black;
		height: 50px;
		width: 100%;
		img {
			width: 35px;
			height: 35px;
			object-fit: cover;
		}
	}
	.show.visible {
		display: none;
	}
</style>