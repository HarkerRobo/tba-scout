// constants
const MAX_SEARCH_RESULT_NUM = 15;
const NUM_TEAM_PAGES = 17; // NEEDS UPDATING
const LAST_EVENT_YEAR = new Date().getFullYear();

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
            headerTip: "",
            show: false,
            text: ""
         },
         events: {
            headerTip: "",
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

      
      let loadedTeamPages = 0;

      let eventYear = 1992;
      const NUM_EVENT_YEARS = LAST_EVENT_YEAR - eventYear + 1;

      let loaded_teams = 0;
      let loaded_events = 0;

      for (; loadedTeamPages < NUM_TEAM_PAGES; ++loadedTeamPages) {
         makeTBARequest(`/teams/${loadedTeamPages}`, {}, function (res) {
            if (res.status == 200) {
               loaded_teams++;
               let teams = JSON.parse(res.responseText);
               for (let j = 0; j < teams.length; j++)
                  this.allTeams.push({
                     "key": teams[j].key,
                     "number": teams[j].team_number,
                     "name": teams[j].name
                  });
               this.numTeams += teams.length;
               
               if (loaded_teams == NUM_TEAM_PAGES && loaded_events == NUM_EVENT_YEARS) {
                  this.fetchingTeamsAndEvents = false;
                  this.clearSearchresultsTexts();
                  this.triggerSnackbar(true, "Teams and events successfully loaded.")
               }
            } else {
               this.triggerSnackbar(false, "Error retrieving teams and events, please try again.")
            }
         }.bind(this))
      }

      for (; eventYear <= LAST_EVENT_YEAR; eventYear++) {
         makeTBARequest(`/events/${eventYear}`, {}, function (res) {
            if (res.status == 200) {
               loaded_events++;
               let events = JSON.parse(res.responseText);
               for (let j = 0; j < events.length; j++)
                  this.allEvents.push({
                     "key": events[j].key,
                     "name": events[j].name,
                     "type": events[j].event_type,
                     "year": events[j].year
                  });
               this.numEvents += events.length;
               if (loaded_teams == NUM_TEAM_PAGES && loaded_events == NUM_EVENT_YEARS) {
                  this.fetchingTeamsAndEvents = false;
                  this.clearSearchresultsTexts();
                  this.triggerSnackbar(true, "Teams and events successfully loaded.")              
               }
            } else {
               this.triggerSnackbar(false, "Error retrieving teams and events, please try again.")
            }
         }.bind(this))
      }
   },
   methods: {
      toggleSearchResults: function (turnOn) {
         this.showSearchResults = turnOn;
      },
      search: function () { // filters teams/events according to search input
         if (this.fetchingTeamsAndEvents) return;

         this.showSearchresultsTexts("Loading results...");

         this.matchingTeams = [];
         this.matchingEvents = [];

         let moreTeamsThanAllowed = false;
         let moreEventsThanAllowed = false;

         for (let i = 0; i < this.numTeams; i++) {
            if (this.teamMatch(this.allTeams[i])) {
               
               if (this.matchingTeams.length == MAX_SEARCH_RESULT_NUM) {
                  moreTeamsThanAllowed = true;
                  break;
               } else {
                  this.matchingTeams.push(this.allTeams[i]);
               }
            }
         }

         let numTeamMatches = this.matchingTeams.length;
         if (moreTeamsThanAllowed) {
            this.searchresultsText.teams.headerTip = `Showing first ${numTeamMatches} result${numTeamMatches == 1 ? "" : "s"}`
         } else {
            this.searchresultsText.teams.headerTip = `${numTeamMatches} result${numTeamMatches == 1 ? "" : "s"}`
         }

         for (let i = 0; i < this.numEvents; i++) {
            if (this.eventMatch(this.allEvents[i])) {
               if (this.matchingEvents.length == MAX_SEARCH_RESULT_NUM) {
                  moreEventsThanAllowed = true;
                  break;
               } else {
                  this.matchingEvents.push(this.allEvents[i]);
               }
            }
         }
         let numEventMatches = this.matchingEvents.length;
         if (moreEventsThanAllowed) {
            this.searchresultsText.events.headerTip = `Showing first ${numEventMatches} result${numEventMatches == 1 ? "" : "s"}`
         } else {
            this.searchresultsText.events.headerTip = `${numEventMatches} result${numEventMatches == 1 ? "" : "s"}`
         }         

         this.clearSearchresultsTexts();
      },
      triggerSnackbar: function(isSuccess, text) {
         console.log(text);
         // todo: snackbar triggers
      },
      clearSearch: function () {
         this.matchingTeams = [];
         this.matchingEvents = [];
      },
      teamMatch: function (team) {
         // todo: fuzzy searching
         let regex = new RegExp(this.searchText)
         if (team["name"].match(regex)) return true
         if ((`frc${team["number"]}`).match(regex)) return true
         return false
      },
      eventMatch: function (event) {
         // todo: fuzzy searching
         return false
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