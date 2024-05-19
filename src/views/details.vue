<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 text-center">
                <div class="alert alert-success" role="alert">
                    <h1 class="mb-0" style="color: green;">Detalles</h1>
                </div>
                <button @click="newDetail()" class="btn btn-succes mx-2">
                    <font-awesome-icon icon="plus" />
                </button>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">invoice</th>
                            <th scope="col">product</th>
                            <th scope="col">quantity</th>
                            <th scope="col">price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(detail, index) in details" :key="index">
                            <td>{{ detail.id }}</td>
                            <td>{{ detail.invoices_number }}</td>
                            <td>{{ detail.products_name }}</td>
                            <td>{{ detail.quantity }}</td>
                            <td>{{ detail.price }}</td>
                            <td>
                                <button @click="deleteDetail(detail.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="trash" />
                                </button>
                                <button @click="editDetail(detail.id)" class="btn btn-succes mx-2">
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
    name: 'Detail',
    data() {
        return {
            details: []
        }
    },
    methods: {
        deleteDetail(codigo) {
            Swal.fire({
                title: `Do you want to delete the Detail with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below*/
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/details/${codigo}`)
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
        editDetail(id) {
            this.$router.push({ name: 'EditarDetail', params: { id: `${id}` } });
        },
        newDetail() {
            this.$router.push({ name: 'NewDetail' });
        }
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/details")
            .then(response => (this.details = response.data.details))
    },
}
</script>