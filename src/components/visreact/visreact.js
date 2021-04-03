import React from 'react';
import Graph from 'vis-react';
import './style.css'

export default class VisReact extends React.Component {

	constructor(props) {
		super(props);

		this.refGrafo = React.createRef()

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
							scale: 0.8,
							animation: true
						})
					this.setState({ graphIsUpdated: false })
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
				width: "100%", height: "300px"
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
		if (prevProps.jsonArtista.grafo.listaDeNos[0].id !== this.props.jsonArtista.grafo.listaDeNos[0].id) {
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
		this.refGrafo.scrollIntoView({ behavior: "smooth" })
	}

	getNosJson() {
		let nos = []
		let numNos = this.props.jsonArtista.grafo.listaDeNos.length
		for (let i = 0; i < numNos; i++) {
			nos.push({
				id: this.props.jsonArtista.grafo.listaDeNos[i].id,
				label: this.props.jsonArtista.grafo.listaDeNos[i].nome,
				color: this.getCorByNivel(this.props.jsonArtista.grafo.listaDeNos[i].nivel),
				font: { color: this.getCorTextoByNivel(this.props.jsonArtista.grafo.listaDeNos[i].nivel) },
				shadow: { color: "#151517" },
				shape: "box", // circularImage / box
				image: this.props.jsonArtista.grafo.listaDeNos[i].urlImagem
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
		let numArestas = this.props.jsonArtista.grafo.listaDeArestas.length
		for (let i = 0; i < numArestas; i++) {
			arestas.push({
				from: this.props.jsonArtista.grafo.listaDeArestas[i].de,
				to: this.props.jsonArtista.grafo.listaDeArestas[i].para,
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
			<div className='graph' ref={(ref) => this.refGrafo = ref}>
				<Graph
					graph={this.state.graph}
					options={this.state.options}
					events={this.events}
					style={this.state.style}
					getNetwork={this.getNetwork}
					vis={vis => (this.vis = vis)}
				/>
			</div>
		);
	}
}
