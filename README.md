# Animal Crossing: New Leaf Save Editor
ACNL Save Editor lets you edit your Animal Crossing: New Leaf savegame. 

## Features
* can edit any ACNL savegame (including Welcome Amiibo)
* can edit your town
  * acres, river, waterfalls and ponds
  * name, town hall and train station roof colors
  * move buildings, houses, rocks and more at your own
* can edit your player characters (name, face and gender, TPC pic, inventory and rooms)
* can edit your villagers (animals, campsite and caravan zone)
* other cool things
  * put all perfect fruit trees in your town
  * put both police stations in your town
  * put anything in the beach, the river or the island
  * put various plaza tree anywhere
  * let Holden/Filly join your town
  * get a tan even in winter
  * change ground grass shape
  * place unused players' patterns on ground
  * ...and more!
 
## Warning
**This app can damage your savegame if not used correctly. I'm not responsible of any data lost.
Be careful when editing your savegame, always keep a backup of your previous savegame.**
  
## How to dump and inject AC:NL savegame
### Requirements
* Nintendo 3DS/XL, New Nintendo 3DS/XL or Nintendo 2DS at 9.x, 10.x and 11.x up to 11.2
* retail/digital version of AC:NL with or without Welcome amiibo update
* an updated web browser (recommended: Firefox)

### Configuration
You will only need to do this once.

1. Install Homebrew Launcher from [smealum](http://smealum.github.io/3ds/) using any of your available entrypoints (depending on your firmware version).
2. Recommended entrypoints:
  * **9.x/10.x/11.0 users:** use browserhax+menuhax or soundhax</li>
  * **11.1/11.2/11.x users:** use soundhax</li>
  * **CFW users:** use [hblauncher_loader](https://github.com/yellows8/hblauncher_loader/releases)
3. Download [AC:NL Save Manager](http://www.marcrobledo.com/acnl-editor/acnl_save_manager.zip) and extract it to the root of your SD card <small>(so the included 3ds folder stays on root, overwrite files if needed)</small>

### Dump savegame
1. Open Homebrew Launcher using your entrypoint
2. Run AC:NL save manager
3. Wait a few seconds, and a black with white text screen will appear
4. Press A to dump savegame
5. Press X to exit
6. Power down the console, take out the SD card and put in the PC

### Inject savegame
1. Open saveDataBackup/garden.dat (or garden_plus.dat) file with AC:NL Save Editor and edit it to your desire
2. Save the edited town as saveDataBackup/garden.dat (or garden_plus.dat) in the SD (make sure you are overwriting the original file and not creating a copy)
3. Make sure the saveDataBackup folder does not contain save files from other games (you will be safe if you didn't use Save Data Manager to dump any other game save)
4. If you recently updated to Welcome amiibo version, you will need to the delete the old saveDataBackup/garden.dat file
5. Insert the SD card in the console
6. Open Homebrew Launcher using your entrypoint
7. Run AC:NL save manager
8. Wait a few seconds, and a black with white text screen will appear
9. Press B to inject the edited savegame
10. Press X to exit
11. Run AC:NL and get ingame, your changes should be there!

### Important note
The game has an anti-cheat protection, so you cannot inject an old savegame or another's player savegame.
Make sure you always inject the latest savegame, dump it before editing as it's explained here and you will be fine.
Alternatively you can use [svdt](https://github.com/meladroit/svdt/releases) which skips the anti-cheat protection for you.

## FAQ
### I get a Missing target title error when trying to dump/inject.
It happens to a few people for some reason. Just open the normal save_manager instead, and browse using the d-pad through your games until you find AC:NL.
### Will I be banned if I play online with a hacked savegame?
Yes, you might be banned from online functions if you change your TPC pic and use the Club Tortimer.
### How can I rotate furniture in rooms?
Right click on the desired furniture then left click to rotate it.
### How can I place perfect fruit trees?
Select the desired tree in the Current item dropdown menu, then choose Perfect 4 in the Flag 1 dropdown menu. You can even put non-native perfect fruit trees!
You can also place rare mixed perfect fruit trees (2 normal fruit+1 perfect fruit). Right click on any of your normal fruit trees in your town, choose 0x01 mixed perfect in the Flag 2 dropdown menu then overwrite it in the map (or whever you want to place it).
### Can I add new buildings with the editor?
No. The option was disabled since it lead to some glitches at a later point. It's better to let the game do it by itself. Just add any new PWP (street lamp, for example) in-game with Isabelle, pay it, then wait for the next day so you can edit it in the editor.
### I've injected Holden/Filly RVs, but they do not ask me to come to the town.
Both Holden and Filly are RV locked, so they cannot come to your town as villagers legally.
The only way to have Holden/Filly as villagers is to inject them directly into your town into an existing villager.
### Your editor glitched my savegame!
No. It wasn't my editor, it was you.
The editor can do cool things, but it's also a dangerous tool and you are the only responsible while using it. Keep always a backup of your previous savegame.
If you think you've found a bug, [post your feedback here](https://github.com/marcrobledo/acnl-editor/issues).
### Can I create building seeds like Wild World?
No.
### What can I do to ensure my savegame does not get glitched?
* there must be at least a pond,
* there must be two waterfalls (wall and sea),
* there must be a town plaza acre,
* there must be two slopes: you can move them carefully using the acre editor
* do not do weird things with the acre editor: try to keep a valid structure in the acre editor
* keep at least two rocks: move them using the map editor if you need it (use right click to 'copy' the rock, place it anywhere then delete the original one)
* keep enough free space for buildings in the town plaza acre: the game will freeze whenever special visitors (Redd, Gracie, Katrina...) try to put their tents there
* be careful when moving any building: you can adjust building placements with the editor, but don't do weird things like placing houses in the water
### The game says my savegame data is corrupted. What happened? Can I restore my savegame?
That means you injected an old savegame, and the game blocked it using an anti-cheat protection system.

Do not worry, you can still restore it. You will need to update its secure NAND value.

1. Make a backup of your old savegame you want to restore
2. Restart your game and save. Make a dump of this new AC:NL savegame.
3. Open the old garden.dat/garden_plus.dat savegame in the editor
4. Go to the Other tab, click on the pencil next to Secure Value and load the newest garden.dat/garden_plus.dat here.
5. That will turn your old savegame into a valid savegame for the console.

Alternatively you can use [svdt](https://github.com/meladroit/svdt/releases) which updates the NAND value for you.
