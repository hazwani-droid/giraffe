<template>
  <v-row
    class="d-flex justify-center align-center fill-height"
    style="min-height: 100vh"
  >
    <v-col cols="12" md="6">
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
                :rules="stringRules"
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
                :rules="numberRules"
                required
              ></v-text-field>

              <v-text-field
                label="Stock Price"
                color="blue accent-3"
                v-model="stockPrice"
                required
                :rules="numberRules"
              ></v-text-field>

              <v-text-field
                label="Market Capitalization"
                color="blue accent-3"
                v-model="marketCap"
                required
                :rules="numberRules"
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
                label="Price per Earning Ratio"
                color="blue accent-3"
                v-model="peratio"
                required
                :rules="numberRules"
              ></v-text-field>
            </v-form>

            <v-spacer></v-spacer>
            <v-row>
              <v-col>
                <p>
                  Update existing company?
                  <v-btn
                    class="text-none"
                    color="blue darken-1"
                    plain
                    @click="dialog3 = true"
                    @click.stop="updateRe"
                    >Update</v-btn
                  >
                </p>
              </v-col>
            </v-row>
            <v-dialog v-model="dialog3" max-width="400px">
              <v-card>
                <v-card-title class="justify-center">
                  <p>Company Update Form</p>
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

                <v-card-actions>
                  <v-btn
                    class="text-capitalize"
                    color="primary"
                    text
                    @click="dialog3 = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
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
    </v-col>
  </v-row>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <script>
import neo4j from "neo4j-driver";

export default {
  data: () => ({
    dialog2: false,
    dialog3: false,

    hasdel: false,
    update: "",
   city:null,
   state:null,
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
    states:[
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
    numberRules: [
      (v) => !!v || "This field is required",
      (v) => /^(\+?[1-9 ]{1,5})$/.test(v) || "Only numbers are allowed",
    ],
  }),
  mounted() {
    this.updateRe();
  },
  methods: {
    submitRegister() {
      var driver = neo4j.driver(
        "neo4j://5c3575e8.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM")
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
            "'}) MERGE (d:Director {name: '" +
            director +
            "'}) MERGE (c)-[:DIRECTED_BY]->(d) MERGE (j:Employee {empCount:toInteger(" +
            this.employee +
            ")}) MERGE (c)-[:HAS_EMPLOYEE]->(j) MERGE (f:Industry {industryType: '" +
            industry +
            "'}) MERGE (c)-[:INDUSTRALIZE_IN]->(f) MERGE (h:MarketCap {marketValue:toInteger(" +
            this.marketCap +
            ")}) MERGE (c)-[:MARKETCAP_IS]->(h) MERGE (k:Peratio {peratioValue:toFloat(" +
            this.peratio +
            ")}) MERGE (c)-[:PERATIO_OF]->(k) MERGE (b:Sector {sectorType: '" +
            sector +
            "'}) MERGE (c)-[:SECTORS_IN]->(b)  MERGE (m:StockPrice {stockValue:toFloat(" +
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
        "neo4j://5c3575e8.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM")
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
              // stockPrice:record._fields[0].properties.stockPrice,
              // marketCap:record._fields[0].properties.marketCap,
              // employee:record._fields[0].properties.employee,
              // industry:record._fields[0].properties.industry,
              // peratio:record._fields[0].properties.peratio,
              // director:record._fields[0].properties.director,
              // sector:record._fields[0].properties.sector,
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
        "neo4j://5c3575e8.databases.neo4j.io:7687",
        neo4j.auth.basic("neo4j", "DxjItYHh-BDI_QedX3W-Hs2uV8YlP7YZ6pB_ggowcCM")
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
 
