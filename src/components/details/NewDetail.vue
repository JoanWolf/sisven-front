<template>
  <div class="container">
    <div class="col-12 text-center">
      <div class="alert alert-success" role="alert">
        <h1 class="mb-0" style="color: green">Nuevo Detalle</h1>
      </div>
    </div>
    <p></p>
    <p></p>
    <form @submit.prevent="saveDetail">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <!-- Primera fila -->
          <div class="col-md-6">
            <div class="mb-3">
              <label for="codigo" class="form-label">Id</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="id"
                  aria-describedby="codigoHelp"
                  name="id"
                  disabled="disabled"
                  v-model="detail.id"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="name" class="form-label">Cantidad</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="number"
                  aria-describedby="codigoHelp"
                  name="number"
                  v-model="detail.quantity"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center align-items-center">
          <!-- Segunda fila -->
          <div class="col-md-6">
            <div class="mb-3">
              <label for="codigo" class="form-label">Precio</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="bank" />
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="date"
                  aria-describedby="codigoHelp"
                  name="date"
                  v-model="detail.price"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="codigo" class="form-label">Factura</label>
              <div class="input-group">
                <select class="form-select" v-model="detail.invoice_id">
                  <option v-for="invoice in invoices" v-bind:value="invoice.id">
                    {{ invoice.number }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        
          <!-- Tercera fila -->
          <div class="col-md-6">
            <div class="mb-3">
              <label for="codigo" class="form-label">Producto</label>
              <div class="input-group">
                <select class="form-select" v-model="detail.product_id">
                  <option v-for="product in products" v-bind:value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        
      </div>
      <br>
      <button class="btn btn-primary" type="submit">Save</button>
      <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "NewDetail",
  data() {
    return {
      detail: {
        id: 0,
        number: 0,
        invoice_id: 0,
        product_id: "",
        quantity: 0,
        price: 0,
      },
      invoices: [],
      id: "0",
      products: [],
      id: "0",
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "Details" });
    },
    async saveDetail() {
      console.log(
        `${this.detail.id} ${this.detail.number} ${this.detail.date} ${this.detail.customer_id} ${this.detail.pay_mode_id}`
      );
      const res = await axios.post(
        `http://127.0.0.1:8000/api/details/`,
        this.detail
      );
      if (res.status == 200) {
        this.$router.push({ name: "Details" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Detail has been saved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/invoices/`)
      .then((response) => (this.invoices = response.data.invoices));
    axios
      .get(`http://127.0.0.1:8000/api/products/`)
      .then((response) => (this.products = response.data.products));
  },
};
</script>
