new Vue({
   el: '#app',
   data: {
      team: "",
      event: "",
      teamSelected: false,
      eventSelected: false,
      allTeams: [],           // fetch when page loads
      numTeams: -1,
      allEvents: [],          // fetch when page loads
      numEvents: -1,
      fetchingTeamsAndEvents: true,
      matchingTeams: [],      // teams matching the search
      matchingEvents: [],     // events matching the search
      searchIsLoading: true,  // if the search is loading
      searchText: ""
   },
   created: function() {
      // fetch teams and events
      // set values, set fetchingTeamsAndEvents to false

      // filter events to remove duplicates?
   },
   methods: {
      linkTo: function (newLink, openInNewTab) {
         if (openInNewTab) {
            let link = document.createElement("a");
            link.href = newLink;
            link.target = "_blank";
            document.getElementById("app").appendChild(link);
            link.click();
         } else {
            window.location.href = newLink;
         }
      },
      search: function() { // filters teams/events according to search input
         this.searchIsLoading = true;
         for(let i=0;i<numTeams; i++) {
            
         }
         this.searchIsLoading = false;
      },
      clearSearch: function() {
         this.matchingTeams = [];
         this.matchingEvents = [];
      },
      teamMatch: function(teamName, teamNumber) {
         
      },
      eventMatch: function(eventName, eventID) {

      }
   }
});