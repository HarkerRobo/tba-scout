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

      let loadedTeamPages = 0;
      for (let i = 0; i <= 16; i++) {
         makeTBARequest(`/teams/${i}`, {}, function (res) {
            if (res.status == 200) {
               loadedTeamPages++;
               let teams = JSON.parse(res.responseText);
               for (let i = 0; i < teams.length; i++)
                  this.allTeams.push(teams[i]);
               this.numTeams += teams.length;
               if (loadedTeamPages==17) console.log(this.allTeams);
            }
         }.bind(this))
      }

      


      // fetch teams and events
      // set values, set fetchingTeamsAndEvents to false

      // filter events to remove duplicates?
      this.clearSearchresultsTexts();
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
      toggleSearchResults: function (turnOn) {
         this.showSearchResults = turnOn;
      },
      search: function () { // filters teams/events according to search input
         this.showSearchresultsTexts("Loading...");
         for (let i = 0; i < this.numTeams; i++) {

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