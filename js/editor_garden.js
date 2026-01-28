/*
* Animal Crossing: New Leaf Save Editor
* Online savegame editor for ACNL videogame
* (last update: 2025-04-01)
* By Marc Robledo https://www.marcrobledo.com
*
* License:
*
* MIT License
* 
* Copyright (c) 2015-2025 Marc Robledo
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/* service worker */
if(location.protocol==='http:')
	location.replace(window.location.href.replace('http:','https:'));
else if(location.protocol==='https:' && location.host==='www.marcrobledo.com' && 'serviceWorker' in navigator)
	navigator.serviceWorker.register('/acnl-editor/_cache_service_worker.js', {scope: '/acnl-editor/'});




const EditorSettings={
	language:'en',
	showDisclaimer:true,
	autoIncrement:false,
	load:function(){
		if(localStorage && localStorage.getItem('acnl-editor-settings')){
			const loadedSettings=JSON.parse(localStorage.getItem('acnl-editor-settings'));

			if(loadedSettings.language && ['en','enu','fr','de','it','es','jp','kr'].includes(loadedSettings.language))
				this.language=loadedSettings.language;

			this.showDisclaimer=!!loadedSettings.showDisclaimer;
			//this.autoIncrement=!!loadedSettings.autoIncrement;
			this._lastSave=typeof loadedSettings._lastSave==='number'? loadedSettings._lastSave : new Date().getTime();
		}
	},
	save:function(){
		if(localStorage){
			this._lastSave=new Date().getTime();
			localStorage.setItem('acnl-editor-settings', JSON.stringify(EditorSettings));
		}
	},
	reset:function(){
		if(localStorage)
			localStorage.removeItem('acnl-editor-settings');
	}
}



var Offsets={
	TOWN_TREESIZE:			0x80+0x049526,
	TOWN_CLIFF_SIDE:		0x80+0x04da00,
	TOWN_GRASSTYPE:			0x80+0x04da01,
	TOWN_PLAYTIME:			0x80+0x5c730,
	TOWN_DAYSPLAYED:		0x80+0x5c7ba,
	TOWN_NATIVEFRUIT:		0x80+0x05c7b6,
	TOWN_ID1:				0x80+0x05c738,
	TOWN_ID2:				0x80+0x05c739,
	TOWN_NAME:				0x80+0x05c73a,
	TOWN_ORDINANCES:        0x80+0x05c74f,
	TOWN_ORDINANCES_SET:    0x80+0x05c753,
	TOWN_AVAILABLEPWPS:		0x80+0x04d9d0,
	TOWN_TURNIP_PRICES:		0x80+0x06535c,
	TOWN_MULTVARS:			0x05c7d6,

	MUSEUM_ROOMS:			0x80+0x0659d8,

	MAP_GRASS_TODAY:		0x80+0x052a58,
	MAP_GRASS:				0x80+0x053e80,
	MAP_ACRES:				0x80+0x04da04,
	MAP_N_BUILDINGS:		0x80+0x049524,
	MAP_N_BUILDINGS_EVENT:	0x80+0x049525,
	MAP_BUILDINGS:			0x80+0x049528,
	MAP_ITEMS:				0x80+0x04da58,
	MAP_PWP_PATTERNS:		0x049690,

	ISLAND_GRASSTYPE:		0x80+0x06a406,
	ISLAND_ACRES:			0x80+0x06a408,
	ISLAND_ITEMS:			0x80+0x06a428,
	ISLAND_BUILDINGS:		0x80+0x06b428,

	PLAYERS:				0xa0,
	PLAYER_HAIRSTYLE:		0x04,
	PLAYER_HAIRCOLOR:		0x05,
	PLAYER_FACE:			0x06,
	PLAYER_EYECOLOR:		0x07,
	PLAYER_TAN:				0x08,
	PLAYER_HAT:				0x0a,
	PLAYER_ACCESSORY:		0x0e,
	PLAYER_WETSUIT:			0x12,
	PLAYER_TOPWEAR:			0x16,
	PLAYER_BOTTOMWEAR:		0x1a,
	PLAYER_SOCKS:			0x1e,
	PLAYER_SHOES:			0x22,
	PLAYER_HELDITEM:		0x26,
	PLAYER_PATTERNS:		0x2c,
	PLAYER_ID1:				0x55a6,
	PLAYER_ID2:				0x55a7,
	PLAYER_NAME:			0x55a8,
	PLAYER_GENDER:			0x55ba,
	PLAYER_TPCREGION:		0x55d2,
	PLAYER_BIRTHDAYMONTH:	0x55d4,
	PLAYER_BIRTHDAYDAY:		0x55d5,
	PLAYER_REGYEAR:			0x55d6,
	PLAYER_REGMONTH:		0x55d8,
	PLAYER_REGDAY:			0x55d9,
	PLAYER_BELLSFROMREESE:	0x6b84,
	PLAYER_BADGES_VALUES:	0x55dc,
	PLAYER_BADGES:			0x569c,
	PLAYER_TPCPIC:			0x5724,
	PLAYER_TPCTEXT:			0x6b24,
	PLAYER_PLAYTIME:		0x6b90,
	PLAYER_POCKETS:			0x6bb0,
    PLAYER_ENCYCLOPEDIA:    0x6c50,
	PLAYER_CATALOG:			0x6c70,
	PLAYER_BANK:			0x6b6c,
	PLAYER_MEDALS:			0x6b7c,
	PLAYER_WALLET:			0x6e38,
	PLAYER_ISLANDBOX:		0x6e40,
	PLAYER_LETTERS:			0x7008, /* TO-DO!!!!!!!!!!!!!!!!!!!!!!! */
	PLAYER_EMOTIONS:		0x8900,
	PLAYER_DRESSERS:		0x8e18,
	PLAYER_SIZE:			0x9f10,
	PLAYER_EXTERIORS:		0xa0+0x057e64,
	PLAYER_ROOMS:			0x057f7a,
	
	VILLAGERS:				0x027d10,
	VILLAGER_ID:			0x00,
	VILLAGER_PERSONALITY:	0x02,
	VILLAGER_STOREDLETTER:	0x17c4,
	VILLAGER_SHIRT:			0x244e,
	VILLAGER_SONG:			0x2452,
	VILLAGER_WALL:			0x2456,
	VILLAGER_FLOOR:			0x245a,
	VILLAGER_UMBRELLA:		0x245e,
	VILLAGER_FURNITURE:		0x2462,
	VILLAGER_CATCHPHRASE:	0x24a6,
	VILLAGER_STATUS:		0x24c4,
	VILLAGER_SIZE:			0x24f8,

	PAST_VILLAGERS:			0x80+0x03f17e,
	CAMPSITE_VILLAGER:		0x80+0x03f17e+0x4c,

	SHOP_LOSTFOUND:			0x80+0x05c75e,
	SHOP_NOOK:				0x80+0x05c7ec,
	SHOP_ABLE1:				0x80+0x05c868,
	SHOP_ABLEPATTERNS:		0x80+0x05c8b4,
	SHOP_ABLE2:				0x80+0x060c34,
	SHOP_LEIF:				0x80+0x060c72,
	SHOP_REDD:				0x80+0x060cac,
	SHOP_KICKS:				0x80+0x060daa,
	SHOP_RETAIL:			0x80+0x060e30,
	SHOP_MUSEUM:			0x80+0x06523a,
	SHOP_HOMES:				0x80+0x06524a,
	SHOP_GRACIE:			0x80+0x065274,
	SHOP_LOLGYROIDS:		0x80+0x06530e,
	SHOP_ISLAND:			0x80+0x065334,

	NOOK_UNLOCK:			0x80+0x05c7e0,
	LEIF_UNLOCK:			0x80+0x060c70,
	KICKS_UNLOCK:			0x80+0x060da8,
	MUSEUM_UNLOCK:		0x80+0x065238,
	LOL_UNLOCK:				0x80+0x0652fe,
	DREAM_UNLOCK:			0x80+0x06531e,
	FORTUNE_UNLOCK:		0x80+0x065320,

	MIN_WALL:		0x2342,	MAX_WALL:		0x23c6,
	MIN_FLOOR:		0x23c7,	MAX_FLOOR:		0x2445,
	MIN_SONG:		0x2126,	MAX_SONG:		0x2180,
	MIN_SHIRT:		0x2448,	MAX_SHIRT:		0x260b,
	MIN_UMBRELLA:	0x2755,	MAX_UMBRELLA:	0x2778
};
const OffsetsPlus={
	TOWN_TREESIZE:			0x04be86,
	TOWN_CLIFF_SIDE:		0x053480,
	TOWN_GRASSTYPE:			0x053481,
	TOWN_PLAYTIME:			0x0621b0,
	TOWN_DAYSPLAYED:		0x06223e,
	TOWN_NATIVEFRUIT:		0x06223a,
	TOWN_ID1:				0x0621b8,
	TOWN_ID2:				0x0621b9,
	TOWN_NAME:				0x0621ba,
	TOWN_ORDINANCES:        0x0621cf,
	TOWN_ORDINANCES_SET:    0x0621d3,
	TOWN_AVAILABLEPWPS:		0x050330,
	TOWN_TURNIP_PRICES:		0x06ade0,
	TOWN_MULTVARS:			0x0621d6,

	MUSEUM_ROOMS:			0x06b478,

	MAP_GRASS_TODAY:		0x0584d8,
	MAP_GRASS:				0x059900,
	MAP_ACRES:				0x053484,
	MAP_N_BUILDINGS:		0x04be84,
	MAP_N_BUILDINGS_EVENT:	0x04be85,
	MAP_BUILDINGS:			0x04be88,
	MAP_ITEMS:				0x0534d8,
	MAP_PWP_PATTERNS:		0x04bf70,

	ISLAND_GRASSTYPE:		0x06feb6,
	ISLAND_ACRES:			0x06feb8,
	ISLAND_ITEMS:			0x06fed8,
	ISLAND_BUILDINGS:		0x070ed8,

	PLAYERS:				0xa0,
	PLAYER_HAIRSTYLE:		0x04,
	PLAYER_HAIRCOLOR:		0x05,
	PLAYER_FACE:			0x06,
	PLAYER_EYECOLOR:		0x07,
	PLAYER_TAN:				0x08,
	PLAYER_HAT:				0x0a,
	PLAYER_ACCESSORY:		0x0e,
	PLAYER_WETSUIT:			0x12,
	PLAYER_TOPWEAR:			0x16,
	PLAYER_BOTTOMWEAR:		0x1a,
	PLAYER_SOCKS:			0x1e,
	PLAYER_SHOES:			0x22,
	PLAYER_HELDITEM:		0x26,
	PLAYER_PATTERNS:		0x2c,
	PLAYER_ID1:				0x55a6,
	PLAYER_ID2:				0x55a7,
	PLAYER_NAME:			0x55a8,
	PLAYER_GENDER:			0x55ba,
	PLAYER_TPCREGION:		0x55d2,
	PLAYER_BIRTHDAYMONTH:	0x55d4,
	PLAYER_BIRTHDAYDAY:		0x55d5,
	PLAYER_REGYEAR:			0x55d6,
	PLAYER_REGMONTH:		0x55d8,
	PLAYER_REGDAY:			0x55d9,
	PLAYER_BELLSFROMREESE:	0x6ba4,
	PLAYER_BADGES_VALUES:	0x55dc,
	PLAYER_BADGES:			0x569c,
	PLAYER_TPCPIC:			0x5738,
	PLAYER_TPCTEXT:			0x6b38,
	PLAYER_PLAYTIME:		0x6bb0,
	PLAYER_POCKETS:			0x6bd0,
    PLAYER_ENCYCLOPEDIA:    0x6c70,
	PLAYER_CATALOG:			0x6c90,
	PLAYER_BANK:			0x6b8c,
	PLAYER_MEDALS:			0x6b9c,
	PLAYER_WALLET:			0x6f08,
	PLAYER_ISLANDBOX:		0x6f10,
	PLAYER_LETTERS:			0x7008,
	PLAYER_EMOTIONS:		0x89d0,
	PLAYER_MEOW:			0x8d1c,
	PLAYER_DRESSERS:		0x92f0,
	PLAYER_CENSUS_MENU:		0x572f,
	PLAYER_SIZE:			0xa480,
	PLAYER_EXTERIORS:		0xa0+0x05d864,
	PLAYER_ROOMS:			0x05d97a,
	PLAYER_STORAGE:			0x07a778,
	
	VILLAGERS:				0x0292d0,
	VILLAGER_ID:			0x00,
	VILLAGER_PERSONALITY:	0x02,
	VILLAGER_STOREDLETTER:	0x17c4,
	VILLAGER_SHIRT:			0x246e,
	VILLAGER_SONG:			0x2472,
	VILLAGER_WALL:			0x2476,
	VILLAGER_FLOOR:			0x247a,
	VILLAGER_UMBRELLA:		0x247e,
	VILLAGER_FURNITURE:		0x2482,
	VILLAGER_CATCHPHRASE:	0x24c6,
	VILLAGER_STATUS:		0x24e4, /* is it correct? */
	VILLAGER_SIZE:			0x2518,

	PAST_VILLAGERS:			0x0408fa,
	CAMPSITE_VILLAGER:		0x040946,
	CARAVAN_VILLAGERS:		0x06ae60,

	SHOP_LOSTFOUND:			0x621e2,
	SHOP_NOOK:				0x62270,
	SHOP_ABLE1:				0x622ec,
	SHOP_ABLEPATTERNS:		0x62338,
	SHOP_ABLE2:				0x666b8,
	SHOP_LEIF:				0x666f6,
	SHOP_REDD:				0x66730,
	SHOP_KICKS:				0x6682e,
	SHOP_RETAIL:			0x668b4,
	SHOP_MUSEUM:			0x6acbe,
	SHOP_HOMES:				0x6acce,
	SHOP_GRACIE:			0x6acf8,
	SHOP_LOLGYROIDS:		0x6ad92,
	SHOP_ISLAND:			0x6adb8,

	NOOK_UNLOCK:			0x62264,
	LEIF_UNLOCK:			0x666f4,
	KICKS_UNLOCK:			0x6682c,
	MUSEUM_UNLOCK:		0x6acbc,
	LOL_UNLOCK:				0x6ad82,
	DREAM_UNLOCK:			0x6ada2,
	FORTUNE_UNLOCK:		0x6ada4,

	HHD_UNLOCK:				0x621dc,

	MIN_WALL:		0x234c,	MAX_WALL:		0x23ea,
	MIN_FLOOR:		0x23eb,	MAX_FLOOR:		0x2492,
	MIN_SONG:		0x212b,	MAX_SONG:		0x2185,
	MIN_SHIRT:		0x2495,	MAX_SHIRT:		0x2680,
	MIN_UMBRELLA:	0x27e6,	MAX_UMBRELLA:	0x280a
};

const Constants={
	Strings:{
		PERSONALITIES:['&#9794; lazy','&#9794; jock','&#9794; cranky','&#9794; smug','&#9792; normal','&#9792; peppy','&#9792; snooty','&#9792; uchi'],
		BADGES:['Fishes','Bugs','Marine','Fish collection','Bug collection','Marine collection','Balloons','Visiting other towns','Being visited','Watering flowers','Bank','Turnips','Medals','StreetPass','Weeds','Shopping','Letters','Refurbishing','Catalog','K.K. Slider','Home points','Time played','Helping neighbors','Dream Suite'],
		WARNING_MESSAGE:'<small><b class="warning">Warning!</b> this feature is experimental.<br/>Use it at your own risk.</small>'
	},

	FULL_ENCYCLOPEDIA:[0xcc,0xfc,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xd0,0x9a],
	ALL_EMOTIONS:[
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,
		0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,
		0x20,0x21,0x24,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2e
	],

	TOWN_PLAYTIME_FROM_TREESIZE:[1,5,20,50,100,180,300,500],

	BADGE_MIN_VALUES:[
		[500,2000,5000],
		[500,2000,5000],
		[100,200,1000],
		[0,0,0],
		[0,0,0],
		[0,0,0],
		[30,100,200],
		[100,250,500],
		[50,200,500],
		[100,250,500],
		[0,0,0],
		[500000,3000000,10000000],
		[300,1500,5000],
		[100,300,1000],
		[500,2000,5000],
		[500000,2000000,5000000],
		[50,100,200],
		[30,100,200],
		[0,0,0],
		[20,50,100],
		[0,0,0],
		[0,0,0],
		[50,100,300],
		[50,200,500]	
	],

	HAIR_COLORS:['593a38','935929','ef572e','41a6dc','ffe779','8bcf62','ee798b','fff8de','171806','550601','bb0c07','001449','dea70f','015a22','ad75bc','7a795a'],
	EYE_COLORS:['323627','cd7246','5b9773','6d8680','5678c0','3f88bd']
};

var mouseHeld=0,tempFile,tempFileLoadFunction;
var cleanSearch;
var savegame,map,island,players,grassMap,grassMapToday,buildings,town;
var currentPlayer,currentTab;
var currentEditingItem;
var selectBuildings, buildingHash;

var plusMode=false;

function el(e){return document.getElementById(e)}
function show(e){el(e).style.display='block'}
function hide(e){el(e).style.display='none'}
function toggle(e){if(el(e).style.display=='block')hide(e);else show(e)}
function addEvent(e,ev,f){if(typeof e==='string') e=el(e); e.addEventListener(ev,f,false);}

function preventDefault(evt){/*evt.stopPropagation();*/evt.preventDefault()}
function stopPropagation(evt){evt.stopPropagation();}
function getString(o){
	if(el('lang-selector').value==='fr')
		return o[1] || o[0];
	else if(el('lang-selector').value==='de')
		return o[2] || o[0];
	else if(el('lang-selector').value==='it')
		return o[3] || o[0];
	else if(el('lang-selector').value==='es')
		return o[4] || o[0];
	else if(el('lang-selector').value==='enu')
		return o[5] || o[0];
	else
		return o[0]
}
function intToHex(i,b){var h=i.toString(16);while(h.length<b*2)h='0'+h;return h}
function range(min,max){var a=[];for(i=min;i<=max;i++)a.push(i);return a}
function random(v){return Math.floor((Math.random()*v))}
function showTab(evt){var newTab=evt.target.tabInfo;if(newTab.id!==currentTab.id){hide('tab-'+currentTab.id);currentTab.button.className='';show('tab-'+newTab.id);newTab.button.className='active';currentTab=newTab}}


function createInput(defValue){var input=document.createElement('input');input.type='text';input.value=defValue;return input}
function createButton(t){var b=document.createElement('input');b.type='button';b.className='button';b.value=t;return b}
function createSpan(t){var s=document.createElement('span');s.innerHTML=t;return s}
function createOption(v,t){var o=document.createElement('option');o.value=v;o.innerHTML=t;return o}
function createEditButton(){var b=document.createElement('span');b.className='sprite edit-icon';return b}



