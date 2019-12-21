// This is just a read key, so feel free to steal if you want /shrug
const TBA_AUTH_KEY ="gqzZstbSv3xodFnk8qAjX1ADDxcuz9HJogftSNsFyPgCfOHKYBuBiW4r1ImigRNA"

function makeTBARequest(method, url, parameters, callback) {
   let xhr = new XMLHttpRequest();

   xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

         let responseText;
         if (typeof xhr.response === "object") {
            responseText = JSON.parse(xhr.response)
         } else {
            responseText = xhr.response
         }
         let response = { 
            status: xhr.status, 
            responseText 
         };
         callback(response)
      }
   }

   xhr.open(method, url, true);
   if (typeof parameters !== "string") {
      parameters = JSON.stringify(parameters);
   }
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.send(parameters);
}