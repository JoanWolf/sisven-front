<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Customer</h1>
    <div class="card">
      <div class="card-header fw-bold">
        <!-- Puedes agregar un título aquí si lo necesitas -->
      </div>
      <div class="card-body">
        <form @submit.prevent="saveCustomer">
          <div class="row mb-3">
            <label for="id" class="form-label">Id</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="id"
                name="id"
                placeholder="Id customer"
                disabled
                v-model="customers.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="document_number" class="form-label">Cedula</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="" /></div>
              <input
                type="text"
                class="form-control"
                id="document_number"
                name="document_number"
                placeholder="Nombre"
                v-model="customers.document_number"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                type="text"
                class="form-control"
                id="first_name"
                name="first_name"
                placeholder="Nombre"
                v-model="customers.first_name"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="last_name" class="form-label">Apellido</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                type="text"
                class="form-control"
                id="last_name"
                name="last_name"
                placeholder="Apellido"
                v-model="customers.last_name"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                placeholder="Dirección"
                v-model="customers.address"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="birthday" class="form-label">F/Nacimiento</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="calendar-alt" />
              </div>
              <input
                type="date"
                class="form-control"
                id="birthday"
                name="birthday"
                v-model="customers.birthday"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone_number" class="form-label">Telefono</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="phone" />
              </div>
              <input
                type="text"
                class="form-control"
                id="phone_number"
                name="phone_number"
                placeholder="Telefono"
                v-model="customers.phone_number"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="envelope" />
              </div>
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                placeholder="Correo"
                v-model="customers.email"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary me-2">Guardar</button>
          <button type="button" class="btn btn-secondary"@click="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "NewCustomer",
  data() {
    return {
      customers: {
        id: 0,
        document_number: "",
        first_name: "",
        last_name: "",
        address: "",
        birthday: "",
        phone_number: "",
        email: "",
      },
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Customers" });
    },
    async saveCustomer() {
      console.log(
        "ID: " +
          this.customers.id +
          "\n" +
          this.customers.document_number +
          "\nName: " +
          this.customers.first_name +
          "\n" +
          this.customers.last_name +
          "\n" +
          this.customers.address +
          "\n" +
          this.customers.birthday +
          "\n" +
          this.customers.phone_number +
          "\n" +
          this.customers.email
      );
      const res = await axios.post(
        "http://127.0.0.1:8000/api/customers/",
        this.customers
      );
      console.log(res);
      if (res.status === 200) {
        this.$router.push({ name: "Customers" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Customer actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {},
};
</script>
