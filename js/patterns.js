/* Pattern structure (borrowed from Thulinma http://www.thulinma.com/acnl/)
0x000 - 0x029 ( 42) = Pattern Title
0x02A - 0x02B (  2) = User ID
0x02C - 0x03D ( 18) = User Name
0x03E         (  1) = User Gender
0x03F         (  1) = ZeroFiller
0x040 - 0x041 (  2) = Town ID
0x042 - 0x055 ( 20) = Town Name
0x056 - 0x057 (  2) = Unknown (values are usually random - changing seems to have no effect)
0x058 - 0x066 ( 15) = Palette Indexes
0x067		  (  1) = Unknown (value is usually random - changing seems to have no effect)
0x068		  (  1) = Ten? (seems to always be 0x0A)
0x069		  (  1) = Pattern Type 
0x06A - 0x06B (  2) = Padding? (seems to always be 0x0000)
0x06C - 0x26B (512) = Pattern Data 1 (mandatory)
0x26C - 0x46B (512) = Pattern Data 2 (optional)
0x46C - 0x66B (512) = Pattern Data 3 (optional)
0x66C - 0x86B (512) = Pattern Data 4 (optional)
0x86C - 0x86F (  4) = Zero padding (optional)

Pattern Types:
	0x00 = LongSleeveDress
	0x01 = ShortSleeveDress
	0x02 = SleevelessDress
	0x03 = LongSleeveShirt
	0x04 = ShortSleeveShirt
	0x05 = SleevelessShirt
	0x06 = HornedHat
	0x07 = KnitHat
	0x08 = PhotoBoard
	0x09 = Pattern
*/
const PATTERN_COLORS=[
'ffeeff','ff99aa','ee5599','ff66aa','ff0066','bb4477','cc0055','990033','552233','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff',
'ffbbcc','ff7777','dd3311','ff5544','ff0000','cc6666','bb4444','bb0000','882222','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','eeeeee',
'ddccbb','ffcc66','dd6622','ffaa22','ff6600','bb8855','dd4400','bb4400','663311','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','dddddd',
'ffeedd','ffddcc','ffccaa','ffbb88','ffaa88','dd8866','bb6644','995533','884422','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','cccccc',
'ffccff','ee88ff','cc66dd','bb88cc','cc00ff','996699','8800aa','550077','330044','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','bbbbbb',
'ffbbff','ff99ff','dd22bb','ff55ee','ff00cc','885577','bb0099','880066','550044','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','aaaaaa',
'ddbb99','ccaa77','774433','aa7744','993300','773322','552200','331100','221100','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','999999',
'ffffcc','ffff77','dddd22','ffff00','ffdd00','ccaa00','999900','887700','555500','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','888888',
'ddbbff','bb99ee','6633cc','9955ff','6600ff','554488','440099','220066','221133','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','777777',
'bbbbff','8899ff','3333aa','3355ee','0000ff','333388','0000aa','111166','000022','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','666666',
'99eebb','66cc77','226611','44aa33','008833','557755','225500','113322','002211','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','555555',
'ddffbb','ccff88','88aa55','aadd88','88ff00','aabb99','66bb00','559900','336600','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','444444',
'bbddff','77ccff','335599','6699ff','1177ff','4477aa','224477','002277','001144','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','333333',
'aaffff','55ffff','0088bb','55bbcc','00ccff','4499aa','006688','004455','002233','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','222222',
'ccffee','aaeedd','33ccaa','55eebb','00ffcc','77aaaa','00aa99','008877','004433','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','000000',
'aaffaa','77ff77','66dd44','00ff00','22dd22','55bb55','00bb00','008800','224422','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff','ffffff'
/*
NOTES:
	* The last columns are greys.
	* 0xX9 - 0xXE aren't used. They're all white (0x00FFFFFF).
	* 0xFF is 0xFFFFFFFF. It crashes in New Leaf, but not the Welcome Amiibo update.
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
		palette[i]=savegame.readU8(this.offset+0x58+i);

	for(var y=0; y<32; y++){
		for(var x=0; x<16; x++){
			var bothColors=savegame.readU8(this.offset+0x6c+y*16+x);

			ctx.fillStyle='#'+PATTERN_COLORS[palette[bothColors & 0x0f]]; //leftColor
			ctx.fillRect(x*2, y, 1, 1);

			ctx.fillStyle='#'+PATTERN_COLORS[palette[bothColors >> 4]]; //rightcolor
			ctx.fillRect(x*2+1, y, 1, 1);
		}
	}

	this.title=new U16String(this.offset, 20).toString();
	this.author=new U16String(this.offset+0x2c, 10).toString();
	this.canvas.title=this.title+' by '+this.author;
}
Pattern.prototype.importFromTempFile=function(){
	for(var i=0; i<tempFile.fileSize && i<2160; i++){
		savegame.writeByte(this.offset+i, tempFile.readU8(i));
	}
	this.refreshCanvas();
	MarcDialogs.close();
}
Pattern.prototype.export=function(){
	var size;
	if(savegame.readU8(this.offset+0x69)==0x09){
		size=620;
	}else{
		size=2160;
	}

	var newFile=new MarcFile(size);
	for(var i=0; i<size; i++){
		newFile.writeByte(i, savegame.readU8(this.offset+i));
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
