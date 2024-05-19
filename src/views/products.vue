<template>
        <div class="container mt-3">
        <div class="row">
            <div class="col-12 text-center">
                <div class="alert alert-success" role="alert">
                    <h1 class="mb-0" style="color: green;">Productos</h1>
                </div>
                <button @click="newProduct()" class="btn btn-succes mx-2">
                    <font-awesome-icon icon="plus" />
                </button>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product,index) in products" :key="index">
                            <th scope="row">{{product.id}}</th>
                            <td>{{product.name}}</td>
                            <td>{{product.price}}</td>
                            <td>{{product.stock}}</td>
                            <td>{{product.nameC}}</td>
                            <td>
                                <button @click="deleteProduct(product.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="trash" />
                                </button>
                                <button @click="editProduct(product.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="pencil" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default{
    name: 'Product',
    data(){
        return{
            products: []
        }
    },
    methods: {
        deleteProduct(codigo) {
            Swal.fire({
                title: `Do you want to delete the Product with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below*/
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/products/${codigo}`)
                        .then(response => {
                            if (response.data.success) {
                                // Recargar la página
                                window.location.reload()
                                Swal.fire('Deleted!!', '', 'success')
                                this.products = response.data.products
                            }
                        })
                }
            })
        },
        editProduct(id) {
            this.$router.push({ name: 'EditarProduct', params: { id: `${id}` } });
        },
        newProduct() {
            this.$router.push({ name: 'NewProduct' });
        }
    },
    mounted(){
        axios
        .get("http://127.0.0.1:8000/api/products")
        .then(response => (this.products = response.data.products))
    },
}
</script>