function addNumericInputEvent(e,min,max){
	//e.type='number'; //do not use, getting value from input[type=number] with an invalid value returns null
	e.min=min;
	e.max=max;

	addEvent(e,'change',_cleanInputEvent);
}
function _cleanInputEvent(){
	this.value=this.value.replace(/[^0-9]/i,'');
	var val=parseInt(this.value);
	if(isNaN(val)){
		val=this.min;
	}else if(val<this.min){
		val=this.min;
	}else if(val>this.max){
		val=this.max;
	}
	this.value=val;
}











const UI={
	Home:{
		updateLanguageIcon:function(){
			el('lang-flag').style.backgroundPosition='-'+(el('lang-selector').selectedIndex*16)+'px 0px'
		}
	},
	Snackbars:(function(){
		const container=document.createElement('div');
		container.id='snackbars';
		const _closeSnackbar=function(snackbar){
			snackbar.removeEventListener('click',_evtClickSnackbar);
			window.clearTimeout(snackbar.autoCloseTimeout);
			snackbar.className=snackbar.className.replace(' open','');
			window.setTimeout(function(){container.removeChild(snackbar)},600);
		};
		const _evtClickSnackbar=function(evt){
			_closeSnackbar(this);
		};

		window.addEventListener('load',function(){
			document.body.appendChild(container);
		});

		return{
			show:function(message, className){
				const snackbar=document.createElement('div');
				snackbar.className='snackbar'+(typeof className==='string'? ' snackbar-'+className:'');
				snackbar.innerHTML=message;
				snackbar.addEventListener('click',_evtClickSnackbar);
				container.appendChild(snackbar);
				window.requestAnimationFrame(function(){
					window.requestAnimationFrame(function(){
						snackbar.className+=' open';
						snackbar.autoCloseTimeout=window.setTimeout(function(){
							_closeSnackbar(snackbar);
						}, 5000);
					});
				});
			}
		}
	}())
}


/* Initialize ACNL editor */
addEvent(window,'load',function(){
	EditorSettings.load();

	/* UI events */
	document.getElementById('lang-selector').addEventListener('change',function(){
		EditorSettings.language=this.value;
		EditorSettings.save();
		UI.Home.updateLanguageIcon();
	});

	document.getElementById('button-hide-disclaimer').addEventListener('click',function(){
		EditorSettings.showDisclaimer=false;
		EditorSettings.save();
		MarcDialogs.close();
	});

	if(EditorSettings.showDisclaimer){
		MarcDialogs.open('disclaimer');
	}else{
		document.body.removeChild(el('dialog-disclaimer'));
	}

	document.getElementById('lang-selector').value=EditorSettings.language;
	UI.Home.updateLanguageIcon();

	hide('loading');
	show('loadform');
});



function Town(){
	this.nBuildings=savegame.readU8(Offsets.MAP_N_BUILDINGS);
	this.nBuildingsEvent=savegame.readU8(Offsets.MAP_N_BUILDINGS_EVENT);

	this.treeSize=savegame.readU8(parseInt(Offsets.TOWN_TREESIZE)); //01-07
	this.cliffSide=savegame.readU8(Offsets.TOWN_CLIFF_SIDE); //00-01???
	this.grassType=savegame.readU8(Offsets.TOWN_GRASSTYPE); //00-02
	this.grassTypeIsland=savegame.readU8(Offsets.ISLAND_GRASSTYPE); //00-02

	this.playTime=new PlayTime(Offsets.TOWN_PLAYTIME);

	this.visitsReceived=(savegame.readU16(Offsets.TOWN_MULTVARS)>>3) & 0xff;

	el('town-playtime').appendChild(this.playTime.span);

	this.daysPlayed=savegame.readU16(Offsets.TOWN_DAYSPLAYED);
	el('town-sessions').innerHTML=this.daysPlayed;

	this.nativeFruit=savegame.readU8(Offsets.TOWN_NATIVEFRUIT);


	this.townId1=savegame.readU8(Offsets.TOWN_ID1);
	this.townId2=savegame.readU8(Offsets.TOWN_ID2);
	this.name=new U16String(Offsets.TOWN_NAME, 9);
	el('town-name').appendChild(this.name.createInput(function(){town.setName(this.value)}));
	
	this.currentOrdinances=new Array(4);
	var ordinanceBits=(savegame.readU8(Offsets.TOWN_ORDINANCES) & 0x1e) >> 1;
	//var ordinancesBitsSet=savegame.readU8(Offsets.TOWN_ORDINANCES_SET) & 0x70;	
	for (var i=0; i<4; i++){
		el('checkbox-ordinance'+i).checked=this.currentOrdinances[i]=ordinanceBits & (1<<i);
	}
	
	

	this.townIdReferences=false;

	this.pastVillagers=new Array(16);
	for(var i=0; i<16; i++){
		this.pastVillagers[i]=new SimpleVillager('past',i);
	}

	this.campsiteVillager=new SimpleVillager('campsite',0);
	
	if(plusMode){
		this.caravanVillagers=new Array(2);
		for(var i=0; i<2; i++)
			this.caravanVillagers[i]=new SimpleVillager('caravan',i);
	}

	/*this.bulletinBoard=new Array(10);
	for(var i=0;i<10;i++){
		this.bulletinBoard[i]=new U16String(0x068840+0x01aa*i, 50);
		el('bulletinboard').appendChild(createEditStringButton(this.bulletinBoard[i], 'bulletin board'));
	}*/

	/* read shops */
	this.shopRetail=new ItemGrid(Offsets.SHOP_RETAIL, 4, 2,false);
	this.shopNook=new ItemGrid(Offsets.SHOP_NOOK, 24, 1,false);
	this.shopGracie=new ItemGrid(Offsets.SHOP_GRACIE, 18, 1,false);
	this.shopHomes=new ItemGrid(Offsets.SHOP_HOMES, 8, 1,true);
	this.shopLeif=new ItemGrid(Offsets.SHOP_LEIF, 11, 1,false);
	this.shopAble1=new ItemGrid(Offsets.SHOP_ABLE1, 5, 1,false);
	this.shopAble2=new ItemGrid(Offsets.SHOP_ABLE2, 7, 1,false);
	this.shopKicks=new ItemGrid(Offsets.SHOP_KICKS, 6, 1,false);
	this.shopRedd=new ItemGrid(Offsets.SHOP_REDD, 2, 2,true);
	this.shopIsland=new ItemGrid(Offsets.SHOP_ISLAND, 4, 1,false);
	this.shopMuseum=new ItemGrid(Offsets.SHOP_MUSEUM, 3, 1,false);
	this.lostFound=new ItemGrid(Offsets.SHOP_LOSTFOUND, 16, 1,false);
	this.lolGyroids=new ItemGrid(Offsets.SHOP_LOLGYROIDS, 4, 1,true);
	if(plusMode)
		this.shopHarvey=new ItemGrid(0x06ae54, 2, 1, false);

	this.shopNookUnlock=savegame.readU8(Offsets.NOOK_UNLOCK);
	this.shopLeifUnlock=savegame.readU8(Offsets.LEIF_UNLOCK);
	this.shopKicksUnlock=savegame.readU8(Offsets.KICKS_UNLOCK);
	this.shopMuseumUnlock=savegame.readU8(Offsets.MUSEUM_UNLOCK);
	this.shopLolUnlock=savegame.readU8(Offsets.LOL_UNLOCK);
	this.shopDreamUnlock=savegame.readU8(Offsets.DREAM_UNLOCK);
	this.shopFortuneUnlock=savegame.readU8(Offsets.FORTUNE_UNLOCK);

	/* read museum rooms */
	this.museumRooms=new Array(4);
	for(var i=0; i<4; i++)
		this.museumRooms[i]=new Room(Offsets.MUSEUM_ROOMS+0xb98*i);

	/* read turnip prices */
	this.turnipPrices=[];
	for(var i=0;i<6;i++){
		this.turnipPrices[i]={
			AM:new NumericValue(Offsets.TOWN_TURNIP_PRICES+i*16),
			PM:new NumericValue(Offsets.TOWN_TURNIP_PRICES+i*16+8)
		}
	}

	/* read unlocked PWPs */
	this.availablePWPs=new BitArray(Offsets.TOWN_AVAILABLEPWPS, el('pwps-available'), PWPS_INGAME_LIST, 81);
}
Town.prototype.fixBuildingCounters=function(){
	var nBuildings=0;
	var nBuildingsEvent=0;
	for(var i=0; i<58; i++){
		if(!buildings[i].isEmpty()){
			if(i<56)
				nBuildings++;
			else
				nBuildingsEvent++;
		}
	}
	
	if(nBuildings!==this.nBuildings){
		UI.Snackbars.show('Building counter has been fixed ('+this.nBuildings+' &raquo; '+nBuildings+').');
		this.nBuildings=nBuildings;
	}
	if(nBuildingsEvent!==this.nBuildingsEvent){
		UI.Snackbars.show('Building counter has been fixed ('+this.nBuildingsEvent+' &raquo; '+nBuildingsEvent+').');
		this.nBuildingsEvent=nBuildingsEvent;
	}
}
Town.prototype.fixTownPlayTimeFromTreeSize=function(){
	MarcDialogs.confirm('Do you want to fix your town play time in order to match the tree size?', function(){
		var time=Constants.TOWN_PLAYTIME_FROM_TREESIZE[town.treeSize];

		town.playTime.setSeconds(0);
		town.playTime.setMinutes(0);
		town.playTime.setDays(0);
		town.playTime.setHours(time);
		town.daysPlayed=time;

		MarcDialogs.close()
	})
}
Town.prototype.setName=function(newName){
	this.searchTownIdReferences();
	this.name.set(newName);
}
Town.prototype.searchTownIdReferences=function(){
	if(!this.townIdReferences){
		var townId=new Array(5); // 5*4=20 bytes
		for(var i=0; i<5; i++)
			townId[i]=savegame.readU32(Offsets.TOWN_ID1+i*4);

		this.townIdReferences=new Array();
		for(var offset=0; offset<522624-5*4; offset+=2){
			var found=true;
			for(var i=0; i<5 && found; i++){
				if(savegame.readU32(offset+i*4)!=townId[i]){
					found=false;
				}
			}
			if(found){
				this.townIdReferences.push(offset);
				offset+=5*4;
			}
		}
	}
}
Town.prototype.refreshIdSpans=function(){
	el('town-id').innerHTML='0x'+intToHex(this.townId2)+intToHex(this.townId1);
}
Town.prototype.save=function(){	
	savegame.writeU8(Offsets.MAP_N_BUILDINGS, this.nBuildings);
	savegame.writeU8(Offsets.MAP_N_BUILDINGS_EVENT, this.nBuildingsEvent);

	savegame.writeU8(Offsets.TOWN_NATIVEFRUIT, this.nativeFruit);
	savegame.writeU8(Offsets.TOWN_CLIFF_SIDE, this.cliffSide);
	savegame.writeU8(Offsets.TOWN_GRASSTYPE, this.grassType);
	savegame.writeU8(Offsets.ISLAND_GRASSTYPE, this.grassTypeIsland);

	savegame.writeU8(Offsets.TOWN_TREESIZE, this.treeSize);

	this.playTime.save();
	savegame.writeU16(Offsets.TOWN_DAYSPLAYED, this.daysPlayed);

	/* fix town ID references */
	if(this.townIdReferences)
		for(var i=0; i<this.townIdReferences.length; i++){
			savegame.writeU8(this.townIdReferences[i], this.townId1);
			savegame.writeU8(this.townIdReferences[i]+1, this.townId2);
			this.name.save(this.townIdReferences[i]+2);
		}

	/* campsite and caravans */
	for(var i=0; i<16; i++)
		this.pastVillagers[i].save();
	this.campsiteVillager.save();
	if(plusMode)
		for(var i=0; i<2; i++)
			this.caravanVillagers[i].save();


	
	/* ordinances */
	var currentOrdinancesBits=0;
	var ordinancesEnabled=0;
	for(var i=0; i<4; i++){
		if(this.currentOrdinances[i]){
			currentOrdinancesBits+=1 << i;
			ordinancesEnabled++;
		}
	}
	savegame.writeU8(Offsets.TOWN_ORDINANCES, (savegame.readU8(Offsets.TOWN_ORDINANCES) & (~0x1e)) | (currentOrdinancesBits << 1));


	var newSetOrdinanceBits;
	if(ordinancesEnabled===0){
		newSetOrdinanceBits=0x40; //0x40 is the value set when no ordinances are enabled
	}else if(ordinancesEnabled===1){
		if(this.currentOrdinances[0]){
			newSetOrdinanceBits=0x00;
		}else if(this.currentOrdinances[1]){
			newSetOrdinanceBits=0x10;
		}else if(this.currentOrdinances[2]){
			newSetOrdinanceBits=0x20;
		}else if(this.currentOrdinances[3]){
			newSetOrdinanceBits=0x30;
		}
	}else{
		newSetOrdinanceBits=0x70; //0x70 will prevent the ordinance from being reset every day.
	}	
	savegame.writeU8(Offsets.TOWN_ORDINANCES_SET, (savegame.readU8(Offsets.TOWN_ORDINANCES_SET) & (~0x70)) | newSetOrdinanceBits);


	/* shops */
	this.shopRetail.save();
	this.shopNook.save();
	this.shopGracie.save();
	this.shopHomes.save();
	this.shopLeif.save();
	this.shopAble1.save();
	this.shopAble2.save();
	this.shopKicks.save();
	this.shopRedd.save();
	this.shopIsland.save();
	this.shopMuseum.save();
	this.lostFound.save();
	this.lolGyroids.save();
	if(plusMode)
		this.shopHarvey.save();

	savegame.writeU8(Offsets.NOOK_UNLOCK, this.shopNookUnlock);
	savegame.writeU8(Offsets.NOOK_UNLOCK+1, this.shopNookUnlock);
	savegame.writeU8(Offsets.LEIF_UNLOCK, this.shopLeifUnlock);
	savegame.writeU8(Offsets.KICKS_UNLOCK, this.shopKicksUnlock);
	savegame.writeU8(Offsets.MUSEUM_UNLOCK, this.shopMuseumUnlock);
	savegame.writeU8(Offsets.LOL_UNLOCK, this.shopLolUnlock);
	savegame.writeU8(Offsets.DREAM_UNLOCK, this.shopDreamUnlock);
	savegame.writeU8(Offsets.FORTUNE_UNLOCK, this.shopFortuneUnlock);

	/* museum rooms */
	for(var i=0; i<4; i++)
		this.museumRooms[i].save();

	/* turnip prices */
	for(var i=0;i<6;i++){
		this.turnipPrices[i].AM.save();
		this.turnipPrices[i].PM.save();
	}

	/* write available PWPs */
	this.availablePWPs.save();
}


function generateTownRoofColorIds(townIdX){
	var arr=new Array(4);
	arr[0]=((townIdX & 0xfc)>>>0)+0x00;
	arr[1]=arr[0]+0x01;
	arr[2]=arr[0]+0x02;
	arr[3]=arr[0]+0x03;
	return arr;
}

Town.prototype.checkHHDStatus=function(){
	var b=(savegame.readU8(Offsets.HHD_UNLOCK) & 0x04);
	if(b){
		el('town-unlockhhd').children[1].style.color='green';
		el('town-unlockhhd').children[1].innerText='Unlocked';
	}
	return b
}
Town.prototype.unlockHHDContent=function(){
	var b=savegame.readU8(Offsets.HHD_UNLOCK);
	savegame.writeU8(Offsets.HHD_UNLOCK, b | 0x04);
	this.checkHHDStatus();
}





function ItemList(offset, nItems, inside){
	//this.offset=offset;
	this.items=new Array(nItems);
	this.edited=false;
	for(var i=0; i<nItems; i++)
		this.items[i]=new Item(offset, i, inside);
}
ItemList.prototype.save=function(){
	if(this.edited)
		for(var i=0; i<this.items.length; i++)
			this.items[i].save();
}
function ItemGrid(offset, w, h, inside, minItem, maxItem){
	this.canvas=document.createElement('canvas');
	this._ctx=this.canvas.getContext('2d');
	this.canvas.className='grid';
	this.width=w;
	this.height=h;
	this.nItems=w*h;
	this.inside=inside;
	if(typeof offset==='number'){
		this.itemList=new ItemList(offset, this.nItems, inside);
	}else{
		this.itemListPlayerProp=offset;
		this.itemList=players[0][offset];
	}
		

	this.tileSize=(w==16 && h==16)?10:16;
	this.canvas.width=(this.tileSize*this.width)-1;
	this.canvas.height=(this.tileSize*this.height)-1;

	this.repaintAll();

	this.minItem=minItem?minItem:0x0000;
	this.maxItem=maxItem?maxItem:0xffff;

	addItemGridEvents(this);

}
ItemGrid.prototype.setToCurrentPlayer=function(p){
	this.itemList=currentPlayer[this.itemListPlayerProp];
	this.repaintAll();
}
ItemGrid.prototype.save=function(){
	if(!this.itemListPlayerProp)
		this.itemList.save();
}

