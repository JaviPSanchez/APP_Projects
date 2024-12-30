export default function Logo({ fillColor }) {
	return (
		<svg
			id="b"
			data-name="Layer 2"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 175.08 196.94"
			width="45"
			height="45"
		>
			<g id="c" data-name="Layer 1" fill={fillColor} stroke="none">
				<path
					d="M124.52,31.49v-7.79h-1.5l.56-1.92L52.63,1.24l-.56,1.92h-1.5v28.33C20.43,45.73,1,76.26,1,109.58c0,47.62,38.82,86.36,86.54,86.36s86.54-38.74,86.54-86.36c0-33.32-19.43-63.85-49.57-78.09h.01Z"
					fill={'#231f20'}
					className="lineas"
				/>
				<polygon
					points="53.57 32.44 53.57 5.68 121.52 25.35 121.52 77.51 53.57 102.99 53.57 32.45 53.57 32.44"
					// // style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 2px;"
					fill={'#fff'}
					className="torre-sup"
				/>
				<polygon
					points="133.34 76.27 133.34 152.5 82.35 167.09 41.74 153.78 41.74 110.61 133.34 76.26 133.34 76.27"
					// // style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 2px;"
					fill={'#fff'}
					className="torre-inf"
				/>
				<path
					d="M4,109.58c0-31.68,18.2-60.77,46.57-74.76v69.29l-10.85,4.07.53,1.4h-1.5v43.22l-27.32-8.95c-4.75-10.46-7.42-22.06-7.42-34.27h-.01Z"
					// style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 2px;"
					fill={'#000'}
					className="rigth-side"
				/>
				<path
					d="M13.24,147.6l63.97,20.96-36.04,10.31c-11.77-7.87-21.41-18.64-27.93-31.28h0Z"
					// style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 2px;"
					fill={'#fff'}
					className="bottom-left"
				/>
				<path
					d="M87.54,192.94c-15.71,0-30.41-4.36-42.98-11.91l117.37-33.59c-13.85,26.98-41.98,45.5-74.39,45.5Z"
					fill={'#fff'}
					className="bottom-rigth"
				/>
				<path
					d="M136.34,151.64v-77.53h-1.5l-.53-1.4-9.8,3.67v-41.56c28.36,13.99,46.57,43.08,46.57,74.76,0,12.2-2.66,23.78-7.4,34.24l-27.34,7.82h0Z"
					fill={'#000'}
					className="left-side"
				/>

				<path
					d="M74.22,48.94l-8.83-.12v-16.38h0c0-2.43,1.98-4.41,4.41-4.41s4.41,1.98,4.41,4.41h0v16.5h.01Z"
					fill={'#131126'}
					className="up-window"
				/>

				<path
					d="M112.69,103.67c0-2.43,1.98-4.41,4.41-4.41s4.42,1.98,4.42,4.41v16.23h-8.83v-16.23h0Z"
					fill={'#131126'}
					className="down-window"
				/>
			</g>
		</svg>
	)
}
