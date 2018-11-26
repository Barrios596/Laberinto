const express = require('express')

export default class ServidorWeb {
    constructor (){
        this.app = express()
        this.app.use(express.static('dist/public'))  
    }

    start(){
        return new Promise((resolve,reject) => {
            try{
                this.server = this.app.listen(5000,function(){
                    resolve()
                })
            }
            catch(e){
                reject(e)
            }
        })
    }

    stop(){
        return new Promise((resolve, reject) => {
            try{
                this.server.close(() =>{
                    resolve()
                })
            }
            catch(e){
                reject(e)
            }
        })
    }
}