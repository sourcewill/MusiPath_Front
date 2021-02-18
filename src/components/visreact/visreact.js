import React from 'react';
import Graph from 'vis-react';
import './style.css'

export default class VisReact extends React.Component {

	constructor(props) {
		super(props);

		this.events = {

			click: function (event) {
				if (event.nodes[0] !== undefined) {
					this.props.onClickArtist(event.nodes[0])
				}
				/*this.state.network.focus(
					event.nodes[0],
					{
						scale: 0.8,
						animation: true
					})*/
			}

		}

		this.state = {

			graph: {
				nodes: this.getNosJson(),
				edges: this.getArestasJson()
			},

			style: {
				width: "100%", height: "400px"
			},

			options: {
				edges: {
					color: 'white',
					smooth: {
						type: "continuous",
					}
				},
				nodes: {
					shape: "box",
					color: "#007BFF",
					size: 20,
					borderWidth: 1,
					shadow: true,
					font: {
						size: 16,
						align: "center",
						color: "white",
					}
				},
				interaction: {
					hoverEdges: true,
					zoomView: false,
					dragView: false
				}
			}

		}

		this.events.click = this.events.click.bind(this);
	}

	getNosJson() {
		let nos = []
		let numNos = this.props.jsonGrafo.listaDeNos.length
		for (let i = 0; i < numNos; i++) {
			nos.push({
				id: this.props.jsonGrafo.listaDeNos[i].id,
				label: this.props.jsonGrafo.listaDeNos[i].nome,
				color: this.getCorByNivel(this.props.jsonGrafo.listaDeNos[i].nivel),
				font: { color: this.getCorTextoByNivel(this.props.jsonGrafo.listaDeNos[i].nivel) },
				shadow: { color: "#151517" },
				shape: "box", // circularImage / box
				image: this.props.jsonGrafo.listaDeNos[i].urlImagem
			})
		}
		return nos

	}

	getCorByNivel(nivel) {

		switch (nivel) {
			case 1:
				return 'white'
			case 2:
				return '#0EBDE8'
			default:
				return '#09718A'
		}
	}

	getCorTextoByNivel(nivel) {

		switch (nivel) {
			case 1:
				return '#09718A'
			case 2:
				return 'white'
			default:
				return 'white'
		}
	}

	getArestasJson() {
		let arestas = []
		let numArestas = this.props.jsonGrafo.listaDeArestas.length
		for (let i = 0; i < numArestas; i++) {
			arestas.push({
				from: this.props.jsonGrafo.listaDeArestas[i].de,
				to: this.props.jsonGrafo.listaDeArestas[i].para,
				arrows: ""
			})
		}
		return arestas
	}

	getNetwork = data => {
		this.setState({ network: data });
	};

	render() {
		return (
			<>

				<div className="vertical--bottom">
					<Graph
						graph={this.state.graph}
						options={this.state.options}
						events={this.events}
						style={this.state.style}
						getNetwork={this.getNetwork}
						vis={vis => (this.vis = vis)}
					/>
				</div>

			</>
		);
	}
}
