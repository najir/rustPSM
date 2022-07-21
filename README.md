# rustPSM
	Isaac Perks
	07/21/22


# Description:
RUSTPSM(Rust Player Stat Module) is a small web app that is used to gather and display user data for rust player accounts.
RPSM uses steams available API to gather information using SteamID's, save it in a database, display it for the user and use
the data to calculate a competitive rating.

RPSM uses a SPA Vue application to create the webapp from one http server request. Home, about, and user pages are all processed as
one total request. When a steamID is entered, a dynamic page is created using the given ID and fetching data from steam's API.
User data is stored and updated in a mongoDB ATLAS database, which can be accessed in the future for faster queries and a leaderboard
of comparable stats. Vue and VueRouter are called via html, minimal build tools and no CLI were used. 

Example ID: 76561198081009231
Feel free to use this ID above to test on your local server. Currently no online site exists to quickly test this, A link will be provided when available.


# Other Details:
Most of my trouble in making this program stemmed from not using the VueCLI and using minimal build tools, a majority of documentation was based
around having both. If you plan to not use VueCLI, be ready to reinterpret any documentation and existing code. Due to this, and my use of vue SPA's,
the app itself should be extremely fast with almost no server calls and minimal bloat.

My process for the program as a whole is as follows:
NodeJS and express act as a backend server - Server may access CRUD calls to the Database via api calls
- Every database access is called via a express call & function, Client will never directly make database calls
- Server is only interacted with on initial page entry, and when an id is entered
- Server contains code for all steamAPI and database access/verification, with express uri's to interact from the client
Client is a Vue SPA - A single request at base URL provides the entire application
Vue makes fetch requests to steam API, and GET/POST responses to server for database access



