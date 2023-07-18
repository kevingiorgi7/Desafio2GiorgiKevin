const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const infoProducts = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(infoProducts)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProducts(objProducts) {
        try {
            const productsPrev = await this.getProducts()
            let id
            if (!productsPrev.length) {
                id = 1
            } else {
                id = productsPrev[productsPrev.length - 1].id + 1
            }
            productsPrev.push({
                ...objProducts,
                id
            })
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            return console.log(`El producto: "${objProducts.title}", fue agregado exitosamente con el ID "${id}"`);
        } catch (error) {
            return error
        }
    }

    async getProductsById(idFind) {
        try {
            const productsPrev = await this.getProducts()
            const idExist = productsPrev.find(e => e.id === idFind)
            if (!idExist) {
                return console.log(`ERROR: El ID "${idFind}" no fue encontrado`);
            }
            return console.log(`El ID buscado por el usuario es del producto: `, idExist);
        } catch (error) {
            return error
        }
    }

    async updateProduct(idUpdate, objUpdate) {
        try {
            const productsPrev = await this.getProducts()
            const productIndex = productsPrev.findIndex(e=>e.id === idUpdate)
            if(productIndex === -1) {
                return console.log(`ERROR en la Actualizacion: El ID "${idUpdate}" no fue encontrado`);
            }
            const product = productsPrev[productIndex]
            const productUpdate = {...product,...objUpdate}
            productsPrev[productIndex] = productUpdate
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            return console.log(`El ID "${idUpdate}" fue actualizado`);
        } catch (error) {
            return error
        }
    }

    async deleteProduct(idDelete) {
        try {
            const productsPrev = await this.getProducts()
            const newArrayProducts = productsPrev.filter(e => e.id !== idDelete)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            return console.log(`El ID "${idDelete}" fue eliminado`);
        } catch (error) {
            return error
        }
    }
}

const product1 = {
    title: 'Sensor',
    description: 'Sensor de estacionamiento trasero marca toyota',
    price: 50000,
    thumbnail: './media/fotosensor',
    code: '113355',
    stock: 20,
}
const product2 = {
    title: 'Barra',
    description: 'Barra anti vuelco marca toyota',
    price: 90000,
    thumbnail: './media/fotobarra',
    code: '779911',
    stock: 7,
}
const product3 = {
    title: 'Cobertor',
    description: 'Cobertor caja marca toyota',
    price: 30000,
    thumbnail: './media/fotocobertor',
    code: '779911',
    stock: 9,
}

const objUpdate = {
    price: 70000,
    stock: 10
}

async function prueba() {
    const manager = new ProductManager('Usuarios.json')
    //await manager.addProducts(product1)
    //await manager.addProducts(product2)
    //await manager.addProducts(product3)
    //await manager.getProductsById(1)
    //await manager.getProductsById(20)
    //await manager.deleteProduct(2)
    //await manager.updateProduct(1,objUpdate)

    //const products = await manager.getProducts()
    //console.log(products);
}
prueba()