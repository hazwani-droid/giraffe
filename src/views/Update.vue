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
            <v-form method="post" action="/company/add">
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
              ></v-text-field>
              <v-text-field
                label="No. of Employee"
                color="blue accent-3"
                v-model="employee"
              ></v-text-field>

              <v-text-field
                label="Stock Price"
                color="blue accent-3"
                v-model="stockPrice"
              ></v-text-field>

              <v-text-field
                label="Market Capitalization"
                color="blue accent-3"
                v-model="marketCap"
              ></v-text-field>

              <v-text-field
                label="Directors"
                color="blue accent-3"
                v-model="director"
              ></v-text-field>

              <v-text-field
                label="Sector"
                v-model="sector"
                color="blue accent-3"
              ></v-text-field>

              <v-text-field
                label="Industry"
                dense
                color="blue accent-3"
                v-model="industry"
              ></v-text-field>
              <v-text-field
                label="Price per Earning Ratio"
                color="blue accent-3"
                v-model="peratio"
              ></v-text-field>

              <v-textarea
                label="Cypher Query to be executed"
                dense
              ></v-textarea>
              <small
                >*Please refer<v-btn
                  @click="dialog2 = !dialog2"
                  plain
                  x-small
                  color="primary"
                  class="text-none"
                  >this</v-btn
                >for Cypher queries guideline</small
              >
            </v-form>

            <v-dialog v-model="dialog2" max-width="500px">
              <v-card>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-card-title class="justify-center">
                    Cypher Query Guideline
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    plain
                    fab
                    @click="dialog2 = false"
                    text
                    color="primary"
                  >
                    <v-icon dark> mdi-close </v-icon>
                  </v-btn>
                </v-row>
                <v-card-text
                  >1. Please specify a label name for each node starting with a
                  capital letter.</v-card-text
                >
                <v-card-text
                  >2. Each node property name has to be short and simple without
                  spacing.</v-card-text
                >
                <v-card-text
                  >3. Example below shows the query of retrieving a company's
                  node director's property with the specified name.</v-card-text
                >
                <v-card-text
                  >e.g MATCH p=(Company {director: 'Siew Wei
                  Mak'})-[r:DIRECTED_BY]->() RETURN p .</v-card-text
                >

                <v-card-text
                  >4. Always refer to the Neo4j documentation for further
                  encounters.</v-card-text
                >
              </v-card>
            </v-dialog>
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
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            @click.stop="submitRegister"
            text
            @click="updateD = false"
          >
            Save Record
          </v-btn>
        </v-card-actions>
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

    name: null,
    ticker: null,
    industry: null,
    sector: null,
    peratio: null,
    marketCap: null,
    employee: null,
    stockPrice: null,
    director: null,

    protocol: "neo4j://localhost:7687",
    host: "localhost",
    port: 7687,
    username: "Hazneo4j",
    password: "hazneo4j",
  }),
  methods: {
    connect() {
      return this.$neo4j
        .connect(
          this.protocol,
          this.host,
          this.port,
          this.username,
          this.password,
          console.log("hsbjshb")
        )
        .then(() => {
          return this.$neo4j.getDriver();
        });
    },
    // driver() {
    //   // Get a driver instance
    //   return this.$neo4j.getDriver();
    // },
    submitRegister() {
      var driver = neo4j.driver(
        "bolt://localhost",
        neo4j.auth.basic("Hazneo4j", "hazneo4j")
      );
      var session = driver.session();
      console.log(this.data);
      // // Get a session from the driver
      //   const session = this.$neo4j.getSession();
      session
        .run(
          "MERGE (c:Company {ticker:'" +
            this.ticker +
            "', name: '" +
            this.name +
            "'}) MERGE (d:Director {director: '" +
            this.director +
            "'}) MERGE (c)-[:DIRECTED_BY]->(d) MERGE (j:Employee {employee:toInteger(" +
            this.employee +
            ")}) MERGE (c)-[:HAS_EMPLOYEE]->(j) MERGE (f:Industry {industry: '" +
            this.industry +
            "'}) MERGE (c)-[:INDUSTRALIZE_IN]->(f) MERGE (h:MarketCap {marketCap:toInteger(" +
            this.marketCap +
            ")}) MERGE (c)-[:MARKETCAP_IS]->(h) MERGE (k:Peratio {peRatio:toFloat(" +
            this.peratio +
            ")}) MERGE (c)-[:PERATIO_OF]->(k) MERGE (b:Sector {sector: '" +
            this.sector +
            "'}) MERGE (c)-[:SECTORED_IN]->(b)  MERGE (m:StockPrice {stockPrice:toFloat(" +
            this.stockPrice +
            ")}) MERGE (c)-[:STOCKPRICE_OF]->(m) " 
        )
        .then(function (result) {
          session.close();
        })
        .catch(function (err) {
          console.log(err, "hhbj");
        });

      console.log(this.newArr);
    },
  },
};
</script>
 