ItemGrid.prototype.repaintTile=function(i){
	var x=(i%this.width)*this.tileSize;
	var y=parseInt(i/this.width)*this.tileSize;

	/* paint background */
	if(typeof this.bg==='number'){
		var cropAcreX=(this.bg%20)*64+(i%this.width)*4;
		var cropAcreY=parseInt(this.bg/20)*64+(parseInt(i/this.width))*4;

		this._ctx.drawImage(acresImage, cropAcreX, cropAcreY, 4, 4, x, y, this.tileSize, this.tileSize);
		//this._ctx.drawImage(acresImage, cropAcreX, cropAcreY, 64, 64, 0, 0, this.canvas.width, this.canvas.height);
	}else{
		this._ctx.fillStyle='#ddd';
		this._ctx.fillRect(x, y, this.tileSize, this.tileSize);
	}

	var item=this.itemList.items[i];
	if(item.id!=0x7ffe && item.id!=0x7ffc){
		if(item.id==0x009d)
			this._ctx.fillStyle='#877861';
		else if(item.id>=0x9f && item.id<=0xca)
			this._ctx.fillStyle='#ec67b8';
		else if(item.isWiltedFlower())
			this._ctx.fillStyle='#ac2778';
		else if(item.id>=0x98 && item.id<=0x9c)
			this._ctx.fillStyle='#000';
		else if((!plusMode && item.id>=0x20a7 && item.id<=0x2112) || (plusMode && item.id>=0x20ac && item.id<=0x2117))
			this._ctx.fillStyle='yellow';
		else if((!plusMode && item.id>=0x2126 && item.id<=0x2239) || (plusMode && item.id>=0x212b && item.id<=0x223e))
			this._ctx.fillStyle='#a4ecb8';
		else if((!plusMode && item.id>=0x223a && item.id<=0x227a) || (plusMode && item.id>=0x223f && item.id<=0x2282))
			this._ctx.fillStyle='#a4ece8';
		else if((!plusMode && item.id>=0x227b && item.id<=0x2285) || (plusMode && item.id>=0x2283 && item.id<=0x228d))
			this._ctx.fillStyle='#bbac9d';
		else if((!plusMode && item.id>=0x2286 && item.id<=0x2341) || (plusMode && item.id>=0x228e && item.id<=0x234b))
			this._ctx.fillStyle='#bae33e';
		else if(item.id>=Offsets.MIN_WALL && item.id<=Offsets.MAX_FLOOR)
			this._ctx.fillStyle='#994040';
		else if((!plusMode && item.id>=0x2446 && item.id<=0x28b1) || (plusMode && item.id>=0x2495 && item.id<=0x295b))
			this._ctx.fillStyle='#2874aa';
		else if((!plusMode && item.id>=0x28b2 && item.id<=0x2934) || (plusMode && item.id>=0x295c && item.id<=0x29de))
			this._ctx.fillStyle='#d48324';
		else if((!plusMode && item.id>=0x2e2c && item.id<=0x2e2f) || (plusMode && item.id>=0x30cc && item.id<=0x30cf))
			this._ctx.fillStyle='#2e5570';
		else if((!plusMode && item.id>=0x2e30 && item.id<=0x2e8f) || (plusMode && item.id>=0x30d2 && item.id<=0x3108))
			this._ctx.fillStyle='#cf540a';
		else if((!plusMode && item.id>=0x2e90 && item.id<=0x2ed2) || (plusMode && item.id>=0x3130 && item.id<=0x3186))
			this._ctx.fillStyle='#868686';
		else if((!plusMode && item.id>=0x303b && item.id<=0x307a) || (plusMode && item.id>=0x334c && item.id<=0x338b))
			this._ctx.fillStyle='#818181';
		else if(item.isWeed())
			this._ctx.fillStyle='green';
		else if(item.id>=0x05 && item.id<=0x97)
			this._ctx.fillStyle='#5cff54';
		else
			this._ctx.fillStyle='#3cde30'

		if(players && this.belongsToMap===map && item.id===0x009d && el('checkbox-render-patterns').checked){
			const player=(item.flag1 >> 4) & 0b00000011;
			const pattern=item.flag1 & 0b00001111;
			this._ctx.drawImage(players[player].patterns[pattern].canvas, x, y, this.tileSize, this.tileSize);
		}else{
			this._ctx.fillRect(x, y, this.tileSize, this.tileSize);
		}

		var icon=0;
		if(!el('item_'+item.id)){
			icon=1;
		}else if(this.inside){
			var rotation=item.flag2>>4;
			if(rotation==0x04)
				icon=4;
			else if(rotation==0x08)
				icon=5;
			else if(rotation==0x0c)
				icon=6;
		}else if(item.isBuried()){
			icon=2;
		}

		if(icon)
			this._ctx.drawImage(acresImage, icon*20, 704, 16, 16, x, y, 16, 16);
	}else if(item.id==0x7ffc){
		this._ctx.fillStyle='#bbb';
		this._ctx.fillRect(x, y, this.tileSize, this.tileSize);
	}

	if(item.hasBuildingMask)
		this._ctx.drawImage(acresImage, 140, 704, 16, 16, x, y, 16, 16);
	if(item.hasBuilding)
		this._ctx.drawImage(acresImage, 60, 704, 16, 16, x, y, 16, 16);

	this._ctx.fillStyle='rgba(0,0,0,.15)';
	this._ctx.fillRect(x+this.tileSize-1, y, 1, this.tileSize);
	this._ctx.fillRect(x, y+this.tileSize-1, this.tileSize,1);
}
ItemGrid.prototype.repaintAll=function(){
	/* paint grid */
	for(var i=0; i<this.nItems; i++)
		this.repaintTile(i);
}



var acresImage=new Image();
acresImage.src='./resources/acres.png';








function isLockedItem(itemId){
	return (!plusMode && ((itemId>=0x30f9 && itemId<=0x30fc) || (itemId>=0x30a2 && itemId<=0x30a9))) ||
		(plusMode && ((itemId>=0x341a && itemId<=0x341d) || (itemId>=0x33bc && itemId<=0x33c3)))	
}

function refreshCurrentItemText(){
	el('popover-toggler-item').innerHTML=el('items').options[el('items').selectedIndex].text;
}
function click(evt,itemGridObj,firstClick){
	var rect=itemGridObj.canvas.getBoundingClientRect();
	var x=parseInt((evt.clientX-rect.left)/itemGridObj.tileSize);
	var y=parseInt((evt.clientY-rect.top)/itemGridObj.tileSize);
	if(parseInt(evt.clientX-rect.left)>itemGridObj.canvas.width || parseInt(evt.clientY-rect.top)>itemGridObj.canvas.height)
		return false;

	var itemSlot=itemGridObj.itemList.items[(parseInt(y*itemGridObj.width)+x)];

	if(currentEditingItem===itemSlot && mouseHeld && !firstClick)
		return false;

	currentEditingItem=itemSlot;

	if(itemGridObj.belongsToMap && !itemGridObj.belongsToMap.currentMovingBuilding){
		if(itemSlot.hasBuilding)
			itemGridObj.canvas.parentElement.style.cursor='grab';
		else
			itemGridObj.canvas.parentElement.style.cursor='default';
	}


	if(itemGridObj.belongsToMap && itemGridObj.belongsToMap.currentMovingBuilding){
		if(mouseHeld===1){
			itemGridObj.belongsToMap.currentMovingBuilding.move(itemGridObj.startX+x, itemGridObj.startY+y);
			itemGridObj.belongsToMap.showGlowingTile(itemGridObj.belongsToMap.currentMovingBuilding.x, itemGridObj.belongsToMap.currentMovingBuilding.y);
		}else{
			itemGridObj.belongsToMap.hideGlowingTile();
			itemGridObj.belongsToMap.currentMovingBuilding=null;
			itemGridObj.canvas.parentElement.style.cursor='grab';
		}
	}else if(mouseHeld===1){
		if(firstClick && itemSlot.hasBuilding){
			itemGridObj.canvas.parentElement.style.cursor='grabbing';
			itemGridObj.belongsToMap.currentMovingBuilding=itemSlot.hasBuilding;
		}else if(
			(el('items').value>=itemGridObj.minItem && el('items').value<=itemGridObj.maxItem)
			||
			(el('items').value==0x33a7 && itemGridObj.nItems===1 && itemGridObj.minItem!==Offsets.MIN_SONG)
		){
			if(firstClick && itemGridObj.inside && itemSlot.id!==0x7ffe && itemSlot.id!==0x7ffc && itemSlot.id==el('items').value && itemSlot.flag1==getFlagByte(1) && itemSlot.flag2==getFlagByte(2)){
				var rotation=itemSlot.flag2>>4;

				var newFlag2;
				if(rotation==0x04)
					newFlag2=0x80+(itemSlot.flag2%16)
				else if(rotation==0x08)
					newFlag2=0xc0+(itemSlot.flag2%16)
				else if(rotation==0x0c)
					newFlag2=0x00+(itemSlot.flag2%16)
				else
					newFlag2=0x40+(itemSlot.flag2%16)

				setFlagBits(2, newFlag2);
			}
			if(!isLockedItem(el('items').value) && !isLockedItem(itemSlot.id))
				itemSlot.set(getFlagByte(2),getFlagByte(1),el('items').value);

			itemGridObj.repaintTile((parseInt(y*itemGridObj.width)+x));
		}
		if(EditorSettings.autoIncrement)
			el('items').selectedIndex=el('items').selectedIndex+1;
		itemGridObj.itemList.edited=true;
	}else if(mouseHeld===2){
		if(!el('item_'+itemSlot.id)){
			const option=document.createElement('option');
			option.id='item_'+itemSlot.id;
			option.value=itemSlot.id;
			option.innerHTML='unknown item: 0x'+intToHex(itemSlot.id, 1);
			document.getElementById('items').insertBefore(option, document.getElementById('item_32766'));
		}
		el('items').value=itemSlot.id;
		refreshCurrentItemText();

		buildFlagEditor(itemSlot.flag1, itemSlot.flag2);
	}


	if(itemGridObj.belongsToMap){
		el('tooltip-name').innerHTML='<b>'+(itemGridObj.startX+x)+'x'+(itemGridObj.startY+y)+':</b> '+itemSlot.name;
	}else{
		el('tooltip-name').innerHTML=itemSlot.name;
	}
	el('tooltip-hex').innerHTML=itemSlot.nameHex;
	if(itemGridObj.belongsToMap===map && itemSlot.id===0x009d &&el('checkbox-render-patterns').checked){
		const player=(itemSlot.flag1 >> 4) & 0b00000011;
		const pattern=itemSlot.flag1 & 0b00001111;
		el('tooltip-pattern').getContext('2d').drawImage(players[player].patterns[pattern].canvas, 0, 0);
		el('tooltip-pattern').style.display='block';
	}else{
		el('tooltip-pattern').style.display='none';
	}

	el('tooltip').style.top=window.pageYOffset+24+rect.top+y*itemGridObj.tileSize+'px';
	el('tooltip').style.left=rect.left+24+x*itemGridObj.tileSize+'px';
}



const _evtGridMouseDown=function(evt,itemGridObj){
	if(evt.which==3)
		mouseHeld=2;
	else if(evt.which==1)
		mouseHeld=1;
	else mouseHeld=0;

	click(evt,itemGridObj,true);
}
const _evtGridMouseUp=function(evt){mouseHeld=0}
const _evtGridMouseEnter=function(){show('tooltip')};
const _evtgridMouseLeave=function(){hide('tooltip')};
function addItemGridEvents(itemGridObj){
	addEvent(itemGridObj.canvas,'click',preventDefault);
	addEvent(itemGridObj.canvas,'mousedown',function(evt){_evtGridMouseDown(evt,itemGridObj)});
	addEvent(itemGridObj.canvas,'mouseup',_evtGridMouseUp);
	addEvent(itemGridObj.canvas,'mousemove',function(evt){click(evt,itemGridObj,false)});

	addEvent(itemGridObj.canvas,'mouseenter',_evtGridMouseEnter);
	addEvent(itemGridObj.canvas,'mouseleave',_evtgridMouseLeave);
}

function ItemGridMap(type){
	var nGrids, nAcres, acreWidth;
	if(type==='map'){
		nGrids=5*4;
		nAcres=7*6;
		acreWidth=5;
		this.offsetItems=Offsets.MAP_ITEMS;
	}else{
		nGrids=2*2;
		nAcres=4*4;
		acreWidth=2;
		this.offsetItems=Offsets.ISLAND_ITEMS;
	}

	this.gridMaxWidth=(acreWidth)*16;
	this.gridMaxHeight=(nGrids/(acreWidth))*16;
	this.gridXY=new Array(this.gridMaxWidth);
	for(var x=0; x<this.gridMaxWidth; x++)
		this.gridXY[x]=new Array(this.gridMaxHeight);

	this.itemGrids=new Array(nGrids);
	this.items=new Array(16*16*nGrids);
	for(var i=0; i<nGrids; i++){
		this.itemGrids[i]=new ItemGrid(this.offsetItems+i*4*16*16, 16, 16);
		this.itemGrids[i].belongsToMap=this;
		this.itemGrids[i].startX=16+16*(i%acreWidth);
		this.itemGrids[i].startY=16+16*parseInt(i/acreWidth);

		el('map-'+type).appendChild(this.itemGrids[i].canvas);

		for(var j=0; j<256; j++){
			this.itemGrids[i].itemList.items[j].acre=this.itemGrids[i];
			this.itemGrids[i].itemList.items[j].acreTile=j;
			this.gridXY[this.itemGrids[i].startX-16+(j%16)][this.itemGrids[i].startY-16+parseInt(j/16)]=this.itemGrids[i].itemList.items[j];
			this.items[i*16*16+j]=this.itemGrids[i].itemList.items[j];
		}
	}

	this.acres=[];
	var itemGrid=0;
	for(var i=0; i<nAcres; i++){
		if(
			(type==='map' && i>7 && i<34 && i%7!=0 && i%7!=6) ||
			(type==='island' && i>4 && i<11 && i!=7 && i!=8)
		){
			this.acres[i]=new Acre(type, i, this.itemGrids[itemGrid]);
			itemGrid++;
		}else{
			this.acres[i]=new Acre(type, i);
		}
	}

	this.glowingTile=document.createElement('div');
	this.glowingTile.className='glowing-tile';
	el('map-'+type).appendChild(this.glowingTile);
	this.hideGlowingTile();
}
ItemGridMap.prototype.repaint=function(){
	for(var i=0; i<this.itemGrids.length; i++)
		this.itemGrids[i].repaintAll();
}
ItemGridMap.prototype.save=function(){
	for(var i=0; i<this.itemGrids.length; i++)
		this.itemGrids[i].save();

	for(var i=0; i<this.acres.length; i++)
		this.acres[i].save();
}
ItemGridMap.prototype.replaceItems=function(search,replace,flag1,flag2){
	flag1=flag1 || 0x00;
	flag2=flag2 || 0x00;

	var count=0;
	for(var i=0;i<map.items.length;i++){
		if(map.items[i].id===search){
			map.items[i].set(flag2,flag1,replace);
			map.itemGrids[i >> 8].itemList.edited=true;
			count++;
		}
	}
	if(count)
		map.repaint();

	return count;
}
ItemGridMap.prototype.showGlowingTile=function(x,y){
	this.glowingTile.style.display='block';

	this.glowingTile.style.left=((x-16)*10)+'px';
	this.glowingTile.style.top=((y-16)*10)+'px';
}
ItemGridMap.prototype.hideGlowingTile=function(){
	this.glowingTile.style.display='none';
}




/* Grass Map (today): keeps track of current day grass deterioration (will be applied next day) */
function GrassMapToday(offset,width,height){
	this.offset=offset;
	this.width=width;
	this.height=height;

	this.tiles=new Array(width*height*16*16);
	for(var i=0; i<this.tiles.length; i++){
		this.tiles[i]=savegame.readU8(this.offset+i);
	}

	/*
	this.canvas=el('grass-current');
	this.canvas.width=this.width*16;
	this.canvas.height=this.height*16;
	*/
}
/*GrassMapToday.prototype.draw=function(){
	var tile=0;
	var ctx=this.canvas.getContext('2d');
	for(var i=0; i<this.height; i++){
		for(var j=0; j<this.width; j++){
			for(var y=0; y<16; y++){
				for(var x=0; x<16; x++){
					var color=255-(this.tiles[tile] & 0x0f) * 17;
					ctx.fillStyle='rgba('+color+','+color+','+color+',1)';
					ctx.fillRect(j*16+x, i*16+y, 1, 1);

					tile++;
				}
			}
		}
	}
}*/
GrassMapToday.prototype.reset=function(){
	for(var i=0; i<this.tiles.length; i++)
		this.tiles[i]=0x00;
}
GrassMapToday.prototype.save=function(){
	for(var i=0; i<this.tiles.length; i++)
		savegame.writeU8(this.offset+i,this.tiles[i]);
}






function mouseDownGrass(evt,grassMap){
	if(evt.which==3)
		mouseHeld=2;
	else if(evt.which==1)
		mouseHeld=1;
	else mouseHeld=0;

	clickGrass(evt,grassMap,true);
}

var GRASS_PENCILS=[
	[0,0],
	[0,0,1,0,0,1,1,1],
	[0,0,1,0,0,1,1,1,-1,-1,-1,0,-1,1,0,-1,1,-1],
	[-1,-2,0,-2,1,-2,-2,-1,-1,-1,0,-1,1,-1,2,-1,-2,0,-1,0,0,0,1,0,2,0,-2,1,-1,1,0,1,1,1,2,1,-1,2,0,2,1,2],
];
var grassPencilIntensity;
var grassPencilSize;
function clickGrass(evt,grassMap,firstClick){
	var rect=grassMap.canvas.getBoundingClientRect();
	if(parseInt(evt.clientX-rect.left)>grassMap.canvas.width || parseInt(evt.clientY-rect.top)>grassMap.canvas.height)
		return false;

	var clickedTile=y*grassMap.width*16+x;
	if(currentEditingItem===clickedTile && mouseHeld && !firstClick)
		return false;
	currentEditingItem=clickedTile;

	if(mouseHeld){
		var x=parseInt((evt.clientX-rect.left)/grassMap._TILE_SIZE);
		var y=parseInt((evt.clientY-rect.top)/grassMap._TILE_SIZE);

		if(mouseHeld==1){
			for(var i=0; i<GRASS_PENCILS[grassPencilSize].length; i+=2){
				grassMap.alterSingle(x+GRASS_PENCILS[grassPencilSize][i],y+GRASS_PENCILS[grassPencilSize][i+1],grassPencilIntensity);
			}
		}else if(mouseHeld==2){
			for(var i=0; i<GRASS_PENCILS[grassPencilSize].length; i+=2){
				grassMap.alterSingle(x+GRASS_PENCILS[grassPencilSize][i],y+GRASS_PENCILS[grassPencilSize][i+1],0);
			}
		}

	}
}
function addGrassMapEvents(grassMap){
	addEvent(grassMap.canvas,'click',preventDefault);
	addEvent(grassMap.canvas,'mousedown',function(evt){mouseDownGrass(evt,grassMap)});
	addEvent(grassMap.canvas,'mouseup',_evtGridMouseUp);
	addEvent(grassMap.canvas,'mousemove',function(evt){clickGrass(evt,grassMap,false)});
}


