<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 text-center">
        <div class="alert alert-success" role="alert">
          <h1 class="mb-0" style="color: green">
            CUSTOMERS 
            <button @click="newCustomer()" class="btn btn-succes mx-2">
              <font-awesome-icon icon="plus" />
            </button>
          </h1>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Cedula</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Dirección</th>
              <th scope="col">F/Nacimiento</th>
              <th scope="col">N/Telefono</th>
              <th scope="col">Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="index">
              <th scope="row">{{ customer.id }}</th>
              <td>{{ customer.document_number }}</td>
              <td>{{ customer.first_name }}</td>
              <td>{{ customer.last_name }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.birthday }}</td>
              <td>{{ customer.phone_number }}</td>
              <td>{{ customer.email }}</td>
              <td>
                <button @click="deleteCustomer(customer.id)" class="btn btn-danger me-2">
                  <font-awesome-icon icon="trash" />
                </button>
                <button @click="editCustomer(customer.id)" class="btn btn-warning">
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {

  name: "Customer",
  data() {
    return {
      customers: [],
    };
  },

  methods: {
    deleteCustomer(codigo) {
      Swal.fire({
        title: 'Quieres borrar customer con el id ${codigo}?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {

        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/customers/${codigo}`)
            .then((response) => { 
              if (response.data.success) {
                window.location.reload();
                Swal.fire('Deleted!!', '', 'success')
                this.customer = response.data.customer
              }
            })
        }
      })
    },

    editCustomer(id) {
      console.log(id)
      this.$router.push({ name: 'EditarCustomer', params: { id: `${id}` } })
    },
    newCustomer() {
      this.$router.push({ name: 'NewCustomer' })
    }
  },


  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/customers")
      .then((response) => (this.customers = response.data.customers));
  },
};

</script>
