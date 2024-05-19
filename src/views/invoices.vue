<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 text-center">
                <div class="alert alert-success" role="alert">
                    <h1 class="mb-0" style="color: green;">Facturas</h1>
                </div>
                <button @click="newInvoice()" class="btn btn-succes mx-2">
                    <font-awesome-icon icon="plus" />
                </button>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">number</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Método de pago</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invoice, index) in invoices" :key="index">
                            <td>{{ invoice.id }}</td>
                            <td>{{ invoice.number }}</td>
                            <td>{{ invoice.customer_name }} {{ invoice.customer_last_name }}</td>
                            <td>{{ invoice.paymode_name }}</td>
                            <td>{{ invoice.date }}</td>
                            <td>
                                <button @click="deleteInvoice(invoice.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="trash" />
                                </button>
                                <button @click="editInvoice(invoice.id)" class="btn btn-succes mx-2">
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
export default {
    name: 'Invoice',
    data() {
        return {
            invoices: []
        }
    },
    methods: {
        deleteInvoice(codigo) {
            Swal.fire({
                title: `Do you want to delete the Invoice with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below*/
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/invoices/${codigo}`)
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
        editInvoice(id) {
            this.$router.push({ name: 'EditarInvoice', params: { id: `${id}` } });
        },
        newInvoice() {
            this.$router.push({ name: 'NewInvoice' });
        }
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/invoices")
            .then(response => (this.invoices = response.data.invoices))
    },
}
</script>