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
                  <v-dialog v-model="dialog" width="500">
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
                        Privacy Policy
                      </v-card-title>

                      

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                          I accept
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

                <v-divider></v-divider>

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
    min: -50,
    max: 90,
    range: [-20, 70],
    viz: {},
  }),

  methods: {
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
