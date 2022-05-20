
<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div class="filters">
          <v-btn   class="text-capitalize" outlined @click="filter1">
            Technology
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter2">
            Business
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter3">
            Economy
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter4">
            Politics
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter5">
            Medical
          </v-btn>
          <v-btn class="text-capitalize" outlined @click="filter6">
            Social
          </v-btn>
          <script
            type="application/javascript"
            src="https://cdn.neo4jlabs.com/neovis.js/v1.5.0/neovis.js"
          ></script>
          <div>
            <div id="viz"></div>
          </div>
        </div>
      </v-col>
    </v-row>
     <v-navigation-drawer
                  v-model="drawer"
                  app
                  permanent
                  clipped
                  width="350px"
                  color="#f8f9fe"
                >
                  <!-- <v-app-bar-nav-icon  >Filters</v-app-bar-nav-icon> -->
                  <div >
                   
                  </div>
                  <v-layout column>
                    <v-list>
                    
                    </v-list>
                  </v-layout>
                </v-navigation-drawer>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
export default {
  data: () => ({
    viz: {},
      drawer: true,
  }),

  methods: {
    filter1() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Technology'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter2() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Business'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },

    filter3() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Economy'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },

    filter4() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Politics'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter5() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Medical'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
    filter6() {
      var config = {
        container_id: "viz",
        server_url: "neo4j://localhost:7687",
        server_user: "Hazneo4j",
        server_password: "hazneo4j",
        labels: {
          News: {
            caption: "code",
          },
          Keyword: {
            caption: "keyword",
          },
          Title: {
            caption: "title",
          },
          Source: {
            caption: "source",
          },
        },
        relationships: {
          KEYWORD_IS: {
            thickness: "count",
            caption: false,
          },
        },
        //initial_cypher: "MATCH (c)-[r]->(d) RETURN c,r,d"
        initial_cypher:
          "MATCH p=(News {keyword: 'Social'})-[r:KEYWORD_IS]->() RETURN p ",
      };

      var viz = new NeoVis.default(config);
      viz.render();
    },
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

.filters {
  margin-left: 200px;
}
</style>
