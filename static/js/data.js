new Vue({
   el: '#app',
   data: {
      CSVOfTeams: true,
      includeHeadersInCSV: true,
      columns: [],
      // stageQuery
      // addedQueries: [],
      isGeneratingCSV: false
   },
   methods: {
      generateCSV: function() {
         this.isGeneratingCSV = true;
         // generate csv
         this.isGeneratingCSV = false;
      },
      stageQuery: function(str) {

      },
      addQuery: function(str) {
         addedQueries.push(str);
      }
   }
})