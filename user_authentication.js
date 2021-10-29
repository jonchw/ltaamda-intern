connect();

async function connect() {
    const urlQlikServer = "https://npxi73rypiw4f5e.ap.qlikcloud.com";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = '4caLPkf1ugaOmVvjfo9SAr2wanQOM3SE';        

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {                  
            'Qlik-Web-Integration-ID':webIntegrationId
            window.location.href = 'https://https://ltaamda-intern.studio';
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'https://npxi73rypiw4f5e.ap.qlikcloud.com');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
        }	
    })
    .catch(function(error)
    {
        console.error(error);
    });	
}			
