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
      searchText: "",
      showSearchResults: false,
      searchresultsText: {
         teams: {
            show: false,
            text: ""
         },
         events: {
            show: false,
            text: ""
         }
      }
   },
   created: function () {
      this.showSearchresultsTexts("Loading...");
      makeTBARequest("/status", {}, function (res) {
         console.log(JSON.parse(res.responseText))
      }.bind(this))

      this.fetchingTeamsAndEvents = true;

      const NUM_TEAM_PAGES = 17;
      let loadedTeamPages = 0;

      let LAST_EVENT_YEAR = new Date().getFullYear();
      let eventYear = 1992;

      for (; loadedTeamPages < NUM_TEAM_PAGES; ++loadedTeamPages) {
         let TEMP_loadedTeamPages = loadedTeamPages;
         let TEMP_eventYear = eventYear;
         makeTBARequest(`/teams/${loadedTeamPages}`, {}, function (res) {
            if (res.status == 200) {
               let teams = JSON.parse(res.responseText);
               for (let j = 0; j < teams.length; j++)
                  this.allTeams.push({
                     "key": teams[j].key,
                     "number": teams[j].team_number,
                     "name": teams[j].name
                  });
               this.numTeams += teams.length;
               
               if (TEMP_loadedTeamPages == NUM_TEAM_PAGES && TEMP_eventYear == LAST_EVENT_YEAR+1) {
                  console.log("yuh1")
               } else {
                  console.log("not yet 1")
               }
            }
         }.bind(this))
      }
      for (; eventYear <= LAST_EVENT_YEAR; eventYear++) {
         let TEMP_loadedTeamPages = loadedTeamPages;
         let TEMP_eventYear = eventYear;
         makeTBARequest(`/events/${eventYear}`, {}, function (res) {
            if (res.status == 200) {

               let events = JSON.parse(res.responseText);
               for (let j = 0; j < events.length; j++)
                  this.allEvents.push({
                     "key": events[j].key,
                     "name": events[j].name,
                     "type": events[j].event_type,
                     "year": events[j].year
                  });
               this.numEvents += events.length;
               if (TEMP_loadedTeamPages == NUM_TEAM_PAGES && TEMP_eventYear == LAST_EVENT_YEAR) {
                  console.log("yuh2")
                  console.log(TEMP_loadedTeamPages)
                  console.log(TEMP_eventYear)
                  
               } else {
                  console.log("not yet 2")
                  console.log(TEMP_loadedTeamPages)
                  console.log(TEMP_eventYear)
               }
            }
         }.bind(this))
      }

      this.fetchingTeamsAndEvents = false;
      this.clearSearchresultsTexts();
   },
   methods: {
      toggleSearchResults: function (turnOn) {
         this.showSearchResults = turnOn;
      },
      search: function () { // filters teams/events according to search input
         this.showSearchresultsTexts("Loading...");
         for (let i = 0; i < 10; i++) {
            this.matchingTeams.push(this.allTeams[i])
         }
         for (let i = 0; i < this.numEvents; i++) {

         }
         this.clearSearchresultsTexts();
      },
      clearSearch: function () {
         this.matchingTeams = [];
         this.matchingEvents = [];
      },
      teamMatch: function (teamName, teamNumber) {

      },
      eventMatch: function (eventName, eventID) {

      },
      showSearchresultsTexts: function (text) {
         this.searchresultsText.teams.text = text;
         this.searchresultsText.events.text = text;
         this.searchresultsText.teams.show = true;
         this.searchresultsText.events.show = true;
      },
      clearSearchresultsTexts: function () {
         this.searchresultsText.teams.show = false;
         this.searchresultsText.events.show = false;
         this.searchresultsText.teams.text = "";
         this.searchresultsText.events.text = "";
      }
   }
});