var GRASS_TILES=[
	0,	1,	4,	5,	16,	17,	20,	21,
	2,	3,	6,	7,	18,	19,	22,	23,
	8,	9,	12,	13,	24,	25,	28,	29,
	10,	11,	14,	15,	26,	27,	30,	31,
	32,	33,	36,	37,	48,	49,	52,	53,
	34,	35,	38,	39,	50,	51,	54,	55,
	40,	41,	44,	45,	56,	57,	60,	61,
	42,	43,	46,	47,	58,	59,	62,	63
];
function GrassMap(offset,width,height){
	this.offset=offset;
	this.width=width;
	this.height=height;
	this._TILE_SIZE=4;

	this.tiles=new Array(width*height*16*16);
	for(var i=0; i<this.tiles.length; i++)
		this.tiles[i]=savegame.readU8(this.offset+i);

	this.canvas=document.createElement('canvas');
	this.canvas.width=(width-1)*16*this._TILE_SIZE; //width-1 removes unused column
	this.canvas.height=height*16*this._TILE_SIZE;
	this.canvas.offset=this.offset+(8*8)*i;
	el('grass-quads').appendChild(this.canvas);
	addGrassMapEvents(this);

	this.draw();
}
GrassMap.prototype._refreshBackground=function(){
	try{
		var canvas=document.createElement('canvas');
		var acreSize=this._TILE_SIZE*16;
		canvas.width=acreSize*(this.width-1);
		canvas.height=acreSize*(this.height);
		var ctx=canvas.getContext('2d');

		for(var y=0; y<this.height; y++){
			for(var x=0; x<this.width-1; x++){
				var acreId=map.acres[y*(this.width-1)+x].id;

				var cropAcreX=(acreId%20)*64;
				var cropAcreY=parseInt(acreId/20)*64;

				var cropHeight=(acreId==0xa8 || (acreId>=0x9e && acreId<=0xa3))?40:64;

				ctx.drawImage(acresImage, cropAcreX, cropAcreY, 64, cropHeight, acreSize*x, acreSize*y, acreSize, acreSize);
			}
		}


		/* grayscale */
		var imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
		var data=imageData.data;
		for(var i=0; i<data.length; i+=4) {
			//var brightness=0.34*data[i] + 0.5*data[i+1] + 0.16*data[i+2];
			//var brightness=0.44*data[i] + 0.6*data[i+1] + 0.26*data[i+2];
			var brightness=0.54*data[i] + 0.7*data[i+1] + 0.36*data[i+2];
			data[i]=brightness;		//red
			data[i+1]=brightness;	//green
			data[i+2]=brightness;	//blue
		}
		ctx.putImageData(imageData, 0, 0);




		el('grass-quads').style.backgroundImage='url('+canvas.toDataURL()+')';
	}catch(e){
	}
}
GrassMap.prototype.draw=function(){
	this._refreshBackground();

	var ctx=this.canvas.getContext('2d');
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	for(var y=0; y<this.height*16; y++){
		for(var x=0; x<this.width*16; x++){
			this.drawTile(x,y);
		}
	}
}
GrassMap.prototype.drawTile=function(x,y){
	var ctx=this.canvas.getContext('2d');
	ctx.clearRect(x*this._TILE_SIZE, y*this._TILE_SIZE, this._TILE_SIZE, this._TILE_SIZE);
	ctx.fillStyle='rgba(115,189,74,+'+(this.tiles[this._getTileOffset(x,y)]/255)+')';
	ctx.fillRect(x*this._TILE_SIZE, y*this._TILE_SIZE, this._TILE_SIZE, this._TILE_SIZE);
}
GrassMap.prototype._getTileOffset=function(x,y){
	return 64*(parseInt(y/8)*this.width*2+parseInt(x/8))+GRASS_TILES[(y%8)*8+(x%8)]
}
GrassMap.prototype.alterSingle=function(x,y,intensity){
	if(x>=0 && x<=127 && y>=0 && y<=95){
		var t=this._getTileOffset(x,y);
		this.tiles[t]=intensity;
		this.drawTile(x,y);
	}
}
GrassMap.prototype.save=function(){
	for(var i=0; i<this.tiles.length; i++)
		savegame.writeU8(this.offset+i,this.tiles[i]);
}











function Acre(type, n, itemGrid){
	this.n=n;
	if(type==='map')
		this.offset=Offsets.MAP_ACRES+n*2;
	else
		this.offset=Offsets.ISLAND_ACRES+n*2;


	this.id=savegame.readU8(this.offset);

	if(itemGrid)
		this.itemGrid=itemGrid;

	this.button=document.createElement('span');
	this.button.className='acre-button';

	this.span=document.createElement('span');
	this.span.className='mono';
	this.span.innerHTML=intToHex(this.id,1);
	this.button.appendChild(this.span);

	if(type==='map' && n<=6)
		this.button.style.height='40px';

	el(type+'-acres').appendChild(this.button);
	this.refreshThumbnail();

	addAcreEvents(this);
}
Acre.prototype.isTownPlaza=function(){
	return this.id===0x07 || this.id===0x08 || this.id===0x09;
}
Acre.prototype.hasPond=function(){
	return this.id===0x03 || this.id===0x04 || this.id===0x05 || this.id===0x0c || this.id===0x0d || this.id===0x0e || this.id===0x0f || this.id===0x12;
}
Acre.prototype.hasWaterfallWall=function(){
	return (!plusMode && (this.id===0x9b || this.id===0xa4)) || (plusMode && (this.id===0x9c || this.id===0xa6));
}
Acre.prototype.hasWaterfallSea=function(){
	return this.id>=0x70 && this.id<=0x84;
}
Acre.prototype.hasSlope=function(){
	return this.id>=0x85 && this.id<=0x99;
}
Acre.prototype.setId=function(newId){
	this.id=newId;
	this.span.innerHTML='0x'+intToHex(this.id,1);
	this.refreshThumbnail();
}
Acre.prototype.save=function(){
	savegame.writeU16(this.offset, this.id)
}
Acre.prototype.refreshThumbnail=function(){
	var normalModeFix=0;
	if(!plusMode){
		if(this.id>=0x9b)
			normalModeFix++;
		if(this.id>=0xa4)
			normalModeFix++;
	}

	this.button.style.backgroundPosition=getAcreThumbnailPosition(this.id+normalModeFix, 64);

	if(this.itemGrid){
		this.itemGrid.bg=this.id+normalModeFix;
		this.itemGrid.repaintAll();
	}
}
const _evtClickAcre=function(acre){
	currentEditingItem=acre;
	MarcDialogs.open('acre');
	
	
	const acreButtons=document.querySelectorAll('#acre-selector .acre-button');
	acreButtons.forEach(function(acreButton){
		if(acreButton.acreId===currentEditingItem.id){
			acreButton.className='acre-button selected';
			acreButton.scrollIntoView({block:'center'});
		}else{
			acreButton.className='acre-button';
		}
	});
}
function addAcreEvents(a){
	addEvent(a.button, 'mousedown', function(){_evtClickAcre(a)});
}


function importMap(){importMapOffset(map)}
function importIsland(){importMapOffset(island)}
function importMapOffset(mapOffset){
	var validFileName=checkPlusSavegame(savegame)?'garden_plus':'garden';

	if(!checkValidSavegame(tempFile) || checkPlusSavegame(tempFile)!==checkPlusSavegame(savegame)){
		UI.Snackbars.show('Invalid '+validFileName+'.dat file.', 'danger');
		return false;
	}

	currentEditingItem=mapOffset;
	MarcDialogs.open('importmap');
}
function acceptImportMap(){
	var editingMap=currentEditingItem;

	/* import acres */
	if(el('import-acres').checked){
		var _OFFSET;
		if(editingMap===island)
			_OFFSET=Offsets.ISLAND_ACRES;
		else
			_OFFSET=Offsets.MAP_ACRES;

		for(var i=0; i<editingMap.acres.length; i++)
			editingMap.acres[i].setId(tempFile.readU8(_OFFSET+i*2));

		if(editingMap===map)
			grassMap._refreshBackground();
	}


	/* import items */
	if(el('import-items').checked){
		var _OFFSET;
		if(editingMap===island)
			_OFFSET=Offsets.ISLAND_ITEMS;
		else
			_OFFSET=Offsets.MAP_ITEMS;

		for(var i=0; i<editingMap.items.length; i++){
			var id=tempFile.readU16(_OFFSET+i*4+0);
			var flag1=tempFile.readU8(_OFFSET+i*4+2);
			var flag2=tempFile.readU8(_OFFSET+i*4+3);
			editingMap.items[i].set(flag2, flag1, id);
		}
		for(var i=0; i<editingMap.itemGrids.length; i++){
			editingMap.itemGrids[i].itemList.edited=true;
			editingMap.itemGrids[i].repaintAll();
		}
	}


	/* import grass */
	if(el('import-grass').checked && editingMap===map){
		var _OFFSET=Offsets.MAP_GRASS;

		for(var i=0; i<grassMap.tiles.length; i++){
			grassMap.tiles[i]=tempFile.readU8(_OFFSET+i);
		}
		grassMap.draw();
		grassMapToday.reset();
	}


	/* import buildings */
	if(el('import-buildings').checked){
		var _OFFSET, FIRST_BUILDING, N_BUILDINGS;
		if(editingMap===island){
			_OFFSET=Offsets.ISLAND_BUILDINGS;
			FIRST_BUILDING=58;
			N_BUILDINGS=2;
		}else{
			_OFFSET=Offsets.MAP_BUILDINGS;
			FIRST_BUILDING=0;
			N_BUILDINGS=58;
		}

		for(var i=0; i<N_BUILDINGS; i++){
			var oldBuilding=buildings[FIRST_BUILDING+i];
			if(oldBuilding.id>0x11 && !oldBuilding.isEmpty()){
				oldBuilding.remove();
			}
		}

		for(var i=0; i<N_BUILDINGS; i++){
			var newId=tempFile.readU16(_OFFSET+i*4+0);
			var newX=tempFile.readU8(_OFFSET+i*4+2);
			var newY=tempFile.readU8(_OFFSET+i*4+3);

			if(newId<=0x11){
				for(var j=0; j<N_BUILDINGS; j++){
					var oldBuilding=buildings[FIRST_BUILDING+j];
					if(oldBuilding.id==newId){
						oldBuilding.x=newX;
						oldBuilding.y=newY;
						oldBuilding._refreshMask(true);
						break;
					}
				}
			}else if(newId>=0x4c && (newId!=0xf8 && newId!=0xfc)){
				for(var j=0; j<N_BUILDINGS; j++){
					var oldBuilding=buildings[FIRST_BUILDING+j];
					if(oldBuilding.id==0xf8 || oldBuilding.id==0xfc){
						oldBuilding.x=newX;
						oldBuilding.y=newY;
						oldBuilding.set(newId);
						break;
					}
				}
			}
		}
		town.fixBuildingCounters();
	}
	

	MarcDialogs.close();
	if(currentEditingItem===map)
		checkWarnings();
}











function Building(type, n){
	this.n=n;
	this.type=type;

	if(type==='island'){
		this.offset=Offsets.ISLAND_BUILDINGS+n*4;
		this.map=island;
		this._MAXWIDTH=64;
		this._MAXHEIGHT=64;
	}else{
		this.offset=Offsets.MAP_BUILDINGS+n*4;
		this.map=map;
		this._MAXWIDTH=112;
		this._MAXHEIGHT=96;
		this.eventBuilding=(n>=56);
	}
	this.id=savegame.readU16(this.offset);
	this.x=savegame.readU8(this.offset+2);
	this.y=savegame.readU8(this.offset+3);

	if(!this.isEmpty())
		this._createEditRow();
}

Building.prototype._refreshMask=function(status, doNotRefreshOtherMasks){
	if(!status || !this.isEmpty()){
		var x=this.x-16;
		var y=this.y-16;
		if(x>=0 && y>=0 && x<this.map.gridMaxWidth && y<this.map.gridMaxHeight){
			if(status){
				this.map.gridXY[x][y].hasBuilding=this;
				this.map.gridXY[x][y].refreshName();
			}else{
				this.map.gridXY[x][y].hasBuilding=false;
			}
			this.map.gridXY[x][y].acre.repaintTile(this.map.gridXY[x][y].acreTile);
		}

		var maskCoords=getBuildingMask(this.id);
		for(var i=0; i<maskCoords.length; i++){
			x=this.x+maskCoords[i].x-16;
			y=this.y+maskCoords[i].y-16;
			if(x>=0 && y>=0 && x<this.map.gridMaxWidth && y<this.map.gridMaxHeight){
				this.map.gridXY[x][y].hasBuildingMask=status;
				this.map.gridXY[x][y].acre.repaintTile(this.map.gridXY[x][y].acreTile);
			}
		}

		/* repaint rest of masks */
		if(status && !doNotRefreshOtherMasks)
			for(var i=0; i<buildings.length; i++)
				if(buildings[i]!==this)
					buildings[i]._refreshMask(true, true);
	}
}
Building.prototype.isEmpty=function(){
	return (!plusMode && this.id===0xf8) || (plusMode && this.id===0xfc);
}
Building.prototype.isIslandStorageBin=function(){
	return this.id===0x5c;
}
Building.prototype.isDock=function(){
	return this.id===0x5d;
}
Building.prototype.isCustomDesign=function(){
	return (!plusMode && (this.id==0xda || this.id==0xdb)) || (plusMode && (this.id==0xdc || this.id==0xdd));
}
Building.prototype.set=function(newId){
	this._refreshMask(false);

	var wasEmpty=this.isEmpty();
	this.id=newId;
	if(wasEmpty && !this.isEmpty())
		town.nBuildings++;
	if(this.isEmpty()){
		this.remove();
	}else if(this.tr){
		if(buildingHash[this.id])
			this.spanBuildingName.children[0].innerHTML=buildingHash[this.id].name;
		else
			this.spanBuildingName.children[0].innerHTML='(?) 0x'+this.id.toString(16);




	}else{
		this.x=16;
		this.y=16;
		this._createEditRow();
	}
	this._refreshMask(true);
}
Building.prototype.remove=function(){
	this._refreshMask(false);

	if(!this.isEmpty())
		town.nBuildings--;
	if(this.tr){
		if(this.type==='map')
			el('buildings').removeChild(this.tr);
		this.tr=null;
	}

	this.x=0;
	this.y=0;
	this.id=plusMode? 0xfc : 0xf8;
}
Building.prototype._createEditRow=function(){
	this.spanBuildingName=createSpan('');
	if(buildingHash[this.id])
		this.spanBuildingName.appendChild(createSpan(buildingHash[this.id].name));
	else
		this.spanBuildingName.appendChild(createSpan(' 0x'+this.id.toString(16)));

	this._refreshMask(true);



	
	this.tr=document.createElement('li');
	this.tr.className='building-row';

	var divCoord=document.createElement('div');
	divCoord.className='div-coord';

	
	this.inputX=createInput(this.x);
	addNumericInputEvent(this.inputX, 0, 110);
	this.inputY=createInput(this.y);
	addNumericInputEvent(this.inputY, 0, 94);

	divCoord.appendChild(this.inputX);
	divCoord.appendChild(createSpan('&times;'));
	divCoord.appendChild(this.inputY);

	this.tr.appendChild(this.spanBuildingName);
	this.tr.appendChild(divCoord);

	var editable=false;
	if(buildingHash[this.id] && buildingHash[this.id].group!=-1){
		editable=this.spanBuildingName;
		this.spanBuildingName.className='editable';
		this.spanBuildingName.appendChild(createEditButton());
	}


	addBuildingEvents(this, this.inputX, this.inputY, editable);

	if(this.type=='island'){
		el('buildings-island').appendChild(this.tr);
	}else{
		el('buildings').appendChild(this.tr);
	}
}
Building.prototype.save=function(){
	savegame.writeU16(this.offset, this.id);
	savegame.writeU8(this.offset+2, this.x);
	savegame.writeU8(this.offset+3, this.y);
}
Building.prototype.setX=function(x){
	this._refreshMask(false);

	x=parseInt(x);
	if(!x)
		this.x=0;
	else if(x>=0 && x<this._MAXWIDTH && x!=NaN && x!=null)
		this.x=x;
	this.inputX.value=this.x;

	this._refreshMask(true);
	if(this.isDock() || this.isIslandStorageBin())
		checkWarnings();
}
Building.prototype.setY=function(y){
	this._refreshMask(false);

	y=parseInt(y);
	if(!y)
		this.y=0;
	else if(y>=0 && y<this._MAXHEIGHT && y!=NaN && y!=null)
		this.y=y;
	this.inputY.value=this.y;

	this._refreshMask(true);
	if(this.isDock() || this.isIslandStorageBin())
		checkWarnings();
}
Building.prototype.move=function(x,y){
	this._refreshMask(false);

	if(this.isCustomDesign() && !this.customPatternOffset){
		for(var i=0; i<8 && !this.customPatternOffset; i++){
			const offset=Offsets.MAP_PWP_PATTERNS+(0x0878 * i);
			const patternX=savegame.readU8(offset + 0x0870);
			const patternY=savegame.readU8(offset + 0x0870 + 4);
			if(patternX===this.x && patternY===this.y){
				this.customPatternOffset=offset;
			}
		}
	}

	this.x=isNaN(x)?16:x;
	this.y=isNaN(y)?16:y;
	this.inputX.value=this.x;
	this.inputY.value=this.y;
	if(this.isCustomDesign()){
		savegame.writeU8(this.customPatternOffset + 0x0870, this.x);
		savegame.writeU8(this.customPatternOffset + 0x0870 + 4, this.y);
	}

	this._refreshMask(true);
	if(this.isDock() || this.isIslandStorageBin())
		checkWarnings();
}
function addBuildingEvents(b,inputX,inputY, editButton){
	addEvent(b.tr, 'mouseenter', function(){
		b.map.showGlowingTile(b.x, b.y);
	});
	addEvent(b.tr, 'mouseleave', function(){
		b.map.hideGlowingTile();
	});

	addEvent(inputX, 'change', function(){b.setX(this.value)});
	addEvent(inputY, 'change', function(){b.setY(this.value)});


	var moveWithKeys=function(evt){
		if(evt.keyCode==39){
			b.setX(b.x+1);
		}else if(evt.keyCode==37){
			b.setX(b.x-1);
		}if(evt.keyCode==40){
			b.setY(b.y+1);
		}else if(evt.keyCode==38){
			b.setY(b.y-1);
		}
		b.map.showGlowingTile(b.x, b.y);
	}

	addEvent(inputX, 'keyup', moveWithKeys);
	addEvent(inputY, 'keyup', moveWithKeys);
	if(editButton)
		addEvent(editButton, 'click', function(){editBuilding(b)});
}

function editBuilding(b){
	selectBuildings.currentBuilding=b;

	selectBuildings.innerHTML='';
	for(var i=0; i<BUILDINGS.length; i++){
		var id=plusMode? BUILDINGS[i][1]:BUILDINGS[i][0];
		if(buildingHash[id].group===buildingHash[b.id].group)
			selectBuildings.appendChild(createOption(id, buildingHash[id].name));
	}
	selectBuildings.value=b.id;

	b.tr.replaceChild(selectBuildings, b.tr.children[0]);
	
	selectBuildings.focus();
	//selectBuildings.click();
}

function addBuilding(){
	var foundEmptySlot=false;
	var slot=55;

	while(slot>10){
		if((!plusMode && buildings[slot].id==0xf8) || (plusMode && buildings[slot].id==0xfc)){
			buildings[slot].set(0x4c);
			editBuilding(buildings[slot]);
			foundEmptySlot=true;
			break;
		}
		slot--;
	}

	if(!foundEmptySlot)
		UI.Snackbars.show('Building limit reached', 'danger');
}


function getBuildingMask(buildingId){
	var coords=[];
	var buildingMask=false;
	for(var i=0; i<BUILDINGS.length && !buildingMask; i++){
		if(
			(!plusMode && BUILDINGS[i][0]===buildingId) ||
			(plusMode && BUILDINGS[i][1]===buildingId)
		){
			buildingMask=BUILDINGS[i][3];
		}
	}
	
	for(var i=0; i<buildingMask.length; i++){
		var x=(buildingMask[i] & 0xf0) >> 4;
		x&=0x07;
		if(buildingMask[i] & 0x80)
			x=-x;
		var y=(buildingMask[i] & 0x0f);
		y&=0x07;
		if(buildingMask[i] & 0x08)
			y=-y;
		coords.push({x:x, y:y});
	}

	return coords;
}





