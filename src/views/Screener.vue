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
                >
                  <!-- <v-app-bar-nav-icon  >Filters</v-app-bar-nav-icon> -->
                  <v-btn plain><v-icon>mdi-filter</v-icon>Filters</v-btn>
                  <v-layout column>
                    <v-list>
                      <!-- <v-list-title class="text-h5 grey lighten-2">
                        Filters
                      </v-list-title> -->

                      <v-divider></v-divider>

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
                              label="Choose a sector to view the relationships"
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
                              label="Choose an industry to view the relationships"
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
                              label="Choose a director to view the relationships"
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
                              label="Choose companies to view their relationships"
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
                <v-btn dark @click="clearGraph" class="text-capitalize">
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
                    <v-col cols="12"
          >
                  <div class="py-4 searchbar">
                    <v-alert
                      class="font-italic text-center"
                      border="left"
                      colored-border
                      color="accent"
                    >
                      <h3>Please entry to view the resulted stock graphs!</h3>
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
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script>
export default {
  data: () => ({
    search: "",
    selected: true,

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
    peratios: ["less than 50K", "More than 50K"],
    employees: ["less than 50K", "More than 50K"],
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
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {name: '" +
          this.search +
          "'})-[r:DIRECTED_BY|SECTORED_IN|INDUSTRALIZE_IN|MARKETCAP_IS|STOCKPRICE_OF]->() RETURN p ",
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
        },
        relationships: {
          STOCKPRICE_OF: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:STOCKPRICE_OF]->(b) WHERE a.stockPrice >= " +
          this.price1 +
          " AND a.stockPrice <= " +
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
        },
        relationships: {
          MARKETCAP_IS: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH (a:Company)-[r:MARKETCAP_IS]->(b) WHERE a.marketCap >= " +
          this.market1 +
          " AND a.marketCap <= " +
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
        },
        relationships: {
          DIRECTED_BY: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {director: '" +
          this.director +
          "'})-[r:DIRECTED_BY]->() RETURN p ",
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
        },
        relationships: {
          SECTORED_IN: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {sector: '" +
          this.sector +
          "'})-[r:SECTORED_IN]->() RETURN p  ",
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
        },
        relationships: {
          INDUSTRALIZE_IN: {
            thickness: "count",
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {industry: '" +
          this.industry +
          "'})-[r:INDUSTRALIZE_IN]->() RETURN p  ",
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
    clearGraph()
{
$( "#viz" ). load(window. location. href + " #viz" );
}
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

.searchbar{
  margin-left:200px;
}
</style>
