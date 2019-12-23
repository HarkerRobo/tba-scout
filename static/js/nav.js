Vue.component('navbar',{
   template:
   `
   <div class="nav">
         <span class="nav-icon">
         </span>
         <span class="nav-option" @click="linkTo('./landing.html', false)">
            Home
         </span>
         <span class="nav-option" @click="linkTo('./data.html', false)">
            Data
         </span>
         <span class="nav-option" @click="linkTo('./search.html', false)">
            Search
         </span>
         <span class="nav-option" @click="linkTo('https://www.thebluealliance.com/', true)">
            TBA
         </span>
         <span class="nav-spacer">
         </span>
         <span class="nav-option" @click="linkTo('https://github.com/', true)">
            Github
         </span>
         <span class="nav-option" @click="linkTo('./about.html', false)">
            About
         </span>
         <span class="nav-option" @click="linkTo('./settings.html', false)">
            Settings
         </span>
      </div>
   `
});