import { html, useEffect, useState } from 'https://cdn.skypack.dev/haunted';
export default ScrollGame;

function ScrollGame() {
	const [facing, setFacing] = useState('right');
	const [moving, setMoving] = useState('no');
	useEffect(() => {
		const type = 'keydown';
		const listener = ({ key }) => {
			console.debug('👇', key);
			const left = ['a', 'ArrowLeft'];
			const right = ['d', 'ArrowRight'];
			if (left.includes(key)) {
				setMoving('left');
				setFacing('left');
				console.debug('👈', key);
			} else if (right.includes(key)) {
				setMoving('right');
				setFacing('right');
				console.debug('👉', key);
			}
		};
		window.addEventListener(type, listener);

		return () => {
			window.removeEventListener(type, listener);
		};
	}, []);
	useEffect(() => {
		const type = 'keyup';
		const listener = ({ key }) => {
			console.debug('👆', key);
			const left = ['a', 'ArrowLeft'];
			const right = ['d', 'ArrowRight'];
			if (left.includes(key) || right.includes(key)) {
				setMoving('no');
				console.debug('🤚', key);
			}
		};
		window.addEventListener(type, listener);

		return () => {
			window.removeEventListener(type, listener);
		};
	}, []);

	return html`<style>
			main {
				height: 100%;
				background-image: linear-gradient(
					to bottom,
					White,
					SkyBlue,
					DarkOliveGreen,
					ForestGreen,
					SandyBrown,
					Tan,
					LightSeaGreen,
					Navy
				);
				display: flex;
				position: relative;
			}
			#player {
				left: 50%;
				position: absolute;
				top: 50%;
				transform: translate(-5vh, -5vh);
			}
			#player img {
				max-height: 10vh;
				max-width: 10vh;
			}
			.flipped {
				transform: scaleX(-1);
			}
			aside {
				position: fixed;
				bottom: 0;
			}w
		</style>
		<main>
			<div id="player">
				<img
					class="${facing !== 'right' ? 'flipped' : ''}"
					src="https://robohash.org/duder.png?set=set3"
				/>
			</div>
		</main>
		<aside>moving: ${moving}</aside>`;
}
