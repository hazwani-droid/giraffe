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
              ></v-text-field>

              <v-text-field
                label="Ticker Label"
                color="blue accent-3"
                v-model="ticker"
                required
              ></v-text-field>
              <v-text-field
                label="No. of Employee"
                color="blue accent-3"
                v-model="employee"
                required
              ></v-text-field>

              <v-text-field
                label="Stock Price"
                color="blue accent-3"
                v-model="stockPrice"
                required
              ></v-text-field>

              <v-text-field
                label="Market Capitalization"
                color="blue accent-3"
                v-model="marketCap"
                required
              ></v-text-field>

              <v-text-field
                label="Directors"
                color="blue accent-3"
                v-model="director"
                required
              ></v-text-field>

              <v-text-field
                label="Sector"
                v-model="sector"
                color="blue accent-3"
                required
              ></v-text-field>

              <v-text-field
                label="Industry"
                dense
                color="blue accent-3"
                v-model="industry"
                required
              ></v-text-field>
              <v-text-field
                label="Price per Earning Ratio"
                color="blue accent-3"
                v-model="peratio"
                required
              ></v-text-field>
            </v-form>

            <v-spacer></v-spacer>
            <v-row>
              <v-col>
                <p>
                  Update existing company?
                  <v-btn class="text-none" color="blue darken-1" plain
                    >Update</v-btn
                  >
                </p>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                dark
                color="blue darken-1"
                @click.stop="submitRegister"
                text
               class="justify-end"
                @click="dialog2 = true"
              >
                Save
              </v-btn>
            </v-card-actions>
            <v-dialog v-model="dialog2" max-width="500px">
              <v-card>
                <v-card-title>
                  <p >Succesfully registered!</p>
                 
                </v-card-title>
                
                <v-card-actions>
                  <v-btn color="primary" text @click="dialog2 = false">
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

    name: null,
    ticker: null,
    industry: null,
    sector: null,
    peratio: null,
    marketCap: null,
    employee: null,
    stockPrice: null,
    director: null,

    isOperationSuccess: false,
    validRegister: "",
  }),
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

      // // Get a session from the driver
      //   const session = this.$neo4j.getSession();
      session
        .run(
          "MERGE (c:Company {ticker:'" +
            ticker +
            "', name: '" +
            name +
            "'}) MERGE (d:Director {director: '" +
            director +
            "'}) MERGE (c)-[:DIRECTED_BY]->(d) MERGE (j:Employee {employee:toInteger(" +
            this.employee +
            ")}) MERGE (c)-[:HAS_EMPLOYEE]->(j) MERGE (f:Industry {industry: '" +
            industry +
            "'}) MERGE (c)-[:INDUSTRALIZE_IN]->(f) MERGE (h:MarketCap {marketCap:toInteger(" +
            this.marketCap +
            ")}) MERGE (c)-[:MARKETCAP_IS]->(h) MERGE (k:Peratio {peRatio:toFloat(" +
            this.peratio +
            ")}) MERGE (c)-[:PERATIO_OF]->(k) MERGE (b:Sector {sector: '" +
            sector +
            "'}) MERGE (c)-[:SECTORED_IN]->(b)  MERGE (m:StockPrice {stockPrice:toFloat(" +
            this.stockPrice +
            ")}) MERGE (c)-[:STOCKPRICE_OF]->(m) "
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
  },

};
</script>
 
