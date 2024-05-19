<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12 text-center">
                <div class="alert alert-success" role="alert">
                    <h1 class="mb-0" style="color: green;">Categorias</h1>
                </div>
                <button @click="newCategorie()" class="btn btn-succes mx-2">
                    <font-awesome-icon icon="plus" />
                </button>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(categorie, index) in categories" :key="index">
                            <th scope="row">{{ categorie.id }}</th>
                            <td>{{ categorie.name }}</td>
                            <td>{{ categorie.description }}</td>
                            <td>
                                <button @click="deleteCategorie(categorie.id)" class="btn btn-succes mx-2">
                                    <font-awesome-icon icon="trash" />
                                </button>
                                <button @click="editCategorie(categorie.id)" class="btn btn-succes mx-2">
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
    name: 'Categorie',
    data() {
        return {
            categories: []
        }
    },
    methods: {
        deleteCategorie(codigo) {
            Swal.fire({
                title: `Do you want to delete the Categoria with id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: `Delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below*/
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/categories/${codigo}`)
                        .then(response => {
                            if (response.data.success) {
                                // Recargar la página
                                window.location.reload()
                                Swal.fire('Deleted!!', '', 'success')
                                this.categories = response.data.categories
                            }
                        })
                }
            })
        },
        editCategorie(id) {
            this.$router.push({ name: 'EditarCategorie', params: { id: `${id}` } });
        },
        newCategorie() {
            this.$router.push({ name: 'NewCategorie' });
        }
    },
    mounted() {
        axios
            .get("http://127.0.0.1:8000/api/categories")
            .then(response => (this.categories = response.data.categories))
    },
}
</script>