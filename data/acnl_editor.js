/*
	Animal Crossing: New Leaf Save Editor v20170203
	by Marc Robledo 2015-2017

	A lot of thanks to:
	 * Thulinma for Pattern structure (check out his editor pattern http://www.thulinma.com/acnl/ )
	 * NeoKamek for his work on LeafTools and other help
	 * froggestspirit for extracting acre information and item list
	 * sprungit/shokolad-town for compiling hair style and color thumbnails
*/

var AUTO_INCREMENT=false; /* automatic increase item index after placing */


var Offsets={
	TOWN_TREESIZE:			0x80+0x049526,
	TOWN_GRASSTYPE:			0x80+0x04da01,
	TOWN_PLAYTIME:			0x80+0x5c730,
	TOWN_DAYSPLAYED:		0x80+0x5c7ba,
	TOWN_NATIVEFRUIT:		0x80+0x05c7b6,
	TOWN_ID1:				0x80+0x05c738,
	TOWN_ID2:				0x80+0x05c739,
	TOWN_NAME:				0x80+0x05c73a,
	TOWN_AVAILABLEPWPS:		0x80+0x04d9c8,
	TOWN_TURNIP_PRICES:		0x80+0x06535c,

	MUSEUM_ROOMS:			0x80+0x0659d8,

	MAP_GRASS_CURRENT:		0x80+0x052a58,
	MAP_GRASS_PREVIOUS:		0x80+0x053e80,
	MAP_ACRES:				0x80+0x04da04,
	MAP_BUILDINGS:			0x80+0x049528,
	MAP_ITEMS:				0x80+0x04da58,

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
	PLAYER_BADGES:			0x569c,
	PLAYER_TPCPIC:			0x5724,
	PLAYER_TPCTEXT:			0x6b24,
	PLAYER_PLAYTIME:		0x6b90,
	PLAYER_POCKETS:			0x6bb0,
	PLAYER_ENCYCLOPEDIA:	0x6c00,
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

	MIN_WALL:		0x2342,	MAX_WALL:		0x23c6,
	MIN_FLOOR:		0x23c7,	MAX_FLOOR:		0x2445,
	MIN_SONG:		0x2126,	MAX_SONG:		0x2180,
	MIN_SHIRT:		0x2448,	MAX_SHIRT:		0x260b,
	MIN_UMBRELLA:	0x2755,	MAX_UMBRELLA:	0x2778
};
const OffsetsPlus={
	TOWN_TREESIZE:			0x04be86,
	TOWN_GRASSTYPE:			0x053481,
	TOWN_PLAYTIME:			0x0621b0,
	TOWN_DAYSPLAYED:		0x06223e,
	TOWN_NATIVEFRUIT:		0x06223a,
	TOWN_ID1:				0x0621b8,
	TOWN_ID2:				0x0621b9,
	TOWN_NAME:				0x0621ba,
	TOWN_AVAILABLEPWPS:		0x050328,
	TOWN_TURNIP_PRICES:		0x06ade0,

	MUSEUM_ROOMS:			0x06b478,

	MAP_GRASS_CURRENT:		0x0584d8,
	MAP_GRASS_PREVIOUS:		0x059900,
	MAP_ACRES:				0x053484,
	MAP_BUILDINGS:			0x04be88,
	MAP_ITEMS:				0x0534d8,

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
	PLAYER_BADGES:			0x569c,
	PLAYER_TPCPIC:			0x5738,
	PLAYER_TPCTEXT:			0x6b38,
	PLAYER_PLAYTIME:		0x6bb0,
	PLAYER_POCKETS:			0x6bd0,
	PLAYER_ENCYCLOPEDIA:	0x6c20,
	PLAYER_BANK:			0x6b8c,
	PLAYER_MEDALS:			0x6b9c,
	PLAYER_WALLET:			0x6f08,
	PLAYER_ISLANDBOX:		0x6f10,
	PLAYER_LETTERS:			0x7008,
	PLAYER_EMOTIONS:		0x89d0,
	PLAYER_MEOW:			0x8d1c,
	PLAYER_DRESSERS:		0x92f0,
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

	MIN_WALL:		0x234c,	MAX_WALL:		0x23ea,
	MIN_FLOOR:		0x23eb,	MAX_FLOOR:		0x2492,
	MIN_SONG:		0x212b,	MAX_SONG:		0x2185,
	MIN_SHIRT:		0x2495,	MAX_SHIRT:		0x2680,
	MIN_UMBRELLA:	0x27e6,	MAX_UMBRELLA:	0x280a
};

const Constants={
	Strings:{
		PERSONALITIES:['&#9794; lazy','&#9794; jock','&#9794; cranky','&#9794; smug','&#9792; normal','&#9792; peppy','&#9792; snooty','&#9792; uchi'],
		BADGES:['Fishes','Bugs','Marine','Fish collection','Bug collection','Marine collection','Balloons','Visiting other towns','Being visited','Watering flowers','Bank','Turnips','Medals','StreetPass','Weeds','Shopping','Letters','Refurbishing','Catalog','K.K. Slider','Home points','Time played','Helping neighbors','Dream Suite']
	},

	FULL_ENCYCLOPEDIA:[0xfe,0xff,0x12,0xef,0x7f,0xfd,0x7d,0x87,0xc1,0x38,0x80,0xa3,0x01,0x00,0x00,0x00,0xf0,0xff,0xfb,0xff,0x83,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xef,0xff,0xff,0x29,0xd1,0xff,0xff,0xff,0x7f,0x3f,0xaf,0xef,0xff,0x7f,0x11,0x08,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xfc,0x5f,0xf7,0xfd,0x85,0xaf,0xff,0x77,0x04,0xf0,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xbf,0x67,0x01,0x75,0x79,0x3e,0xdd,0xb8],
	ALL_EMOTIONS:[
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,
		0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,
		0x20,0x21,0x24,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2e
	],
	ALL_PWPS:[0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff],

	TOWN_PLAYTIME_FROM_TREESIZE:[1,5,20,50,100,180,300,500],

	HAIR_COLORS:['593a38','935929','ef572e','41a6dc','ffe779','8bcf62','ee798b','fff8de','171806','550601','bb0c07','001449','dea70f','015a22','ad75bc','7a795a'],
	EYE_COLORS:['323627','cd7246','5b9773','6d8680','5678c0','3f88bd']
};



var mouseHeld=0,tempFile,tempFileLoadFunction;
var savegame,map,island,players,grassCurrent,buildings,town;
var currentPlayer,currentTab;
var currentEditingItem;
var moveBuildingOverlay;

var plusMode=false;
var Offsets;

function el(e){return document.getElementById(e)}
function show(e){el(e).style.display='block'}
function hide(e){el(e).style.display='none'}
function toggle(e){if(el(e).style.display=='block')hide(e);else show(e)}
function addEvent(e,ev,f){if(e.addEventListener){e.addEventListener(ev,f,false);return true}else if(e.attachEvent)e.attachEvent('on'+ev,f)}
function addNumericInputEvent(e,min,max){
	//e.type='number';
	e.min=min;
	e.max=max;
	var cleanInput=function(){
		e.value=e.value.replace(/[^0-9]/i,'');
		var val=parseInt(e.value);
		if(e<min || e>max)
			e.value=min;
	}
	addEvent(e,'input',cleanInput);
	addEvent(e,'change',cleanInput);
}
function prevent(evt){evt.stopPropagation();evt.preventDefault()}
function stopPropagation(e){if(typeof e.stopPropagation!='undefined')e.stopPropagation();else e.cancelBubble=true}
function setCookie(k,v,w){var exp;if(w){exp=new Date((new Date()).getTime()+1000*60*60*24*7).toGMTString()}else{exp='Thu, 31 Dec 2020 12:00:00 UTC'}document.cookie='acnleditor'+k+'='+v+'; expires='+exp}
function getCookie(k){var cs=document.cookie.split(';');for(var i=0;i<cs.length;i++){var f=cs[i].indexOf(k+'=');if(f>-1)return cs[i].substring(f+(k+'=').length)}return false}
function getString(o){if(o[el('lang-selector').value])return o[el('lang-selector').value];else return o[0]}
function intToHex(i,b){var h=i.toString(16);while(h.length<b*2)h='0'+h;return h}
function range(min,max){var a=[];for(i=min;i<=max;i++)a.push(i);return a}
function showTab(evt){var newTab=evt.target.tabInfo;if(newTab.id!==currentTab.id){hide('tab-'+currentTab.id);currentTab.button.className='';show('tab-'+newTab.id);newTab.button.className='active';currentTab=newTab}}
function updateLangIcon(l){el('lang-flag').className='sprite flag flag-'+l}
function acceptDisclaimer(updateCookie){setCookie('nodisclaimer',1,true);MarcDialogs.close()}

function createInput(defValue){var input=document.createElement('input');input.type='text';input.value=defValue;return input}
function createButton(t){var b=document.createElement('input');b.type='button';b.className='button';b.value=t;return b}
function createSpan(t){var s=document.createElement('span');s.innerHTML=t;return s}
function createOption(v,t){var o=document.createElement('option');o.value=v;o.innerHTML=t;return o}
function createEditButton(){var b=document.createElement('span');b.className='sprite edit-icon';return b}
function createEditStringButton(s,name){
	var div=document.createElement('div');

	if(s.chars[0]){
		div.appendChild(s.span);
		//div.style.display='inline-block';

		var editButton=createEditButton();	
		addEvent(editButton, 'click', function(){
			openEditStringDialog(s, name);
		});

		div.appendChild(editButton);
	}
	return div
}



/* this is the unknown 64bit variable, hardcode values for now */
function NumericValue(offset){
	this.offset=offset;
	this.int1=savegame.readByte4(offset);
	this.int2=savegame.readByte4(offset+4);
}
NumericValue.prototype.set=function(newVal){
	if(newVal===49){
		this.int1=0x1876918f;this.int2=0x6804022e
	}else if(newVal===661){
		this.int1=0x1ea36532;this.int2=0x0abc0512
	}else if(newVal===990){
		this.int1=0x848f1963;this.int2=0x4914eb74
	}else if(newVal===9999){
		this.int1=0xe3911e31;this.int2=0x7d0d5687
	}else if(newVal===99999){
		this.int1=0x5d1e3420;this.int2=0x8915155d
	}else if(newVal===999999999){
		this.int1=0x8cf95678;this.int2=0x0d118636
	}else{
		alert('Unknown value');
	}
}
NumericValue.prototype.save=function(){
	savegame.storeByte4(this.offset, this.int1);
	savegame.storeByte4(this.offset+4, this.int2)
}


var showDebug=function(){show('debug')};
var hideDebug=function(){hide('debug')};
function enableDebugOnElement(e){addEvent(e,'mouseenter',showDebug);addEvent(e,'mouseleave',hideDebug)}











/* Initialize ACNL editor */
addEvent(window,'load',function(){
	if(!getCookie('nodisclaimer')){
		MarcDialogs.open('disclaimer');
	}else{
		document.body.removeChild(el('dialog-disclaimer'));
	}

	var cookieLang=getCookie('lang');
	if(cookieLang && typeof cookieLang==='string'){
		el('lang-selector').value=parseInt(cookieLang);
		updateLangIcon(parseInt(cookieLang));
	}

	hide('loading');
	show('loadform');
});



