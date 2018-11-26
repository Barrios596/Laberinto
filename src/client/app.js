import React from 'react'
import "./app.css"

const initState = () => {
    return {
        texto: [],
        jugador: [1,1],
        laberinto: [],
        alto: 10,
        ancho: 10
    }
}

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = initState();
        this.generarLaberinto();
        console.log("ya")
        this.teclaPres = this.teclaPres.bind(this)
        this.generarLaberinto = this.generarLaberinto.bind(this)
    }

    teclaPres(event){
        
        if(event.keyCode == 37){
            console.log("pressed left")
            var arreglo = this.state.laberinto
            switch(arreglo[this.state.jugador[0]][this.state.jugador[1]-1]){
                case (' '):
                arreglo[this.state.jugador[0]][this.state.jugador[1]] = ' '
                arreglo[this.state.jugador[0]][this.state.jugador[1]-1] = 'p'
                this.setState({
                    arreglo: arreglo,
                    jugador: [this.state.jugador[0],this.state.jugador[1]-1]
                })
                this.recalcTexto()
                break;
                case('g'):
                this.victoria()
                break;
            }
            
        }
        else if(event.keyCode == 38){  
            console.log("pressed up")
            var arreglo = this.state.laberinto
            switch(arreglo[this.state.jugador[0]-1][this.state.jugador[1]]){
                case (' '):
                arreglo[this.state.jugador[0]][this.state.jugador[1]] = ' '
                arreglo[this.state.jugador[0]-1][this.state.jugador[1]] = 'p'
                this.setState({
                    arreglo: arreglo,
                    jugador: [this.state.jugador[0]-1,this.state.jugador[1]]
                })
                this.recalcTexto()
                break;
                case('g'):
                this.victoria()
                break;
            }
        }
        else if(event.keyCode == 39){
            console.log("pressed right")
            var arreglo = this.state.laberinto
            switch(arreglo[this.state.jugador[0]][this.state.jugador[1]+1]){
                case (' '):
                arreglo[this.state.jugador[0]][this.state.jugador[1]] = ' '
                arreglo[this.state.jugador[0]][this.state.jugador[1]+1] = 'p'
                this.setState({
                    arreglo: arreglo,
                    jugador: [this.state.jugador[0],this.state.jugador[1]+1]
                })
                this.recalcTexto()
                break;
                case('g'):
                this.victoria()
                break;
            }
        }
        else if(event.keyCode == 40){
            console.log("pressed down")
            var arreglo = this.state.laberinto
            switch(arreglo[this.state.jugador[0]+1][this.state.jugador[1]]){
                case (' '):
                arreglo[this.state.jugador[0]][this.state.jugador[1]] = ' '
                arreglo[this.state.jugador[0]+1][this.state.jugador[1]] = 'p'
                this.setState({
                    arreglo: arreglo,
                    jugador: [this.state.jugador[0]+1,this.state.jugador[1]]
                })
                this.recalcTexto()
                break;
                case('g'):
                this.victoria()
                break;
            }
        }
    }

    recalcTexto(){
        var text = ""
        for(var i = 0; i < this.state.laberinto.length;i++){
            for (var j = 0; j < this.state.laberinto[i].length; j++){
                text = text + this.state.laberinto[i][j]
            }
        }
        this.setState({
            texto: text
        })
    }

    victoria(){
        alert("Ganaste!")
    }

    componentDidMount(){
        document.addEventListener("keydown", this.teclaPres, false)
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.teclaPres, false)
    }

    render() {
        return (
        <div>
            <div>
                <input id="height" placeholder="alto" alto={this.state.alto} onChange={this.cambiarAlto.bind(this)}></input>
                <input id="width" placeholder="ancho" ancho={this.state.ancho} onChange={this.cambiarAncho.bind(this)}></input>
                <button onClick={this.generarLaberinto}>Generar laberinto</button>
            </div>
            <pre style={{wordWrap: "break-word", whiteSpace: "pre-wrap"}}>
                {this.state.texto}
            </pre>
        </div>
        )
    }
    
    cambiarAncho(event){
        this.setState({ancho: event.target.value})
        console.log(this.state.ancho)
    }

    cambiarAlto(event){
        this.setState({alto: event.target.value})
        console.log(this.state.alto)
    }

    generarLaberinto() {
        this.setState({jugador:[1,1]})
        console.log("before fetch")
        fetch(`http://34.210.35.174:3001/?w=${this.state.ancho}&h=${this.state.alto}`)
            .then(response => {
                //console.log(response)
                return response.text();
            })
            .then(maze => {
                console.log(maze)
                var resultado = []
                var contador = 0
                for(var i = 0; i<(2*this.state.alto + 1); i++){
                    var fila = []
                    for (var j = 0; j < (3*this.state.ancho +2); j++){
                        if(maze.charAt(contador) == 'p'){
                            console.log("i: "+i+"j:"+j)
                        }
                        fila.push(maze.charAt(contador))
                        contador++
                    }
                    resultado.push(fila)
                }
                console.log(resultado[1][1])
                this.setState({
                    texto: maze,
                    laberinto: resultado
                })
            })
    }
}
