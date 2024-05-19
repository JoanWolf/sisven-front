<template>
        <div class="container">
        <div class="col-12 text-center">
            <div class="alert alert-success" role="alert">
                <h1 class="mb-0" style="color: green;">Editar Factura</h1>
            </div>
        </div>
        <p></p>
        <p></p>
        <form @submit.prevent="updateInvoice">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-4" style="margin-right: 435px;">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Id</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" aria-describedby="codigoHelp" name="id"
                                disabled="disabled" v-model='invoice.id'>
                        </div>
                        <!-- <div id="codigoHelp" class="form-text">Codigo</div> -->
                    </div>
                </div>
            </div>
            <div class="row justify-content-center align-items-center">
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="name" class="form-label">N. factura</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="number" aria-describedby="codigoHelp"
                                name="number" v-model='invoice.number'>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">fecha</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="date" class="form-control" id="date" aria-describedby="codigoHelp" name="date"
                                v-model='invoice.date'>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Consumidor </label>
                        <div class="input-group">
                            <select class="form-select" v-model="invoice.customer_id">
                                <option v-for="custumer in custumers" v-bind:value="custumer.document_number">{{ custumer.first_name
                                    }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Medio de pago </label>
                        <div class="input-group">
                            <select class="form-select" v-model="invoice.pay_mode_id">
                                <option v-for="paymode in paymodes" v-bind:value="paymode.id">{{ paymode.name
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
    name: 'EditarInvoice',
    data() {
        return {
            invoice: {
                id: 0,
                number: 0,
                customer_id: 0,
                date: '',
                pay_mode_id: 0,
            }, custumers: [], paymodes: []
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name:'Invoices'})
        },
        async updateInvoice(){
            const res = await axios.put(`http://127.0.0.1:8000/api/invoices/${this.invoice.id}`, this.invoice)
            if(res.status == 200){
                this.$router.push({name: 'Invoices'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Invoice has been updated',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.invoice.id = this.$route.params.id;
        console.log(`http://127.0.0.1:8000/api/invoices/${this.invoice.id}`)
        axios
            .get(`http://127.0.0.1:8000/api/invoices/${this.invoice.id}`)
            .then(response => {this.invoice = response.data.invoice;this.custumers = response.data.customers;this.paymodes = response.data.paymodes})
    },
}
</script>