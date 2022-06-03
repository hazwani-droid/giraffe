
<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-card-text>
                <div class="searchbar">
                  <v-text-field
                    class="mx-4 searchbar"
                    flat
                    v-on:change="CompanyOversea"
                    label="Search a company"
                    v-model="search"
                    solo-inverted
                    append-icon="mdi-magnify"
                    clearable
                  ></v-text-field>
                </div>

                <v-navigation-drawer
                  v-model="drawer"
                  app
                  permanent
                  clipped
                  width="350px"
                  color="#f8f9fe"
                >
                  <!-- <v-app-bar-nav-icon  >Filters</v-app-bar-nav-icon> -->
                  <div class="filter">
                    <v-btn large color="#000000" dark
                      ><v-icon>mdi-filter</v-icon>Filters</v-btn
                    >
                  </div>
                  <v-layout column>
                    <v-list>
                      <!-- <v-list-title class="text-h5 grey lighten-2">
                        Filters
                      </v-list-title> -->

                      <v-card-text>
                        <p class="filter-font">Stock Price</p>
                        <v-row>
                          <v-col class="px-4">
                            <v-range-slider
                              v-model="rangePrice"
                              :step="0.01"
                              :min="0"
                              :max="0.2"
                              hide-details
                              v-on:change="stockpriceRe"
                              class="align-center"
                            >
                              <template v-slot:prepend>
                                <v-text-field
                                  :value="rangePrice[0]"
                                  class="mt-0 pt-0"
                                  hide-details
                                  single-line
                                  type="number"
                                  style="width: 60px"
                                  @change="$set(range, 0, $event)"
                                ></v-text-field>
                              </template>
                              <template v-slot:append>
                                <v-text-field
                                  :value="rangePrice[1]"
                                  class="mt-0 pt-0"
                                  hide-details
                                  single-line
                                  type="number"
                                  style="width: 60px"
                                  @change="$set(range, 1, $event)"
                                ></v-text-field>
                              </template>
                            </v-range-slider>
                          </v-col>
                        </v-row>

                        <p class="filter-font">
                          Market Capitalization in Millions count
                        </p>

                        <v-row>
                          <v-col class="px-4">
                            <v-range-slider
                              v-model="rangeCap"
                              :maxCap="200"
                              :minCap="0"
                              :step="10"
                              hide-details
                              v-on:change="marketcapRe"
                              class="align-center"
                            >
                              <template v-slot:prepend>
                                <v-text-field
                                  :value="rangeCap[0]"
                                  class="mt-0 pt-0"
                                  hide-details
                                  single-line
                                  type="number"
                                  style="width: 60px"
                                  @change="$set(range, 0, $event)"
                                ></v-text-field>
                              </template>
                              <template v-slot:append>
                                <v-text-field
                                  :value="rangeCap[1]"
                                  class="mt-0 pt-0"
                                  hide-details
                                  single-line
                                  type="number"
                                  style="width: 60px"
                                  @change="$set(range, 1, $event)"
                                ></v-text-field>
                              </template>
                            </v-range-slider>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                              v-model="peratio"
                              :items="peratios"
                              v-on:change="peratioRe"
                              label="Price to earning ratio"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                              v-model="employee"
                              :items="employees"
                              v-on:change="employeeRe"
                              label="Number of employees"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                              v-model="sector"
                              :items="sectors"
                              v-on:change="sectorRe"
                              label="Sector relations"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-select
                              v-model="industry"
                              :items="industries"
                              v-on:change="industryRe"
                              label="Industry relations"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-select
                              v-model="director"
                              :items="directors"
                              v-on:change="directorRe"
                              label="Director relations"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-select
                              v-model="compRe"
                              v-on:change="comAllRelation"
                              :items="compRelation"
                              :menu-props="{ maxHeight: '400' }"
                              persistent-hint
                              label="Company relations"
                              multiple
                              chips
                              dense
                            ></v-select>
                            <!-- <v-checkbox
                              v-model="compRebox"
                              label="Only show related relationships"
                              color="#0000FF"
                              @change="check(comOnlyRelation)"
                              hide-details
                            ></v-checkbox> -->
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-list>
                  </v-layout>
                </v-navigation-drawer>

                <v-col class="text-right">
                  <v-btn dark    class="text-capitalize">
                    Clear graph
                  </v-btn>
                </v-col>

                <v-divider class="my-4"></v-divider>
                <script
                  type="application/javascript"
                  src="https://cdn.neo4jlabs.com/neovis.js/v1.5.0/neovis.js"
                ></script>
                <div id="viz">
                  <v-row>
                    <v-col cols="12">
                      <div  class="py-4 searchbar">
                        <v-alert
                          class="font-italic text-center"
                          border="left"
                          colored-border
                          color="accent"
                        >
                          <h3>
                            Please entry to view the resulted stock graphs!
                          </h3>
                        </v-alert>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="http://code.jquery.com/jquery-1.5.2.min.js"></script>
