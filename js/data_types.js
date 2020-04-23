/* NumericValue - documented by SciresM (https://gist.github.com/SciresM/0ecc3c2b8c93922d3b21f7c4e552626c) */
function NumericValue(offset){
	this.offset=offset;
	this.int1=savegame.readU32(offset);
	this.int2=savegame.readU32(offset+4);

	this.changed=false;
	this.value=this.decrypt();
}
NumericValue.prototype.decrypt=function(){
	// Unpack 64-bit value into (u32, u16, u8, u8) values.
	var enc = this.int1;
	var adjust = this.int2 & 0xffff;
	var shift_val = (this.int2 >>> 16) & 0xff;
	var chk = (this.int2 >>> 24) & 0xff;

	// Validate 8-bit checksum
	if ((((enc >>> 0) + (enc >>> 8) + (enc >>> 16) + (enc >>> 24) + 0xba) & 0xff) != chk){
		console.error('invalid numeric value checksum');
		return 0;
	}
	var left_shift = (0x1c - shift_val) & 0xff;
	var right_shift = 0x20 - left_shift;
	if (left_shift < 0x20){
		/* general case */
		return ((((enc << left_shift)>>>0) + (enc >>> right_shift)) - (adjust + 0x8f187432));
	}else{
		/* handle error case: Invalid shift value */
		console.error('invalid shift for numeric value');
		return 0 + ((enc << right_shift) >>> 0) - ((adjust + 0x8f187432) >>> 0);
	}
}
NumericValue.prototype.set=function(newVal){
	// Generate random adjustment, shift values.
	var adjust = random(0x10000) & 0xffff;
	var shift_val = random(0x1a) & 0xff;

	// Encipher value
	var enc = newVal + adjust + 0x8f187432;
	enc = (enc >>> (0x1c - shift_val)) + ((enc << (shift_val + 4))>>>0);
	// Calculate Checksum
	var chk = (((enc >>> 0) + (enc >>> 8) + (enc >>> 16) + (enc >>> 24) + 0xba) & 0xff) & 0xff;
	// Pack result
	this.int1=enc;
	this.int2=(adjust & 0xffff) + ((shift_val & 0xff) << 16) + ((chk & 0xff) << 24);
	this.value=this.decrypt();
	if(this.value!==newVal){
		console.error('numeric value was not successfully encrypted/decrypted');
		MarcDialogs.alert('<b>Unexpected error: </b>numeric value was not successfully encrypted/decrypted');
	}
	this.changed=true;
}
NumericValue.prototype.save=function(){
	if(this.changed){
		savegame.writeU32(this.offset, this.int1 >>> 0);
		savegame.writeU32(this.offset+4, this.int2 >>> 0)
	}
}

/*function searchNumericValue(val){
	for(i=0; i<savegame.fileSize; i+=1){
		var test=new NumericValue(i);
		if(test.value===val){
			console.log(i);
			break;
		}
	}
}*/




/* BitArray */
function BitArray(offset, ul, labels){
	this.offset=offset;
	this.length=labels.length;

	this.bits=new Array(this.length);
	this.ul=ul;
	for(var i=0; i<this.length; i++){
		var li=document.createElement('li');
		var checkbox=document.createElement('input');
		checkbox.id=ul.id+i;
		checkbox.type='checkbox';
		var label=document.createElement('label');
		label.innerHTML=getString(labels[i]);
		label.htmlFor=ul.id+i;
		
		li.appendChild(checkbox);
		li.appendChild(label);
		ul.appendChild(li);
	}

	this._read();
}
BitArray.prototype._read=function(){
	for(var i=0; i<this.length; i++)
		this.setBit(i, (savegame.readU8(this.offset+parseInt(i/8)) & (1<<(i%8))));	
}
BitArray.prototype.save=function(){
	var maxBytes=parseInt(this.length/8);
	for(var i=0; i<maxBytes; i++){
		var b=0;
		for(var j=0; j<8; j++){
			if(this.ul.children[i*8+j].children[0].checked)
				b|=1 << (j%8);
		}
		savegame.writeU8(this.offset+i, b);
	}
}
BitArray.prototype.setBit=function(bit, status){
	this.ul.children[bit].children[0].checked=!!status;	
}
BitArray.prototype.setAll=function(status){
	for(var i=0; i<this.length; i++)
		this.setBit(i, status);
}





/* PlayTime */
function PlayTime(offset){
	this.offset=offset;
	this.time=savegame.readU32(offset);
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
PlayTime.prototype.save=function(){savegame.writeU32(this.offset, this.getTime())}



/* U16String */
function U16String(offset,maxLength){
	this.offset=offset;
	this.maxLength=maxLength;
	this._read();

	this.span=createSpan('?');
	this.span.className='u16string';
	this.toString();
}
U16String.prototype._read=function(){
	this.chars=new Array(this.maxLength)

	for(var i=0;i<this.maxLength;i++)
		this.chars[i]=savegame.readU16(this.offset+i*2);
}
U16String.prototype.set=function(s){
	if(s.length>0){
		for(var i=0;i<this.maxLength;i++)
			this.chars[i]=0;
		for(var i=0;i<s.length&&i<this.maxLength-1;i++)
			this.chars[i]=s.charCodeAt(i);
		this.toString()
	}
}
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
U16String.prototype.save=function(offset){
	offset=offset || this.offset;
	for(var i=0; i<this.maxLength; i++)
		savegame.writeU16(offset+i*2, this.chars[i])
}
U16String.prototype.createInput=function(onChangeEvt){
	var input=document.createElement('input');
	input.maxLength=this.maxLength;
	input.u16string=this;
	input.value=this.toString();
	input.type='text';
	addEvent(input, 'change', onChangeEvt || function(){
		this.u16string.set(this.value);
	});
	
	this.input=input;
	return input;
}
U16String.prototype.refreshInput=function(){
	this.input.value=this.toString();
}