function Town(){
	this.treeSize=savegame.readByte1(parseInt(Offsets.TOWN_TREESIZE)); //01-07
	this.grassType=savegame.readByte1(Offsets.TOWN_GRASSTYPE); //00-02
	this.grassTypeIsland=savegame.readByte1(Offsets.ISLAND_GRASSTYPE); //00-02

	this.playTime=new PlayTime(Offsets.TOWN_PLAYTIME);

	el('town-playtime').appendChild(this.playTime.span);

	this.daysPlayed=savegame.readByte2(Offsets.TOWN_DAYSPLAYED);
	el('town-sessions').innerHTML=this.daysPlayed;

	this.nativeFruit=savegame.readByte1(Offsets.TOWN_NATIVEFRUIT);




	this.townId1=savegame.readByte1(Offsets.TOWN_ID1);
	this.townId2=savegame.readByte1(Offsets.TOWN_ID2);
	this.name=savegame.readU16String(Offsets.TOWN_NAME, 9);
	el('town-name').appendChild(createEditStringButton(this.name, 'town name'));

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
		this.bulletinBoard[i]=savegame.readU16String(0x068840+0x01aa*i, 50);
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

	/* read museum rooms */
	this.museumRooms=new Array(4);
	for(var i=0; i<4; i++)
		this.museumRooms[i]=new Room(Offsets.MUSEUM_ROOMS+0xb98*i);

	this.turnipPrices=[];
	for(var i=0;i<6;i++){
		this.turnipPrices[i]={
			AM:new NumericValue(Offsets.TOWN_TURNIP_PRICES+i*16),
			PM:new NumericValue(Offsets.TOWN_TURNIP_PRICES+i*16+8)
		}
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
			townId[i]=savegame.readByte4(Offsets.TOWN_ID1+i*4);

		this.townIdReferences=new Array();
		for(var offset=0; offset<522624-5*4; offset+=2){
			var found=true;
			for(var i=0; i<5 && found; i++){
				if(savegame.readByte4(offset+i*4)!=townId[i]){
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
	savegame.storeByte(Offsets.TOWN_NATIVEFRUIT, this.nativeFruit);
	savegame.storeByte(Offsets.TOWN_GRASSTYPE, this.grassType);
	savegame.storeByte(Offsets.ISLAND_GRASSTYPE, this.grassTypeIsland);

	savegame.storeByte(Offsets.TOWN_TREESIZE, this.treeSize);

	this.playTime.save();
	savegame.storeByte2(Offsets.TOWN_DAYSPLAYED, this.daysPlayed);

	/* fix town ID references */
	if(this.townIdReferences)
		for(var i=0; i<this.townIdReferences.length; i++){
			savegame.storeByte(this.townIdReferences[i], this.townId1);
			savegame.storeByte(this.townIdReferences[i]+1, this.townId2);
			savegame.storeU16String(this.townIdReferences[i]+2, this.name);
		}

	for(var i=0; i<16; i++)
		this.pastVillagers[i].save();





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

	for(var i=0; i<4; i++)
		this.museumRooms[i].save();

	for(var i=0;i<6;i++){
		this.turnipPrices[i].AM.save();
		this.turnipPrices[i].PM.save();
	}

	if(plusMode)
		for(var i=0; i<2; i++)
			this.caravanVillagers[i].save();
}


function generateTownRoofColorIds(townIdX){
	var arr=new Array(4);
	arr[0]=((townIdX & 0xfc)>>>0)+0x00;
	arr[1]=arr[0]+0x01;
	arr[2]=arr[0]+0x02;
	arr[3]=arr[0]+0x03;
	return arr;
}

Town.prototype.unlockAllPWPs=function(){
	MarcDialogs.confirm('Do you want to unlock all PWPs?<br/>'+getWarningMessage(), function(){
		for(var i=0; i<Constants.ALL_PWPS.length; i++)
			savegame.storeByte(Offsets.TOWN_AVAILABLEPWPS+i, Constants.ALL_PWPS[i])
		MarcDialogs.alert('All PWPs have been unlocked.');
	});
}

Town.prototype.maxTurnipPrices=function(){
	MarcDialogs.confirm('Do you want to set turnip prices to 990 for the current week?<br/>'+getWarningMessage(), function(){
		for(var i=0; i<6; i++){
			town.turnipPrices[i].AM.set(990);
			town.turnipPrices[i].PM.set(990);
		}
		MarcDialogs.alert('Turnip prices were set to 990 for the current week.');
	})
}

Town.prototype.setGrass=function(b){
	var MAX_CURRENT=(16*16)*(5*4);
	for(var i=0; i<MAX_CURRENT; i++){
		grassCurrent.tiles[i]=~b & 0x0f;
		savegame.storeByte(Offsets.MAP_GRASS_CURRENT+i, grassCurrent.tiles[i]);
	}
	grassCurrent.draw();

	var MAX=(16*16)*(5*4) *2 ; // *2 ???
	for(var i=0; i<MAX; i++)
		savegame.storeByte(Offsets.MAP_GRASS_PREVIOUS+i, b);


	MarcDialogs.close();
}
Town.prototype.fillGrass=function(){MarcDialogs.confirm('Do you want to revive all grass?',function(){town.setGrass(0xff)})};
Town.prototype.fillDesert=function(){MarcDialogs.confirm('Do you want to kill all grass?',function(){town.setGrass(0x00)})};
Town.prototype.fillStrippedGrass=function(){
	MarcDialogs.confirm('Do you want to strip all grass?', function(){
		var MAX_CURRENT=(16*16)*(5*4);
		for(var i=0; i<MAX_CURRENT/2; i++){
			grassCurrent.tiles[i*2+0]=0x00;
			grassCurrent.tiles[i*2+1]=0x0f;
			savegame.storeByte(Offsets.MAP_GRASS_CURRENT+i*2+0, grassCurrent.tiles[i*2+0]);
			savegame.storeByte(Offsets.MAP_GRASS_CURRENT+i*2+1, grassCurrent.tiles[i*2+1]);
		}
		grassCurrent.draw();

		var MAX=((16*16)*(5*4))*2;
		for(var i=0; i<MAX; i++){
			var b;
			if(i%2==0){
				b=0x00;
			}else{
				b=0xff;
			}
			savegame.storeByte(Offsets.MAP_GRASS_PREVIOUS+i, b)
		}

		MarcDialogs.close();
	});
}




function ItemList(offset, nItems){
	//this.offset=offset;
	this.items=new Array(nItems);
	this.edited=false;
	for(var i=0; i<nItems; i++)
		this.items[i]=new Item(offset, i);
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
		this.itemList=new ItemList(offset, this.nItems);
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

		this._ctx.fillRect(x, y, this.tileSize, this.tileSize);

		var icon=0;
		if(item.hasBuilding){
			icon=3;
		}else if(!el('item_'+item.id)){
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
	}else if(item.hasBuilding){
		this._ctx.drawImage(acresImage, 60, 704, 16, 16, x, y, 16, 16);
	}else if(item.id==0x7ffc){
		this._ctx.fillStyle='#bbb';
		this._ctx.fillRect(x, y, this.tileSize, this.tileSize);
	}
	
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
acresImage.src='./data/acres.png';





function mouseDown(evt,itemGridObj){
	if(evt.which==3)
		mouseHeld=2;
	else if(evt.which==1)
		mouseHeld=1;
	else mouseHeld=0;

	click(evt,itemGridObj,true);
}
function mouseUp(evt){mouseHeld=0}



function isLockedItem(itemId){
	return (!plusMode && ((itemId>=0x30f9 && itemId<=0x30fc) || (itemId>=0x30a2 && itemId<=0x30a9))) ||
		(plusMode && ((itemId>=0x341a && itemId<=0x341d) || (itemId>=0x33bc && itemId<=0x33c3)))	
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

	if(mouseHeld==1){
		if(el('items').value>=itemGridObj.minItem && el('items').value<=itemGridObj.maxItem){
			if(itemGridObj.inside && itemSlot.id==el('items').value && itemSlot.flag1==el('flag1').decimalValue && itemSlot.flag2==el('flag2').decimalValue){
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

				setFlag(2, newFlag2);
			}
			if(!isLockedItem(el('items').value) && !isLockedItem(itemSlot.id))
				itemSlot.set(el('flag2').decimalValue,el('flag1').decimalValue,el('items').value);

			itemGridObj.repaintTile((parseInt(y*itemGridObj.width)+x));
		}
		if(AUTO_INCREMENT)
			el('items').selectedIndex=el('items').selectedIndex+1;
		itemGridObj.itemList.edited=true;
	}else if(mouseHeld==2){
		if(!el('item_'+itemSlot.id)){
			el('item_unk').value=itemSlot.id;
			el('item_unk').innerHTML='unknown item: 0x'+intToHex(itemSlot.id, 1);
		}
		el('items').value=itemSlot.id;

		buildFlagsSelects(itemSlot.flag1, itemSlot.flag2);
	}


	if(itemGridObj.belongsToMap){
		el('debug-name').innerHTML='<b>'+(itemGridObj.startX+x)+'x'+(itemGridObj.startY+y)+':</b> '+itemSlot.name;
	}else{
		el('debug-name').innerHTML=itemSlot.name;
	}
	el('debug-hex').innerHTML=itemSlot.nameHex;

	el('debug').style.top=window.pageYOffset+24+rect.top+y*itemGridObj.tileSize+'px';
	el('debug').style.left=rect.left+24+x*itemGridObj.tileSize+'px';
}

function addItemGridEvents(itemGridObj){
	addEvent(itemGridObj.canvas,'click',prevent);
	addEvent(itemGridObj.canvas,'mousedown',function(evt){mouseDown(evt,itemGridObj)});
	addEvent(itemGridObj.canvas,'mouseup',mouseUp);
	addEvent(itemGridObj.canvas,'mousemove',function(evt){click(evt,itemGridObj,false)});

	enableDebugOnElement(itemGridObj.canvas);
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

	this.itemGrids=[];
	this.items=[];
	for(var i=0; i<nGrids; i++){
		this.itemGrids[i]=new ItemGrid(this.offsetItems+i*4*16*16, 16, 16);
		this.itemGrids[i].belongsToMap=true;
		this.itemGrids[i].startX=16+16*(i%acreWidth);
		this.itemGrids[i].startY=16+16*parseInt(i/acreWidth);

		el('map-'+type).appendChild(this.itemGrids[i].canvas);

		for(var j=0; j<256; j++)
			this.items.push(this.itemGrids[i].itemList.items[j]);
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





function GrassMapPrevious(offset,canvasId,width,height){
	this.offset=offset;
	this.canvas=el(canvasId);
	this.width=width;
	this.height=height;

	this.canvas.width=this.width*16;
	this.canvas.height=this.height*16;

	this.tiles=new Array(width*height*16*16);
	for(var i=0; i<this.tiles.length; i++){
		var b=savegame.readByte1(this.offset+i);
		this.tiles[i]=b & 0x0f;
		if(b >> 4){
			//alert(b);
		}
	}

	this.draw();
}
GrassMapPrevious.prototype.draw=function(){
	var tile=0;
	var ctx=this.canvas.getContext('2d');
	for(var i=0; i<this.height; i++){
		for(var j=0; j<this.width; j++){
			for(var y=0; y<16; y++){
				for(var x=0; x<16; x++){
					var color=255-this.tiles[tile]*17;
					ctx.fillStyle='rgba('+color+','+color+','+color+',1)';
					ctx.fillRect(j*16+x, i*16+y, 1, 1);

					tile++;
				}
			}
		}
	}
}
GrassMapPrevious.prototype.save=function(){
}


function GrassMapCurrent(offset,canvasId,width,height){
	this.offset=offset;
	this.canvas=el(canvasId);
	this.width=width;
	this.height=height;

	this.canvas.width=this.width*16;
	this.canvas.height=this.height*16;

	this.tiles=new Array(width*height*16*16);
	for(var i=0; i<this.tiles.length; i++){
		var b=savegame.readByte1(this.offset+i);
		this.tiles[i]=b;
	}

	this.draw();
}
GrassMapCurrent.prototype.draw=function(){
	var tile=0;
	var ctx=this.canvas.getContext('2d');
	for(var i=0; i<this.height; i++){
		for(var j=0; j<this.width; j++){
			for(var y=0; y<16; y++){
				for(var x=0; x<16; x++){
					var color=255-this.tiles[tile];
					ctx.fillStyle='rgba('+color+','+color+','+color+',1)';
					ctx.fillRect(j*16+x, i*16+y, 1, 1);

					tile++;
				}
			}
		}
	}
}
GrassMapCurrent.prototype.save=function(){
}












function Acre(type, n, itemGrid){
	this.n=n;
	if(type==='map')
		this.offset=Offsets.MAP_ACRES+n*2;
	else
		this.offset=Offsets.ISLAND_ACRES+n*2;


	this.id=savegame.readByte1(this.offset);

	if(itemGrid)
		this.itemGrid=itemGrid;

	this.button=document.createElement('span');
	this.button.className='acre-button';

	this.span=document.createElement('span');
	this.span.innerHTML='0x'+intToHex(this.id,1);
	this.button.appendChild(this.span);

	if(type==='map' && n<=6)
		this.button.style.height='40px';

	el(type+'-acres').appendChild(this.button);
	this.refreshThumbnail();

	//addEvent(this.button, 'mousedown', function(){clickAcre(this)});
	addAcreEvents(this);
}
Acre.prototype.setId=function(newId){
	this.id=newId;
	this.span.innerHTML='0x'+intToHex(this.id,1);
	this.refreshThumbnail();
}
Acre.prototype.save=function(){
	savegame.storeByte2(this.offset, this.id)
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



function addAcreEvents(a){
	addEvent(a.button, 'mousedown', function(){clickAcre(a)});
}
function clickAcre(acre){
	currentEditingItem=acre;
	MarcDialogs.open('acre');
}
function importMap(){importMapOffset(map)}
function importIsland(){importMapOffset(island)}
function importMapOffset(mapOffset){
	if((mapOffset===island && tempFile.fileSize==4120) || (mapOffset===map && tempFile.fileSize==20754)){
		var firstAcre, acreGrid;
		if(mapOffset===island){
			firstAcre=7*6;
			acreGrid=4*4;
		}else{
			firstAcre=0;
			acreGrid=7*6;
		}

		/* import acres */
		for(var i=0; i<mapOffset.acres.length; i++){
			mapOffset.acres[firstAcre+i].setId(tempFile.readByte1(i));
		}

		MarcDialogs.open('importmap');
	}
}
function acceptImportMap(){
	var mapOffset,acreGrid, itemsGrid, firstBuilding, nBuildings, type;
	if(tempFile.fileSize==4120){ /* map==='island' */
		firstBuilding=58;
		itemsGrid=2*2;
		acreGrid=4*4;
		nBuildings=2;
		type='island';
		mapOffset=island;
	}else{
		firstBuilding=0;
		itemsGrid=5*4;
		acreGrid=7*6;
		nBuildings=58;
		type='map';
		mapOffset=map;
	}

	/* import items */
	var offset=acreGrid;
	if(el('import-items').checked){
		for(var i=0; i<mapOffset.items.length; i++){
			var id=tempFile.readByte2(offset+i*4+0);
			var flag1=tempFile.readByte1(offset+i*4+2);
			var flag2=tempFile.readByte1(offset+i*4+3);
			mapOffset.items[i].set(flag2, flag1, id);
		}
		for(var i=0; i<itemsGrid; i++){
			mapOffset.itemGrids[i].itemList.edited=true;
		}
	}



	/* import buildings */
	if(el('import-buildings').checked){
		for(var i=0; i<nBuildings; i++){
			var oldBuilding=buildings[firstBuilding+i];
			if(oldBuilding.id>0x11 && (oldBuilding.id!=0xf8 && oldBuilding.id!=0xfc)){
				oldBuilding.remove();
				oldBuilding._refreshTile(true);
			}
		}

		offset+=itemsGrid*(16*16)*4;
		for(var i=0; i<nBuildings; i++){
			var newId=tempFile.readByte2(offset+i*4+0);
			var newX=tempFile.readByte1(offset+i*4+2);
			var newY=tempFile.readByte1(offset+i*4+3);

			if(newId<=0x11){
				for(var j=0; j<nBuildings; j++){
					var oldBuilding=buildings[firstBuilding+j];
					if(oldBuilding.id==newId){
						oldBuilding.x=newX;
						oldBuilding.y=newY;
						oldBuilding._refreshTile(true);
						break;
					}
				}
			}else if(newId>=0x4c && (newId!=0xf8 && newId!=0xfc)){
				for(var j=0; j<nBuildings; j++){
					var oldBuilding=buildings[firstBuilding+j];
					if(oldBuilding.id==0xf8 || oldBuilding.id==0xfc){
						oldBuilding.x=newX;
						oldBuilding.y=newY;
						oldBuilding.set(newId);
						break;
					}
				}
			}
		}
	}
	

	MarcDialogs.close();
}
function exportMap(mapOffset){
	var nBuildings, firstBuilding, fileSuffix;
	
	if(mapOffset===island){
		fileSuffix='islandmap';
		nBuildings=2;
		firstBuilding=58;
	}else{
		fileSuffix='map';
		nBuildings=58;
		firstBuilding=0;
	}
	var newFile=new HexFile((mapOffset.acres.length)+(mapOffset.items.length*4)+(nBuildings*4));

	/* export acres */
	var offset=0;
	for(var i=0; i<mapOffset.acres.length; i++)
		newFile.storeByte(offset+i, mapOffset.acres[i].id);

	/* export items */
	offset+=mapOffset.acres.length;
	for(var i=0; i<mapOffset.items.length; i++){
		newFile.storeByte2(offset+i*4+0, mapOffset.items[i].id);
		newFile.storeByte(offset+i*4+2, mapOffset.items[i].flag1);
		newFile.storeByte(offset+i*4+3, mapOffset.items[i].flag2);
	}

	/* export buildings */
	offset+=mapOffset.items.length*4;
	for(var i=0; i<nBuildings; i++){
		newFile.storeByte2(offset+i*4+0, buildings[firstBuilding+i].id);
		newFile.storeByte(offset+i*4+2, buildings[firstBuilding+i].x);
		newFile.storeByte(offset+i*4+3, buildings[firstBuilding+i].y);
	}

	newFile.fileName=town.name.toString()+' '+fileSuffix+'.acnlmap';
	newFile.save();
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
	}
	this.id=savegame.readByte2(this.offset);
	this.x=savegame.readByte1(this.offset+2);
	this.y=savegame.readByte1(this.offset+3);

	buildings.push(this);

	if((!plusMode && this.id!=0xf8) || (plusMode && this.id!=0xfc))
		this._createEditRow();
}
Building.prototype._refreshTile=function(moving){
	var acreWidth=(this.type==='island')? 2:5;

	if(this.x<16 || this.y<16 || this.x>this._MAXWIDTH-17 || this.y>this._MAXHEIGHT-17 || (!plusMode && this.id==0xf8) || (plusMode && this.id==0xfc))
		return null;

	var acre=this.map.itemGrids[parseInt((this.x-16)/16)+parseInt((this.y-16)/16)*acreWidth];	
	var xy=(this.x%16)+(this.y%16)*16;

	if(moving){
		this.mapTile=acre.itemList.items[xy];
		this.mapTile.hasBuilding=this.spanBuildingName.innerHTML;
	}else{
		this.mapTile.hasBuilding=false;
	}

	this.mapTile.refreshName();
	acre.repaintTile(xy);
}
Building.prototype.set=function(newId){
	this.id=newId;
	if((!plusMode && newId==0xf8) || (plusMode && newId==0xfc)){
		this.x=0;
		this.y=0;

		if(this.tr){
			if(this.type==='island')
				el('buildings-island').removeChild(this.tr);
			else
				el('buildings').removeChild(this.tr);
			this.tr=null;
		}
	}else if(this.tr){
		this.tr.order=this.id;

		if(el('add-building-'+this.id))
			this.spanBuildingName.innerHTML=el('add-building-'+this.id).innerHTML;
		else
			this.spanBuildingName.innerHTML='(?) 0x'+this.id.toString(16);


		this._refreshTile(true);


	}else{
		//this.x=16+this.n;
		//this.y=16+this.n;
		this._createEditRow();
	}
}
Building.prototype.remove=function(){
	this._refreshTile(false);

	this.set(plusMode? 0xfc : 0xf8);
}
Building.prototype._createEditRow=function(){
	if(el('add-building-'+this.id))
		this.spanBuildingName=createSpan(el('add-building-'+this.id).innerHTML);
	else
		this.spanBuildingName=createSpan(' 0x'+this.id.toString(16));

	this._refreshTile(true);



	
	this.tr=document.createElement('li');

	var divCoord=document.createElement('div');
	divCoord.className='div-coord';

	var moveBuildingButton=null;

	
	this.inputX=createInput(this.x);
	addNumericInputEvent(this.inputX, 0, 110);
	this.inputY=createInput(this.y);
	addNumericInputEvent(this.inputY, 0, 94);

	if(
	(!plusMode && (this.id==0xda || this.id==0xdb)) ||
	(plusMode && (this.id==0xdc || this.id==0xdd))
	){
		this.inputX.disabled=true;
		this.inputY.disabled=true;
	}else{
		moveBuildingButton=createEditButton();
		moveBuildingButton.className='sprite edit-icon edit-icon2';
		divCoord.appendChild(moveBuildingButton);
	}
	divCoord.appendChild(this.inputX);
	divCoord.appendChild(createSpan('&times;'));
	divCoord.appendChild(this.inputY);

	this.tr.appendChild(this.spanBuildingName);
	this.tr.appendChild(divCoord);

	var editButton=null;
	if(el('add-building-'+this.id) && el('add-building-'+this.id).group!=-1){
		editButton=createEditButton();
		this.tr.appendChild(editButton);
	}


	addBuildingEvents(this, this.inputX, this.inputY, moveBuildingButton, editButton);

	this.tr.order=this.id;
	if(this.type=='island'){
		el('buildings-island').appendChild(this.tr);
	}else{
		el('buildings').appendChild(this.tr);
	}
}
Building.prototype.save=function(){
	savegame.storeByte2(this.offset, this.id);
	savegame.storeByte(this.offset+2, this.x);
	savegame.storeByte(this.offset+3, this.y);
}
Building.prototype.setX=function(x){
	this._refreshTile(false);

	x=parseInt(x);
	if(!x)
		this.x=0;
	else if(x>=0 && x<=this._MAXWIDTH && x!=NaN && x!=null)
		this.x=x;
	this.inputX.value=this.x;

	this._refreshTile(true);
}
Building.prototype.setY=function(y){
	this._refreshTile(false);

	y=parseInt(y);
	if(!y)
		this.y=0;
	else if(y>=0 && y<=this._MAXHEIGHT && y!=NaN && y!=null)
		this.y=y;
	this.inputY.value=this.y;

	this._refreshTile(true);
}
function addBuildingEvents(b,inputX,inputY, moveBuildingButton, editButton){
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
	}

	if(moveBuildingButton){
		addEvent(moveBuildingButton, 'click', function(){
			moveBuilding(b);
		});
	}
	addEvent(inputX, 'keyup', moveWithKeys);
	addEvent(inputY, 'keyup', moveWithKeys);
	if(editButton)
		addEvent(editButton, 'click', function(){openBuildingDialog(b)});
}
function openBuildingDialog(b){
	currentEditingItem=b;

	var group=el('add-building-'+b.id).group;

	el('select-building-list').value=b.id;

	var allBuildings=el('select-building-list').children;
	for(var i=0; i<allBuildings.length; i++)
		allBuildings[i].disabled=(allBuildings[i].group!==group);

	MarcDialogs.open('building')
}
function acceptBuilding(){
	currentEditingItem.set(el('select-building-list').value);
	MarcDialogs.close();
}
function addBuilding(){
	var found=false;
	var slot=55;

	while(!found && slot>10){
		if((!plusMode && buildings[slot].id==0xf8) || (plusMode && buildings[slot].id==0xfc)){
			currentEditingItem=buildings[slot];
			found=true;

			el('select-building-list').value=0x4c;

			var allBuildings=el('select-building-list').children;
			for(var i=0; i<allBuildings.length; i++)
				allBuildings[i].disabled=(allBuildings[i].group!==0);

			MarcDialogs.open('building')
		}
		slot--;
	}
}
function sortMapBuildings(){
	var ul=el('buildings');
	ul.removeChild(el('buildings-sort-button'));
	var liSeparation=document.createElement('li');
	liSeparation.order=0x12;
	liSeparation.appendChild(document.createElement('hr'));
	var lis=[].slice.call(ul.children);
	while(ul.children[0])
		ul.removeChild(ul.firstChild);
	lis.push(liSeparation);
	lis=lis.sort(function(a,b){return a.order-b.order});
	for(var i=0;i<lis.length;i++)
		ul.appendChild(lis[i]);
}
function moveBuilding(b){
	currentEditingItem=b;

	if(moveBuildingOverlay.parentElement)
		moveBuildingOverlay.parentElement.removeChild(moveBuildingOverlay);

	//var rect=b.map.itemGrids[0].canvas.parentElement.getBoundingClientRect();

	el('map-'+currentEditingItem.type).appendChild(moveBuildingOverlay);
	//el('move-building-overlay').style.left=(rect.left)+'px';
	//el('move-building-overlay').style.top=(rect.top)+'px';
	//el('move-building-overlay').style.width=rect.width+'px';
	//el('move-building-overlay').style.height=rect.height+'px';

	/* glowing tile */
	moveBuildingOverlay.children[0].style.left=((b.x-16)*10)+'px';
	moveBuildingOverlay.children[0].style.top=((b.y-16)*10)+'px';
}
function moveBuildingAccept(evt){
	var b=currentEditingItem;

	var rect=b.map.itemGrids[0].canvas.parentElement.getBoundingClientRect();
	var x=parseInt((evt.clientX-rect.left)/10)+16;
	var y=parseInt(((evt.clientY-rect.top))/10)+16;

	currentEditingItem._refreshTile(false);
	currentEditingItem.x=x;
	currentEditingItem.y=y;
	currentEditingItem.inputX.value=x;
	currentEditingItem.inputY.value=y;
	currentEditingItem._refreshTile(true);

	moveBuildingOverlay.parentElement.removeChild(moveBuildingOverlay);
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

	this.id=savegame.readByte2(this.offset);

	if(isValidVillagerId(this.id) || type==='campsite' || (plusMode && this.isCaravan && this.id==0xffff)){
		this.spanName=createSpan('?');
		this.updateButtonText();

		var editButton=createEditButton();
		addSimpleVillagerEvents(editButton,this);

		var tr=document.createElement('tr');

		var td=document.createElement('td');
		td.innerHTML=(n+1);
		td.className='count';
		tr.appendChild(td);

		td=document.createElement('td');
		td.appendChild(this.spanName);
		td.appendChild(editButton);
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
	savegame.storeByte2(this.offset, this.id);
}
SimpleVillager.prototype.setVillager=function(newId){
	this.id=newId;
}
SimpleVillager.prototype.updateButtonText=function(){
	if(this.id==0xffff)
		this.spanName.innerHTML='(none)';
	else
		this.spanName.innerHTML=el('villager-new-'+this.id).innerHTML;
}


function isValidVillagerId(id){return (!plusMode && id>=0 && id<=332) || (plusMode && ((id>=0 && id<=398) || (id>=0x1000 && id<=0x2010)))}

function Villager(n){
	this.n=n;
	this.offset=Offsets.VILLAGERS+Offsets.VILLAGER_SIZE*n;

	this.id=savegame.readByte2(this.offset+Offsets.VILLAGER_ID);
	this.personality=savegame.readByte1(this.offset+Offsets.VILLAGER_PERSONALITY); // 00-05

	this.status=savegame.readByte4(this.offset+Offsets.VILLAGER_STATUS);
	this.catchphrase=savegame.readU16String(this.offset+Offsets.VILLAGER_CATCHPHRASE, 11);

	this.letter=new Letter(this.offset+Offsets.VILLAGER_STOREDLETTER);

	if(isValidVillagerId(this.id)){
		this.spanName=createSpan('?');
		this.updateButtonText();

		var editButton=createEditButton();

		addCurrentVillagerEvents(editButton, this);


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
		td.appendChild(editButton);
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
		td.appendChild(createEditStringButton(this.catchphrase, 'catchphrase'));
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
		savegame.storeByte2(this.offset+Offsets.VILLAGER_ID, this.id);
		savegame.storeByte(this.offset+Offsets.VILLAGER_PERSONALITY, this.personality);
		savegame.storeU16String(this.offset+Offsets.VILLAGER_CATCHPHRASE, this.catchphrase);


		this.itemGridShirt.save();
		this.itemGridSong.save();
		this.itemGridWall.save();
		this.itemGridFloor.save();
		this.itemGridUmbrella.save();
		this.itemGridFurniture.save();

		//store status
		savegame.storeByte(this.offset+Offsets.VILLAGER_STATUS+0, (this.status & 0x000000ff));
		//savegame.storeByte(this.offset+Offsets.VILLAGER_STATUS+1, (this.status & 0x0000ff00) >> 8);
		//savegame.storeByte(this.offset+Offsets.VILLAGER_STATUS+2, (this.status & 0x00ff0000) >> 16);
		//savegame.storeByte(this.offset+Offsets.VILLAGER_STATUS+3, (this.status & 0xff000000) >> 24);
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
			savegame.storeByte4(this.offset+Offsets.VILLAGER_SHIRT+4*21, data[21]);
		}

		if(villagerInfo.catchphrase){
			this.catchphrase.set(villagerInfo.catchphrase);
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
	this.spanName.innerHTML=text;
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
		el('villager-pic').style.backgroundImage='url(./data/villagers.jpg)';
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

	this.intro=savegame.readU16String(this.offset+104, 64);
	this.body=savegame.readU16String(this.offset+104+0x42, 384);
	this.end=savegame.readU16String(this.offset+104+0x01c4, 64);
}
Letter.prototype.save=function(){
	savegame.storeU16String(this.offset, this.intro);
	savegame.storeU16String(this.offset+0x42, this.body);
	savegame.storeU16String(this.offset+0x01c4, this.end);
}





function Room(offset){
	this.offset=offset;

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

	this.hairStyle=savegame.readByte1(this.offset+Offsets.PLAYER_HAIRSTYLE);
	this.hairColor=savegame.readByte1(this.offset+Offsets.PLAYER_HAIRCOLOR);
	this.face=savegame.readByte1(this.offset+Offsets.PLAYER_FACE);
	this.eyeColor=savegame.readByte1(this.offset+Offsets.PLAYER_EYECOLOR);
	this.tan=savegame.readByte1(this.offset+Offsets.PLAYER_TAN);
	this.gender=savegame.readByte1(this.offset+Offsets.PLAYER_GENDER); //00: male, 01:female

	this.playerId1=savegame.readByte1(this.offset+Offsets.PLAYER_ID1);
	this.playerId2=savegame.readByte1(this.offset+Offsets.PLAYER_ID2);

	this.name=savegame.readU16String(this.offset+Offsets.PLAYER_NAME, 9);
	var div=document.createElement('div');
	div.id='player-name-'+this.n;
	div.appendChild(createEditStringButton(this.name, 'player name'));
	el('player-name').appendChild(div);

	this.playerIdReferences=false;

	//this.townId1=savegame.readByte1(this.offset+0x55bc);
	//this.townId2=savegame.readByte1(this.offset+0x55bc+1);
	//this.townName=savegame.readU16String(this.offset+0x55bc+2, 9);


	this.TPCregion=savegame.readByte1(this.offset+Offsets.PLAYER_TPCREGION);
	this.TPCtext=savegame.readU16String(this.offset+Offsets.PLAYER_TPCTEXT, 32); //40?
	var div2=document.createElement('div');
	div2.id='player-tpctext-'+this.n;
	div2.appendChild(createEditStringButton(this.TPCtext, 'player TPC text'));
	el('player-tpctext').appendChild(div2);

	this.birthdayMonth=savegame.readByte1(this.offset+Offsets.PLAYER_BIRTHDAYMONTH);
	this.birthdayDay=savegame.readByte1(this.offset+Offsets.PLAYER_BIRTHDAYDAY);
	this.registrationYear=savegame.readByte2(this.offset+Offsets.PLAYER_REGYEAR);
	this.registrationMonth=savegame.readByte1(this.offset+Offsets.PLAYER_REGMONTH);
	this.registrationDay=savegame.readByte1(this.offset+Offsets.PLAYER_REGDAY);



	var EXTERIOR_OFFSET=Offsets.PLAYER_EXTERIORS+0x1228*n;
	this.houseSize=savegame.readByte1(EXTERIOR_OFFSET);
	this.houseStyle=savegame.readByte1(EXTERIOR_OFFSET+1);
	this.houseDoorShape=savegame.readByte1(EXTERIOR_OFFSET+2);
	this.houseBrick=savegame.readByte1(EXTERIOR_OFFSET+3);
	this.houseRoof=savegame.readByte1(EXTERIOR_OFFSET+4);
	this.houseDoor=savegame.readByte1(EXTERIOR_OFFSET+5);
	this.houseFence=savegame.readByte1(EXTERIOR_OFFSET+6);
	this.housePavement=savegame.readByte1(EXTERIOR_OFFSET+7);
	this.houseMailbox=savegame.readByte1(EXTERIOR_OFFSET+8);
	// all house size and style properties are also stored twice at +9?
	this.houseSize2=savegame.readByte1(EXTERIOR_OFFSET+9);
	this.houseStyle2=savegame.readByte1(EXTERIOR_OFFSET+1+9);
	this.houseDoorShape2=savegame.readByte1(EXTERIOR_OFFSET+2+9);
	this.houseBrick2=savegame.readByte1(EXTERIOR_OFFSET+3+9);
	this.houseRoof2=savegame.readByte1(EXTERIOR_OFFSET+4+9);
	this.houseDoor2=savegame.readByte1(EXTERIOR_OFFSET+5+9);
	this.houseFence2=savegame.readByte1(EXTERIOR_OFFSET+6+9);
	this.housePavement2=savegame.readByte1(EXTERIOR_OFFSET+7+9);
	this.houseMailbox2=savegame.readByte1(EXTERIOR_OFFSET+8+9);

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
	for(var i=0; i<24; i++)
		this.badges[i]=savegame.readByte1(this.offset+Offsets.PLAYER_BADGES+i);

	this.refreshJPG();

	this.hat=savegame.readByte2(this.offset+Offsets.PLAYER_HAT);
	this.accessory=savegame.readByte2(this.offset+Offsets.PLAYER_ACCESSORY);
	this.wetSuit=savegame.readByte2(this.offset+Offsets.PLAYER_WETSUIT);
	this.topWear=savegame.readByte2(this.offset+Offsets.PLAYER_TOPWEAR);
	this.bottomWear=savegame.readByte2(this.offset+Offsets.PLAYER_BOTTOMWEAR);
	this.socks=savegame.readByte2(this.offset+Offsets.PLAYER_SOCKS);
	this.shoes=savegame.readByte2(this.offset+Offsets.PLAYER_SHOES);
	this.heldItem=savegame.readByte2(this.offset+Offsets.PLAYER_HELDITEM);

	//unknown numeric
	this.bank=new NumericValue(this.offset+Offsets.PLAYER_BANK);
	this.islandMedals=new NumericValue(this.offset+Offsets.PLAYER_MEDALS);
	if(plusMode)
		this.meowCoupons=new NumericValue(this.offset+Offsets.PLAYER_MEOW);
	this.wallet=new NumericValue(this.offset+Offsets.PLAYER_WALLET);
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
			playerId[i]=savegame.readByte2(this.offset+0x55a6+i*2);
		}

		this.playerIdReferences=new Array();
		if(playerId[0]!=0x0000)
			for(var offset=0; offset<522624-11*2; offset+=2){
				var found=true;
				for(var i=0; i<11 && found; i++){
					if(savegame.readByte2(offset+i*2)!=playerId[i]){
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

	savegame.storeByte(this.offset+Offsets.PLAYER_HAIRSTYLE, this.hairStyle);
	savegame.storeByte(this.offset+Offsets.PLAYER_HAIRCOLOR, this.hairColor);
	savegame.storeByte(this.offset+Offsets.PLAYER_FACE, this.face);
	savegame.storeByte(this.offset+Offsets.PLAYER_EYECOLOR, this.eyeColor);
	savegame.storeByte(this.offset+Offsets.PLAYER_TAN, this.tan);

	for(var i=0;i<24;i++){
		savegame.storeByte(this.offset+Offsets.PLAYER_BADGES+i, this.badges[i]);
	}


	for(var i=0;i<6;i++){
		this.rooms[i].save();
	}
	/* fix player ID references when changing gender/name */
	if(this.playerIdReferences){
		for(var i=0; i<this.playerIdReferences.length; i++){
			savegame.storeByte(this.playerIdReferences[i]+20, this.gender);
			savegame.storeU16String(this.playerIdReferences[i]+2, this.name);
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

	savegame.storeByte(this.offset+Offsets.PLAYER_TPCREGION, this.TPCregion);
	savegame.storeByte(this.offset+Offsets.PLAYER_BIRTHDAYMONTH, this.birthdayMonth);
	savegame.storeByte(this.offset+Offsets.PLAYER_BIRTHDAYDAY, this.birthdayDay);
	savegame.storeByte2(this.offset+Offsets.PLAYER_REGYEAR, this.registrationYear);
	savegame.storeByte(this.offset+Offsets.PLAYER_REGMONTH, this.registrationMonth);
	savegame.storeByte(this.offset+Offsets.PLAYER_REGDAY, this.registrationDay);



	var EXTERIOR_OFFSET=Offsets.PLAYER_EXTERIORS+0x1228*this.n;
	savegame.storeByte(EXTERIOR_OFFSET+1, this.houseStyle);
	savegame.storeByte(EXTERIOR_OFFSET+2, this.houseDoorShape);
	savegame.storeByte(EXTERIOR_OFFSET+3, this.houseBrick);
	savegame.storeByte(EXTERIOR_OFFSET+4, this.houseRoof);
	savegame.storeByte(EXTERIOR_OFFSET+5, this.houseDoor);
	savegame.storeByte(EXTERIOR_OFFSET+6, this.houseFence);
	savegame.storeByte(EXTERIOR_OFFSET+7, this.housePavement);
	savegame.storeByte(EXTERIOR_OFFSET+8, this.houseMailbox);
	// all house size and style properties are also stored twice at +9?
	savegame.storeByte(EXTERIOR_OFFSET+1+9, this.houseStyle2);
	savegame.storeByte(EXTERIOR_OFFSET+2+9, this.houseDoorShape2);
	savegame.storeByte(EXTERIOR_OFFSET+3+9, this.houseBrick2);
	savegame.storeByte(EXTERIOR_OFFSET+4+9, this.houseRoof2);
	savegame.storeByte(EXTERIOR_OFFSET+5+9, this.houseDoor2);
	savegame.storeByte(EXTERIOR_OFFSET+6+9, this.houseFence2);
	savegame.storeByte(EXTERIOR_OFFSET+7+9, this.housePavement2);
	savegame.storeByte(EXTERIOR_OFFSET+8+9, this.houseMailbox2);

	this.bank.save();
	this.islandMedals.save();
	if(plusMode)
		this.meowCoupons.save();

	savegame.storeU16String(this.offset+Offsets.PLAYER_TPCTEXT, this.TPCtext);
}



Player.prototype.refreshJPG=function(){
	var offset=this.offset+Offsets.PLAYER_TPCPIC;

	if(savegame.readByte4(offset)==0xe1ffd8ff){
		var base64='';
		for(var j=0; j<0x1400 && (savegame.readByte2(offset+j)!=0xffd9); j++){
			base64+=String.fromCharCode(savegame.readByte1(offset+j));
		}
		base64+=String.fromCharCode(0xff);
		base64+=String.fromCharCode(0xd9);
		el('player'+this.n+'-pic').src='data:image/jpg;base64,'+window.btoa(base64);
	}else{
		el('player'+this.n+'-pic').src='./data/no_tpc.png';
	}
}
Player.prototype.importJPG=function(image){
	if(image.width!=64||image.height!=104){
		MarcDialogs.alert('Invalid JPG dimensions (must be 64x104).');
		return false
	}
	var offset=this.offset+Offsets.PLAYER_TPCPIC;
	for(var i=0;i<tempFile.fileSize;i++)
		savegame.storeByte(offset+i,tempFile.readByte1(i));
	this.refreshJPG()
}


function getWarningMessage(){
	return '<small><b class="warning">Warning!</b> this feature is experimental.<br/>Use it at your own risk.</small>';
}

Player.prototype.unlockEmotions=function(){
	MarcDialogs.confirm('Do you want to unlock all emotions for this player?<br/>'+getWarningMessage(), function(){
		var emotionsOffset=currentPlayer.offset+Offsets.PLAYER_EMOTIONS;
		for(var i=0; i<Constants.ALL_EMOTIONS.length; i++){
			savegame.storeByte(emotionsOffset+i, Constants.ALL_EMOTIONS[i]);
		}
		MarcDialogs.alert('Emotions were unlocked for this player.');
	});
}
Player.prototype.maxBank=function(){
	MarcDialogs.confirm('Do you want to set 999.999.999 bells to this player\'s bank?', function(){
		currentPlayer.bank.set(999999999);
		MarcDialogs.alert('Bank was maxed out for this player.');
	})
}
Player.prototype.maxIslandMedals=function(){
	MarcDialogs.confirm('Do you want to set 9999 island medals to this player?<br/>'+getWarningMessage(), function(){
		currentPlayer.islandMedals.set(9999);
		MarcDialogs.alert('Island medals were maxed out for this player.');
	})
}
Player.prototype.maxMeow=function(){
	MarcDialogs.confirm('Do you want to set 9999 Meow coupons to this player?', function(){
		currentPlayer.meowCoupons.set(9999);
		MarcDialogs.alert('Meow coupons were maxed out for this player.');
	})
}
Player.prototype.fillEncyclopedia=function(){
	MarcDialogs.confirm('Do you want to fill encyclopedia up for this player?<br/>'+getWarningMessage(), function(){
		var encyclopediaOffset=currentPlayer.offset+Offsets.PLAYER_ENCYCLOPEDIA;
		for(var i=0; i<Constants.FULL_ENCYCLOPEDIA.length; i++)
			savegame.storeByte(encyclopediaOffset+i, Constants.FULL_ENCYCLOPEDIA[i]);
		MarcDialogs.alert('Encyclopedia was filled for this player.');
	});
}


function changeTPCPic(){
	tempFileLoadFunction=changeTPCPic2;
	el('file-load').click()
}
function changeTPCPic2(){
	if((tempFile.readByte4(0) & 0x00ffffff)!==0x00ffd8ff){
		MarcDialogs.alert('Invalid pic file (must be a valid JPG file. dimensions: 64x104, max size: 4kb).');
		return false
	}else if(tempFile.fileSize>5024){
		MarcDialogs.alert('Too big JPG file (>5024 bytes).');
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


function showSearchResults(){el('search-results').style.display='block'}
function hideSearchResults(){el('search-results').style.display='none'}
function clickOnSearchResult(){el('items').value=this.id;buildFlagsSelects(0,0);hideSearchResults()}
function searchItem(q){
	while(el('search-results').children[0]){
		el('search-results').removeChild(el('search-results').firstChild);
	}

	q=q.clean();
	if(!q || q.length<2){
		return 0
	}

	var results=0;
	q=new RegExp(q);
	var items=el('items').getElementsByTagName('option');

	for(var i=0; i<items.length && results<30; i++){
		var id=items[i].value;
		var cleanName=items[i].cleanName;

		if(q.test(cleanName)){
			var li=document.createElement('li');
			li.innerHTML=items[i].innerHTML;
			li.id=id;
			addEvent(li, 'click', clickOnSearchResult);
			el('search-results').appendChild(li);
			results++;
		}
	}
	if(results==30){
		var li=document.createElement('li');
		li.innerHTML='too many results...';
		el('search-results').appendChild(li);
	}
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








/* Pattern structure (borrowed from Thulinma http://www.thulinma.com/acnl/)
0x 00 - 0x 29 ( 42) = Pattern Title
0x 2A - 0x 2B (  2) = User ID
0x 2C - 0x 3F ( 20) = User Name
0x 40 - 0x 41 (  2) = Town ID
0x 42 - 0x 55 ( 20) = Town Name
0x 56 - 0x 57 (  2) = Unknown (values are usually random - changing seems to have no effect)
0x 58 - 0x 66 ( 15) = Color code indexes
0x 67		 (  1) = Unknown (value is usually random - changing seems to have no effect)
0x 68		 (  1) = Ten? (seems to always be 0x0A)
0x 69		 (  1) = Pattern type (normal patterns: 0x09, dresses: 0x00, photo boards: 0x08)
0x 6A - 0x 6B (  2) = Zero? (seems to always be 0x0000)
0x 6C - 0x26B (512) = Pattern Data 1 (mandatory)
0x26C - 0x46B (512) = Pattern Data 2 (optional)
0x46C - 0x66B (512) = Pattern Data 3 (optional)
0x66C - 0x86B (512) = Pattern Data 4 (optional)
0x86C - 0x86F (  4) = Zero padding (optional)
*/
const PATTERN_COLORS=[
'ffefff','ff9aad','ef559c','ff65ad','ff0063','bd4573','ce0052','9c0031','522031',0x09,0x0a,0x0b,0x0c,0x0d,0x0e,'ffffff',
'ffbace','ff7573','de3010','ff5542','ff0000','ce6563','bd4542','bd0000','8c2021',0x19,0x1a,0x1b,0x1c,0x1d,0x1e,'ececec',
'decfbd','ffcf63','de6521','ffaa21','ff6500','bd8a52','de4500','bd4500','633010',0x29,0x2a,0x2b,0x2c,0x2d,0x2e,'dadada',
'ffefde','ffdfce','ffcfad','ffba8c','ffaa8c','de8a63','bd6542','9c5531','8c4521',0x39,0x3a,0x3b,0x3c,0x3d,0x3e,'c8c8c8',
'ffcfff','ef8aff','ce65de','bd8ace','ce00ff','9c659c','8c00ad','520073','310042',0x49,0x4a,0x4b,0x4c,0x4d,0x4e,'b6b6b6',
'ffbaff','ff9aff','de20bd','ff55ef','ff00ce','8c5573','bd009c','8c0063','520042',0x59,0x5a,0x5b,0x5c,0x5d,0x5e,'a3a3a3',
'deba9c','ceaa73','734531','ad7542','9c3000','733021','522000','311000','211000',0x69,0x6a,0x6b,0x6c,0x6d,0x6e,'919191',
'ffffce','ffff73','dedf21','ffff00','ffdf00','ceaa00','9c9a00','8c7500','525500',0x79,0x7a,0x7b,0x7c,0x7d,0x7e,'7f7f7f',
'debaff','bd9aef','6330ce','9c55ff','6300ff','52458c','42009c','210063','211031',0x89,0x8a,0x8b,0x8c,0x8d,0x8e,'6d6d6d',
'bdbaff','8c9aff','3130ad','3155ef','0000ff','31308c','0000ad','101063','000021',0x99,0x9a,0x9b,0x9c,0x9d,0x9e,'5b5b5b',
'9cefbd','63cf73','216510','42aa31','008a31','527552','215500','103021','002010',0xa9,0xaa,0xab,0xac,0xad,0xae,'484848',
'deffbd','ceff8c','8caa52','addf8c','8cff00','adba9c','63ba00','529a00','316500',0xb9,0xba,0xbb,0xbc,0xbd,0xbe,'363636',
'bddfff','73cfff','31559c','639aff','1075ff','4275ad','214573','002073','001042',0xc9,0xca,0xcb,0xcc,0xcd,0xce,'242424',
'adffff','52ffff','008abd','52bace','00cfff','429aad','00658c','004552','002031',0xd9,0xda,0xdb,0xdc,0xdd,0xde,'121212',
'ceffef','adefde','31cfad','52efbd','00ffce','73aaad','00aa9c','008a73','004531',0xe9,0xea,0xeb,0xec,0xed,0xee,'000000',
'adffad','73ff73','63df42','00ff00','21df21','52ba52','00ba00','008a00','214521',0xf9,0xfa,0xfb,0xfc,0xfd,0xfe,0xff
/*
NOTES:
	* last columns are greys
	* 0x?9 - 0x?e aren't used. Not sure what they do in-game. can somebody test this?
	* 0xff is displayed as white in-game, editing it causes a game freeze
*/
];
function Pattern(offset, n){
	this.offset=offset+n*2160;

	this.canvas=document.createElement('canvas');
	this.canvas.width=32;
	this.canvas.height=32;
	this.canvas.className='pattern';
	this.pattern=this;
	this.refreshCanvas();
	addPatternEvents(this);
}
Pattern.prototype.refreshCanvas=function(){
	var ctx=this.canvas.getContext('2d');
	var palette=new Array(15);
	for(var i=0; i<palette.length; i++)
		palette[i]=savegame.readByte1(this.offset+0x58+i);

	for(var y=0; y<32; y++){
		for(var x=0; x<16; x++){
			var bothColors=savegame.readByte1(this.offset+0x6c+y*16+x);

			ctx.fillStyle='#'+PATTERN_COLORS[palette[bothColors & 0x0f]]; //leftColor
			ctx.fillRect(x*2, y, 1, 1);

			ctx.fillStyle='#'+PATTERN_COLORS[palette[bothColors >> 4]]; //rightcolor
			ctx.fillRect(x*2+1, y, 1, 1);
		}
	}

	this.title=savegame.readU16String(this.offset, 20).toString();
	this.author=savegame.readU16String(this.offset+0x2c, 10).toString();
	this.canvas.title=this.title+' by '+this.author;
}
Pattern.prototype.importFromTempFile=function(){
	for(var i=0; i<tempFile.fileSize && i<2160; i++){
		savegame.storeByte(this.offset+i, tempFile.readByte1(i));
	}
	this.refreshCanvas();
	MarcDialogs.close();
}
Pattern.prototype.export=function(){
	var size;
	if(savegame.readByte1(this.offset+0x69)==0x09){
		size=620;
	}else{
		size=2160;
	}

	var newFile=new HexFile(size);
	for(var i=0; i<size; i++){
		newFile.storeByte(i, savegame.readByte1(this.offset+i));
	}
	newFile.fileName=this.title+'.acnl';
	newFile.save();
}
function addPatternEvents(p){
	addEvent(p.canvas, 'click', function(){showPatternDialog(p)});
}
function showPatternDialog(p){
	tempFileLoadFunction=function(){
		p.importFromTempFile();
	};
	currentEditingItem=p;
	el('pattern-preview').src=p.canvas.toDataURL('image/png');
	el('pattern-preview-title').innerHTML='<b>'+p.title+'</b> by '+p.author;
	MarcDialogs.open('pattern');
}





function refreshEyeColorIcon(){
	el('span-eye-color').style.backgroundColor='#'+Constants.EYE_COLORS[currentPlayer.eyeColor];
}
function refreshHairColorIcon(){
	el('span-hair-color').style.backgroundColor='#'+Constants.HAIR_COLORS[currentPlayer.hairColor];
}
function refreshHairStyleIcon(){
	el('span-hair-style').style.backgroundPosition='-'+((currentPlayer.hairStyle<=16)?96:140)+'px -'+((currentPlayer.hairStyle%17)*42)+'px';
}
function refreshFaceIcon(){
	el('span-face').style.backgroundPosition='-'+((currentPlayer.gender==0)?0:40)+'px -'+(688+(currentPlayer.face%12)*16)+'px';
}


function refreshBadge(b){
	if(b){
		if(currentPlayer.badges[b.badgeId]==0){
			b.badgeIcon.style.backgroundPosition='-96px -744px';
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


var currentItemGroup=null;
function buildFlagsSelects(f1,f2){
	var nextItemGroup=el('item_'+el('items').value).parentElement;
	if(currentItemGroup!=nextItemGroup){
		var options1=el('select-flag1').getElementsByTagName('option');
		for(var i=2; i<options1.length; i++)
			el('select-flag1').removeChild(options1[i]);

		if(nextItemGroup.flags1){
			var newFlags1=el('item_'+el('items').value).parentElement.flags1;

			for(var i=0; i<newFlags1.length; i++)
				el('select-flag1').appendChild(newFlags1[i]);
		}



		var options2=el('select-flag2').getElementsByTagName('option');
		for(var i=2; i<options2.length; i++)
			el('select-flag2').removeChild(options2[i]);


		if(nextItemGroup.flags2){
			var newFlags2=el('item_'+el('items').value).parentElement.flags2;

			for(var i=0; i<newFlags2.length; i++)
				el('select-flag2').appendChild(newFlags2[i]);
		}
	}
	currentItemGroup=nextItemGroup;


	setFlag(1, f1);
	setFlag(2, f2);
}

function setFlag(f, val){
	if(val==-1){
		el('select-flag'+f).value=-1;
		el('flag'+f).disabled=false;
	}else{
		var hex=val.toString(16);
		if(val<16)
			hex='0'+hex;
		el('flag'+f).value=hex;
		setFlagDecimal(f);


		if(val==0 || el('flag'+f+'_'+val)){
			el('select-flag'+f).value=val;
			el('flag'+f).disabled=true;
		}else{
			el('select-flag'+f).value=-1;
			el('flag'+f).disabled=false;
		}
	}	
}
function cleanFlagInput(f){
	el('flag'+f).value=el('flag'+f).value.replace(/[^0-9a-f]/i,'');
	setFlagDecimal(f);
}
function setFlagDecimal(f){el('flag'+f).decimalValue=parseInt(el('flag'+f).value, 16)}





/*function mouseOverAcre(acre){
	el('debug-name').innerHTML=acre.n;
	el('debug-hex').innerHTML=acre.id.toString(16);

	el('debug').style.top=window.pageYOffset+24+parseInt(acre.button.getBoundingClientRect().top)+'px';
	el('debug').style.left=parseInt(acre.button.getBoundingClientRect().left+24)+'px';
}*/


function Item(offset, n){
	this.offset=offset+n*4;

	this.id=savegame.readByte2(this.offset);
	this.flag1=savegame.readByte1(this.offset+2);
	this.flag2=savegame.readByte1(this.offset+3);
	this.refreshName();
}
Item.prototype.save=function(){
	savegame.storeByte2(this.offset, this.id);
	savegame.storeByte(this.offset+2, this.flag1);
	savegame.storeByte(this.offset+3, this.flag2);
}
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
		this.name+='<br/><b style="color:yellow">Building: '+this.hasBuilding+'</b>';
}


function getSelectedItemName(){
	return '<i>'+el('item_'+el('items').value).innerHTML+'</i>';
}
function fillAll(){
	var itemName=getSelectedItemName();
	MarcDialogs.confirm('Fill all town with '+itemName+'?', function(){
		var count=0;
		for(var i=0;i<map.items.length;i++)
			if(map.items[i].id==0x7ffe){
				map.items[i].set(0x00,el('flag1').value,el('items').value);
				count++
			}
		if(count){
			forceMapEdited();
			MarcDialogs.alert(count+' '+itemName+' were added.');
			map.repaint();
		}else{
			MarcDialogs.close();
		}
	});
}
function removeAll(){
	var itemName=getSelectedItemName();
	MarcDialogs.confirm('Remove all '+itemName+' on town?', function(){
		var count=0;
		for(var i=0;i<map.items.length;i++)
			if(map.items[i].id==el('items').value){
				map.items[i].set(0x00,0x00,0x7ffe);
				count++
			}
		if(count){
			forceMapEdited();
			MarcDialogs.alert(count+' '+itemName+' were removed.');
			map.repaint();
		}else{
			MarcDialogs.close();
		}
	});
}
function forceMapEdited(){
	for(var i=0; i<map.itemGrids.length; i++)
		map.itemGrids[i].itemList.edited=true;
}
function acceptMaintenance(){
	var removedWeeds=0;
	var wateredFlowers=0;
	var perfectizedTrees=0;

	for(var i=0; i<map.items.length; i++){
		if((el('remove-weeds').checked) && map.items[i].isWeed()){
			map.items[i].set(0x00,0x00,0x7ffe);
			removedWeeds++;
		}else if(el('water-flowers').checked && map.items[i].isWiltedFlower()){
			map.items[i].set(0x40,map.items[i].flag1,map.items[i].id);
			wateredFlowers++
		}else if(el('perfectize-trees').checked && map.items[i].id>=0x3a && map.items[i].id<=0x52 && map.items[i].flag1==0x00 && map.items[i].flag2==0x00){
			map.items[i].set(0x01,0x00,map.items[i].id);
			perfectizedTrees++
		}
	}

	var messages=[];
	if(removedWeeds)
		messages.push(removedWeeds+' weeds were removed.');
	if(wateredFlowers)
		messages.push(wateredFlowers+' flowers were watered.');
	if(perfectizedTrees)
		messages.push(perfectizedTrees+' normal trees got a single perfect fruit.');

	if(messages[0]){
		forceMapEdited();
		MarcDialogs.alert(messages.join('<br/>'));
		map.repaint();
	}else
		MarcDialogs.close()
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
			savegame.storeByte(i, tempFile.readByte1(i), 1);
		refreshSecureValue();
	}
}
function refreshSecureValue(){
	var secureValue='0x';
	for(var i=0; i<8; i++)
		secureValue+=intToHex(savegame.readByte1(i), 1);

	el('nand-value').innerHTML=secureValue
}



function loadSavegameFromFile(file){
	if(!file){
		MarcDialogs.alert('No savegame was specified.');
		return false
	}

	savegame=new HexFile(file, initializeEverything);
}
function initializeEverything(){
	if(!el('home'))
		return false;

	/* check old RAM files */
	if(savegame.fileSize==524288 || savegame.fileSize==786432 || savegame.fileSize==1183744 || savegame.fileSize==1245184){
		/*
			524288 & 786432: old RAM dump
			1183744 &1245184: mori.bin (LeafTools) RAM dump
		*/
		MarcDialogs.alert('<b>WARNING: </b>The savegame file you are trying to open is no longer supported. It will be converted to gardenram.dat format automatically after saving<br/><br/>Make sure you are using the latest RAM dumping/injecting method or you will screw your savegame.');
		var fixedSavegame=new HexFile(522752);
		fixedSavegame.fileName='gardenram.dat';
		fixedSavegame.fileType=savegame.fileType;
		for(var i=0; i<0x80; i++)
			fixedSavegame.storeByte(i, 0x00);

		for(var i=0; i<522624; i++)
			fixedSavegame.storeByte(0x80+i, savegame.readByte1(i));

		savegame=fixedSavegame;
	}

	/* check valid ACNL savegame */
	if(
		(savegame.fileSize!=522752 && savegame.fileSize!=563968) ||
		(
			(savegame.readByte4(0x80)!=0x98d1ed64 || savegame.readByte4(0x84)!=0x000200f8) &&
			(savegame.readByte4(0x80)!=0x46d03a33 || savegame.readByte4(0x84)!=0x0002009e)
		)
	){
		MarcDialogs.alert('Invalid AC:NL savegame file.');
		return null;
	}



	/* check plus mode */
	if(savegame.fileSize==563968){
		plusMode=true;

		Offsets=OffsetsPlus;
	}else{
		hide('tr-shop-harvey');
		hide('column-storage');
		hide('button-meow');
	}

	addEvent(window, 'click', hideSearchResults);
	addEvent(el('search-input'), 'click', stopPropagation);



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

		if(ITEM_GROUPS[i].flags1){
			optGroup.flags1=[];

			var newFlags1=ITEM_GROUPS[i].flags1;
			for(var j=0; j<newFlags1.length; j++){
				var matches=newFlags1[j].match(/^([0-9a-f]{1,2})=(.+)/i);
				var opt=createOption(parseInt(matches[1], 16), matches[2]);
				opt.id='flag1_'+parseInt(matches[1], 16);
				optGroup.flags1.push(opt);
			}
		}

		if(ITEM_GROUPS[i].flags2){
			optGroup.flags2=[];

			var newFlags2=ITEM_GROUPS[i].flags2;
			for(var j=0; j<newFlags2.length; j++){
				var matches=newFlags2[j].match(/^([0-9a-f]{1,2})=(.+)/i);
				var opt=createOption(parseInt(matches[1], 16), matches[2]);
				opt.id='flag2_'+parseInt(matches[1], 16);
				optGroup.flags2.push(opt);
			}
		}

		//var onlyMap=itemGroup.onlyMap;
		//var onlyPockets=itemGroup.onlyPockets;
		var items;
		var copyText=false;
		var itemsLength;
		if(!itemGroup.items && itemGroup.copyOf && itemGroup.copyText){
			items=ITEM_GROUPS[i+itemGroup.copyOf].items;
			copyText=getString(itemGroup.copyText);
			if(itemGroup.copyLimit){
				itemsLength=itemGroup.copyLimit;
			}else{
				itemsLength=items.length;
			}
		}else{
			items=ITEM_GROUPS[i].items;
			copytext=false;
			itemsLength=items.length;
		}
		
		for(var j=0; j<itemsLength; j++){
			if((!plusMode && items[j][6]===true))
				continue;

			var itemId=firstId+itemCounter;

			var text=getString(items[j]);
			if(copyText){
				text+=' ('+copyText+')';
			}

			if(items[j][0]){
				var newOption=createOption(itemId, text);
				newOption.id='item_'+itemId;
				newOption.cleanName=text.clean();
				optGroup.appendChild(newOption);
			}

			itemCounter++;
		}
	}

	/* read buildings JSON data */
	for(var i=0; i<BUILDINGS.length; i++){
		var id=plusMode? BUILDINGS[i][1]:BUILDINGS[i][0];
		var option=createOption(id, getString(BUILDINGS[i][3]));
		option.id='add-building-'+id;
		option.group=BUILDINGS[i][2];
		el('select-building-list').appendChild(option);
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
	BUILDINGS=null;
	VILLAGERS=null;
	VILLAGERS_SPECIAL1=null;
	VILLAGERS_SPECIAL2=null;


	/* Map */
	map=new ItemGridMap('map');


	/* Island map */
	island=new ItemGridMap('island');

	/* Grass */
	grassCurrent=new GrassMapPrevious(Offsets.MAP_GRASS_CURRENT,'grass-current',5,4);
	new GrassMapCurrent(Offsets.MAP_GRASS_PREVIOUS,'grass-previous',5,4);

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







	/* read basic town info */
	town=new Town();
	town.refreshIdSpans();

	addSelectOptions('nativefruit', [1,2,3,4,5,6,7,8,9,10,11,12], ['Apple','Orange','Pear','Peach','Cherry','*Coconut','*Durian','*Lemon','*Lychee','*Mango','*Persimmon','*Banana']);
	addSelectEvent('nativefruit', function(){town.nativeFruit=this.value});
	el('select-nativefruit').value=town.nativeFruit;

	addSelectOptions('grasstype', 3, ['Triangle / square (winter)', 'Circle / star (winter)', 'Square / circle (winter)']);
	addSelectEvent('grasstype', function(){town.grassType=this.value});
	el('select-grasstype').value=town.grassType;

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

	/* museum rooms */
	for(var i=0; i<4; i++)
		el('museumroom'+i).appendChild(town.museumRooms[i].gridContainer);



	/* read villagers */
	villagers=new Array(10);
	for(var i=0; i<10; i++)
		new Villager(i);

	/* read buildings */
	buildings=new Array();
	for(var i=0; i<58; i++)
		new Building('map', i);
	for(var i=0; i<2; i++)
		new Building('island', i);


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
	var chooseAcre=function(){currentEditingItem.setId(this.acreId);MarcDialogs.close()};
	var acreId=0;
	var ICON_COLS=20;
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
		span.innerHTML='0x'+intToHex(acreId,1);
		button.appendChild(span);

		el('acre-selector').appendChild(button);

		addEvent(button, 'click', chooseAcre);
		acreId++;
	}

	addEvent(window, 'contextmenu', prevent);
	addEvent(window, 'mouseup', function(){mouseHeld=0});

	moveBuildingOverlay=document.createElement('div');
	moveBuildingOverlay.id='move-building-overlay';

	var glowingTile=document.createElement('div');
	glowingTile.id='glowing-tile';
	moveBuildingOverlay.appendChild(glowingTile);
	var moveBuildingMessage=document.createElement('div');
	moveBuildingMessage.id='move-building-message';
	moveBuildingMessage.innerHTML='Click the map to move the building to the desired position';
	moveBuildingOverlay.appendChild(moveBuildingMessage);
	addEvent(moveBuildingOverlay, 'click', moveBuildingAccept);

	document.body.removeChild(el('home'));
	show('header');
	show('editor');
	selectPlayer(0);

}

function getAcreThumbnailPosition(i, size){
	return '-'+((i%20)*size)+'px -'+(parseInt(i/20)*size)+'px'
}


function selectPlayer(p){
	if(players[p]!==currentPlayer){
		currentPlayer=players[p];

		el('player-id').innerHTML='0x'+intToHex(currentPlayer.playerId2)+intToHex(currentPlayer.playerId1);
	
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

		el('select-house-style').value=currentPlayer.houseStyle;
		el('select-house-doorshape').value=currentPlayer.houseDoorShape;
		el('select-house-brick').value=currentPlayer.houseBrick;
		el('select-house-roof').value=currentPlayer.houseRoof;
		el('select-house-door').value=currentPlayer.houseDoor;
		el('select-house-fence').value=currentPlayer.houseFence;
		el('select-house-pavement').value=currentPlayer.housePavement;
		el('select-house-mailbox').value=currentPlayer.houseMailbox;

		var PLAYER_BLOCKS=['player-name-','player-tpctext-','patterns','rooms0','rooms1','rooms2','rooms3','rooms4','rooms5'];

		for(var i=0; i<4; i++){
			if(i==p){
				for(j=0; j<PLAYER_BLOCKS.length; j++)
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
		for(var i=0;i<24;i++)
			refreshBadge(badges[i]);
	}
}



function openEditStringDialog(u16s,title){
	currentEditingItem=u16s;
	el('input-string-title').innerHTML='Change '+title;
	el('input-string').value=u16s.toString();
 
	MarcDialogs.open('string')
} 
function acceptEditString(){
	var newString=el('input-string').value;
	if(currentEditingItem===players[0].name){
		players[0].setName(newString);
	}else if(currentEditingItem===players[1].name){
		players[1].setName(newString);
	}else if(currentEditingItem===players[2].name){
		players[2].setName(newString);
	}else if(currentEditingItem===players[3].name){
		players[3].setName(newString);
	}else if(currentEditingItem===town.name){
		town.setName(newString);
	}else{
		currentEditingItem.set(newString);
	}	

	MarcDialogs.close();
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
	
	town.save();

	/* recalculate checksums */
	if(plusMode){
		updateChecksum(0x80, 0x1c);
		for(var i=0; i<4; i++){
			updateChecksum(0xa0+(Offsets.PLAYER_SIZE*i), 0x6b84);
			updateChecksum(0xa0+(Offsets.PLAYER_SIZE*i)+0x6b88, 0x38f4);
		}
		updateChecksum(0x0292a0, 0x022bc8);
		updateChecksum(0x04be80, 0x44b8);
		updateChecksum(0x053424, 0x01e4d8);
		updateChecksum(0x071900, 0x20);
		updateChecksum(0x071924, 0xbe4);
		updateChecksum(0x073954, 0x16188);
	}else{
		updateChecksum(0x80, 0x1c);
		for(var i=0; i<4; i++){
			updateChecksum(0xa0+(Offsets.PLAYER_SIZE*i), 0x6b64);
			updateChecksum(0xa0+(Offsets.PLAYER_SIZE*i)+0x6b68, 0x33a4);
		}
		updateChecksum(0x027ce0, 0x218b0);
		updateChecksum(0x0495a0, 0x44b8);
		updateChecksum(0x04da5c, 0x1e420);
		updateChecksum(0x06be80, 0x20);
		updateChecksum(0x06bea4, 0x13af8);
	}


	savegame.save();
}
/* crc32 function from http://stackoverflow.com/questions/18638900/javascript-crc32/18639999#18639999 */
const CRC_TABLE=[0x00000000,0xf26b8303,0xe13b70f7,0x1350f3f4,0xc79a971f,0x35f1141c,0x26a1e7e8,0xd4ca64eb,0x8ad958cf,0x78b2dbcc,0x6be22838,0x9989ab3b,0x4d43cfd0,0xbf284cd3,0xac78bf27,0x5e133c24,0x105ec76f,0xe235446c,0xf165b798,0x30e349b,0xd7c45070,0x25afd373,0x36ff2087,0xc494a384,0x9a879fa0,0x68ec1ca3,0x7bbcef57,0x89d76c54,0x5d1d08bf,0xaf768bbc,0xbc267848,0x4e4dfb4b,0x20bd8ede,0xd2d60ddd,0xc186fe29,0x33ed7d2a,0xe72719c1,0x154c9ac2,0x061c6936,0xf477ea35,0xaa64d611,0x580f5512,0x4b5fa6e6,0xb93425e5,0x6dfe410e,0x9f95c20d,0x8cc531f9,0x7eaeb2fa,0x30e349b1,0xc288cab2,0xd1d83946,0x23b3ba45,0xf779deae,0x05125dad,0x1642ae59,0xe4292d5a,0xba3a117e,0x4851927d,0x5b016189,0xa96ae28a,0x7da08661,0x8fcb0562,0x9c9bf696,0x6ef07595,0x417b1dbc,0xb3109ebf,0xa0406d4b,0x522bee48,0x86e18aa3,0x748a09a0,0x67dafa54,0x95b17957,0xcba24573,0x39c9c670,0x2a993584,0xd8f2b687,0x0c38d26c,0xfe53516f,0xed03a29b,0x1f682198,0x5125dad3,0xa34e59d0,0xb01eaa24,0x42752927,0x96bf4dcc,0x64d4cecf,0x77843d3b,0x85efbe38,0xdbfc821c,0x2997011f,0x3ac7f2eb,0xc8ac71e8,0x1c661503,0xee0d9600,0xfd5d65f4,0x0f36e6f7,0x61c69362,0x93ad1061,0x80fde395,0x72966096,0xa65c047d,0x5437877e,0x4767748a,0xb50cf789,0xeb1fcbad,0x197448ae,0x0a24bb5a,0xf84f3859,0x2c855cb2,0xdeeedfb1,0xcdbe2c45,0x3fd5af46,0x7198540d,0x83f3d70e,0x90a324fa,0x62c8a7f9,0xb602c312,0x44694011,0x5739b3e5,0xa55230e6,0xfb410cc2,0x092a8fc1,0x1a7a7c35,0xe811ff36,0x3cdb9bdd,0xceb018de,0xdde0eb2a,0x2f8b6829,0x82f63b78,0x709db87b,0x63cd4b8f,0x91a6c88c,0x456cac67,0xb7072f64,0xa457dc90,0x563c5f93,0x082f63b7,0xfa44e0b4,0xe9141340,0x1b7f9043,0xcfb5f4a8,0x3dde77ab,0x2e8e845f,0xdce5075c,0x92a8fc17,0x60c37f14,0x73938ce0,0x81f80fe3,0x55326b08,0xa759e80b,0xb4091bff,0x466298fc,0x1871a4d8,0xea1a27db,0xf94ad42f,0x0b21572c,0xdfeb33c7,0x2d80b0c4,0x3ed04330,0xccbbc033,0xa24bb5a6,0x502036a5,0x4370c551,0xb11b4652,0x65d122b9,0x97baa1ba,0x84ea524e,0x7681d14d,0x2892ed69,0xdaf96e6a,0xc9a99d9e,0x3bc21e9d,0xef087a76,0x1d63f975,0x0e330a81,0xfc588982,0xb21572c9,0x407ef1ca,0x532e023e,0xa145813d,0x758fe5d6,0x87e466d5,0x94b49521,0x66df1622,0x38cc2a06,0xcaa7a905,0xd9f75af1,0x2b9cd9f2,0xff56bd19,0x0d3d3e1a,0x1e6dcdee,0xec064eed,0xc38d26c4,0x31e6a5c7,0x22b65633,0xd0ddd530,0x0417b1db,0xf67c32d8,0xe52cc12c,0x1747422f,0x49547e0b,0xbb3ffd08,0xa86f0efc,0x5a048dff,0x8ecee914,0x7ca56a17,0x6ff599e3,0x9d9e1ae0,0xd3d3e1ab,0x21b862a8,0x32e8915c,0xc083125f,0x144976b4,0xe622f5b7,0xf5720643,0x07198540,0x590ab964,0xab613a67,0xb831c993,0x4a5a4a90,0x9e902e7b,0x6cfbad78,0x7fab5e8c,0x8dc0dd8f,0xe330a81a,0x115b2b19,0x020bd8ed,0xf0605bee,0x24aa3f05,0xd6c1bc06,0xc5914ff2,0x37faccf1,0x69e9f0d5,0x9b8273d6,0x88d28022,0x7ab90321,0xae7367ca,0x5c18e4c9,0x4f48173d,0xbd23943e,0xf36e6f75,0x0105ec76,0x12551f82,0xe03e9c81,0x34f4f86a,0xc69f7b69,0xd5cf889d,0x27a40b9e,0x79b737ba,0x8bdcb4b9,0x988c474d,0x6ae7c44e,0xbe2da0a5,0x4c4623a6,0x5f16d052,0xad7d5351];
var crc32=function(bytes){
	var crc=0 ^ (-1);

	for(var i=0; i<bytes.length; i++){
		crc=(crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xFF];
	}

	return (crc ^ (-1)) >>> 0
}
function updateChecksum(offset, length){
	var bytes=new Array(length);
	for(var i=0;i<length;i++)
		bytes[i]=savegame.readByte1(offset+4+i);

	var checksum=crc32(bytes);
	savegame.storeByte(offset, checksum%256);
	savegame.storeByte(offset+1, (checksum >> 8)%256);
	savegame.storeByte(offset+2, (checksum >> 16)%256);
	savegame.storeByte(offset+3, (checksum >> 24)%256);

}

var crc32Quick=function(bytes,len){var crc=0 ^ (-1);for(var i=0; i<len; i++){crc=(crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xFF];}return (crc ^ (-1)) >>> 0;};
function checkChecksums(offset){
	var LEN_START=0x04;
	var LEN_MAX=0x030000;
	var chec=savegame.readByte4(offset);
	var bytes=savegame.readBytes(offset+4,LEN_MAX);
	var found=false;
	for(var i=LEN_START; i<LEN_MAX && !found; i+=4){
		var checksum=crc32Quick(bytes,i);
		if(checksum===chec){
			console.log('found checksum at 0x'+offset.toString(16)+', length:0x'+i.toString(16));
			found=true;
		}
	}
	return found;
}







/* PlayTime */
function PlayTime(offset){
	this.offset=offset;
	this.time=savegame.readByte4(offset);
	this.span=document.createElement('span');
	this.toString();
}
PlayTime.prototype.getSeconds=function(v){return this.time%60}
PlayTime.prototype.getMinutes=function(v){return parseInt(this.time/60)%60}
PlayTime.prototype.getHours=function(v){return parseInt(this.time/(60*60))%24}
PlayTime.prototype.getDays=function(v){return parseInt(this.time/(3600*24))}
PlayTime.prototype.getTime=function(){return this.time}
PlayTime.prototype.setSeconds=function(s){this.setTime(s,this.getMinutes(),this.getHours(),this.getDays())}
PlayTime.prototype.setMinutes=function(m){this.setTime(this.getSeconds(),m,this.getHours(),this.getDays())}
PlayTime.prototype.setHours=function(h){this.setTime(this.getSeconds(),this.getMinutes(),h,this.getDays())}
PlayTime.prototype.setDays=function(d){this.setTime(this.getSeconds(),this.getMinutes(),this.getHours(),d)}
PlayTime.prototype.setTime=function(s,m,h,d){this.time=(s%60)+(m*60)+(h*3600)+(d*3600*24);this.toString()}
PlayTime.prototype.toString=function(){
	var s=this.getDays()+' days<br/>'+this.getHours()+' hours<br/>'+this.getMinutes()+' minutes<br/>'+this.getSeconds()+' seconds';
	this.span.innerHTML=s;
	return s
}
PlayTime.prototype.save=function(){savegame.storeByte4(this.offset, this.getTime())}



/* U16String */
function U16String(offset,maxLength,chars){this.offset=offset;this.maxLength=maxLength;this.chars=chars;this.span=createSpan('?');this.span.className='u16string';this.toString()}
U16String.prototype.set=function(s){for(var i=0;i<this.maxLength;i++)this.chars[i]=0;for(var i=0;i<s.length&&i<this.maxLength-1;i++)this.chars[i]=s.charCodeAt(i);this.toString()}
U16String.prototype.toString=function(){
	var string='';
	for(var i=0;i<this.maxLength&&this.chars[i]!=0;i++){
		//if(this.chars[i]<=32){
		//	string+='[0x'+intToHex(this.chars[i])+']';
		//}else{
			string+=String.fromCharCode(this.chars[i]);
		//}
	}
	this.span.innerHTML=string;
	return string
}



/* HexFile.js by Marc */
function HexFile(source, func){
	if(typeof window.FileReader !== 'function'){
		alert('Your browser doesn\'t support FileReader.');
		return null
	}

	if(typeof source === 'object' && source.name && source.size /*&& source.type*/){
		this.file=source;
		this.fileName=this.file.name;
		this.fileSize=this.file.size;
		this.fileType=source.type;

		this.fileReader=new FileReader();
		this.fileReader.addEventListener('load', function(){this.dataView=new DataView(this.result)}, false);
		if(func)
			this.fileReader.addEventListener('load', func, false);
		this.fileReader.readAsArrayBuffer(this.file);


	}else if(typeof source === 'number'){
		this.fileSize=source;
		this.fileName='filename.bin';
		this.fileType='application/octet-stream';

		this.fileReader=new ArrayBuffer(this.fileSize);
		this.fileReader.dataView=new DataView(this.fileReader);

		if(func)
			func.call;
	}else{
		alert('Invalid type of file.');
		return null
	}

}
HexFile.prototype.readByte1=function(pos){return this.fileReader.dataView.getUint8(pos)}
HexFile.prototype.readByte2=function(pos){return this.readByte1(pos+1)*0x0100+this.readByte1(pos)}
HexFile.prototype.readByte4=function(pos){return this.readByte1(pos+3)*0x01000000+this.readByte1(pos+2)*0x010000+this.readByte1(pos+1)*0x0100+this.readByte1(pos)}
HexFile.prototype.readBytes=function(pos,nBytes){var bytes=new Array(nBytes);for(var i=0;i<nBytes;i++)bytes[i]=this.readByte1(pos+i);return bytes}
HexFile.prototype.readU16String=function(pos,maxLength){var cs=new Array(maxLength);for(var i=0;i<maxLength;i++)cs[i]=this.readByte2(pos+i*2);return new U16String(pos,maxLength,cs)}
HexFile.prototype.storeByte=function(pos,byte){this.fileReader.dataView.setUint8(pos, byte)}
HexFile.prototype.storeByte2=function(pos,bytes){this.storeByte(pos,bytes&0x000000ff);this.storeByte(pos+1,(bytes&0x0000ff00)>>8)}
HexFile.prototype.storeByte4=function(pos,bytes){this.storeByte(pos,bytes&0x000000ff);this.storeByte(pos+1,(bytes&0x0000ff00)>>8);this.storeByte(pos+2,(bytes&0x00ff0000)>>16);this.storeByte(pos+3,(bytes&0xff000000)>>24)}
HexFile.prototype.storeU16String=function(pos,str){for(var i=0;i<str.maxLength;i++)savegame.storeByte2(pos+i*2,str.chars[i])}
HexFile.prototype.save=function(){
	var blob;
	try{
		blob=new Blob([this.fileReader.dataView], {type: this.fileType});
	}catch(e){
		//old browser, using BlobBuilder
		window.BlobBuilder=window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		if(e.name == 'TypeError' && window.BlobBuilder){
			var bb=new BlobBuilder();
			bb.append(this.fileReader.dataView.buffer);
			blob=bb.getBlob(this.fileType);
		}else if(e.name=='InvalidStateError'){
			blob=new Blob([this.fileReader.dataView.buffer],{type:this.fileType});
		}else{
			alert('Incompatible browser.');
		}
	}
	saveAs(blob, this.fileName)
}


/* FileSaver.js - http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||(navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator))||(function(h){var r=h.document,l=function(){return h.URL||h.webkitURL||h},e=h.URL||h.webkitURL||h,n=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g="download" in n,j=function(t){var s=r.createEvent("MouseEvents");s.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);t.dispatchEvent(s)},o=h.webkitRequestFileSystem,p=h.requestFileSystem||o||h.mozRequestFileSystem,m=function(s){(h.setImmediate||h.setTimeout)(function(){throw s},0)},c="application/octet-stream",k=0,b=[],i=function(){var t=b.length;while(t--){var s=b[t];if(typeof s==="string"){e.revokeObjectURL(s)}else{s.remove()}}b.length=0},q=function(t,s,w){s=[].concat(s);var v=s.length;while(v--){var x=t["on"+s[v]];if(typeof x==="function"){try{x.call(t,w||t)}catch(u){m(u)}}}},f=function(t,u){var v=this,B=t.type,E=false,x,w,s=function(){var F=l().createObjectURL(t);b.push(F);return F},A=function(){q(v,"writestart progress write writeend".split(" "))},D=function(){if(E||!x){x=s(t)}if(w){w.location.href=x}v.readyState=v.DONE;A()},z=function(F){return function(){if(v.readyState!==v.DONE){return F.apply(this,arguments)}}},y={create:true,exclusive:false},C;v.readyState=v.INIT;if(!u){u="download"}if(g){x=s(t);n.href=x;n.download=u;j(n);v.readyState=v.DONE;A();return}if(h.chrome&&B&&B!==c){C=t.slice||t.webkitSlice;t=C.call(t,0,t.size,c);E=true}if(o&&u!=="download"){u+=".download"}if(B===c||o){w=h}else{w=h.open()}if(!p){D();return}k+=t.size;p(h.TEMPORARY,k,z(function(F){F.root.getDirectory("saved",y,z(function(G){var H=function(){G.getFile(u,y,z(function(I){I.createWriter(z(function(J){J.onwriteend=function(K){w.location.href=I.toURL();b.push(I);v.readyState=v.DONE;q(v,"writeend",K)};J.onerror=function(){var K=J.error;if(K.code!==K.ABORT_ERR){D()}};"writestart progress write abort".split(" ").forEach(function(K){J["on"+K]=v["on"+K]});J.write(t);v.abort=function(){J.abort();v.readyState=v.DONE};v.readyState=v.WRITING}),D)}),D)};G.getFile(u,{create:false},z(function(I){I.remove();H()}),z(function(I){if(I.code===I.NOT_FOUND_ERR){H()}else{D()}}))}),D)}),D)},d=f.prototype,a=function(s,t){return new f(s,t)};d.abort=function(){var s=this;s.readyState=s.DONE;q(s,"abort")};d.readyState=d.INIT=0;d.WRITING=1;d.DONE=2;d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null;h.addEventListener("unload",i,false);return a}(self));
/* MarcDialogs.js */
MarcDialogs=function(){function e(e,t,n){a?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)}function t(){s&&(o?history.go(-1):(c.className="dialog-overlay",s.className=s.className.replace(/ active/g,""),s=null))}function n(e){for(var t=0;t<s.dialogElements.length;t++){var n=s.dialogElements[t];if("INPUT"===n.nodeName&&"hidden"!==n.type||"INPUT"!==n.nodeName)return n.focus(),!0}return!1}function l(){s&&(s.style.marginLeft="-"+s.offsetWidth/2+"px",s.style.marginTop="-"+s.offsetHeight/2-30+"px")}var a=/MSIE 8/.test(navigator.userAgent),o=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)&&"function"==typeof history.pushState,i=["Cancel","Accept"],s=null,c=document.createElement("div");c.className="dialog-overlay",c.style.position="fixed",c.style.top="0",c.style.left="0",c.style.width="100%",c.style.height="100%",c.style.zIndex=8e3,e(c,"click",t),e(window,"load",function(){document.body.appendChild(c),o&&history.replaceState({myDialog:!1},null,null)}),e(window,"resize",l),o&&e(window,"popstate",function(e){e.state.myDialog?(s=e.state.myDialog,MarcDialogs.open(e.state.myDialog)):e.state.myDialog===!1&&s&&(c.className="dialog-overlay",s.className=s.className.replace(/ active/g,""),s=null)}),e(document,"keydown",function(e){s&&(27==e.keyCode?(e.preventDefault?e.preventDefault():e.returnValue=!1,t()):9==e.keyCode&&s.dialogElements[s.dialogElements.length-1]==document.activeElement&&(e.preventDefault?e.preventDefault():e.returnValue=!1,n()))});var d=null,u=null,m=null;return{open:function(e){s&&(s.className=s.className.replace(/ active/g,"")),o&&(s?history.replaceState({myDialog:e},null,null):(console.log("a"),history.pushState({myDialog:e},null,null))),c.className="dialog-overlay active",s="string"==typeof e?document.getElementById("dialog-"+e):e,s.className+=" active",s.style.position="fixed",s.style.top="50%",s.style.left="50%",s.style.zIndex=8001,s.dialogElements||(s.dialogElements=s.querySelectorAll("input,textarea,select")),n(),l(s),l(s)},close:t,alert:function(t){if(!d){d=document.createElement("div"),d.id="dialog-quick-alert",d.className="dialog",d.msg=document.createElement("div"),d.msg.style.textAlign="center",d.appendChild(d.msg),d.buttons=document.createElement("div"),d.buttons.className="buttons";var n=document.createElement("input");n.type="button",n.className="button button-accept",n.value=i[1],e(n,"click",this.close),d.buttons.appendChild(n),d.appendChild(d.buttons),document.body.appendChild(d)}d.msg.innerHTML=t,MarcDialogs.open("quick-alert")},confirm:function(t,n){if(!u){u=document.createElement("div"),u.id="dialog-quick-confirm",u.className="dialog",u.msg=document.createElement("div"),u.msg.style.textAlign="center",u.appendChild(u.msg),u.buttons=document.createElement("div"),u.buttons.className="buttons";var l=document.createElement("input");l.type="button",l.className="button button-accept",l.value=i[1],e(l,"click",function(){m()}),u.buttons.appendChild(l);var a=document.createElement("input");a.type="button",a.className="button",a.value=i[0],e(a,"click",this.close),u.buttons.appendChild(a),u.appendChild(u.buttons),document.body.appendChild(u)}m=n,u.msg.innerHTML=t,MarcDialogs.open("quick-confirm")}}}();
/* MarcStringCleaner.js */
var _STR_CLEAN=['a',/[\xc0\xc1\xc2\xc4\xe0\xe1\xe2\xe4]/g,'e',/[\xc8\xc9\xca\xcb\xe8\xe9\xea\xeb]/g,'i',/[\xcc\xcd\xce\xcf\xec\xed\xee\xef]/g,'o',/[\xd2\xd3\xd4\xd6\xf2\xf3\xf4\xf6]/g,'u',/[\xd9\xda\xdb\xdc\xf9\xfa\xfb\xfc]/g,'n',/[\xd1\xf1]/g,'c',/[\xc7\xe7]/g,'ae',/[\xc6\xe6]/g,'and',/\x26/g,'euro',/\u20ac/g,'',/[^\w- ]/g,'_',/( |-)/g,'_',/_+/g,'',/^_|_$/g];
if(!String.prototype.clean)String.prototype.clean=function(){var s=this.toLowerCase();for(var i=0;i<_STR_CLEAN.length;i+=2)s=s.replace(_STR_CLEAN[i+1],_STR_CLEAN[i]);return s}