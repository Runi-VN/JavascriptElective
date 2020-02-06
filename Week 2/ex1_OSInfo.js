const os = require('os');

/*
1) Simple OS-info file
Create a javascript file that, 
using nodes CommonJS module system (require/exports), 
will export an object with the following info (demonstrated for a Window PC)
*/

function OSinfo() {
	return {
		platform: os.platform(),
		osType: os.type(),
		freeMemory: os.freemem(),
		totalMemory: os.totalmem(),
		EOL: os.EOL
	};
}
//console.log(OSinfo());
module.exports.info = OSinfo;
