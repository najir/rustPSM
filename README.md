# rustPSM
Rust Player Stat Module is a basic Javascript based application that will allow you to pull and modify player information via steam name or ID. This is to be used with a sibling application to post the data client side.

Rust provides some api information via steam player stat api. I create two percentages, one is the percent of shots hit compared to fired and the second is headshots compared to shots hit.
I've weighted the headshot % higher due to headshots being inconsistent to hit with regards to spray control specific to rust, and the fact that players often shoot randomly or spend
time training their spray on walls. For this reason, hit % is reduced by a factor of 10 and added on directly to hs% to add weight to those who are unnaturally consistent with their shots.

For example:
player 1:
344 hs / 450 shots hit = 76%
450 shots hit/ 12500 shots fired = 0.036 / 10 = .0036
total = 76.36

player 2:
344/450 = 76%
450/550 = .81 / 10 = .081
total = 84.1

Player 2 is more likely to be a suspect player, and their stats will scale higher due to this

I then take all player information and seek to ping the player as suspect if they are above the .003% of all players. This player comparison will be skewed with small data pools, and will be
improved with more entries.


Future goals: I may find and use an existing stat base from other sites or similar games to compare stats to. This will have it's own issues and future data will be weighted based on a few variables.



Rust API JSON output example:
{"playerstats":{"steamID":"76561198081009231","gameName":"","stats":
[{"name":"deaths","value":136},
{"name":"bullet_fired","value":2671},
{"name":"arrow_fired","value":152},
{"name":"item_drop","value":489},
{"name":"blueprint_studied","value":60},
{"name":"death_suicide","value":33},
{"name":"death_selfinflicted","value":1},
{"name":"kill_player","value":77},
{"name":"bullet_hit_player","value":522},
{"name":"arrow_hit_entity","value":27},
{"name":"harvest.stones","value":4257},
{"name":"bullet_hit_entity","value":677},
{"name":"harvest.cloth","value":180},
{"name":"harvest.wood","value":3248},
{"name":"arrow_hit_building","value":15},
{"name":"kill_bear","value":2},
{"name":"kill_boar","value":1},
{"name":"kill_stag","value":3},
{"name":"headshot","value":101},
{"name":"arrow_hit_boar","value":2},
{"name":"arrow_hit_bear","value":3},
{"name":"bullet_hit_building","value":239},
{"name":"arrow_hit_player","value":34},
{"name":"death_entity","value":7},
{"name":"shotgun_fired","value":42},
{"name":"shotgun_hit_player","value":9},
{"name":"bullet_hit_bear","value":26},
{"name":"shotgun_hit_entity","value":30},
{"name":"wounded","value":77},
{"name":"wounded_assisted","value":6},
{"name":"wounded_healed","value":10},
{"name":"bullet_hit_playercorpse","value":35},
{"name":"bullet_hit_corpse","value":12},
{"name":"INVENTORY_OPENED","value":11983},
{"name":"CRAFTING_OPENED","value":484},
{"name":"harvested_wood","value":43597},
{"name":"harvested_stones","value":20775},
{"name":"MAP_OPENED","value":2062},
{"name":"CUPBOARD_OPENED","value":864},
{"name":"ITEM_EXAMINED","value":8},
{"name":"comfort_duration","value":36157.31640625},
{"name":"calories_consumed","value":59140.56640625},
{"name":"water_consumed","value":21286.984375},
{"name":"radiation_exposure_duration","value":327.62744140625},
{"name":"cold_exposure_duration","value":2885.789794921875},
{"name":"hot_exposure_duration","value":196.226318359375},
{"name":"melee_strikes","value":8707},
{"name":"melee_thrown","value":57},
{"name":"placed_blocks","value":2930},
{"name":"upgraded_blocks","value":1536},
{"name":"arrows_shot","value":196},
{"name":"seconds_speaking","value":1086.3648681640625},
{"name":"acquired_lowgradefuel","value":1666},
{"name":"acquired_metal.ore","value":206711},
{"name":"acquired_scrap","value":4477},
{"name":"topology_road_duration","value":6885}
,{"name":"destroyed_barrels","value":347},
{"name":"horse_distance_ridden","value":1015},
{"name":"kill_scientist","value":4},
{"name":"horse_distance_ridden_km","value":1},
{"name":"InstrumentNotesPlayed","value":237},
{"name":"InstrumentFullKeyboardMode","value":2},
{"name":"grenades_thrown","value":81}],
"achievements":[{"name":"PLACE_CAMPFIRE","achieved":1},
{"name":"CRAFT_CAMPFIRE","achieved":1},
{"name":"COLLECT_100_WOOD","achieved":1},{
	"name":"CRAFT_STONE_HATCHET","achieved":1},
	{"name":"COLLECT_200_STONE","achieved":1},
	{"name":"CRAFT_STONE_PICKAXE","achieved":1},
	{"name":"COLLECT_700_WOOD","achieved":1},
	{"name":"CONSTRUCT_BASE","achieved":1},
	{"name":"UPGRADE_BASE","achieved":1},
	{"name":"COLLECT_50_LGF","achieved":1},
	{"name":"COLLECT_300_METAL_ORE","achieved":1},
	{"name":"VISIT_ROAD","achieved":1},
	{"name":"COLLECT_65_SCRAP","achieved":1},
	{"name":"DESTROY_10_BARRELS","achieved":1},
	{"name":"GIDDY_UP","achieved":1},
	{"name":"PLAY_INSTRUMENT","achieved":1}]}}