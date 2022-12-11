<script lang="ts">
	export let left = -500;
	export let top = -500;
	export let windowname: string;
	let moving = false;
	let zindex = 10;
	let visible: boolean = false;
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
</script>

<button class="show" class:visible on:click={()=>{visible=true}}>{windowname}</button>

<section style="left: {left}px; top: {top}px; z-index: {zindex};" class="window" class:visible>
	<div class="moveHeader" on:mousedown={onMouseDown}>
		<div class="window-name">{windowname}</div>
		<button class="hide" class:visible on:click={()=>{visible=false}}>&#128469;&#xFE0E;</button>
	</div>
	<div class="slot">
		<slot/>
	</div>
</section>






<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
	.window.visible {
		-webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
		-moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
		box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
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
            .hide {
                font-size: 1.5rem;
				background: white;
				border: none;
				padding-right: 1rem;
                cursor: pointer;
				width: min-content;
				border-radius: 1rem;
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
		margin: 1rem;
		padding: 0.5rem;
		cursor: pointer;
		visibility: visible;
	}
	.show.visible {
		visibility: hidden;
	}
</style>