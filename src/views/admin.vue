<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <v-container fluid>
    <v-row>
      <v-col >
        <h2>Admin Profile</h2>
        <hr class="my-4" />
      </v-col>
    </v-row>
    <v-row align-h="center">
      <v-col cols="6" md="2">
        <v-img
          thumbnail
          rounded="circle"
          src="https://firebasestorage.googleapis.com/v0/b/stockneo-f9c14.appspot.com/o/user.jpg?alt=media&token=eb517b68-944d-4a1c-8dfe-84b93c49d7ba"
          alt="Image 1"
        >
        </v-img><br>
        <v-spacer></v-spacer>
        <a>Change Profile Picture</a>
      </v-col>

      <v-col cols="12" md="10">
        <v-card>
          <v-tabs color="blue accent-4">
            <v-tab class="text-capitalize">User Profile</v-tab>
            <v-tab class="text-capitalize">Add Company</v-tab>
            <v-tab class="text-capitalize">Delete Company</v-tab>

            <v-tab-item>
              <v-card>
                <v-list dense>
                  <v-list-item-group color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.b"></v-list-item-title>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-btn class="text-capitalize ma-2" outlined >
              Update Profile
            </v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card>
        <v-row>
          <v-spacer></v-spacer>
          <v-card-title class="justify-center"> New Company Form </v-card-title>
          <v-spacer></v-spacer>
        </v-row>

        <v-card-text>
          <v-container>
            <v-form id="formid">
              <v-text-field
                label="Company Name"
                required
                color="blue accent-3"
                v-model="name"
               
              ></v-text-field>

              <v-text-field
                label="Ticker Label"
                color="blue accent-3"
                v-model="ticker"
                required
                :rules="stringRules"
              ></v-text-field>

              <v-select
                label="Principal place of business (State)"
                v-model="state"
                color="blue accent-3"
                required
                :items="states"
                :rules="stringRules"
              ></v-select>
              <v-text-field
                label="Principal place of business (City)"
                v-model="city"
                color="blue accent-3"
                required
                :rules="stringRules"
              ></v-text-field>
              <v-text-field
                label="No. of Employee"
                color="blue accent-3"
                v-model="employee"
                :rules="intnumberRules"
                required
              ></v-text-field>

              <v-text-field
                label="Stock Price"
                color="blue accent-3"
                v-model="stockPrice"
                required
                :rules="floatnumberRules"
              ></v-text-field>

              <v-text-field
                label="Market Capitalization (Millions)"
                color="blue accent-3"
                v-model="marketCap"
                required
                :rules="floatnumberRules"
              ></v-text-field>

              <v-text-field
                label="Directors"
                color="blue accent-3"
                v-model="director"
                required
                :rules="stringRules"
              ></v-text-field>

              <v-text-field
                label="Sector"
                v-model="sector"
                color="blue accent-3"
                required
                :rules="stringRules"
              ></v-text-field>

              <v-text-field
                label="Industry"
                dense
                color="blue accent-3"
                v-model="industry"
                required
                :rules="stringRules"
              ></v-text-field>
              <v-text-field
                label="Price per Earning Ratio (Millions)"
                color="blue accent-3"
                v-model="peratio"
                required
                :rules="floatnumberRules"
              ></v-text-field>
            </v-form>

            
            <v-dialog v-model="dialog3" max-width="400px">
              
            </v-dialog>
            <v-card-actions>
              <v-col class="text-right">
                <v-btn
                  dark
                  class="text-capitalize"
                  color="blue darken-1"
                  @click.stop="submitRegister"
                  text
                  @click="dialog2 = true"
                >
                  Save
                </v-btn>
              </v-col>
            </v-card-actions>
            <v-dialog v-model="dialog2" max-width="500px">
              <v-card>
                <v-card-title>
                  <p>Succesfully registered!</p>
                </v-card-title>

                <v-card-actions>
                  <v-btn
                    class="text-capitalize"
                    color="primary"
                    text
                    @click="dialog2 = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-card-text>
      </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-card-title class="justify-center">
                  <p>Company Delete Form</p>
                </v-card-title>
                <v-card-text>
                  <v-select
                    label="Choose a company"
                    v-model="update"
                    :items="company"
                    item-text="name"
                    solo
                  ></v-select>
                </v-card-text>
                <v-col>
                  <div>
                    <p>Confirm delete Company: {{ update }}?</p>
                  </div>
                </v-col>
                <v-col class="text-right">
                  <v-btn class="text-capitalize" @click.stop="deleteCom" plain
                    >Delete
                  </v-btn>
                </v-col>
                <v-snackbar
                  v-model="hasdel"
                  :timeout="2000"
                  absolute
                  bottom
                  left
                >
                  Company {{ update }} has been deleted.
                </v-snackbar>

             
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import neo4j from "neo4j-driver";
export default {
  data: () => ({
    
      tab: null,
      items: [
        { b: "Name:  ", text: " John Herbert", icon: "mdi-account" },
        { b: "Email:  ", text: " john_65@gmail.com", icon: "mdi-email" },
        { b: "Job Title:  ", text: "Administrator", icon: "mdi-account-cog" },
        { b: "Contact:  ", text: "016 - 6657865", icon: "mdi-phone" },
        { b: "Address:  ", text: "A6, Taman Bintang, 11900 Bayan Gulai, Melaka", icon: "mdi-map-marker" },
      ],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dialog2: false,
    dialog3: false,

    hasdel: false,
    update: "",
    city: null,
    state: null,
    name: null,
    ticker: null,
    industry: null,
    sector: null,
    peratio: null,
    marketCap: null,
    employee: null,
    stockPrice: null,
    director: null,
    company: [],
    states: [
      "selangor",
      "negeri sembilan",
      "johor",
      "kelantan",
      "sabah",
      "sarawak",
      "penang",
      "kedah",
      "perak",
      "perlis",
      "terengganu",
      "pahang",
      "malacca",
    ],
    isOperationSuccess: false,
    validRegister: "",
    stringRules: [
      (v) => !!v || "This field is required",
      (v) => /^[A-Za-z- ]*$/i.test(v) || "Please exclude numbers",
    ],
    intnumberRules: [
      (v) => !!v || "This field is required",
      (v) => /^(\+?[0-9 ]{1,6})$/.test(v) || "Only integer numbers are allowed",
    ],
    floatnumberRules: [
      (v) => !!v || "This field is required",
      (v) => /^[+-]?\d+(\.\d+)?$/.test(v) || "invalid value",
    ],
  }),
  mounted() {
    this.updateRe();
  },
  methods: {
    deleteAccount() {
      alert("Account Deleted");
    },
    submitRegister() {
      var driver = neo4j.driver(
        "neo4j://46243086.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc")
      );
      var session = driver.session();
      var name = this.name.toLowerCase();
      var ticker = this.ticker.toUpperCase();
      var industry = this.industry.toLowerCase();
      var sector = this.sector.toLowerCase();
      var director = this.director.toLowerCase();
      var city = this.city.toLowerCase();
      var state = this.state.toLowerCase();

      // // Get a session from the driver
      //   const session = this.$neo4j.getSession();
      session
        .run(
          "MERGE (c:Company {ticker:'" +
            ticker +
            "', name: '" +
            name +
            "'}) MERGE (d:DirectorName {directorName: '" +
            director +
            "'}) MERGE (c)-[:DIRECTED_BY]->(d) MERGE (j:EmployeeCount {empCount:toInteger(" +
            this.employee +
            ")}) MERGE (c)-[:HAS_EMPLOYEE]->(j) MERGE (f:IndustryType {industryType: '" +
            industry +
            "'}) MERGE (c)-[:INDUSTRALIZE_IN]->(f) MERGE (h:MarketValue {marketValue:toFloat(" +
            this.marketCap +
            ")}) MERGE (c)-[:MARKETCAP_IS]->(h) MERGE (k:PeratioValue {peratioValue:toFloat(" +
            this.peratio +
            ")}) MERGE (c)-[:PERATIO_OF]->(k) MERGE (b:SectorType {sectorType: '" +
            sector +
            "'}) MERGE (c)-[:SECTORS_IN]->(b)  MERGE (m:StockValue {stockValue:toFloat(" +
            this.stockPrice +
            ")}) MERGE (c)-[:LOCATED_AT]->(m) MERGE (q:Location {state:'" +
            state +
            "', city: '" +
            city +
            "'})"
        )
        .then(function () {
          session.close();
        })
        .catch(function (err) {
          console.log(err, "hhbj");
        });

      console.log(this.newArr);
      document.getElementById("formid").reset();
    },

    async updateRe() {
      var companyArr = [];
      var driver = neo4j.driver(
        "neo4j://46243086.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc")
      );
      var session = driver.session();
      //var name = this.name.toLowerCase();

      session
        .run("MATCH (n:Company) RETURN n")
        .then(function (result) {
          result.records.forEach(function (record) {
            companyArr.push({
              name: record._fields[0].properties.name,
              ticker: record._fields[0].properties.ticker,
            });
            session.close();
          });
        })

        .catch(function (err) {
          console.log(err, "hhbj");
        });
      this.company = companyArr;
      console.log(this.company);
    },

    deleteCom() {
      var driver = neo4j.driver(
        "neo4j://46243086.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "XIx343iBGlvTvANKgc32XuwQn-n6M1bH-OjhyGV7mlc")
      );
      var session = driver.session();
      var update = this.update.toLowerCase();

      // // Get a session from the driver
      //   const session = this.$neo4j.getSession();
      session
        .run("MATCH (Company {name:  '" + update + "'})DETACH DELETE Company ")
        .then(function () {
          session.close();
        })
        .catch(function (err) {
          console.log(err, "hhbj");
        });
      this.hasdel = true;
      return this.success();
    },
    success() {
      console.log("deleted");
    },
  },

};
</script>

<style>

a:hover {
  color: blue;
  background-color: transparent;
  text-decoration: underline;
}

</style>