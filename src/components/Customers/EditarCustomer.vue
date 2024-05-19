<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Customer
      </div>
      <div class="card-body">
        <form @submit.prevent="updateCustomer">
          <div class="row mb-3">
            <label for="id" class="form-label">Id</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
              <input type="text" class="form-control" id="id" name="id" placeholder="Id customer" disabled v-model='customer.id'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="document_number" class="form-label">Cedula</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="id-card" /></div>
              <input type="text" class="form-control" id="document_number" name="document_number" placeholder="Cedula" v-model='customer.document_number'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="first_name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Nombre" v-model='customer.first_name'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="last_name" class="form-label">Apellido</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Apellido" v-model='customer.last_name'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="map-marker-alt" /></div>
              <input type="text" class="form-control" id="address" name="address" placeholder="Dirección" v-model='customer.address'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="birthday" class="form-label">F/Nacimiento</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="calendar-alt" /></div>
              <input type="date" class="form-control" id="birthday" name="birthday" v-model='customer.birthday'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone_number" class="form-label">Telefono</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
              <input type="text" class="form-control" id="phone_number" name="phone_number" placeholder="Telefono" v-model='customer.phone_number'>
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
              <input type="email" class="form-control" name="email" id="email" placeholder="Correo" v-model='customer.email'>
            </div>
          </div>

          <button type="submit" class="btn btn-primary me-2">Actualizar</button>
          <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditarCustomer",
  data() {
    return {
      customer: {
        id: 0,
        document_number: '',
        first_name: '',
        last_name: '',
        address: '',
        birthday: '',
        phone_number: '',
        email: ''
      }
    };
  },

  methods: {
  cancelar() {
    this.$router.push({ name: 'Customers' }); // Cambiado de 'Customer' a 'Customers'
  },

  async updateCustomer() {
    try {
      const url = `http://127.0.0.1:8000/api/customers/${this.customer.id}`;
      console.log("URL:", url);
      console.log("Data:", this.customer);

        const res = await axios.put(url, this.customer);
        if (res.status === 200) {
          this.$router.push({ name: 'Customers' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer actualizado',
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.error("Error al actualizar el cliente:", error.response);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo actualizar el cliente: ${error.response?.data?.message || error.message}`
        });
      }
    }
  },

  mounted() {
    console.log(this.$route.params.id);

    this.customer.id = this.$route.params.id;
    console.log(this.customer.id);
    console.log(`http://127.0.0.1:8000/api/customers/${this.customer.id}`);
    axios.get(`http://127.0.0.1:8000/api/customers/${this.customer.id}`)
      .then((response) => {
        this.customer = response.data.customer;
      })
      .catch((error) => {
        console.error("Error al obtener el cliente:", error);
      });
  }
};
</script>