function SimpleVillager(type,n){
	this.n=n;
	this.isPastVillager=(type==='past');
	this.isCaravan=(type==='caravan');
	if(type==='past'){
		this.offset=Offsets.PAST_VILLAGERS+n*2;
	}else if(type==='caravan'){
		this.offset=Offsets.CARAVAN_VILLAGERS+n*2;
	}else if(type==='campsite'){
		this.offset=Offsets.CAMPSITE_VILLAGER;
	}

	this.id=savegame.readU16(this.offset);

	if(isValidVillagerId(this.id) || type==='campsite' || (plusMode && this.isCaravan && this.id==0xffff)){
		this.spanName=createSpan('');
		this.spanName.className='editable';
		this.spanName.appendChild(createSpan('?'));	//name
		this.spanName.appendChild(createEditButton());
		this.updateButtonText();

		addSimpleVillagerEvents(this.spanName,this);

		var tr=document.createElement('tr');

		var td=document.createElement('td');
		td.innerHTML=(n+1);
		td.className='count';
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.spanName);
		tr.appendChild(td);

		if(this.isPastVillager)
			if(n<8)
				el('past-villagers1').appendChild(tr);
			else
				el('past-villagers2').appendChild(tr);
		else
			el('caravan-villagers').appendChild(tr);
	}
}
SimpleVillager.prototype.save=function(){
	savegame.writeU16(this.offset, this.id);
}
SimpleVillager.prototype.setVillager=function(newId){
	this.id=newId;
}
SimpleVillager.prototype.updateButtonText=function(){
	if(this.id==0xffff)
		this.spanName.children[0].innerHTML='(none)';
	else
		this.spanName.children[0].innerHTML=el('villager-new-'+this.id).innerHTML;
}


function isValidVillagerId(id){return (!plusMode && id>=0 && id<=332) || (plusMode && ((id>=0 && id<=398) || (id>=0x1000 && id<=0x2010)))}

function Villager(n){
	this.n=n;
	this.offset=Offsets.VILLAGERS+Offsets.VILLAGER_SIZE*n;

	this.id=savegame.readU16(this.offset+Offsets.VILLAGER_ID);
	this.personality=savegame.readU8(this.offset+Offsets.VILLAGER_PERSONALITY); // 00-05

	this.status=savegame.readU32(this.offset+Offsets.VILLAGER_STATUS);
	this.catchphrase=new U16String(this.offset+Offsets.VILLAGER_CATCHPHRASE, 11);

	this.letter=new Letter(this.offset+Offsets.VILLAGER_STOREDLETTER);

	if(isValidVillagerId(this.id)){
		this.spanName=createSpan('');
		this.spanName.className='editable';
		this.spanName.appendChild(createSpan('?'));	//name
		this.spanName.appendChild(createEditButton());

		this.updateButtonText();


		addCurrentVillagerEvents(this.spanName, this);


		this.itemGridShirt=new ItemGrid(this.offset+Offsets.VILLAGER_SHIRT, 1, 1, false, Offsets.MIN_SHIRT, Offsets.MAX_SHIRT);
		this.itemGridSong=new ItemGrid(this.offset+Offsets.VILLAGER_SONG, 1, 1, false, Offsets.MIN_SONG, Offsets.MAX_SONG);
		this.itemGridWall=new ItemGrid(this.offset+Offsets.VILLAGER_WALL, 1, 1, false, Offsets.MIN_WALL, Offsets.MAX_WALL);
		this.itemGridFloor=new ItemGrid(this.offset+Offsets.VILLAGER_FLOOR, 1, 1, false, Offsets.MIN_FLOOR, Offsets.MAX_FLOOR);
		this.itemGridUmbrella=new ItemGrid(this.offset+Offsets.VILLAGER_UMBRELLA, 1, 1, false, Offsets.MIN_UMBRELLA, Offsets.MAX_UMBRELLA);
		this.itemGridFurniture=new ItemGrid(this.offset+Offsets.VILLAGER_FURNITURE, 16, 1, false);

		var tr=document.createElement('tr');

		var td=document.createElement('td');
		td.innerHTML=(n+1);
		td.className='count';
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.spanName);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridWall.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridFloor.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridSong.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridShirt.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridUmbrella.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.itemGridFurniture.canvas);
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.catchphrase.createInput());
		tr.appendChild(td);






/*
		td=document.createElement('td');
		td.appendChild(createEditStringButton(this.letter1, 'letter (start)'));
		td.appendChild(createEditStringButton(this.letter2, 'letter'));
		td.appendChild(createEditStringButton(this.letter3, 'letter (end)'));
		tr.appendChild(td);
*/
		el('villagers').appendChild(tr);
	}

	villagers[n]=this;
}
Villager.prototype.save=function(){
	if(isValidVillagerId(this.id)){
		savegame.writeU16(this.offset+Offsets.VILLAGER_ID, this.id);
		savegame.writeU8(this.offset+Offsets.VILLAGER_PERSONALITY, this.personality);
		this.catchphrase.save();


		this.itemGridShirt.save();
		this.itemGridSong.save();
		this.itemGridWall.save();
		this.itemGridFloor.save();
		this.itemGridUmbrella.save();
		this.itemGridFurniture.save();

		//store status
		savegame.writeU8(this.offset+Offsets.VILLAGER_STATUS+0, (this.status & 0x000000ff));
		//savegame.writeU8(this.offset+Offsets.VILLAGER_STATUS+1, (this.status & 0x0000ff00) >> 8);
		//savegame.writeU8(this.offset+Offsets.VILLAGER_STATUS+2, (this.status & 0x00ff0000) >> 16);
		//savegame.writeU8(this.offset+Offsets.VILLAGER_STATUS+3, (this.status & 0xff000000) >> 24);
	}
}
Villager.prototype.setVillager=function(newId,defaultBytes){
	var villagerInfo=el('villager-new-'+newId);
	this.id=newId;
	this.personality=villagerInfo.status;
	if(defaultBytes){
		if(villagerInfo.defaultData){
			var data=villagerInfo.defaultData;


			for(var i=0; i<21; i++){
				var item=data[i] & 0xffff;
				var flag1=(data[i] >> 16 & 0xff);
				var flag2=(data[i] >> 24 & 0xff);

				var itemGrid;
				if(i==0)
					itemGrid=this.itemGridShirt;
				else if(i==1)
					itemGrid=this.itemGridSong;
				else if(i==2)
					itemGrid=this.itemGridWall;
				else if(i==3)
					itemGrid=this.itemGridFloor;
				else if(i==4)
					itemGrid=this.itemGridUmbrella;
				else
					itemGrid=this.itemGridFurniture;

				var itemGridStart=(i<5)?0:i-5;

				itemGrid.itemList.edited=true;
				itemGrid.itemList.items[itemGridStart].set(flag2,flag1,item);
				itemGrid.repaintTile(itemGridStart);
			}

			//unknown last 4 bytes
			savegame.writeU32(this.offset+Offsets.VILLAGER_SHIRT+4*21, data[21]);
		}

		if(villagerInfo.catchphrase){
			this.catchphrase.set(villagerInfo.catchphrase);
			this.catchphrase.refreshInput();
		}
	}
}
/* >>> 0 forces to use unsigned values */
Villager.prototype.isBoxed=function(){return this.status==((this.status | 0x00000001) >>> 0)}
Villager.prototype.evict=function(){if(!this.isBoxed())this.status=(this.status | 0x00000001) >>> 0}
Villager.prototype.unbox=function(){if(this.isBoxed())this.status=(this.status & ~0x00000001) >>> 0}

Villager.prototype.updateButtonText=function(){
	var text=el('villager-new-'+this.id).innerHTML;
	if(this.isBoxed())
		text+=' (boxed)';
	this.spanName.children[0].innerHTML=text;
}





function addCurrentVillagerEvents(b,v){
	addEvent(b, 'click', function(){openCurrentVillagerDialog(v)});
}
function addSimpleVillagerEvents(b,v){
	addEvent(b, 'click', function(){openSimpleVillagerDialog(v)});
}
function openCurrentVillagerDialog(v){
	currentEditingItem=v;
	show('villager-current-options');
	el('villager-new').value=currentEditingItem.id;
	el('villager-default').checked=false;
	el('villager-boxed').checked=currentEditingItem.isBoxed();
	if(plusMode){
		for(var i=0x1000; i<=0x100e; i++)
			el('villager-new-'+i).disabled=true;
		for(var i=0x2000; i<=0x2010; i++)
			el('villager-new-'+i).disabled=true;
	}
	refreshVillagerEdit();
	MarcDialogs.open('villager')
}
function openSimpleVillagerDialog(v){
	currentEditingItem=v;
	hide('villager-current-options');
	if(currentEditingItem.id==0xffff)
		el('villager-new').value=0;
	else
		el('villager-new').value=currentEditingItem.id;
	if(plusMode){
		for(var i=0x1000; i<=0x100e; i++)
			el('villager-new-'+i).disabled=!v.isCaravan;
		for(var i=0x2000; i<=0x2010; i++)
			el('villager-new-'+i).disabled=!v.isCaravan;
	}
	refreshVillagerEdit();
	MarcDialogs.open('villager')
}
function acceptVillagerEdit(){
	var newId=el('villager-new').value;

	if(currentEditingItem.catchphrase){ /*check if resident */
		currentEditingItem.setVillager(newId, el('villager-default').checked);

		if(el('villager-boxed').checked){
			currentEditingItem.evict();
		}else{
			currentEditingItem.unbox();
		}
	}else{
		currentEditingItem.setVillager(newId);
	}
	currentEditingItem.updateButtonText();
	MarcDialogs.close()
}
function refreshVillagerEdit(){
	var selectedVillagerOpt=el('villager-new-'+el('villager-new').value);
	el('villager-personality').innerHTML=Constants.Strings.PERSONALITIES[selectedVillagerOpt.status];
	if(!el('villager-pic').style.backgroundImage){
		el('villager-pic').style.backgroundImage='url(./resources/villagers.jpg)';
	}

	var ICON_WIDTH=64;
	var ICON_HEIGHT=64;
	var ICON_COLS=20;

	var x=(selectedVillagerOpt.icon%ICON_COLS)*ICON_WIDTH;
	var y=parseInt(selectedVillagerOpt.icon/ICON_COLS)*ICON_HEIGHT;
	el('villager-pic').style.backgroundPosition='-'+x+'px -'+y+'px';
}




function Letter(offset){
	this.offset=offset;

	this.intro=new U16String(this.offset+104, 64);
	this.body=new U16String(this.offset+104+0x42, 384);
	this.end=new U16String(this.offset+104+0x01c4, 64);
}
Letter.prototype.save=function(){
	this.intro.save();
	this.body.save();
	this.end.save();
}





function Room(offset){
	this.offset=offset;

	this.size=savegame.readU8(this.offset-0x44); /* UNTESTED!: 2:4x4, 3:6x6, 4:8x8 */
	this.itemsRoom=new ItemGrid(this.offset, 10, 10, true);
	this.itemsOver=new ItemGrid(this.offset+400, 8, 8, true);
	this.itemsWall=new ItemGrid(this.offset+656, 1, 1, false, Offsets.MIN_WALL, Offsets.MAX_WALL);
	this.itemsFloor=new ItemGrid(this.offset+660, 1, 1, false, Offsets.MIN_FLOOR, Offsets.MAX_FLOOR);
	this.itemsSong=new ItemGrid(this.offset+664, 1, 1, false, Offsets.MIN_SONG, Offsets.MAX_SONG);

	this.gridContainer=document.createElement('div');
	this.gridContainer.appendChild(this.itemsRoom.canvas);
	this.gridContainer.appendChild(this.itemsOver.canvas);
	this.gridContainer.appendChild(this.itemsWall.canvas);
	this.gridContainer.appendChild(this.itemsFloor.canvas);
	this.gridContainer.appendChild(this.itemsSong.canvas);
	this.itemsOver.canvas.style.marginBottom='16px';
}
Room.prototype.save=function(){
	savegame.writeU8(this.offset-0x44, this.size);
	this.itemsRoom.save();
	this.itemsOver.save();
	this.itemsWall.save();
	this.itemsFloor.save();
	this.itemsSong.save()
}





function Player(n){
	this.n=n;
	this.offset=Offsets.PLAYERS+Offsets.PLAYER_SIZE*n;

	this.playTime=new PlayTime(this.offset+Offsets.PLAYER_PLAYTIME);

	this.hairStyle=savegame.readU8(this.offset+Offsets.PLAYER_HAIRSTYLE);
	this.hairColor=savegame.readU8(this.offset+Offsets.PLAYER_HAIRCOLOR);
	this.face=savegame.readU8(this.offset+Offsets.PLAYER_FACE);
	this.eyeColor=savegame.readU8(this.offset+Offsets.PLAYER_EYECOLOR);
	this.tan=savegame.readU8(this.offset+Offsets.PLAYER_TAN);
	this.gender=savegame.readU8(this.offset+Offsets.PLAYER_GENDER); //00: male, 01:female

	this.playerId1=savegame.readU8(this.offset+Offsets.PLAYER_ID1);
	this.playerId2=savegame.readU8(this.offset+Offsets.PLAYER_ID2);

	this.name=new U16String(this.offset+Offsets.PLAYER_NAME, 9);

	this.playerIdReferences=false;

	//this.townId1=savegame.readU8(this.offset+0x55bc);
	//this.townId2=savegame.readU8(this.offset+0x55bc+1);
	//this.townName=new U16String(this.offset+0x55bc+2, 9);


	this.TPCregion=savegame.readU8(this.offset+Offsets.PLAYER_TPCREGION);
	this.TPCtext=new U16String(this.offset+Offsets.PLAYER_TPCTEXT, 32); //40?

	this.birthdayMonth=savegame.readU8(this.offset+Offsets.PLAYER_BIRTHDAYMONTH);
	this.birthdayDay=savegame.readU8(this.offset+Offsets.PLAYER_BIRTHDAYDAY);
	this.registrationYear=savegame.readU16(this.offset+Offsets.PLAYER_REGYEAR);
	this.registrationMonth=savegame.readU8(this.offset+Offsets.PLAYER_REGMONTH);
	this.registrationDay=savegame.readU8(this.offset+Offsets.PLAYER_REGDAY);



	var EXTERIOR_OFFSET=Offsets.PLAYER_EXTERIORS+0x1228*n;
	this.houseSize=savegame.readU8(EXTERIOR_OFFSET);
	this.houseStyle=savegame.readU8(EXTERIOR_OFFSET+1);
	this.houseDoorShape=savegame.readU8(EXTERIOR_OFFSET+2);
	this.houseBrick=savegame.readU8(EXTERIOR_OFFSET+3);
	this.houseRoof=savegame.readU8(EXTERIOR_OFFSET+4);
	this.houseDoor=savegame.readU8(EXTERIOR_OFFSET+5);
	this.houseFence=savegame.readU8(EXTERIOR_OFFSET+6);
	this.housePavement=savegame.readU8(EXTERIOR_OFFSET+7);
	this.houseMailbox=savegame.readU8(EXTERIOR_OFFSET+8);
	// all house size and style properties are also stored twice at +9?
	this.houseSize2=savegame.readU8(EXTERIOR_OFFSET+9);
	this.houseStyle2=savegame.readU8(EXTERIOR_OFFSET+1+9);
	this.houseDoorShape2=savegame.readU8(EXTERIOR_OFFSET+2+9);
	this.houseBrick2=savegame.readU8(EXTERIOR_OFFSET+3+9);
	this.houseRoof2=savegame.readU8(EXTERIOR_OFFSET+4+9);
	this.houseDoor2=savegame.readU8(EXTERIOR_OFFSET+5+9);
	this.houseFence2=savegame.readU8(EXTERIOR_OFFSET+6+9);
	this.housePavement2=savegame.readU8(EXTERIOR_OFFSET+7+9);
	this.houseMailbox2=savegame.readU8(EXTERIOR_OFFSET+8+9);

	this.rooms=new Array(6);
	for(var i=0;i<6;i++){	
		this.rooms[i]=new Room(Offsets.PLAYER_ROOMS+0x1228*n+0x0302*i);
		this.rooms[i].gridContainer.id='rooms'+i+''+n;
		el('rooms'+i).appendChild(this.rooms[i].gridContainer);
	}


	this.letters=new Array(10);
	for(var i=0; i<10; i++){
		this.letters[i]=new Letter(this.offset+Offsets.PLAYER_LETTERS+i*0x0280);
	}


	this.patterns=new Array(10);
	for(var i=0; i<10; i++){
		this.patterns[i]=new Pattern(this.offset+Offsets.PLAYER_PATTERNS, i);
		el('patterns'+n).appendChild(this.patterns[i].canvas);
	}

	this.itemsPockets=new ItemList(this.offset+Offsets.PLAYER_POCKETS, 16);
	this.itemsDresser0=new ItemList(this.offset+Offsets.PLAYER_DRESSERS, 60);
	this.itemsDresser1=new ItemList(this.offset+Offsets.PLAYER_DRESSERS+240, 60);
	this.itemsDresser2=new ItemList(this.offset+Offsets.PLAYER_DRESSERS+480, 60);
	this.itemsIslandBox=new ItemList(this.offset+Offsets.PLAYER_ISLANDBOX, 40);
	if(plusMode){
		this.itemsStorage0=new ItemList(Offsets.PLAYER_STORAGE+(1440*n), 90);
		this.itemsStorage1=new ItemList(Offsets.PLAYER_STORAGE+(1440*n)+360, 90);
		this.itemsStorage2=new ItemList(Offsets.PLAYER_STORAGE+(1440*n)+720, 90);
		this.itemsStorage3=new ItemList(Offsets.PLAYER_STORAGE+(1440*n)+1080, 90);
	}

	this.badges=new Array(24);
	this.badgeValues=new Array(24);
	for(var i=0; i<24; i++){
		this.badges[i]=savegame.readU8(this.offset+Offsets.PLAYER_BADGES+i);
		this.badgeValues[i]=new NumericValue(this.offset+Offsets.PLAYER_BADGES_VALUES+i*8);
	}


	this.refreshJPG();

	this.hat=savegame.readU16(this.offset+Offsets.PLAYER_HAT);
	this.accessory=savegame.readU16(this.offset+Offsets.PLAYER_ACCESSORY);
	this.wetSuit=savegame.readU16(this.offset+Offsets.PLAYER_WETSUIT);
	this.topWear=savegame.readU16(this.offset+Offsets.PLAYER_TOPWEAR);
	this.bottomWear=savegame.readU16(this.offset+Offsets.PLAYER_BOTTOMWEAR);
	this.socks=savegame.readU16(this.offset+Offsets.PLAYER_SOCKS);
	this.shoes=savegame.readU16(this.offset+Offsets.PLAYER_SHOES);
	this.heldItem=savegame.readU16(this.offset+Offsets.PLAYER_HELDITEM);

	//numeric values
	this.bank=new NumericValue(this.offset+Offsets.PLAYER_BANK, 999999999);
	this.islandMedals=new NumericValue(this.offset+Offsets.PLAYER_MEDALS, 99999);
	if(plusMode)
		this.meowCoupons=new NumericValue(this.offset+Offsets.PLAYER_MEOW, 99999);
	this.wallet=new NumericValue(this.offset+Offsets.PLAYER_WALLET, 999999);
	//this.dreamSuiteUsed=new NumericValue(this.offset+0x6e38); //NO
}

