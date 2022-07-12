<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-3">
                        <h3 class="text-center blue--text text--accent-3">
                          Sign in to StockNeo
                        </h3>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div> -->
                        <!-- <h4 class="text-center mt-4">Ensure your email for registration</h4> -->
                        <v-form id="login">
                          <v-text-field
                            label="Username"
                            name="Email"
                            v-model="ruser"
                            prepend-icon="mdi-account"
                            type="text"
                            color="blue accent-3"
                            :rules="string2Rules"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            v-model="rpass"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="blue accent-3"
                            :rules="password2Rules"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          rounded
                          color="blue accent-3"
                          dark
                          @click.stop="login"
                          >SIGN IN</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="blue accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Investors</h1>
                        <h5 class="text-center">
                          Enter your personal details and start journay with us
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                        <div
                          class="card-content m-b-20"
                          v-for="pigeon in users"
                          v-bind:key="pigeon.email"
                        >
                          <h3>{{ pigeon.email }}</h3>
                        </div>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Sign in</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-3">
                        <h3 class="text-center blue--text text--accent-3">
                          Create Account
                        </h3>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4> -->
                        <v-form id="register">
                          <v-text-field
                            label="Username"
                            name="Name"
                            v-model="user"
                            prepend-icon="mdi-account"
                            type="text"
                            color="blue accent-3"
                            :rules="stringRules"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            v-model="email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="blue accent-3"
                            :rules="emailRules"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            v-model="pass"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="blue accent-3"
                            :rules="passwordRules"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="blue accent-3"
                          dark
                          @click.stop="register"
                          @click="dialog2 = true"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import neo4j from "neo4j-driver";
export default {
  data: () => ({
    step: 1,
    ruser: "",
    rpass: "",
    user: "",
    email: "",
    pass: "",
    users: [],

    stringRules: [
      (v) => !!v || "This field is required",
      (v) => /^[A-Za-z- ]*$/i.test(v) || "Please exclude numbers",
    ],
     string2Rules: [
      (v) => !!v || "This field is required",
    ],
    emailRules: [
      (v) => !!v || "E-mail field is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail field must be valid, e.g haz45@gmail.com",
    ],
    passwordRules: [
      (v) => !!v || "Password field is required",
      (v) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/.test(v) ||
        "Password requires 1 of each of the following: uppercase letter, lowercase letter, number",
    ],
     password2Rules: [
      (v) => !!v || "Password field is required"
    ],
  }),
  props: {
    source: String,
  },
  mounted() {
    this.userload();
  },
  methods: {
    async userload() {
      var userArr = [];
      var driver = neo4j.driver(
        "neo4j://46243086.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc")
      );
      var session = driver.session();
      //var name = this.name.toLowerCase();

      session
        .run("MATCH (n:User) RETURN n")
        .then(function (result) {
          result.records.forEach(function (record) {
            userArr.push({
              username: record._fields[0].properties.username,
              password: record._fields[0].properties.password,
            });
            session.close();
          });
        })

        .catch(function (err) {
          console.log(err, "hhbj");
        });
      this.users = userArr;
    },
    login() {
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.ruser == this.users[i].username &&
          this.rpass == this.users[i].password
        ) {
          alert("Successfully logged in!");
          window.location.href = "Home";
        }
      }
      alert("Oops wrong credentials, please try again.");
    },

    register() {
      var driver = neo4j.driver(
        "neo4j://46243086.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc")
      );
      var session = driver.session();
      var user = this.user;
      var email = this.email;
      var pass = this.pass;

      // // Get a session from the driver
      //   const session = this.$neo4j.getSession();
      session
        .run(
          "MERGE (c:User {username:'" +
            user +
            "', email: '" +
            email +
            "', password:'" +
            pass +
            "'}) "
        )
        .then(function () {
          alert("Successfully registered, please log in to continue.");
          location.reload();
          session.close();
        })
        .catch(function (err) {
          console.log(err, "error");
        });

      document.getElementById("register").reset();
    },
  },
};
</script>