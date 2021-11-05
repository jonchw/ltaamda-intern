const config = {
	host: "npxi73rypiw4f5e.ap.qlikcloud.com",
	prefix: "/",
	port: 443,
	isSecure: true,
	webIntegrationId: "4caLPkf1ugaOmVvjfo9SAr2wanQOM3SE"
};
//to avoid errors in workbench: you can remove this when you have added an app
require.config({
  baseUrl: `https://${config.host}/resources`,
  webIntegrationId: config.webIntegrationId
});

require(["js/qlik"], qlik => {
  qlik.on("error", error => console.error(error));
  console.log("capabilit api:");
	

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('ccee29bf-4bbd-4555-a3bd-1f64ce6b3cd2', config);

	var app1 = qlik.openApp('2b26dd49-cdcc-49ba-b4ee-31fbf436816d', config);


	//get objects -- inserted here --
	app.getObject('QV99','ShaEYN');
	
	app.getObject('QV03','PvgapdM');
	
	app.getObject('QV07','qgVhE');
	app.getObject('QV05','umjpJqs');
	
	app.getObject('QV04','PPVbPr');
	
	app.getObject('QV01','SqDbku');
	app.getObject('QV02','yVWmD');
	
	app1.getObject('QV08','qQJqn');
	
	
	//create cubes and lists -- inserted here --
	if ( app ) {
		new AppUi( app );
	}

} );
