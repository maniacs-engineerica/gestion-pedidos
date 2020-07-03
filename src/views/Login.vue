<template>
  <div class="mt-4">
    <div class="container">
      <div class="justify-content-center row">
        <div class="col-md-6 col-sm-10">
          <div class="p-4 card">
            <div class="card-body">
              <form @submit="login">
                <h1>Ingresar</h1>
                <p class="text-muted">Ingrese a su cuenta</p>
                <input
                  placeholder="Email"
                  autocomplete="username"
                  type="email"
                  class="mb-3 form-control"
                  v-model="email"
                  required
                />
                <input
                  placeholder="Contraseña"
                  autocomplete="current-password"
                  v-model="password"
                  type="password"
                  class="mb-4 form-control"
                  required
                />
                <div class="alert alert-danger mb-3" v-if="error">{{error}}</div>
                <div class="row">
                  <div class="col-6">
                    <loading-button type="submit" :loading="loading" text="Ingresar" loadingText="Ingresando..." className="px-4 btn btn-primary" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>

<script>
import UserHelper from "@/helpers/UserHelper";

import LoadingButton from "@/components/LoadingButton";

export default {
  components: {
    LoadingButton
  },
  data() {
    return {
      error: null,
      email: null,
      password: null,
      loading: false
    };
  },
  methods: {
    login: async function(e) {
      e.preventDefault();
      this.loading = true
      this.error = null
      try {
        await UserHelper.login(this.email, this.password);
        this.$router.replace("/");
      } catch (error) {
        this.error = "Usuario o contraseña invalida";
      }
      this.loading = false
    }
  }
};
</script>
