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
of comparable stats.

Example ID: 76561198081009231

Feel free to use this ID above to test on your local server. Currently no online site exists to quickly test this, A link will be provided when available.