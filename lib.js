function oddOrEven(someNumber) {
	return (someNumber % 2 == 0) ? true : false;
}

function calcFileSize(file) {
	kb = 1024;
	mb = 1048576;
	gb = 1073741824;
	tb = 1099511627776;

	if (file >= kb && file < mb) size = Math.round(file / kb * 10) / 10 + ' KB';
	else if (file >= mb && file < gb) size = Math.round(file / mb * 10) / 10 + ' MB';
	else if (file >= gb && file < tb) size = Math.round(file / gb * 10) / 10 + ' GB';
	else if (file >= tb) size = Math.round(file / tb * 10) / 10 + 'TB';
	else {
		size = Math.round(file * 10) / 10;
		if (size == 1) size = size + ' Byte';
		else size = size + ' Bytes';
	}
	return size;
}

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '12'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	if (min >= 0 && min <= 9) min = '0' + min;
	var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}


var isDetailsSupported = (function(doc) {
	var el = doc.createElement('details'),
		fake, root, diff;
	if (!('open' in el)) {
		return false;
	}
	root = doc.body || (function() {
		var de = doc.documentElement;
		fake = true;
		return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
	}());
	el.innerHTML = '<summary>a</summary>b';
	el.style.display = 'block';
	root.appendChild(el);
	diff = el.offsetHeight;
	el.open = true;
	diff = diff != el.offsetHeight;
	root.removeChild(el);
	if (fake) {
		root.parentNode.removeChild(root);
	}
	return diff;
}(document));

// window.console || (window.console = { 'log': alert });
// $(function() {
// // Add conditional classname based on support
// $('html').addClass($.fn.details.support ? 'details' : 'no-details');
// // Show a message based on support
// //$('body').prepend($.fn.details.support ? 'Native support detected; the plugin will only add ARIA annotations and fire custom open/close events.' : 'Emulation active; you are watching the plugin in action!');
// // Emulate <details> where necessary and enable open/close event handlers
// $('details').details();
// // Bind some example event handlers
// $('details').on({
// 'open.details': function() {
// //console.log('opened');
// },
// 'close.details': function() {
// //console.log('closed');
// }
// });
// });

function MD5(string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}

	function AddUnsigned(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function F(x, y, z) {
		return (x & y) | ((~x) & z);
	}

	function G(x, y, z) {
		return (x & z) | (y & (~z));
	}

	function H(x, y, z) {
		return (x ^ y ^ z);
	}

	function I(x, y, z) {
		return (y ^ (x | (~z)));
	}

	function FF(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1 = lMessageLength + 8;
		var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue = "",
			WordToHexValue_temp = "",
			lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22;
	var S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20;
	var S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23;
	var S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301;
	b = 0xEFCDAB89;
	c = 0x98BADCFE;
	d = 0x10325476;

	for (k = 0; k < x.length; k += 16) {
		AA = a;
		BB = b;
		CC = c;
		DD = d;
		a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		a = AddUnsigned(a, AA);
		b = AddUnsigned(b, BB);
		c = AddUnsigned(c, CC);
		d = AddUnsigned(d, DD);
	}

	var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

	return temp.toLowerCase();
};

function dump(arr, level) {
	var dumped_text = "";
	if (!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for (var j = 0; j < level + 1; j++) level_padding += "    ";

	if (typeof(arr) == 'object') { //Array/Hashes/Objects
		for (var item in arr) {
			var value = arr[item];

			if (typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value, level + 1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
	}
	return dumped_text;
}

function getObjectLength(o) {
	var length = 0;

	for (var i in o) {
		if (Object.prototype.hasOwnProperty.call(o, i)) {
			length++;
		}
	}
	return length;
}

var qs = (function(a) {
	if (a == "") return {};
	var b = {};
	for (var i = 0; i < a.length; ++i) {
		var p = a[i].split('=');
		if (p.length != 2) continue;
		b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	}
	return b;
})(window.location.search.substr(1).split('&'));

function empty(str) {
	//first remove all spaces using the following regex
	str = str.replace(/^\s+|\s+$/, '');

	//then we check for the length of the string if its 0 or not
	if (str.length == 0) return true;
	else return false;
}
