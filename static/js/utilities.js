// This is just a read key, so feel free to steal if you want.
const TBA_AUTH_KEY = "gqzZstbSv3xodFnk8qAjX1ADDxcuz9HJogftSNsFyPgCfOHKYBuBiW4r1ImigRNA"
const TBA_API_ROOT_URL = "https://www.thebluealliance.com/api/v3"

function makeTBARequest(url, parameters, callback) {
   let xhr = new XMLHttpRequest();

   xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {

         let responseText;
         if (typeof xhr.response === "object") {
            responseText = JSON.parse(xhr.response)
         } else {
            responseText = xhr.response
         }

         callback({
            status: xhr.status,
            responseText
         })
      }
   }

   xhr.open("GET", `${TBA_API_ROOT_URL}${url}`, true);

   if (typeof parameters !== "string") {
      parameters = JSON.stringify(parameters);
   }
   xhr.setRequestHeader("X-TBA-Auth-Key", TBA_AUTH_KEY)

   xhr.send(parameters);
}

function linkTo (newLink, openInNewTab) {
   if (openInNewTab) {
      let link = document.createElement("a");
      link.href = newLink;
      link.target = "_blank";
      document.getElementById("app").appendChild(link);
      link.click();
   } else {
      window.location.href = newLink;
   }
}