Player.prototype.setName=function(newName){
	this.searchPlayerIdReferences();
	this.name.set(newName);
}

Player.prototype.searchPlayerIdReferences=function(){
	if(!this.playerIdReferences){
		/* search all player ID references */
		var playerId=new Array(11); // 11*2=22 bytes
		for(var i=0; i<11; i++){
			playerId[i]=savegame.readU16(this.offset+Offsets.PLAYER_ID1+i*2);
		}

		this.playerIdReferences=new Array();
		if(playerId[0]!=0x0000)
			for(var offset=0; offset<522624-11*2; offset+=2){
				var found=true;
				for(var i=0; i<11 && found; i++){
					if(savegame.readU16(offset+i*2)!=playerId[i]){
						found=false;
					}
				}
				if(found){
					this.playerIdReferences.push(offset);
					offset+=11*2;
				}
			}
	}
}
Player.prototype.save=function(){
	this.playTime.save();

	savegame.writeU8(this.offset+Offsets.PLAYER_HAIRSTYLE, this.hairStyle);
	savegame.writeU8(this.offset+Offsets.PLAYER_HAIRCOLOR, this.hairColor);
	savegame.writeU8(this.offset+Offsets.PLAYER_FACE, this.face);
	savegame.writeU8(this.offset+Offsets.PLAYER_EYECOLOR, this.eyeColor);
	savegame.writeU8(this.offset+Offsets.PLAYER_TAN, this.tan);

	for(var i=0;i<24;i++){
		savegame.writeU8(this.offset+Offsets.PLAYER_BADGES+i, this.badges[i]);
		this.badgeValues[i].save();
	}


	for(var i=0;i<6;i++){
		this.rooms[i].save();
	}
	/* fix player ID references when changing gender/name */
	if(this.playerIdReferences){
		for(var i=0; i<this.playerIdReferences.length; i++){
			savegame.writeU8(this.playerIdReferences[i]+20, this.gender);
			this.name.save(this.playerIdReferences[i]+2);
		}
	}

	this.itemsPockets.save();
	this.itemsDresser0.save();
	this.itemsDresser1.save();
	this.itemsDresser2.save();
	this.itemsIslandBox.save();
	if(plusMode){
		this.itemsStorage0.save();
		this.itemsStorage1.save();
		this.itemsStorage2.save();
		this.itemsStorage3.save();
	}

	savegame.writeU8(this.offset+Offsets.PLAYER_TPCREGION, this.TPCregion);
	savegame.writeU8(this.offset+Offsets.PLAYER_BIRTHDAYMONTH, this.birthdayMonth);
	savegame.writeU8(this.offset+Offsets.PLAYER_BIRTHDAYDAY, this.birthdayDay);
	savegame.writeU16(this.offset+Offsets.PLAYER_REGYEAR, this.registrationYear);
	savegame.writeU8(this.offset+Offsets.PLAYER_REGMONTH, this.registrationMonth);
	savegame.writeU8(this.offset+Offsets.PLAYER_REGDAY, this.registrationDay);



	var EXTERIOR_OFFSET=Offsets.PLAYER_EXTERIORS+0x1228*this.n;
	savegame.writeU8(EXTERIOR_OFFSET+1, this.houseStyle);
	savegame.writeU8(EXTERIOR_OFFSET+2, this.houseDoorShape);
	savegame.writeU8(EXTERIOR_OFFSET+3, this.houseBrick);
	savegame.writeU8(EXTERIOR_OFFSET+4, this.houseRoof);
	savegame.writeU8(EXTERIOR_OFFSET+5, this.houseDoor);
	savegame.writeU8(EXTERIOR_OFFSET+6, this.houseFence);
	savegame.writeU8(EXTERIOR_OFFSET+7, this.housePavement);
	savegame.writeU8(EXTERIOR_OFFSET+8, this.houseMailbox);
	// all house size and style properties are also stored twice at +9?
	savegame.writeU8(EXTERIOR_OFFSET+1+9, this.houseStyle2);
	savegame.writeU8(EXTERIOR_OFFSET+2+9, this.houseDoorShape2);
	savegame.writeU8(EXTERIOR_OFFSET+3+9, this.houseBrick2);
	savegame.writeU8(EXTERIOR_OFFSET+4+9, this.houseRoof2);
	savegame.writeU8(EXTERIOR_OFFSET+5+9, this.houseDoor2);
	savegame.writeU8(EXTERIOR_OFFSET+6+9, this.houseFence2);
	savegame.writeU8(EXTERIOR_OFFSET+7+9, this.housePavement2);
	savegame.writeU8(EXTERIOR_OFFSET+8+9, this.houseMailbox2);

	this.bank.save();
	this.islandMedals.save();
	if(plusMode)
		this.meowCoupons.save();
	this.wallet.save();

	this.TPCtext.save();
}



Player.prototype.refreshJPG=function(){
	var offset=this.offset+Offsets.PLAYER_TPCPIC;

	if((savegame.readU32(offset) & 0x00ffffff)==0x00ffd8ff){
		var base64='';
		for(var j=0; j<0x1400 && (savegame.readU16(offset+j)!=0xffd9); j++){
			base64+=String.fromCharCode(savegame.readU8(offset+j));
		}
		base64+=String.fromCharCode(0xff);
		base64+=String.fromCharCode(0xd9);
		el('player'+this.n+'-pic').src='data:image/jpg;base64,'+window.btoa(base64);
	}else{
		el('player'+this.n+'-pic').src='./resources/no_tpc.png';
	}
}
Player.prototype.importJPG=function(image){
	if(image.width!=64||image.height!=104){
		UI.Snackbars.show('Invalid JPG dimensions (must be 64x104).', 'danger');
		return false
	}
	var offset=this.offset+Offsets.PLAYER_TPCPIC;
	for(var i=0;i<tempFile.fileSize;i++)
		savegame.writeU8(offset+i,tempFile.readU8(i));
	this.refreshJPG()
}



Player.prototype.unlockEmotions=function(){
	MarcDialogs.confirm('Do you want to unlock all emotions for this player?', function(){
		var emotionsOffset=currentPlayer.offset+Offsets.PLAYER_EMOTIONS;
		for(var i=0; i<Constants.ALL_EMOTIONS.length; i++){
			savegame.writeU8(emotionsOffset+i, Constants.ALL_EMOTIONS[i]);
		}
		UI.Snackbars.show('Emotions were unlocked for this player.');
		MarcDialogs.close();
	});
}
Player.prototype.fillEncyclopedia=function(){
	MarcDialogs.confirm('Do you want to fill encyclopedia up for this player?', function(){
		var encyclopediaOffset=currentPlayer.offset+Offsets.PLAYER_ENCYCLOPEDIA;
		for(var i=0; i<Constants.FULL_ENCYCLOPEDIA.length; i++)
			savegame.writeU8(encyclopediaOffset+i, Constants.FULL_ENCYCLOPEDIA[i]);
		UI.Snackbars.show('Encyclopedia was filled for this player.');
		MarcDialogs.close();
	});
}
Player.prototype.fillCatalog=function(){
	MarcDialogs.confirm('Do you want to fill catalog up for this player?', function(){
		var catalogOffset=currentPlayer.offset+Offsets.PLAYER_CATALOG;
		var maxInts=plusMode?106:56; //Non PlusMode size is only estimate
		for(var i=0; i<maxInts; i++)
			savegame.writeU32(catalogOffset+i*4, 0xffffffff);
		UI.Snackbars.show('Catalog was filled for this player.');
		MarcDialogs.close();
	});
}
Player.prototype.toggleCensusMenu=function(){
	if(!plusMode){
		UI.Snackbars.show('This option is only available in Welcome Amiibo.', 'warning');
		return false;
	}
	const censusOMenuffset=currentPlayer.offset+Offsets.PLAYER_CENSUS_MENU;
	const censusMenuStatus=savegame.readU8(censusOMenuffset);
	const CENSUS_MENU_MASK=0x40;

	if(censusMenuStatus & CENSUS_MENU_MASK){
		MarcDialogs.confirm('Do you want to disable census menu for this player?', function(){
			savegame.writeU8(censusOMenuffset, censusMenuStatus & ~CENSUS_MENU_MASK);
			UI.Snackbars.show('Census menu disabled.');
			MarcDialogs.close();
		});
	}else{
		MarcDialogs.confirm('Do you want to enable census menu for this player?', function(){
			savegame.writeU8(censusOMenuffset, censusMenuStatus | CENSUS_MENU_MASK);
			UI.Snackbars.show('Census menu enabled.');
			MarcDialogs.close();
		});	}
	return true;
}


function changeTPCPic(){
	tempFileLoadFunction=changeTPCPic2;
	el('file-load').accept='.jpg';
	el('file-load').click()
}
function changeTPCPic2(){
	if((tempFile.readU32(0) & 0x00ffffff)!==0x00ffd8ff){
		UI.Snackbars.show('Invalid pic file (must be a valid JPG file. dimensions: 64x104, max size: 4kb).', 'danger');
		return false
	}else if(tempFile.fileSize>5024){
		UI.Snackbars.show('Too big JPG file (>5024 bytes).', 'danger');
		return false
	}
	var reader=new FileReader();
	addEvent(reader,'load',function(e){
		var image=document.createElement('img');
		addEvent(image,'load',function(){
			currentPlayer.importJPG(image)
		});
		image.src=e.target.result
	});
	reader.readAsDataURL(tempFile.file)
}


function isPopoverOpen(popover){
	return / open/.test(el('popover-'+popover).className);
}
function showPopover(popover){
	el('popover-'+popover).className='popover open';
}
function hidePopover(popover){
	el('popover-'+popover).className='popover';
}
function hidePopovers(){
	hidePopover('item');
	hidePopover('flags');
}





function addSelectOptions(e,v,ts){
	var select=el('select-'+e);
	if(typeof v=='number'){
		for(var i=0;i<v;i++){
			if(ts){
				select.appendChild(createOption(i,ts[i]));
			}else{
				select.appendChild(createOption(i,i));
			}
		}
	}else{
		for(var i=0;i<v.length;i++){
			if(ts){
				select.appendChild(createOption(v[i],ts[i]));
			}else{
				select.appendChild(createOption(v[i],i));
			}
		}
	}
}
function addSelectEvent(e,f){addEvent(el('select-'+e),'change',f)}













function refreshEyeColorIcon(){
	el('span-eye-color').style.backgroundColor='#'+Constants.EYE_COLORS[currentPlayer.eyeColor];
}
function refreshHairColorIcon(){
	el('span-hair-color').style.backgroundColor='#'+Constants.HAIR_COLORS[currentPlayer.hairColor];
}
function refreshHairStyleIcon(){
	el('span-hair-style').style.backgroundPosition='-'+((currentPlayer.hairStyle<=16)?96:140)+'px -'+((currentPlayer.hairStyle%17)*42+16)+'px';
}
function refreshFaceIcon(){
	el('span-face').style.backgroundPosition='-'+((currentPlayer.gender==0)?0:40)+'px -'+(688+(currentPlayer.face%12)*16)+'px';
}


function refreshBadge(b){
	if(b){
		if(currentPlayer.badges[b.badgeId]==0){
			b.badgeIcon.style.backgroundPosition='-96px -760px';
		}else{
			b.badgeIcon.style.backgroundPosition='-'+(currentPlayer.badges[b.badgeId]-1)*28+'px -'+(16+(b.badgeId)*28)+'px';
		}
	}
}
function addBadgeEvents(li){
	addEvent(li,'click',function(){
		currentPlayer.badges[li.badgeId]++;

		if(currentPlayer.badges[li.badgeId]>=4)
			currentPlayer.badges[li.badgeId]=0;

		refreshBadge(li);
	});
}



function addTurnipEvents(dow, AMinput, PMinput){
	AMinput.style.width='40px';
	PMinput.style.width='40px';

	addNumericInputEvent(AMinput, 0, 990);
	addNumericInputEvent(PMinput, 0, 990);
	addEvent(AMinput, 'change', function(){town.turnipPrices[dow].AM.set(parseInt(this.value))});
	addEvent(PMinput, 'change', function(){town.turnipPrices[dow].PM.set(parseInt(this.value))});
}




var currentItemGroup=null;
function buildFlagEditor(f1,f2){
	var nextItemGroup=el('item_'+el('items').value).parentElement;
	if(currentItemGroup!=nextItemGroup){
		el('flag-known').innerHTML='';
		el('flag-unknown').innerHTML='';

		//build known modifiers
		const allBits=[
			{flag:1, bit:0, label:'0', unknown:true},
			{flag:1, bit:1, label:'1', unknown:true},
			{flag:1, bit:2, label:'2', unknown:true},
			{flag:1, bit:3, label:'3', unknown:true},
			{flag:1, bit:4, label:'4', unknown:true},
			{flag:1, bit:5, label:'5', unknown:true},
			{flag:1, bit:6, label:'6', unknown:true},
			{flag:1, bit:7, label:'7', unknown:true},
			{flag:2, bit:0, label:'8', unknown:true},
			{flag:2, bit:1, label:'9', unknown:true},
			{flag:2, bit:2, label:'10', unknown:true},
			{flag:2, bit:3, label:'11', unknown:true},
			{flag:2, bit:4, label:'12', unknown:true},
			{flag:2, bit:5, label:'13', unknown:true},
			{flag:2, bit:6, label:'14', unknown:true},
			{flag:2, bit:7, label:'15', unknown:true}
		];

		const knownFlags=(nextItemGroup.flags || []).slice();;
		if(el('tab-selector').children[0].className==='active' || el('tab-selector').children[2].className==='active'){ //town or island
			knownFlags.unshift({flag:2, bit:7, nBits:1, label:'Buried'});
		}else{
			knownFlags.unshift({flag:2, bit:6, nBits:2, values:[{value:0, label:'&darr;'},{value:1, label:'&rarr;'},{value:2, label:'&uarr;'},{value:3, label:'&larr;'}]});
		}



		knownFlags.forEach(function(bitsInfo){
			if(!bitsInfo.nBits){
				if(bitsInfo.values){
					const maxValue=bitsInfo.values.reduce(function(max, value){return Math.max(max, value.value)}, 0);
					bitsInfo.nBits=Math.ceil(Math.log2(maxValue+1));
				}else if(bitsInfo.label){
					bitsInfo.nBits=1;
				}else{
					throw new Error('Invalid group flags');
				}
			}

			//remove from allBits
			for(var i=0; i<bitsInfo.nBits; i++){
				const index=allBits.findIndex(function(bit){return bit.flag==bitsInfo.flag && bit.bit==bitsInfo.bit+i});
				if(index>=0)
					allBits.splice(index, 1);
			}
			allBits.push(bitsInfo);
		});
		allBits.forEach(function(bitsInfo){
			const label=document.createElement('label');
			var nBits=1;
			if(bitsInfo.values){
				//many bits
				label.appendChild(document.createElement('select'));
				for(var i=0; i<bitsInfo.values.length; i++){
					label.children[0].appendChild(createOption(bitsInfo.values[i].value, bitsInfo.values[i].label));
				}
				const maxValue=bitsInfo.values.reduce(function(max, value){return Math.max(max, value.value)}, 0);
				nBits=Math.ceil(Math.log2(maxValue+1));

				addEvent(label.children[0],'change', rebuildFlagHex);
			}else if(bitsInfo.label){
				//single bit
				label.appendChild(document.createElement('input'));
				label.appendChild(document.createTextNode(bitsInfo.label));
				label.children[0].type='checkbox';
				addEvent(label.children[0],'change', rebuildFlagHex);
			}
			label.children[0].id='flag-'+bitsInfo.flag+'-'+bitsInfo.bit;
			label.children[0].bitsInfo=bitsInfo;

			if(bitsInfo.unknown){
				el('flag-unknown').appendChild(label);
				label.className='flag-bit mono';
			}else{
				el('flag-known').appendChild(label);
			}
		});
	}
	currentItemGroup=nextItemGroup;

	setFlagBits(1, f1);
	setFlagBits(2, f2);
}
function setFlagBits(flag, value){
	for(var i=0; i<8; i++){
		const htmlElement=el('flag-'+flag+'-'+i);
		if(!htmlElement)
			continue;

		const nBits=htmlElement.bitsInfo.nBits;
		if(nBits>1){
			htmlElement.value=(value >> i) & ((1<<nBits)-1);
		}else{
			htmlElement.checked=(value & (1<<i));
		}
	}
	rebuildFlagHex();
}
function rebuildFlagHex(){
	el('flags-value').innerHTML=intToHex(getFlagByte(2),1)+intToHex(getFlagByte(1),1);
	var strings=[];
	const knownFlagElements=el('flag-known').children;
	for(var i=0; i<knownFlagElements.length; i++){
		const htmlElement=knownFlagElements[i].children[0];
		if(htmlElement.bitsInfo.values){
			strings.push(htmlElement.options[htmlElement.selectedIndex].text);
		}else if(htmlElement.checked){
			strings.push(htmlElement.parentElement.innerText);
		}
	}
	el('flags-label').innerHTML=strings.join(', ');
}
function getFlagByte(flag){
	var value=0b00000000;
	for(var i=0; i<8; i++){
		const htmlElement=el('flag-'+flag+'-'+i);
		if(!htmlElement)
			continue;
		
		const nBits=htmlElement.bitsInfo.nBits;
		if(nBits>1){
			value|=(parseInt(htmlElement.value) & ((1<<nBits)-1)) << i;
		}else{
			value|=(htmlElement.checked?1:0) << i;
		}
	}
	return value >>> 0;
}




