import ServidorWeb from './servidor.web'

let servidor = new ServidorWeb()
servidor.start()
    .then(() => {
        console.log('Server corriendo en el puerto 5000')
    })
    .catch(e => {
        console.error('No fue posible correr el server.')
        console.error(`Descripción del error: ${e}`)
    })