<script>

export default {
  data: () => ({
    search: "",
    selected: true,
    graph:false,
    drawer: true,
    rangePrice: [-20, 70],
    price1: "",
    price2: "",
    rangeCap: [-20, 70],
    compRe: [],
    comp1: "",
    comp2: "",
    sector: "",
    industry: "",
    peratio: "",
    employee: "",
    director: "",
    directors: [
      "Pui Hold Ho",
      "Yew Khid Wong",
      "Khai Shyuan Kua",
      "Yew Kee Roy Ho",
      "Ng Kok Heng",
      "Siew Wei Mak",
      "Lee Aun Choong",
      "Ming Chang Lim",
      "Soo Chye Yu",
      "Woon Chet Chai",
      "Huei Ping Chen",
      "Chow Huat Pang",
      "Chor How Tan",
      "Wai Keong Hoo",
      "Guo Hua Zhuang",
      "Sik Eek Tan",
    ],
    compRelation: [
      "Xidelang Holdings LTD",
      "Seacera Group Berhad",
      "DGB Asia Berhad",
      "Key Alliance Group Berhad",
      "XOX Berhad",
      "M3 Technologies (Asia) Berhad",
      "Saudee Group Berhad",
      "Green Ocean Corporation Berhad",
      "AT Systemization Berhad",
      "Trive Property Group Berhad",
      "Fintec Global Berhad",
      "Focus Dynamics Group Berhad",
      "Oversea Enterprise Bhd",
      "Anzo Holding Bhd",
      "mTouche Technology Bhd",
      "Sanichi Technology Berhad",
      "PDZ Holdings Berhad",
      "MNC Wireless Berhad",
      "Metronic Global Bhd",
      "Lambo Group Berhad",
      "NetX Holdings Berhad",
    ],
    value: [
      "Xidelang Holdings LTD",
      "Seacera Group Berhad",
      "DGB Asia Berhad",
      "Key Alliance Group Berhad",
      "XOX Berhad",
      "M3 Technologies (Asia) Berhad",
      "Saudee Group Berhad",
      "Green Ocean Corporation Berhad",
      "AT Systemization Berhad",
      "Trive Property Group Berhad",
      "Fintec Global Berhad",
      "Focus Dynamics Group Berhad",
      "Oversea Enterprise Bhd",
      "Anzo Holding Bhd",
      "mTouche Technology Bhd",
      "Sanichi Technology Berhad",
      "PDZ Holdings Berhad",
      "MNC Wireless Berhad",
      "Metronic Global Bhd",
      "Lambo Group Berhad",
      "NetX Holdings Berhad",
    ],
    directors: [
      "Pui Hold Ho",
      "Yew Khid Wong",
      "Khai Shyuan Kua",
      "Yew Kee Roy Ho",
      "Ng Kok Heng",
      "Siew Wei Mak",
      "Lee Aun Choong",
      "Ming Chang Lim",
      "Soo Chye Yu",
      "Woon Chet Chai",
      "Huei Ping Chen",
      "Chow Huat Pang",
      "Chor How Tan",
      "Wai Keong Hoo",
      "Guo Hua Zhuang",
      "Sik Eek Tan",
    ],
    sectors: [
      "Footwear",
      "Building Materials/Products",
      "Software",
      "Computer Services",
      "Consumer Goods",
      "Precision Products",
      "Industrial Electronics",
      "Investment Advisors",
      "Technical Services",
      "Restaurants",
      "Forestry & Wood Products",
      "Industrial Machinery",
      "Water Transport/Shipping",
      "Wireless Telecommunications Services",
    ],
    industries: [
      "Consumer Goods",
      "Real Estate/Construction",
      "Technology",
      "Business/Consumer Services",
      "Telecommunications Services",
      "Food Products",
      "Financial Services",
      "Leisure/Arts/Hospitality",
      "Basic Materials/Resources",
      "Industrial Goods",
      "Transportation/Logistics",
    ],
    peratios: ["Below 50M", "Above 50M"],
    employees: ["Below 500", "Above 500"],
    viz: {},
  }),

  methods: {
    // limiter(e) {
    //   if (e.length > 2) {
    //     console.log(" you can only select two", e);
    //     e.pop();
    //   }
    // },
    CompanyOversea() {
      console.log(this.search);
      var config = {
        search: this.search,
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          Company: {
            caption: "ticker",
          },
          Director: {
            caption: "director",
          },
          Sector: {
            caption: "sector",
          },
          Industry: {
            caption: "industry",
          },
          MarketCap: {
            caption: "marketCap",
          },
          StockPrice: {
            caption: "stockPrice",
          },
            Peratio: {
            caption: "peRatio",
          },
          Employee: {
            caption: "employee",
          },
        },
        relationships: {
          DIRECTED_BY: {
            thickness: "count",
          },
          INDUSTRALIZE_IN: {
            thickness: "count",
          },
          STOCKPRICE_OF: {
            thickness: "count",
          },
          SECTORED_IN: {
            thickness: "count",
          },
          MARKETCAP_IS: {
            thickness: "count",
          },
          HAS_EMPLOYEE: {
            thickness: "count",
          },
          PERATIO_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {name: '" +
          this.search +
          "'})-[r:DIRECTED_BY|SECTORED_IN|INDUSTRALIZE_IN|MARKETCAP_IS|STOCKPRICE_OF|HAS_EMPLOYEE|PERATIO_OF]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    stockpriceRe() {
      this.price1 = this.rangePrice[0];
      this.price2 = this.rangePrice[1];
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
            Company: {
            caption: "ticker",
          },
          StockPrice: {
            caption: "stockPrice",
          },
        },
        relationships: {
          STOCKPRICE_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:STOCKPRICE_OF]->(b:StockPrice) WHERE b.stockPrice >= " +
          this.price1 +
          " AND b.stockPrice <= " +
          this.price2 +
          " RETURN a,r,b",
      };
      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },
    marketcapRe() {
      this.market1 = this.rangeCap[0];
      this.market2 = this.rangeCap[1];
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
        Company: {
            caption: "ticker",
          },
         
          MarketCap: {
            caption: "marketCap",
          },
         
        },
        relationships: {
          MARKETCAP_IS: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:MARKETCAP_IS]->(b:MarketCap) WHERE b.marketCap >= " +
          this.market1 +
          " AND b.marketCap <= " +
          this.market2 +
          " RETURN a,r,b",
      };
      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },
    directorRe() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          Company: {
            caption: "ticker",
          },
          Director: {
            caption: "director",
          },
     
        },
        relationships: {
          DIRECTED_BY: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:DIRECTED_BY]->(Director {director: '" +
          this.director +
          "'}) RETURN p ",
      };
      var viz = new NeoVis.default(config);
      viz.render();
    },
    sectorRe() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
            Company: {
            caption: "ticker",
          },
          Sector: {
            caption: "sector",
          },
        
        },
        relationships: {
          SECTORED_IN: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:SECTORED_IN]->(Sector {sector: '" +
          this.sector +
          "'}) RETURN p  ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    industryRe() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
            Company: {
            caption: "ticker",
          },
          Industry: {
            caption: "industry",
          },
        
        },
        relationships: {
          INDUSTRALIZE_IN: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company)-[r:INDUSTRALIZE_IN]->(Industry {industry: '" +
          this.industry +
          "'}) RETURN p  ",
      };

      var viz = new NeoVis.default(config);
      console.log(this.industry);
      viz.render();
    },
    peratioRe() {
      console.log(this.peratio);
      if (this.peratio == "Below 50M") {
        console.log(this.peratio);
        return this.peratioLessRee();
      }
      if (this.peratio == "Above 50M") {
        console.log(this.peratio);
        return this.peratioMoreRee();
      }
    },
    peratioMoreRee() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
        Company: {
            caption: "ticker",
          },
            Peratio: {
            caption: "peRatio",
          },
         
        },
        relationships: {
          PERATIO_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:PERATIO_OF]->(b:Peratio) WHERE b.peRatio >= 50 RETURN a,r,b  ",
      };

      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },
    peratioLessRee() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
         Company: {
            caption: "ticker",
          },
         
            Peratio: {
            caption: "peRatio",
          },
         
        },
        relationships: {
          PERATIO_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:PERATIO_OF]->(b:Peratio) WHERE b.peRatio <= 50 RETURN a,r,b  ",
      };

      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },

    employeeRe() {
      if (this.employee == "Above 500") {
        console.log(this.employee);
        return this.employeeMoreRee();
      }
      if (this.employee == "Below 500") {
        console.log(this.employee);
        return this.employeeLessRee();
      }
    },
    employeeMoreRee() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
        Company: {
            caption: "ticker",
          },
         
          Employee: {
            caption: "employee",
          },
        },
        relationships: {
          HAS_EMPLOYEE: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:HAS_EMPLOYEE]->(b:Employee) WHERE b.employee >= 500 RETURN a,r,b  ",
      };

      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },
    employeeLessRee() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          
         Company: {
            caption: "ticker",
          },
         
          Employee: {
            caption: "employee",
          },
        },
        relationships: {
          HAS_EMPLOYEE: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:HAS_EMPLOYEE]->(b:Employee) WHERE b.employee <= 500 RETURN a,r,b  ",
      };

      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },

    comAllRelation() {
      this.comp1 = this.compRe[0];
      this.comp2 = this.compRe[1];
      this.comp3 = this.compRe[2];
      this.comp4 = this.compRe[3];
      this.comp5 = this.compRe[4];
      this.comp6 = this.compRe[5];

      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          Company: {
            caption: "ticker",
          },
          Director: {
            caption: "director",
          },
          Sector: {
            caption: "sector",
          },
          Industry: {
            caption: "industry",
          },
          MarketCap: {
            caption: "marketCap",
          },
          StockPrice: {
            caption: "stockPrice",
          },
            Peratio: {
            caption: "peRatio",
          },
          Employee: {
            caption: "employee",
          },
        },
        relationships: {
          DIRECTED_BY: {
            thickness: "count",
          },
          INDUSTRALIZE_IN: {
            thickness: "count",
          },
          STOCKPRICE_OF: {
            thickness: "count",
          },
          SECTORED_IN: {
            thickness: "count",
          },
          MARKETCAP_IS: {
            thickness: "count",
          },
          HAS_EMPLOYEE: {
            thickness: "count",
          },
           PERATIO_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r]->(b) WHERE a.name IN ['" +
          this.comp1 +
          "','" +
          this.comp2 +
          "','" +
          this.comp3 +
          "','" +
          this.comp4 +
          "','" +
          this.comp5 +
          "','" +
          this.comp6 +
          "'] RETURN a,r,b",
      };

      var viz = new NeoVis.default(config);
      console.log(viz);
      viz.render();
    },
    relation() {
      if ((this.compRebox = true)) {
        return this.comOnlyRelation();
      } else if ((this.compRebox = false)) {
        return this.comAllRelation();
      } else {
        console.log("no purpose");
      }
    },
    clearGraph() {
 this.graph = true;
    },
  },
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
<style scoped>
#viz {
  width: 1100px;
  height: 900px;
  margin-left: 50px;
  text-transform: lowercase;
}

.filter-font {
  font-family: sans-serif;
  font-size: 15px;
  color: gray;
}

.searchbar {
  margin-left: 200px;
}

.filter {
  background-color: black;
  height: 45px;
}
</style>