function Item(offset, n, inside){
	this.offset=offset+n*4;

	this.inside=!!inside;
	this.id=savegame.readU16(this.offset);
	this.flag1=savegame.readU8(this.offset+2);
	this.flag2=savegame.readU8(this.offset+3);
	this.refreshName();
}
Item.prototype.save=function(){
	savegame.writeU16(this.offset, this.id);
	savegame.writeU8(this.offset+2, this.flag1);
	savegame.writeU8(this.offset+3, this.flag2);
}
Item.prototype.isRock=function(){return this.id>=0x98 && this.id<=0x9c}
Item.prototype.isWeed=function(){return (this.id>=0x7c && this.id<=0x7f) || (this.id>=0xcb && this.id<=0xcd) || (this.id==0xf8)}
Item.prototype.isBuried=function(){return (this.flag2>>4)==0x08}
Item.prototype.isWatered=function(){return (this.flag2>>4)==0x04}
Item.prototype.isWiltedFlower=function(){return (this.id>=0xce && this.id<=0xfb)}
//ItemSlot.prototype.isPresent=function()return this.flag2==0x20}????
Item.prototype.set=function(flag2,flag1,id){
	this.flag2=parseInt(flag2);
	this.flag1=parseInt(flag1);
	this.id=parseInt(id);

	this.refreshName();
	if(!this.inside)
		checkWarnings();
}
Item.prototype.refreshName=function(){
	/* Update hex and name */
	if(this.flag2){
		this.nameHex=intToHex(this.flag2,1)+' '+intToHex(this.flag1,1)+' '+intToHex(this.id,2);
	}else if(this.flag1){
		this.nameHex=intToHex(this.flag1,1)+' '+intToHex(this.id,2);
	}else{
		this.nameHex=intToHex(this.id,2);
	}

	this.name=(el('item_'+this.id))? el('item_'+this.id).innerHTML : '?';

	if(!this.inside){
		if(this.isBuried())
			this.name+=' (buried)';
		if(this.isWatered())
			this.name+=' (watered)';
	}

	if(this.hasBuilding)
		this.name+='<br/><b style="color:yellow">Building: '+buildingHash[this.hasBuilding.id].name+'</b>';
}



function openReplaceItemDialog(){
	if(!el('items-replace').innerHTML){
		el('items-replace').innerHTML=el('items').innerHTML;
		el('items-replace').value=0x7ffe;
	}

	const itemReplace=el('items').options[el('items').selectedIndex];
	el('replace-item-name').innerHTML=itemReplace.text;
	MarcDialogs.open('replace')
}
function acceptReplaceItem(){
	const itemReplace=el('items').options[el('items').selectedIndex];
	const itemWith=el('items-replace').options[el('items-replace').selectedIndex];

	if(itemReplace.id!==itemWith.id){
		const flag1=0x00; //getFlagByte(1);
		const count=map.replaceItems(parseInt(itemReplace.value), parseInt(itemWith.value), flag1); 

		if(count){
			if(parseInt(itemReplace.value)===0x7ffe){
				UI.Snackbars.show(count+' <em>'+itemWith.text+'</em> were added.');
			}else if(parseInt(itemWith.value)===0x7ffe){
				UI.Snackbars.show(count+' <em>'+itemReplace.text+'</em> were removed.');
			}else{
				UI.Snackbars.show(count+' items were placed with <em>'+itemWith.text+'</em>.');
			}
		}
	}
	MarcDialogs.close();
}

function acceptMaintenance(){
	var removedWeeds=0;
	var wateredFlowers=0;
	var perfectizedTrees=0;

	for(var i=0; i<map.items.length; i++){
		if((el('remove-weeds').checked) && map.items[i].isWeed()){
			map.items[i].set(0x00,0x00,0x7ffe);
			map.itemGrids[i >> 8].itemList.edited=true;
			removedWeeds++;
		}else if(el('water-flowers').checked && map.items[i].isWiltedFlower()){
			map.items[i].set(0x40,map.items[i].flag1,map.items[i].id);
			map.itemGrids[i >> 8].itemList.edited=true;
			wateredFlowers++
		}else if(el('perfectize-trees').checked && map.items[i].id>=0x3a && map.items[i].id<=0x52 && map.items[i].flag1==0x00 && map.items[i].flag2==0x00){
			map.items[i].set(0x01,0x00,map.items[i].id);
			map.itemGrids[i >> 8].itemList.edited=true;
			perfectizedTrees++
		}
	}


	MarcDialogs.close()
	if(removedWeeds || wateredFlowers || perfectizedTrees){
		if(removedWeeds)
			UI.Snackbars.show(removedWeeds+' weeds were removed.');
		if(wateredFlowers)
			UI.Snackbars.show(wateredFlowers+' flowers were watered.');
		if(perfectizedTrees)
			UI.Snackbars.show(perfectizedTrees+' normal trees got a single perfect fruit.');

		map.repaint();
	}
}


function getHouseExteriorNames(startId,len){
	var start=plusMode?startId+0x0321:startId;
	var a=[];
	for(var i=0; i<len; i++){
		a[i]=el('item_'+(start+i)).innerHTML;
	}
	return a;
}



function changeSecureNANDValue(){
	if(tempFile.fileSize==522752 || tempFile.fileSize==563968){
		for(var i=0; i<8; i++)
			savegame.writeU8(i, tempFile.readU8(i), 1);
		refreshSecureValue();
	}
}
function refreshSecureValue(){
	var secureValue='0x';
	for(var i=0; i<8; i++)
		secureValue+=intToHex(savegame.readU8(i), 1);

	el('nand-value').innerHTML=secureValue
}



function getWarnings(){
	const warnings=[];
	if(!map.acres.some((acre) => acre.isTownPlaza())){
		warnings.push('No town plaza acre found.');
	}
	if(!map.acres.some((acre) => acre.hasPond())){
		warnings.push('No pound acre found.');
	}
	if(!map.acres.some((acre) => acre.hasWaterfallWall())){
		warnings.push('No waterfall (wall) acre found.');
	}
	if(!map.acres.some((acre) => acre.hasWaterfallSea())){
		warnings.push('No waterfall (sea) acre found.');
	}
	if(map.acres.filter((acre) => acre.hasSlope()).length<2){
		warnings.push('Not enough slope acres.');
	}
	if(map.items.filter((item) => item.isRock()).length<2){
		warnings.push('Not enough rocks.');
	}

	const islandStorageBin=buildings.find((building) => building.isIslandStorageBin());
	const dock=buildings.find((building) => building.isDock());
	if(islandStorageBin && dock){
		if(dock.x!==(islandStorageBin.x-1) || dock.y!==(islandStorageBin.y+8))
			warnings.push('Dock correct position should be: '+(islandStorageBin.x-1)+'&times;'+(islandStorageBin.y+8));
	}

	return warnings;
}
function checkWarnings(){
	const nWarnings=getWarnings().length;
	el('warning-counter').innerHTML=nWarnings;
	el('button-warnings').style.display=nWarnings?'inline-block':'none';
}











function tryExample(){
	el('loading').innerHTML='Downloading example file...';
	hide('loadform');
	show('loading');
	fetch('./resources/garden_plus_example.dat').then(function(response){
		return response.arrayBuffer();
	}).then(function(buffer){
		const file=new File([new Uint8Array(buffer)], 'garden_plus.dat');
		loadSavegameFromFile(file);
		el('save-button').disabled=true;
	}).catch(function(){
		UI.Snackbars.show('Can\'t load example file.', 'danger');
	});
}
function loadSavegameFromFile(file){
	if(!file){
		UI.Snackbars.show('No savegame was specified.', 'danger');
		return false
	}

	savegame=new MarcFile(file, initializeEverything);
}

