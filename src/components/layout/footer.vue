<template>
  <div>
    <v-card absolute app color="primary" dark flat>
      <v-container>
        <v-row align="start">
          <v-col cols="12" md="3">
            <h4 class="text-h5 font-weight-bold">
              StockNeo
            </h4>
            <p class="text-body-1">
              Discover your stock datas using Graph Visualizations.Flexible your search using dynamic filters.
            </p>
          </v-col>

         
            <v-col cols="12" md="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6"></v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          

          <v-col cols="12" md="6">
            <div>
              <h5 class="text-h6 font-weight-bold">
                Subscribe
              </h5>
              <p class="text-body-1">
                The latest financial news collaborate with Bursa Malaysia sent straight
                to your inbox every month.
              </p>
            </div>

            <v-row>
              <v-col cols="8">
                <v-text-field
                   
                    label="Filled"
                    light
                    solo
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-btn block color="accent" >
                  Subscribe
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div class="text-center mt-6">
          Copyright &copy;
          <a
              class="white--text"
              href="https://neo4j.com/"
           
              target="_blank"
          >Neo4j</a
          >
          {{ new Date().getFullYear() }}. All rights reserved.
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    heroui: [
      {
        text: "Github",
        href: "https://github.com/AGDholo",
      },
      {
        text: "Themes",
        href: "https://heroui.net/",
      },
    ],
    shock: [
      {
        text: "Download",
        href: "https://github.com/AGDholo/giraffe",
      },
      {
        text: "Issues",
        href: "https://github.com/AGDholo/giraffe/issues",
      },
      {
        text: "LICENSE",
        href: "https://github.com/AGDholo/giraffe/blob/master/LICENSE",
      },
    ],
  }),
};
</script>
