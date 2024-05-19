<template>
        <div class="container">
        <div class="col-12 text-center">
            <div class="alert alert-success" role="alert">
                <h1 class="mb-0" style="color: green;">Editar Detalle</h1>
            </div>
        </div>
        <p></p>
        <p></p>
        <form @submit.prevent="updateDetail">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-4" style="margin-right: 435px;">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" aria-describedby="codigoHelp" name="id"
                                disabled="disabled" v-model='detail.id'>
                        </div>
                        <!-- <div id="codigoHelp" class="form-text">Codigo</div> -->
                    </div>
                </div>
            </div>
            <div class="row justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="name" class="form-label">cantidad</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="number" aria-describedby="codigoHelp"
                                name="number" v-model='detail.quantity'>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">precio</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="number" class="form-control" id="date" aria-describedby="codigoHelp" name="date"
                                v-model='detail.price'>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Factura </label>
                        <div class="input-group">
                            <select class="form-select" v-model="detail.invoice_id">
                                <option v-for="invoice in invoices" v-bind:value="invoice.id">{{ invoice.number
                                    }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">producto </label>
                        <div class="input-group">
                            <select class="form-select" v-model="detail.product_id">
                                <option v-for="product in products" v-bind:value="product.id">{{ product.name
                                    }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
                <button class="btn btn-primary" type="submit">Actualizar</button>
                <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'EditarDetail',
    data() {
        return {
            detail: {
                id: 0,
                number: 0,
                invoice_id: 0,
                product_id: '',
                quantity: 0,
                price: 0,
            },  invoices: [], products: []
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name:'Details'})
        },
        async updateDetail(){
            const res = await axios.put(`http://127.0.0.1:8000/api/details/${this.detail.id}`, this.detail)
            if(res.status == 200){
                this.$router.push({name: 'Details'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Detail has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.detail.id = this.$route.params.id;
        console.log(`http://127.0.0.1:8000/api/details/${this.detail.id}`)
        axios
            .get(`http://127.0.0.1:8000/api/details/${this.detail.id}`)
            .then(response => {this.detail = response.data.detail;this.products = response.data.products;this.invoices = response.data.invoices})
    },
}
</script>