function checkValidSavegame(file){
	return(
		(file.fileSize==522752 && file.readU32(0x80)==0x98d1ed64 && file.readU32(0x84)==0x000200f8) || //garden.dat
		(file.fileSize==563968 && file.readU32(0x80)==0x46d03a33 && file.readU32(0x84)==0x0002009e) //garden_plus.dat
	)
}
function checkPlusSavegame(file){
	return file.fileSize==563968
}
function initializeEverything(){
	if(!el('home'))
		return false;

	/* check old RAM files */
	if(savegame.fileSize==524288 || savegame.fileSize==786432 || savegame.fileSize==1183744 || savegame.fileSize==1245184){
		/*
			524288 & 786432: old RAM dump
			1183744 & 1245184: mori.bin (LeafTools) RAM dump
		*/
		UI.Snackbars.show('Outdated savegame converted to native <span class="mono">garden.dat</span> format', 'danger');
		var fixedSavegame=new MarcFile(522752);
		fixedSavegame.fileName='garden.dat';
		fixedSavegame.fileType=savegame.fileType;
		for(var i=0; i<0x80; i++)
			fixedSavegame.writeU8(i, 0x00);

		for(var i=0; i<522624; i++)
			fixedSavegame.writeU8(0x80+i, savegame.readU8(i));

		savegame=fixedSavegame;
	}

	/* check valid ACNL savegame */
	if(!checkValidSavegame(savegame)){
		UI.Snackbars.show('Invalid AC:NL savegame file.', 'danger');
		return null;
	}


	if(el('lang-selector').selectedIndex){
		var script=document.createElement('script');
		script.type='text/javascript';
		script.async=true;
		script.onload=function(){
			initializeEverything2();
		};
		script.onerror=function(){
			console.warn('can\'t load language file');
			initializeEverything2();
		};
		script.src='./js/items_'+el('lang-selector').value+'.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	}else{
		initializeEverything2();
	}
}
function initializeEverything2(){
	cleanSearch=!(el('lang-selector').value==='jp');

	/* check plus mode */
	if(checkPlusSavegame(savegame)){
		plusMode=true;

		Offsets=OffsetsPlus;
	}else{
		hide('tr-shop-harvey');
		hide('column-storage');
		hide('tr-meowcoupons');
		hide('town-unlockhhd');
	}




	refreshSecureValue();
	var editButton=createEditButton();
	addEvent(editButton,'click',function(){MarcDialogs.open('secure-value')});
	el('nand-value').parentElement.appendChild(editButton);
	
	/* tabs */
	var tempTabs=el('tab-selector').children;
	for(var i=0;i<tempTabs.length;i++){
		tempTabs[i].tabInfo={id:tempTabs[i].innerHTML.clean(),button:tempTabs[i]};
		addEvent(tempTabs[i],'click',showTab);

		if(i==0)
			currentTab=tempTabs[i].tabInfo;
	}
	


	/* read JSON data */
	for(var i=0; i<ITEM_GROUPS.length; i++){
		var itemGroup=ITEM_GROUPS[i];
		if((itemGroup.onlyOld && plusMode) || (itemGroup.onlyPlus && !plusMode)){
			continue;
		}

		var optGroup=document.createElement('optgroup');
		optGroup.label=ITEM_GROUPS[i].title;
		el('items').appendChild(optGroup);

		var itemCounter=0;
		var firstId=(plusMode && itemGroup.plusId)?itemGroup.plusId:itemGroup.oldId;		

		optGroup.flags=ITEM_GROUPS[i].flags || [];

		//var onlyMap=itemGroup.onlyMap;
		//var onlyPockets=itemGroup.onlyPockets;
		var items;
		var copyText,copyOf;
		var itemsLength;
		if(!itemGroup.items && itemGroup.copyOf && itemGroup.copyText){
			items=ITEM_GROUPS[i+itemGroup.copyOf].items;
			//copyText=getString(itemGroup.copyText);
			copyText=itemGroup.copyText;
			if(typeof ITEM_GROUPS_TRANSLATED!=='undefined' && ITEM_GROUPS_TRANSLATED[i]){
				copyText=ITEM_GROUPS_TRANSLATED[i];
			}else{
				copyText=itemGroup.copyText;
			}
			copyOf=itemGroup.copyOf;
			if(itemGroup.copyLimit){
				itemsLength=itemGroup.copyLimit;
			}else{
				itemsLength=items.length;
			}
		}else{
			items=ITEM_GROUPS[i].items;
			copyText=false;
			copyOf=0;
			itemsLength=items.length;
		}
		
		for(var j=0; j<itemsLength; j+=2){
			if((!plusMode && items[j+1]===true))
				continue;

			var itemId=firstId+itemCounter;


			if(items[j]){
				var text;
				if(copyOf){
					if(typeof ITEM_GROUPS_TRANSLATED!=='undefined' && ITEM_GROUPS_TRANSLATED[i+copyOf][j/2]){
						text=ITEM_GROUPS_TRANSLATED[i+copyOf][j/2];
					}else{
						text=items[j];
					}

					text+=' ('+copyText+')';
				}else{
					if(typeof ITEM_GROUPS_TRANSLATED!=='undefined' && ITEM_GROUPS_TRANSLATED[i][j/2]){
						text=ITEM_GROUPS_TRANSLATED[i][j/2];
					}else{
						text=items[j];
					}
				}

				var newOption=createOption(itemId, text);
				newOption.id='item_'+itemId;
				if(cleanSearch){
					newOption.cleanName=text.clean();
				}else{
					newOption.cleanName=text;
				}
				optGroup.appendChild(newOption);
			}

			itemCounter++;
		}
	}
	el('items').value=0x7ffe;

	selectBuildings=document.createElement('select');
	selectBuildings.style.width='250px';
	addEvent(selectBuildings,'change',function(){
		this.currentBuilding.set(parseInt(selectBuildings.value));
	});
	addEvent(selectBuildings,'blur',function(){
		this.currentBuilding.tr.replaceChild(this.currentBuilding.spanBuildingName, selectBuildings);
	});
	buildingHash={};
	/* read buildings JSON data */
	for(var i=0; i<BUILDINGS.length; i++){
		var id=plusMode? BUILDINGS[i][1]:BUILDINGS[i][0];
		buildingHash[id]={
			group:BUILDINGS[i][2],
			name:getString(BUILDINGS[i][4])
		};
	}

	/* read villagers JSON data */
	var villagerCounter=0;
	for(var i=0; i<VILLAGERS.length; i++){
		if((!plusMode && !VILLAGERS[i][1]) || plusMode){
			var id=villagerCounter;
			var opt=createOption(id, getString(VILLAGERS[i][0]));
			opt.id='villager-new-'+id;
			opt.icon=i;
			opt.status=VILLAGERS[i][2];
			opt.catchphrase=getString(VILLAGERS[i][3]);
			opt.defaultData=plusMode? VILLAGERS[i][5]:VILLAGERS[i][4];
			el('villager-new').appendChild(opt);

			villagerCounter++;
		}
	}
	if(plusMode){
		for(var i=0; i<VILLAGERS_SPECIAL1.length; i++){
			var id=0x1000+i;
			var opt=createOption(id, '* '+getString(VILLAGERS_SPECIAL1[i]));
			opt.id='villager-new-'+id;
			opt.icon=400+i;
			el('villager-new').appendChild(opt);
		}
		for(var i=0; i<VILLAGERS_SPECIAL2.length; i++){
			var id=0x2000+i;
			var opt=createOption(id, '** '+getString(VILLAGERS_SPECIAL2[i]));
			opt.id='villager-new-'+id;
			opt.icon=420+i;
			el('villager-new').appendChild(opt);
		}
	}

	/* hoping garbage collector does its job */
	ITEM_GROUPS=null;
	//BUILDINGS=null;
	VILLAGERS=null;
	VILLAGERS_SPECIAL1=null;
	VILLAGERS_SPECIAL2=null;


	/* Item ribbon UI events */
	addEvent(window, 'click', hidePopovers);
	addEvent(window, 'keyup', function(evt){
		if(evt.keyCode===27){ //esc
			if(isPopoverOpen('item')){
				hidePopover('item');
				el('popover-toggler-item').focus();
			}else if(isPopoverOpen('flags')){
				hidePopover('flags');
				el('popover-toggler-flags').focus();
			}
		}
	});
	addEvent('popover-toggler-item', 'keydown', function(evt){
		if(evt.keyCode===38 || evt.keyCode===40){ //up or down
			evt.stopPropagation();
			evt.preventDefault();
			const selectedIndex=el('items').selectedIndex>=0? el('items').selectedIndex:0;
			if(evt.keyCode===38 && selectedIndex>0){ //up
				el('items').selectedIndex=selectedIndex-1;
				el('items').dispatchEvent(new Event('change'));
			}else if(evt.keyCode===40 && selectedIndex<el('items').options.length-1){ //down
				el('items').selectedIndex=selectedIndex+1;
				el('items').dispatchEvent(new Event('change'));

			}
		}
	});
	addEvent('popover-toggler-item', 'click', function(evt){
		evt.stopPropagation();
		if(!isPopoverOpen('item')){
			hidePopover('flags');
			showPopover('item');
			if(el('items-search').value!==el('items').value){
				el('items-search').value='';
				el('search-input').value='';
			}
			if(el('search-input').value){
				show('items-search');
				hide('items');
			}else{
				hide('items-search');
				show('items');
			}
			//scroll #items to selected option
			//el('items').scrollTop=el('items').options[el('items').selectedIndex].offsetTop;
			const selectedIndex=el('items').selectedIndex>=0? el('items').selectedIndex:0;
			el('items').options[selectedIndex].scrollIntoView({block:'center'});
			el('search-input').focus();
			el('search-input').select();
		}else{
			hidePopover('item');
		}
	});
	addEvent('popover-toggler-flags', 'click', function(evt){evt.stopPropagation(); hidePopover('item'); showPopover('flags')});
	addEvent('popover-item', 'click', stopPropagation);
	addEvent('popover-flags', 'click', stopPropagation);
	addEvent('items', 'change', function(){
		refreshCurrentItemText();
		buildFlagEditor(0,0);
		hidePopover('item');
		el('popover-toggler-item').focus();
	});
	addEvent('items-search', 'change', function(){
		el('items').value=this.value;
		el('items').dispatchEvent(new Event('change'));
	});
	addEvent('search-input', 'keydown', function(evt){
		if(evt.keyCode===40){ //down
			evt.stopPropagation();
			if(el('items-search').options.length){
				el('items-search').focus();
			}else{
				el('items').focus();
			}
		}else if(evt.keyCode===13){ //enter
			if(el('items-search').options.length){
				if(el('items-search').options.length===1){
					el('items-search').selectedIndex=0;
					el('items-search').dispatchEvent(new Event('change'));
				}else{
					el('items-search').focus();
				}
			}
		}
	});
	addEvent('search-input', 'input', function(evt){
		el('items-search').innerHTML='';
	
		const q=cleanSearch? this.value.clean() : this.value;

		if(!q || q.length<2){
			hide('items-search');
			show('items');
			return [];
		}

	
		const regex=new RegExp(q);
		var items=el('items').options;
	
		const results=Array.from(items).filter((item) => regex.test(item.cleanName)).slice(0,30);
		results.forEach((item) => {
			const option=document.createElement('option');
			option.innerHTML=item.innerHTML;
			option.value=item.value;
			el('items-search').appendChild(option);
		});

		if(results.length){
			el('items-search').size=results.length;
			show('items-search');
			hide('items');
		}else{
			hide('items-search');
			show('items');
		}
	
		if(results>=30){
			/*
			var li=document.createElement('li');
			li.innerHTML='too many results...';
			el('search-results').appendChild(li);*/
		}
		return results;
	});

	/* Map */
	map=new ItemGridMap('map');

	/* Island map */
	island=new ItemGridMap('island');

	/* Grass */
	grassMap=new GrassMap(Offsets.MAP_GRASS,8,6);
	grassMapToday=new GrassMapToday(Offsets.MAP_GRASS_TODAY,5,4);
	grassPencilSize=el('select-grass-pencil-size').selectedIndex;
	grassPencilIntensity=((el('select-grass-intensity').selectedIndex+1)*32)-1;

	/* read player data */
	players=new Array(4);
	for(var i=0; i<4; i++)
		players[i]=new Player(i);
	
	itemGridPockets=new ItemGrid('itemsPockets', 16, 1);
	el('pockets').appendChild(itemGridPockets.canvas);
	
	itemGridDresser0=new ItemGrid('itemsDresser0', 5, 12);
	el('dresser0').appendChild(itemGridDresser0.canvas);	
	itemGridDresser1=new ItemGrid('itemsDresser1', 5, 12);
	el('dresser1').appendChild(itemGridDresser1.canvas);	
	itemGridDresser2=new ItemGrid('itemsDresser2', 5, 12);
	el('dresser2').appendChild(itemGridDresser2.canvas);	

	itemGridIslandBox=new ItemGrid('itemsIslandBox', 5, 8);
	el('islandbox').appendChild(itemGridIslandBox.canvas);

	if(plusMode){
		itemGridStorage0=new ItemGrid('itemsStorage0', 5, 18);
		el('storage0').appendChild(itemGridStorage0.canvas);
		itemGridStorage1=new ItemGrid('itemsStorage1', 5, 18);
		el('storage1').appendChild(itemGridStorage1.canvas);
		itemGridStorage2=new ItemGrid('itemsStorage2', 5, 18);
		el('storage2').appendChild(itemGridStorage2.canvas);
		itemGridStorage3=new ItemGrid('itemsStorage3', 5, 18);
		el('storage3').appendChild(itemGridStorage3.canvas);
	}

	/* TPC selectors */
	var MONTHS=['-','January','February','March','April','May','June','July','August','September','October','November','December'];
	addSelectOptions('birthday-day', range(0,31));
	addSelectEvent('birthday-day', function(){currentPlayer.birthdayDay=this.value});
	addSelectOptions('birthday-month', range(0,12), MONTHS);
	addSelectEvent('birthday-month', function(){currentPlayer.birthdayMonth=this.value});

	addSelectOptions('registration-day', range(0,31));
	addSelectEvent('registration-day', function(){currentPlayer.registrationDay=this.value});
	addSelectOptions('registration-month', range(0,12), MONTHS);
	addSelectEvent('registration-month', function(){currentPlayer.registrationMonth=this.value});
	addSelectOptions('registration-year', range(0,3000));
	addSelectEvent('registration-year', function(){currentPlayer.registrationYear=this.value});

	/* house exterior selectors */
	addSelectOptions('house-style', 4, getHouseExteriorNames(0x31a9,4));
	addSelectEvent('house-style', function(){currentPlayer.houseStyle=this.value;currentPlayer.houseStyle2=this.value;});

	addSelectOptions('house-doorshape', 2, ['arched','square']);
	addSelectEvent('house-doorshape', function(){currentPlayer.houseDoorShape=this.value;currentPlayer.houseDoorShape2=this.value;});

	addSelectOptions('house-brick', 32, getHouseExteriorNames(0x3180,32));
	addSelectEvent('house-brick', function(){currentPlayer.houseBrick=this.value;currentPlayer.houseBrick2=this.value;});

	addSelectOptions('house-roof', 35, getHouseExteriorNames(0x3146,35));
	addSelectEvent('house-roof', function(){currentPlayer.houseRoof=this.value;currentPlayer.houseRoof2=this.value;});

	addSelectOptions('house-door', 22, getHouseExteriorNames(0x3131,21).concat(['golden door']));
	addSelectEvent('house-door', function(){currentPlayer.houseDoor=this.value;currentPlayer.houseDoor2=this.value;});

	addSelectOptions('house-fence', 23, getHouseExteriorNames(0x3169,23));
	addSelectEvent('house-fence', function(){currentPlayer.houseFence=this.value;currentPlayer.houseFence=this.value;});

	addSelectOptions('house-pavement', 9, getHouseExteriorNames(0x31a0,9));
	addSelectEvent('house-pavement', function(){currentPlayer.housePavement=this.value;currentPlayer.housePavement=this.value;});

	addSelectOptions('house-mailbox', 22, getHouseExteriorNames(0x3105,22));
	addSelectEvent('house-mailbox', function(){currentPlayer.houseMailbox=this.value;currentPlayer.houseMailbox2=this.value;});



	addNumericInputEvent(el('input-bells'), 0, 999999);
	addNumericInputEvent(el('input-bank'), 0, 999999999);
	addNumericInputEvent(el('input-medals'), 0, 99999);
	addNumericInputEvent(el('input-meow'), 0, 99999);
	addEvent(el('input-bells'), 'change', function(){currentPlayer.wallet.set(parseInt(this.value))});
	addEvent(el('input-bank'), 'change', function(){currentPlayer.bank.set(parseInt(this.value))});
	addEvent(el('input-medals'), 'change', function(){currentPlayer.islandMedals.set(parseInt(this.value))});
	addEvent(el('input-meow'), 'change', function(){currentPlayer.meowCoupons.set(parseInt(this.value))});



	/* read basic town info */
	town=new Town();
	town.refreshIdSpans();

	addSelectOptions('nativefruit', [1,2,3,4,5,6,7,8,9,10,11,12], ['Apple','Orange','Pear','Peach','Cherry','*Coconut','*Durian','*Lemon','*Lychee','*Mango','*Persimmon','*Banana']);
	addSelectEvent('nativefruit', function(){town.nativeFruit=this.value});
	el('select-nativefruit').value=town.nativeFruit;

	addSelectOptions('grasstype', 3, ['Triangle / square (winter)', 'Circle / star (winter)', 'Square / circle (winter)']);
	addSelectEvent('grasstype', function(){town.grassType=this.value});
	el('select-grasstype').value=town.grassType;

	addSelectOptions('cliffside', 2, ['Left', 'Right']);
	addSelectEvent('cliffside', function(){town.cliffSide=this.value});
	el('select-cliffside').value=town.cliffSide;

	addSelectOptions('grasstypeisland', 3, ['Triangle', 'Circle', 'Square']);
	addSelectEvent('grasstypeisland', function(){town.grassTypeIsland=this.value});
	el('select-grasstypeisland').value=town.grassTypeIsland;

	addSelectOptions('townhallcolor', generateTownRoofColorIds(town.townId1), ['Gray','Brown','Green','Blue']);
	addSelectEvent('townhallcolor', function(){town.townId1=parseInt(this.value);town.refreshIdSpans();town.searchTownIdReferences()});
	el('select-townhallcolor').value=town.townId1;

	addSelectOptions('trainstationcolor', generateTownRoofColorIds(town.townId2), ['Red','Green','Blue','Brown']);
	addSelectEvent('trainstationcolor', function(){town.townId2=parseInt(this.value);town.refreshIdSpans();town.searchTownIdReferences()});
	el('select-trainstationcolor').value=town.townId2;

	addSelectOptions('towntreesize', range(0,7));
	addSelectEvent('towntreesize', function(){town.treeSize=this.value;town.fixTownPlayTimeFromTreeSize()});
	el('select-towntreesize').value=town.treeSize;

	/* check HHD content status */
	town.checkHHDStatus()

	/* shops & lost and found */
	el('shop-retail').appendChild(town.shopRetail.canvas);
	el('shop-nook').appendChild(town.shopNook.canvas);
	el('shop-gracie').appendChild(town.shopGracie.canvas);
	el('shop-homes').appendChild(town.shopHomes.canvas);
	el('shop-leif').appendChild(town.shopLeif.canvas);
	el('shop-able1').appendChild(town.shopAble1.canvas);
	el('shop-able2').appendChild(town.shopAble2.canvas);
	el('shop-kicks').appendChild(town.shopKicks.canvas);
	el('shop-redd').appendChild(town.shopRedd.canvas);
	el('shop-island').appendChild(town.shopIsland.canvas);
	el('shop-museum').appendChild(town.shopMuseum.canvas);
	el('lostfound').appendChild(town.lostFound.canvas);
	el('lol-gyroids').appendChild(town.lolGyroids.canvas);
	if(plusMode)
		el('shop-harvey').appendChild(town.shopHarvey.canvas);
	for(var i=0; i<6; i++){
		var td0=document.createElement('td');
		var td1=document.createElement('td');
		var input0=createInput(town.turnipPrices[i].AM.value);
		var input1=createInput(town.turnipPrices[i].PM.value);
		td0.appendChild(input0);
		td1.appendChild(input1);

		var tr=el('table-turnip-prices').children[i];
		tr.appendChild(td0);
		tr.appendChild(td1);
		addTurnipEvents(i, input0, input1);
	}

	/* museum rooms */
	for(var i=0; i<4; i++)
		el('museumroom'+i).appendChild(town.museumRooms[i].gridContainer);

	/* shop unlocks */
	addSelectEvent('unlock-nook', function(){
		town.shopNookUnlock=parseInt(this.value);
		if (town.shopNookUnlock > 2) town.shopLeifUnlock=town.shopNookUnlock;
		el('checkbox-unlock-leif').checked=town.shopLeifUnlock > 1;
		el('checkbox-unlock-leif').disabled=town.shopNookUnlock > 2;
	});
	el('select-unlock-nook').value=town.shopNookUnlock;
	el('checkbox-unlock-leif').onchange=(ev)=>{
		if (ev.target.checked) {
			town.shopLeifUnlock=2;
		} else {
			town.shopLeifUnlock=0;
		}
	}
	el('checkbox-unlock-leif').checked=town.shopLeifUnlock > 1;
	el('checkbox-unlock-leif').disabled=town.shopNookUnlock > 2;
	el('checkbox-unlock-kicks').onchange=(ev)=>town.shopKicksUnlock=ev.target.checked?2:0;
	el('checkbox-unlock-kicks').checked=town.shopKicksUnlock > 1;
	el('checkbox-unlock-museum').onchange=(ev)=>town.shopMuseumUnlock=ev.target.checked?1:0;
	el('checkbox-unlock-museum').checked=town.shopMuseumUnlock > 0;
	el('checkbox-unlock-lol').onchange=(ev)=>town.shopLolUnlock=ev.target.checked?2:0;
	el('checkbox-unlock-lol').checked=town.shopLolUnlock > 1;
	el('checkbox-unlock-dream').onchange=(ev)=>town.shopDreamUnlock=ev.target.checked?1:0;
	el('checkbox-unlock-dream').checked=town.shopDreamUnlock > 0;
	el('checkbox-unlock-fortune').onchange=(ev)=>town.shopFortuneUnlock=ev.target.checked?1:0;
	el('checkbox-unlock-fortune').checked=town.shopFortuneUnlock > 0;

	/* read villagers */
	villagers=new Array(10);
	for(var i=0; i<10; i++)
		new Villager(i);

	/* read buildings */
	buildings=new Array();
	for(var i=0; i<58; i++)
		buildings.push(new Building('map', i));
	town.fixBuildingCounters();

	/* sort buildings by type */
	buildings=buildings.sort(function(a,b){return a.id-b.id});
	var liSeparation=null;
	for(var i=0; i<buildings.length; i++){
		if(buildings[i].tr){
			if(buildings[i].id>0x11 && !liSeparation){
				liSeparation=document.createElement('li');
				liSeparation.appendChild(document.createElement('hr'));
				el('buildings').appendChild(liSeparation);
			}

			el('buildings').appendChild(buildings[i].tr);
		}
	}

	for(var i=0; i<2; i++)
		buildings.push(new Building('island', i));



	/* read Labelle's patterns data */
	for(var i=0; i<8; i++){
		var pattern=new Pattern(Offsets.SHOP_ABLEPATTERNS, i);
		el('labelle').appendChild(pattern.canvas);
	}




	/* create player selects */
	addSelectOptions('gender',2,['Male','Female']);
	addSelectEvent('gender',function(){currentPlayer.gender=this.value;refreshFaceIcon();currentPlayer.searchPlayerIdReferences()});

	addSelectOptions('tan',16);
	addSelectEvent('tan',function(){currentPlayer.tan=this.value});

	var hairStyles=new Array(34);
	for(var i=0;i<17;i++){
		hairStyles[i]='Male '+(i+1);
		hairStyles[i+17]='Female '+(i+1)
	}
	hairStyles[16]='Male (bedhead)';
	hairStyles[16+17]='Female (bedhead)';
	addSelectOptions('hairstyle',34,hairStyles);
	addSelectEvent('hairstyle',function(){currentPlayer.hairStyle=this.value;refreshHairStyleIcon();});

	addSelectOptions('haircolor',16,['Dark brown','Light brown','Orange','Light blue','Gold','Light green','Pink','White','Black','Auburn','Red','Dark blue','Blonde','Dark green','Light purple', 'Ash brown']);
	addSelectEvent('haircolor',function(){currentPlayer.hairColor=this.value;refreshHairColorIcon()});

	addSelectOptions('eyecolor',8);
	addSelectEvent('eyecolor',function(){currentPlayer.eyeColor=this.value;refreshEyeColorIcon()});

	addSelectOptions('face',12);
	addSelectEvent('face',function(){currentPlayer.face=this.value;refreshFaceIcon();});

	for(var i=0; i<24; i++){
		var span1=document.createElement('span');
		span1.className='badge-icon';
		var span2=document.createElement('span');
		span2.innerHTML=Constants.Strings.BADGES[i];

		var li=document.createElement('li');
		li.appendChild(span1);
		li.appendChild(span2);
		li.badgeId=i;
		li.badgeIcon=span1;
		el('badges').appendChild(li);

		addBadgeEvents(li);
	}



	/* prepare acre dialog */
	const _evtClickAcre=function(evt){
		currentEditingItem.setId(this.acreId);
		MarcDialogs.close();
		checkWarnings();
	};
	var acreId=0;
	for(var i=0;i<=214;i++){
		if(!plusMode && (i==0x9b || i==0xa5)){
			continue;
		}


		var button=document.createElement('span');
		button.style.backgroundPosition=getAcreThumbnailPosition(i,64);
		if((i>=0x9e && i<=0xa3) || i==0xa8)
			button.style.height='40px';
		else
			button.style.height='64px';
		button.className='acre-button';
		button.acreId=acreId;

		var span=document.createElement('span');
		span.className='mono';
		span.innerHTML=intToHex(acreId,1);
		button.appendChild(span);

		el('acre-selector').appendChild(button);

		addEvent(button, 'click', _evtClickAcre);
		acreId++;
	}

	addEvent(window, 'contextmenu', preventDefault);
	addEvent(window, 'mouseup', _evtGridMouseUp);


	document.body.removeChild(el('home'));
	show('header');
	show('editor');
	selectPlayer(0);

	WarnOnLeave.set(true);
	checkWarnings();
}

function getAcreThumbnailPosition(i, size){
	return '-'+((i%20)*size)+'px -'+(parseInt(i/20)*size)+'px'
}


function selectPlayer(p){
	if(players[p]!==currentPlayer){
		currentPlayer=players[p];

		el('player-id').innerHTML='0x'+intToHex(currentPlayer.playerId2)+intToHex(currentPlayer.playerId1);

		el('player-name').value=currentPlayer.name.toString();
		el('player-tpctext').value=currentPlayer.TPCtext.toString();

		el('select-birthday-day').value=currentPlayer.birthdayDay;
		el('select-birthday-month').value=currentPlayer.birthdayMonth;
		el('select-registration-day').value=currentPlayer.registrationDay;
		el('select-registration-month').value=currentPlayer.registrationMonth;
		el('select-registration-year').value=currentPlayer.registrationYear;
		
		el('select-gender').value=currentPlayer.gender;
		el('select-tan').value=currentPlayer.tan;
		el('select-hairstyle').value=currentPlayer.hairStyle;
		el('select-haircolor').value=currentPlayer.hairColor;
		el('select-eyecolor').value=currentPlayer.eyeColor;
		el('select-face').value=currentPlayer.face;
		el('player-playtime').innerHTML=currentPlayer.playTime.toString();

		refreshEyeColorIcon();
		refreshHairColorIcon();
		refreshHairStyleIcon();
		refreshFaceIcon();

		el('input-bells').value=currentPlayer.wallet.value;
		el('input-bank').value=currentPlayer.bank.value;
		el('input-medals').value=currentPlayer.islandMedals.value;
		if(plusMode)
			el('input-meow').value=currentPlayer.meowCoupons.value;

		el('select-house-style').value=currentPlayer.houseStyle;
		el('select-house-doorshape').value=currentPlayer.houseDoorShape;
		el('select-house-brick').value=currentPlayer.houseBrick;
		el('select-house-roof').value=currentPlayer.houseRoof;
		el('select-house-door').value=currentPlayer.houseDoor;
		el('select-house-fence').value=currentPlayer.houseFence;
		el('select-house-pavement').value=currentPlayer.housePavement;
		el('select-house-mailbox').value=currentPlayer.houseMailbox;

		var PLAYER_BLOCKS=['patterns','rooms0','rooms1','rooms2','rooms3','rooms4','rooms5'];

		for(var i=0; i<4; i++){
			if(i==p){
				for(j=0; j<PLAYER_BLOCKS.length; j++)
					if(PLAYER_BLOCKS[j]==='patterns')
						el(PLAYER_BLOCKS[j]+i).style.display='grid';
					else
						show(PLAYER_BLOCKS[j]+i);
				el('player'+i+'-pic').className='player-button active';
			}else{
				for(j=0; j<PLAYER_BLOCKS.length; j++)
					hide(PLAYER_BLOCKS[j]+i);
				el('player'+i+'-pic').className='player-button';
			}
		}
		itemGridPockets.setToCurrentPlayer();
		itemGridDresser0.setToCurrentPlayer();
		itemGridDresser1.setToCurrentPlayer();
		itemGridDresser2.setToCurrentPlayer();
		itemGridIslandBox.setToCurrentPlayer();
		if(plusMode){
			itemGridStorage0.setToCurrentPlayer();
			itemGridStorage1.setToCurrentPlayer();
			itemGridStorage2.setToCurrentPlayer();
			itemGridStorage3.setToCurrentPlayer();
		}


		var badges=el('badges').children;
		for(var i=0;i<24;i++){
			refreshBadge(badges[i]);
			if(currentPlayer.badgeValues[i].value)
				badges[i].title='Current value progress: '+currentPlayer.badgeValues[i].value;
			else
				badges[i].title='';
		}
	}
}






function saveChanges(){
	for(var i=0; i<4; i++)
		players[i].save();

	for(var i=0; i<buildings.length; i++)
		buildings[i].save();

	for(var i=0; i<villagers.length; i++)
		villagers[i].save();

	map.save();
	island.save();
	grassMap.save();
	//grassMapToday.save();
	
	town.save();


	/* recalculate checksums */
	updateChecksums(savegame);

	savegame.save();

	WarnOnLeave.set(false);
}




