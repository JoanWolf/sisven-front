<template>
    <div class="container">
    <div class="col-12 text-center">
        <div class="alert alert-success" role="alert">
            <h1 class="mb-0" style="color: green;">Nuevo metodo de pago</h1>
        </div>
    </div>
    <p></p>
    <p></p>
    <form @submit.prevent="savePaymode">

        <div class="row justify-content-center align-items-center">
            <div class="col-md-4" style="margin-right: 435px;">
                <div class="mb-3">
                    <label for="codigo" class="form-label">Id</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="tag"/></div>
                        <input type="text" class="form-control" id="id" aria-describedby="codigoHelp" name="id" disabled="disabled" v-model='paymode.id'>
                    </div>
                    <!-- <div id="codigoHelp" class="form-text">Codigo</div> -->
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="building"/></div>
                        <input type="text" class="form-control" id="name" aria-describedby="codigoHelp" name="name" v-model='paymode.name'>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="mb-3">
                    <label for="codigo" class="form-label">descripcion</label>
                    <div class="input-group">
                        <div class="input-group-text"><font-awesome-icon icon="bank"/></div>
                        <input type="text" class="form-control" id="description" aria-describedby="codigoHelp" name="description" v-model='paymode.observation'>
                    </div>
                </div>
            </div>
        </div>
            <button class="btn btn-primary" type="submit">Save</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
    </form>
</div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'NewPaymode',
    data() {
        return {
            paymode: {
                id: 0,
                name: '',
                observation: ''
            }
        }
    },
    methods:{
        cancelar(){
            this.$router.push({name:'Paymodes'})
        },
        async savePaymode(){
            const res = await axios.post(`http://127.0.0.1:8000/api/paymodes/`, this.paymode)
            if(res.status == 200){
                this.$router.push({name: 'Paymodes'})
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Paymode has been saved',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        // axios
        //     .get(`http://127.0.0.1:8000/api/categories/${this.categorie.id}`)
        //     .then(response => (this.categorie = response.data.categorie))
    },
}
</script>