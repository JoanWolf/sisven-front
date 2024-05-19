<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 text-center">
                <div class="alert alert-success" role="alert">
                    <h1 class="mb-0" style="color: green;">Medios de pago</h1>
                </div>
                <button @click="newPaymode()" class="btn btn-succes mx-2">
                    <font-awesome-icon icon="plus" />
                </button>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Observacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(paymode, index) in paymodes" :key="index">
                            <th scope="row">{{ paymode.id }}</th>
                            <td>{{ paymode.name }}</td>
                            <td>{{ paymode.observation }}</td>
                            <td>
                                <button @click="deletePaymode(paymode.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="trash" />
                                </button>
                                <button @click="editPaymode(paymode.id)" class="btn btn-succes mx-2">
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
    name: 'Paymode',
    data() {
        return {
            paymodes: []
        }
    },
    methods: {
        deletePaymode(codigo) {
            Swal.fire({
                title: `Do you want to delete the paymode with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below*/
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/paymodes/${codigo}`)
                        .then(response => {
                            if (response.data.success) {
                                // Recargar la página
                                window.location.reload()
                                Swal.fire('Deleted!!', '', 'success')
                                this.paymodes = response.data.paymodes
                            }
                        })
                }
            })
        },
        editPaymode(id) {
            this.$router.push({ name: 'EditarPaymode', params: { id: `${id}` } });
        },
        newPaymode() {
            this.$router.push({ name: 'NewPaymode' });
        }
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/paymodes")
            .then(response => (this.paymodes = response.data.paymodes))
    },
}
</script>