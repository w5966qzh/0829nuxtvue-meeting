export default class {
    constructor(){
        this.name = ""
        this.email = ""

        return new Promise(async(resolve)=>{
            const {name, email} = await this.load()
            this.name = name
            this.email = email
            resolve(this)
        })
    }
    load(){
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve({name:"あいみょん", email:"aimyon@fm802.co.jp"})
            }, 2000);             
        })
    }
    async save(){
        await this.register()
    }

    register(){
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve()
            },2000)
        })
    } 
}