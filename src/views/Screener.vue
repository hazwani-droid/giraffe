<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-card-text>
                <div>
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
                <div class="text-center">
                  <v-dialog v-model="dialog" persistent width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-col class="text-right">
                        <v-btn
                          color="primary text-capitalize"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-filter</v-icon>
                          Filter
                        </v-btn>
                      </v-col>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 grey lighten-2">
                        Filters
                          
                      </v-card-title>
                   
                      <v-divider></v-divider>

                      <v-card-text>
                        <h4>Stock Price</h4>
                        <v-row>
                          <v-col class="px-4">
                            <v-range-slider
                              v-model="rangePrice"
                              :maxPrice="maxPrice"
                              :minPrice="minPrice"
                              hide-details
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

                        <h4>Market Capitalization</h4>

                        <v-row>
                          <v-col class="px-4">
                            <v-range-slider
                              v-model="rangeCap"
                              :maxCap="maxCap"
                              :minCap="minCap"
                              hide-details
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
                              label="Choose an industry to view the relationships"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <v-select
                              v-model="compRe"
                              v-on:input="limiter"
                              :items="compRelation"
                              :menu-props="{ maxHeight: '400' }"
                              persistent-hint
                              label="Choose two companies to view the relationship"
                              multiple
                              chips
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card-text>
                 <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary text-none"
            text
            @click="dialog = false"
          >
            Filter
          </v-btn>
        </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

             

                <v-divider class="my-4"></v-divider>
                <script
                  type="application/javascript"
                  src="https://cdn.neo4jlabs.com/neovis.js/v1.5.0/neovis.js"
                ></script>
                <div id="viz">
                  <div class="py-4">
                    <v-alert
                      class="font-italic text-center"
                      border="left"
                      colored-border
                      color="accent"
                    >
                      <h3>Please entry to view the resulted stock graphs!</h3>
                    </v-alert>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    selected: true,
    dialog: false,
    
    minPrice: -50,
    maxPrice: 90,
    rangePrice: [-20, 70],
    minCap: -50,
    maxCap: 90,
    rangeCap: [-20, 70],
    compRe: [],
    sector: "",
    industry: "",
    peratio: "",
    employee: "",
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
    limiter(e) {
      if (e.length > 2) {
        console.log(" you can only select two", e);
        e.pop();
      }
    },
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
        relationships: {},
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(Company {name: '" +
          this.search +
          "'})-[r:DIRECTED_BY|SECTORED_IN|INDUSTRALIZE_IN|MARKETCAP_IS|STOCKPRICE_OF]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
  },
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
<style scoped>
#viz {
  width: 700px;
  height: 600px;
  margin-left: 200px;
}
</style>
