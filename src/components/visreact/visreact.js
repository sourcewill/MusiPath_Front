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
			},

			hoverNode: function () {
				document.getElementsByTagName('canvas')[0].style.cursor = 'pointer'
			},

			blurNode: function () {
				document.getElementsByTagName('canvas')[0].style.cursor = 'default'
			},

			stabilized: function () {
				if (this.state.graphIsUpdated) {
					this.state.network.focus(
						this.state.network.body.nodeIndices[0],
						{
							scale: 1.0,
							animation: true
						})
					this.setState({graphIsUpdated: false})
				}
			}

		}

		this.state = {

			graphIsUpdated: true,

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
					hover: true,
					zoomView: false,
					dragView: true
				}
			}

		}

		this.events.click = this.events.click.bind(this);
		this.events.stabilized = this.events.stabilized.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.jsonGrafo.listaDeNos[0].id !== this.props.jsonGrafo.listaDeNos[0].id) {
			this.updateGraph()
		}
	}

	updateGraph() {
		this.state.network.setData({
			nodes: this.getNosJson(),
			edges: this.getArestasJson()
		})
		this.setState(
			{
				graphIsUpdated: true
			}
		)
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
			case 0:
				return 'white'
			case 1:
				return '#0EBDE8'
			default:
				return '#09718A'
		}
	}

	getCorTextoByNivel(nivel) {

		switch (nivel) {
			case 0:
				return '#09718A'
			case 1:
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
