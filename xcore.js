/* ***************************************************************************** 
 * xcore JavaScript framework, version 0.1.0                                   *
 *  (c) 2007 Chunhui Li <wiseneuron@gmail.com>                                 *
 *                                                                             *
 *  xcore is freely distributable under the terms of an MIT-style license.     *
 *  For details, see the xcore web site: https://github.com/wiseneuron/xcore*
 *                                                                             *
/*----------------------------------------------------------------------------*/



/*------------------------ fundenment functions Start ------------------------*/

/**
 * print information
 * @param {String} string to print.
 * @param {String} css class to apply to.
 */
$p = function(){
	var len = arguments.length;
	var s = "";
	var st = "";
	var css_class = "";
	if(len == 1){
		s = arguments[0];
	} else if(len == 2){
		st = arguments[0];
		css_class = arguments[1];		
		s = "<font class=" + css_class + ">" + st + "</font>";
	}	
	document.write(s);
}
/**
 * print string with given color and size.
 * @param string string to print.
 * @param {color:sclor,size:ssize} given color and size
 */
$pcolor = function(){
	var len = arguments.length;
	var s = "";
	var st = "";
	var scolor = "";
	var ssize = "12px";
	if(len == 1){
		s = arguments[0];
	} else if(len == 2){
		st = arguments[0];
		scolor = (arguments[1]).color || "BLACK";
		ssize = (arguments[1]).size || "4";
		s = "<font color=" + scolor + " size=" + ssize + ">" + st + "</font>";
	}
	document.write(s);
}
/**
 * print information with <br> after it. 
 * @param {String} string to print.
 * @param {String} css class to apply to.
 */
$pln = function(){
	var len = arguments.length;
	var s = "";
	var st = "";
	var css_class = "";
	if(len == 1){
		s = arguments[0];
	} else if(len == 2){
		st = arguments[0];
		css_class = arguments[1];		
		s = "<font class=" + css_class + ">" + st + "</font>";
	}	
	document.write(s + "<br>");
}
/**
 * print <br>, new a line.
 */
$ln = function(){
   document.write("<br>");
}

/**
 * Shortcut function for document.getElementById().
 * @name $id()
 * @param {String, Array} ...	One or more id arguments.
 * @return {Array} Returns an array of the element(s) corresponding to 
 * the specified id's.
 * @copyright the function comes from prototype.js
 */
$id = function() {
  var elements = new Array();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }
  return elements;
}
/**
 *  get elements by name.
 *  Can use mutilarguments
 *  @param {String} element name.
 *  @param {String} element name.
 *  ...
 */
$name = function(){
    var elements = new Array();    
    var eles;    
    for (var i = 0; i < arguments.length; i++) {
        var name = arguments[i];
        if (typeof name == 'string') {
			eles = document.getElementsByName(name);
		}
        elements.push(eles);
    }
    return elements;
}
/**
 * test the length of a iterable object.
 * @param {Object} object
 */
$length = function(object){
	/*var len = 0;
	if(object.length){
		len = object.length;
	}*/
}
/**
 * show the type of the object.
 * @param {Object} object
 */
$typeof = function(object){
	if(object){
		return typeof object;
	}else {
		return "";
	}
}
/**
 * check whether the given date is number.
 * @param {String} date
 */
$isnumber = function(data) {
	var tmp;
	if (data == "")
		return true;
	var re = /^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;
	return re.test(data);
}
/**
 * trim spaces at left and right of a string.
 */
String.prototype.trim = function()
{
    return this.replace(/(^[\\s]*)|([\\s]*$)/g, "");
}
/**
 * 
 * @param {Object} property
 * @param {Object} object
 */
$isIn = function(property, object){
    var bIsIn = false ;
    for(propertytemp in object){
   	   if(property == propertytemp){
   	       bIsIn = true;
   	       break;
   	   }
   	}
    return bIsIn;
}
/**
 * get real tag 
 * @param {Object} __oSrc  object
 * @param {String} __tag   tag name
 */
$getRealTag = function( __oSrc,__tag )
{
		if( null == __oSrc ) return;
		if( __tag.toUpperCase() == __oSrc.tagName ) return __oSrc;
		return $getRealTag( __oSrc.parentNode,__tag );
}
/*------------------------ fundenment functions End --------------------------*/

/*-------------------------------- core Start --------------------------------*/

var xcore_global = this;
var xcore_currentContext = this;
function xcore_undef(/*String*/name, /*Object*/object){
	// Boolean
  	return (typeof (object || xcore_currentContext)[name] == "undefined");
}

if(xcore_undef("xcoreConfig", this)){
	var xcoreConfig={};
}
if(xcore_undef("xcore", this)){ 
  var xcore={};
}
xcore.global = function(){
	return xcore_currentContext;
}
// Override locale setting, if specified
xcore.locale  = xcoreConfig.locale;

/**
* Version information of xcore.
*/
xcore.Version = {
	major: 0, minor: 1, patch: 0, flag: "",
	revision: Number("$Rev: 0001 $".match(/[0-9]+/)[0]),
	toString: function() {
	  with (xcore.Version) {
		return major + "." + minor + "." + patch + flag + " (" + revision + ")";
	  }
	}
};

/**
 * xcore's system commands.
 */
xcore = {
	/**
	 * package a xcore class.
	 * @param {String} pkgName
	 */
    x_package: function(pkgName){
	
	},
	
	/**
	 * import a xcore classs.
	 * @param {String} pkgName
	 */
	x_import: function(pkgName){
	   	
	},
	/**
	 * create a xcore class.
	 */
	x_create:function(){
		return function() {
             this.x_init.apply(this, arguments);
	    }
	},
	
	/**
	 * extends subClass's object from parent object. 
	 * with parent's object.
	 * @param {Object} subClass's object
	 * @param {Object} parent class's Object
	 */
	x_extends: function(subObject, parentObject){
		for (property in parentObject) {
            if(! (property in subObject)){
		   	   subObject[property] = parentObject[property];
		   }
        }
        return subObject;
	},
	
	/**
	 * copying the properties and methods from one element to another,
	 * overwrite the same properties and methods.
	 * with parent's object.
	 * @param {Object} destination	Destination object to copy 
	 * the properties and methods.
     * @param {Object} source	Source object to copy properties and 
     * methods from.
     * @return {Object} Returns the destination object with the properties 
     * and methods from the source object.
	 */
	x_copy: function(destination, source){
	    for (property in source) {
           destination[property] = source[property];
      }
      return destination;
	},
	
	/**
	 * call super class 's constructor.
	 * @param {Object} subObject
	 * @param {String} parnent class name
	 * @param {Array} args arguments
	 */
	x_super: function(){
		var len = arguments.length;
		var subObject = null;
		var parentName = "";
		var parentObj = null;
		var args = new Array();
		if( len >= 2){
			subObject = arguments[0];
			parentName = arguments[1];
		}
		if(len >= 3){
			args = arguments[2];
			parentObj = this.x_forClassName(parentName, args);
		} else {
			parentObj = this.x_forClassName(parentName);
		}
				
		this.x_extends(subObject,parentObj);
		
		return subObject;
	},
    /**
	 * invoke a method with method's name and given
	 * arguments.
	 * @param {String} method name.
	 * @param {Array} arguments.
	 * @param {String} name of object own the method.
	 * 	  mark: object in the array should be packaged as
	 * the format:{object:object_to_passe,name:object_name},
	 * where object_to_passe is an object, object_name is
	 * object_to_passe's name, which is a string.
	 * @return the object returned by the method invoked.
	 */
	x_invoke:function(){
		var methodName = "";
		var args = "";
		var cmd = "";
		var object = null;
		var len = arguments.length;
		if(len > 0){
			methodName = arguments[0]
			if( len > 1){
				if(arguments[1] != "undefined"){
				    args = (arguments[1]).x_toArgs();
				}
			}
			if (len > 2){
				if($typeof(arguments[2]) == "string"){
					methodName = arguments[2] + "." + methodName;
				}
			}
	
			cmd = methodName + "(" + args + ")";
		}
		 
		object = eval(cmd);
		return object;
	},
	/**
	 * new a object with class's name and given
	 * arguments.
	 * @param {String} class name.
	 * @param {Array} arguments.
	 * 	  mark: object in the array should be packaged as
	 * the format:{object:object_to_passe,name:object_name},
	 * where object_to_passe is an object, object_name is
	 * object_to_passe's name, which is a string.
	 * @return the object created.
	 */
	x_forClassName: function(){
        var cname = "";
		var args = "";
		var cmd = "";
		var object = null;
		var len = arguments.length;
		if(len > 0){
			cname = arguments[0]
			if( len > 1){
				if(arguments[1] != "undefined"){
				    args = (arguments[1]).x_toArgs();
				}
			}
			cmd = "new " + cname + "(" + args + ")";
		}
		 
		object = eval(cmd);
		return object;
	}
};
xcore.widget = {
	/**
	 * extends subWidget's object from parent widget. 
	 * with parent's object.
	 * @param {Object} subClass's object
	 * @param {Object} parent class's Object
	 */
	x_extends: function(subWidget, parentWidget){
		//if a event function is defined in subWidget,
		//then turn on event switch.
		var b = null;
		for(p in subWidget){
			if(parentWidget.isExist){
				b = parentWidget.isExist({observe:p.toString()});
				if(b.isin){
					parentWidget[b.event] = true;
				}
			}
		}
		xcore.x_extends(subWidget, parentWidget);
        return subWidget;
	},
	/**
	 * call super widget 's constructor.
	 * @param {Object} subObject
	 * @param {String} parnent class name
	 * @param {Array} args arguments
	 */
	x_super: function(){
		var len = arguments.length;
		var subObject = null;
		var parentName = "";
		var parentObj = null;
		var args = new Array();
		if( len >= 2){
			subObject = arguments[0];
			parentName = arguments[1];
		}
		if(len >= 3){
			args = arguments[2];
			parentObj = xcore.x_forClassName(parentName, args);
		} else {
			parentObj = xcore.x_forClassName(parentName);
		}
		this.x_extends(subObject,parentObj);
		return subObject;
	}
};
/**
 * xcore util
 */
xcore.util = {
	/**
	 * if there is only one element in iterator, then return the element,
	 * else return the iterator.
	 * @param {Object} iterator
	 */
	x_maybeSingle: function(iterator){
		if(!iterator) return;
		var result = iterator;
		try{
			if(iterator.length){
			   if(iterator.length == 1){
			   	  result = iterator[0];
			   }
		    } else {
				result = iterator;
			}
		} catch(e) {
			result = iterator;
		}
		return result;
	},
	/**
	 * wheather an object is iterator.
	 * @param {Object} iterator
	 * @return true: is iterator, false: not is.
	 */
	x_isIterator: function(iterator){
		if(!iterator) {
			return;
		}
	    var len = 0;
		var b = false;
		try{
			len = iterator.length;
			if((len instanceof Number) || (typeof len == "number")){
				b = true;
			}
		}catch(e){
			b = false;
		}
		return b;
	}
};
/**
 * class X_Iterator
 */
var X_Iterator = xcore.x_create();
X_Iterator.prototype = {
	/**
	 * constructor of X_Cache
	 * @param {Array} initial elements to cache.
	 * @param {Object} the parameter's format is,
	 * {label:label}  the label is the iterator's label.
	 */
	x_init: function(){
		var len = arguments.length;
		this.cache = [];
		this.label = "";
		if(len >= 1){
			var a = arguments[0];
			if(this.cache.x_copyfrom){
				this.cache.x_copyfrom(a);
			}
		} 
		if(len >= 2){
			var arg2 = arguments[1];
			this.label = arg2.label || "";
		}
	},
	/**
	 * set lablel for the iterator.
	 * @param {String} label label to set.
	 */
	setLabel: function(label){
		this.label = label;
	},
	/**
	 * return the label of the iterator.
	 */
	getLabel: function(){
		return this.label;
	},
	/**
	 * push a object into cache.
	 * @param {Object} object
	 */
	push: function(object){
		this.cache.push(object);
	},
	/*
	 * pop a object from cache.
	 */
	pop: function(){
		var v = null;
        v = this.cache.pop();
		return v;
	},
	/**
	 * get a item by index.
	 * @param {Integer} index
	 */
	getItem: function(index){
		var v = null;
		if(index < this.cache.length){
			v = this.cache[index];			
		}
		return v;
	},
	/**
	 * get the length of the cache.
	 */
	getLength: function(){
		return this.cache.length;
	},
	/**
	 * remove a given object from cache.
	 * @param {Object} object
	 */
	remove: function(object){
		this.cache.x_reject(object);
	},
	/**
	 * get index of a given object in iterator.
	 * @param {Object} object
	 */
	indexOf: function(object){
		var i = -1;
		var o = null;
	    var len = this.getLength();
		for(var j = 0; j < len; j++){
			o = this.getItem(j);
			if(o == object){
				i = j;
				break;
			}
		}
		return i;
	},
	/**
	 * get elements by its label, the element should be stored as
	 * {object:object, label: label}.
	 * @param {String} label  the element's label.
	 */
	getElementsByLabel: function(label){
		var size = this.getLength();
		var o = null;
		var result = null;
		var array = new Array();
		for(var i = 0; i < size; i++){
			o = this.getItem(i);
			if(o.label){
				if(label == o.label){
					if(o.object && o.object != "undefined"){
					   array.push(o.object);
					}
				}
			}
		}
		$pln("495L [2]:" + xcore.util.x_maybeSingle([2]));
		result = xcore.util.x_maybeSingle(array);		
		//result = array;
		return result;
	},
	/**
	 * clear cache of the iterator.
	 */
	clear: function(){
		this.cache = [];
	},
	/**
	 * get sub elements in the cache
	 * @param {Integer} start  start index 
	 * @param {Integer} end  end index
	 * @return sub elements from start to end.
	 */
	subEFromTo: function(){
		var len = arguments.length;
		var size = this.getLength();
		var start = 0;
		var end = size - 1;
		var array = new Array();
		if(len < 1){
			return array;
		}
		if(len == 1){
			start = arguments[0];
		} else if(len >= 2){
			start = arguments[0];
			end = arguments[1];	
		}
		if(start < 0){
			start = 0;
		}
		if(end > size - 1){
			end = size - 1;
		}
		if(start <= end){
			var o = null;
			for(var j = start; j <= end; j++){
				o = this.getItem(j);
				array.push(o);
			}
		}
	    return array;
	},
	/**
	 * get sub elements in cache.
	 * @param {Integer} start start index
	 * @param {Integer} length length to get.
	 * @return sub elements.
	 */
    subELen: function(){
		var len = arguments.length;
		var array = new Array()
		var start = 0;
		if(len < 1){
			return array;
		}
		if(len == 1){
			start = arguments[0];
			end = this.getLength() - 1;
		} else if(len >= 2){
			start = arguments[0];
			end = start + arguments[1] - 1;
		}
		array = this.subEFromTo(start, end);
		return array;
	}
};

/**
 * X_Cache's container.
 */
var X_Caches = new X_Iterator([],{label: "X_Caches"});

/**
 * Class X_Cache
 * @extends {X_Iterator}
 */
var X_Cache = xcore.x_create();
X_Cache.prototype = {
	/**
	 * @param {String} name cache's name.
	 */
	x_init: function(){
		var args = new Array();
		var arg1 = [];
		var arg2 = {label:name};
		args.push(arg1);
		args.push(arg2);
		xcore.x_super(this, "X_Iterator", args);
		//action list for the cache.
		this.actions = new X_Iterator();
		//add the cache into X_Caches.
		X_Caches.push(this);
	},
	addAction: function(){
		
	},
	exeActionOnCache: function(actionslst){
		
	}
};
/**
 * xcore language definition
 */
xcore.lang ={
         
};
/**
 * xcore adapter: used to make sure 
 * the capability of codes on different browsers. 
 */
xcore.adapter = {
	/**
	 * get browser's name.
	 */
	x_getBrowser: function(){
		 sAppName = navigator.appName;
	     if(sAppName == "Microsoft Internet Explorer"){
	         return "IE";	
	     }else{
	        return sAppName;	
	    }
	},
	
	/**
	 * get capable event's name.
	 * @param {String} eventName
	 */
    x_getCapableEventName: function(eventName){
		var name = eventName;
		if (eventName == 'keypress' &&
             (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
               || element.attachEvent)){
			   	  name = 'keydown';
	    }
		return name;
	}
};
/**
 * xcore event
 * @copyright Event system is 
 */
if(!window.Event){
   Event = new Object();
}
xcore.x_extends(Event, {
	x_observers: false,
	//Event system will be optimized, refered to prototype.js.
	//Private method
    _observeAndCache: function(element, name, observer, useCapture) {
         if (!this.x_observers) this.x_observers = [];
         if (element.addEventListener) {
             this.x_observers.push([element, name, observer, useCapture]);
             element.addEventListener(name, observer, useCapture);
         } else if (element.attachEvent) {
             this.x_observers.push([element, name, observer, useCapture]);
             element.attachEvent('on' + name, observer);
         }
    },
	//Private method.
    x_unloadCache: function() {
		 if (!Event.x_observers) return;
         for (var i = 0; i < Event.x_observers.length; i++) {
            Event.x_stopObserving.apply(this, Event.x_observers[i]);
            Event.x_observers[i][0] = null;
         }
         Event.x_observers = false;
    },
    /**
    * Adds an event handler function to an event.
    * @name Event.x_startObserve()
    * @param {Object} element	Element object or id to associate with 
    * the event handler.
    * @param {String} name	Name of the event.
    * @param {Function} observer	Function to handle the event.
    * @param {Boolean} useCapture	If true, specifies that the handler 
    * should handle the event in the capture phase. If false, handles 
    * the event in the bubbling phase.
    * @copyright the function is derived from prototype.js.
    */
    x_startObserving: function(element, name, observer, useCapture) {
         var element = $id(element);
         useCapture = useCapture || false;
         name = xcore.adapter.x_getCapableEventName(name);  
         this._observeAndCache(element, name, observer, useCapture);
    },
	/**
    * Removes an event handler function from an event.
    * @name Event.x_stopObserving()
    * @param {Object} element	Element object or id to associate with the event handler.
    * @param {String} name	Name of the event.
    * @param {Function} observer	Function to handle the event.
    * @param {Boolean} useCapture	If true, specifies that the handler should handle the event in the capture phase. If false, handles the event in the bubbling phase.
    * @extends {Event}
    * @copyright the function is derived from prototype.js.
    */
    x_stopObserving: function(element, name, observer, useCapture) {
         var element = $id(element);
         useCapture = useCapture || false;
         name = xcore.adapter.x_getCapableEventName(name);
         if (element.removeEventListener) {
             element.removeEventListener(name, observer, useCapture);
         } else if (element.detachEvent) {
             element.detachEvent('on' + name, observer);
         }
    }
});
/* prevent memory leaks in IE */
Event.x_startObserving(window, 'unload', Event.x_unloadCache, false);

/**
 * xcore ajax
 */
xcore.ajax = {};
/**
 * xcore math
 */

/**
 * xcore math
 */
xcore.math = {
	
};
/**
 * xcore text
 */
xcore.text = {
	
};

/**
 * xcore log
 */
//log level definition
var loglevel = {INFOR:4, DEBUG:3, WARNING:2, ERROR:1};
//current log level.
var current_loglevel = loglevel.INFOR;
//import needed css file.
//xcore.x_import("xcore.css");
xcore.log = {
	//user to reoutput information.
	//console:sysconsole,
	/**
	 * print information
	 * @param {String} s information
	 */
	x_infor: function(s){
		if(current_loglevel >= loglevel.INFOR){
			$pln(s, "infor");
			//send log information to server, thus
			//it can be writen into log file.
		}
	},
	/**
	 * print debug information
	 * @param {String} s information
	 */
	x_debug: function(s){
		if(current_loglevel >= loglevel.DEBUG){
			$pln(s, "debug");
			//send log information to server, thus
			//it can be writen into log file.
		}
	},
	/**
	 * print warning informaion
	 * @param {String} s information
	 */
	x_warning: function(s){
		if(current_loglevel >= loglevel.WARNING){
			$pln(s, "warning");
			//send log information to server, thus
			//it can be writen into log file.
		}
	},
	/**
	 * print error information
	 * @param {String} s information
	 */
	x_error: function(s){
		if(current_loglevel >= loglevel.ERROR){
			$pln(s, "error");
			//send log information to server, thus
			//it can be writen into log file.
		}
	}
};

/*-------------------------------- core End ----------------------------------*/


/*------------------- Extends Objects in JavaScript Start --------------------*/

/**
 * extends object Array.
 */
xcore.x_extends(Array.prototype,{
	/**
	 * convert array into string, splite
	 * with ",".
	 * mark: object in the array should be packaged as
	 * the format:{object:object_to_passe,name:object_name},
	 * where object_to_passe is an object, object_name is
	 * object_to_passe's name, which is a string.
	 */
	x_toArgs: function(){
		var a = this;
		var str = "";
		var element = "";
		var i = 0;
		var len = a.length;
		for(i = 0; i < len; i++){
			element = a[i];
			if ((typeof element == 'string')){
				element = "\'" + element + "\'";
			} else if((typeof element == 'object')){
				element = element.name;
			} else {
				element = element.toString();
			}
			str = str + "," + element;
		}
		//remove "," at the header.
		var j = str.indexOf(",");
		if(j == 0){
			str = str.substr(1);
		}
		return str;
    },
	/**
	 * remove element of Array[index] from the array. 
	 * @param {Integer} index element to remove.
	 */
	x_remove: function(index){
		var own = this;
		var A = [];
		var len = own.length - 1;
		for(var i = index; i < len; i++){
		    own[i] = own[i + 1];
		}
		own.length = len;
	},
	/**
	 * remove all elements in array.
	 */
	x_removeAll: function(){
		this.length = 0;
	},
	/**
	 * remove given object from array.
	 * @param {Object} object object to remove.
	 */
	x_reject: function(object){
		var own = this;
		var o = null;
		var len = own.length;
		for(var i = 0; i < len; i++){
			o = own[i];
			if(o == object){
				this.x_remove(i);
				break;
			}
		}
	},
	/**
	 * copy elements in a to array.
	 * @param {Array} a array to copy.
	 */
	x_copyfrom: function(a){
	    this.x_removeAll();
		this.x_join(a);
	},
	/**
	 * join elements in a to array.
	 * @param {Array} a array to join. 
	 */
	x_join: function(a){
		if(!a) return ;
		var own = this;
		var len = 0;
	    var b = xcore.util.x_isIterator(a);
		if((a instanceof String) || (typeof a == "string")){
			b = false;
		}
		if(b){
	        len = a.length;
		    var o = null;
		    for(var i = 0; i < len; i++){
			   o = a[i];
			   own.push(o);
		    }
		} else {
			own.push(a);
		}
	},
	/**
	 * Is String a in this array?
	 * @param {String} a
	 */
	x_isIn: function(a){
		 var own = this;
		 var isin = false;
		 if(a.toString){
		 	a = a.toString();
		 }
		 var mm = a.trim();
	     if(own && own.length > 0){
		     for(var i = 0; i < own.length; i++){
		        var m = own[i];
			    if(mm == m){
				   isin = true;
				   break;
				}
			 }
		 }
		 return isin;
	},
    /**
     * This prototype extends the Array object to allow for searches
     * within the Array. It will return false if nothing is found. If
     * item(s) are found you'll get an array of indexes back which matched
     * your search request. It accepts strings, numbers, and regular expressions as search
     * criteria. 35 is different than '35' and vice-versa.
     * @param {String} searchStr
     */
	x_find: function(searchStr){
        var returnArray = false;
        for (i = 0; i < this.length; i++) {
            if (typeof(searchStr) == 'function') {
                if (searchStr.test(this[i])) {
                    if (!returnArray) {
                        returnArray = []
                    }
                    returnArray.push(i);
                }
            }
            else {
                if (this[i] == searchStr) {
                    if (!returnArray) {
                        returnArray = []
                    }
                    returnArray.push(i);
                }
            }
        }
        return returnArray;
	}
});

/**
 * extends object Function.
 */
xcore.x_extends(Function.prototype,{
	  /**
      * Binds an instance of a function to the object that owns the function 
      * as an event listener.
      * @param {Object} object	Function to bind to its owner object.
      * @return {Object} Returns the function pre-bound to its owner object 
      * with the current event object as its argument.
      */
	   x_bindAsLisener: function(object){
	   	   var the_method = this;
           return function(event) {
              return the_method.call(object, event || window.event);
           }
	   }
	}
);
/**
 * extends object String.
 */
xcore.x_extends(String.prototype, {
	/**
	 * remove space at begin and tail.
	 */
    x_trim: function(){
        return this.replace(/(^[\\s]*)|([\\s]*$)/g, "");
    },
	/**
	 * Is the data number?
	 * @param {String} data
	 */
    x_isNumber: function(data){
        var tmp;
        if (data == "") 
            return true;
        var re = /^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;
        return re.test(data);
    }
});
/**
 * extends Object.
 */
xcore.x_extends(Object.prototype,{
	/**
	 * check whether a given property is in the object.
	 * @param {String} property property's name.
	 * @return true: has the property, false: not has the property.
	 */
    x_hasProperty: function(property){
		var bIsIn = false ;
		var own = this
        for(propertytemp in own){
   	       if(property == propertytemp){
   	          bIsIn = true;
   	          break;
   	       }
   	   }
      return bIsIn;
   }
});
/*------------------- Extends Objects in JavaScript End ----------------------*/


/**
* <p>xcoreJavaInterface</p>
*@Author: Chunhui Li 2006.08
*@Version: 0.0.1 alpha
*/
xcore.Interface = {
     /**
     *<p>create</p>
     *<p>Create an interface</p>
     */
     create: function(){
       return function() { 
           this.initialize.apply(this, arguments);
        }
     }
};
/**
* xcore.fileIsExist(sFileName) is used to check wheather the file named
* sFileName is exist.
* It return true while the file exist. else false. 
*/
xcore.fileIsExist = function(sFileName){
	
}
/**
* getBrowser()* 
*/
xcore.getBrowser = function(){
	sAppName = navigator.appName;
	if(sAppName == "Microsoft Internet Explorer"){
	  return "IE";	
	}else{
	  return sAppName;	
	}
}

/**
/**
* importJavaScript(sFileName) 
* import js file dynamically. 
* Notice: If there is executable javascript in sFileName, 
* while importing the file, it will be executed. 
*/
/**
 Usage:
 testImport.js
  function testImport()
  {
    alert("Import script successfully!");
  }
  alert("Executed while importe it!"); 
 //test importJavaScript.html
 <html>
 <head>
  <title>TestDojo</title>
  <script language = "" type="text/javascript" src="xcore.js"></script>
  <script type="text/javascript">
    //importFile at here.    
    xcore.importJavaScript("testImport.js");
  </script>
  <script type="text/javascript">     
    testImport();
  </script>
 </head>
 <body>
   <script type="text/javascript">     
   //call imported js file
     testImport();
  </script>
 </body>
 </html>
*/
/**
 * <p>reigis external javascript file</p>
 */
xcore.loadedJS = new Array();
xcore.registJS = function(jsId){
	xcore.loadedJS.push(jsId);
}
xcore.unregistJS = function(jsId){
	xcore.loadedJS = xcore.loadedJS.x_reject(function(d) { return d==jsId });
}
xcore.isJSLoaded = function(jsId){
	var isloaded = false;
	var len = xcore.loadedJS.length;
	var i = 0;
	for(i = 0; i < len; i++){
		if(xcore.loadedJS[i] == jsId){
			isloaded = true;
			break;
		}
	}
	return isloaded;
}
xcore.importJavaScript = function(sFileName){	  
	if(sFileName == ""){
	    return ("ERROR_FILENAME");
	}	
    var importedScript = document.createElement("script");	
    importedScript.type = "text/javascript";
    importedScript.src = sFileName;
    //document.body.appendChild(importedScript);	
    var head_tag = document.getElementsByTagName("head")[0];	
    if(head_tag){	   
       head_tag.appendChild(importedScript);	   
    }
    return 	("OK");
}
/**
* importCSS(sFileName) 
* import CSS file dynamically. 
*/
xcore.importCSS = function(sFileName){
	 if(sFileName == ""){
	    return ("ERROR_FILENAME");
	  }
    var importedCSS = document.createElement("link");
    importedCSS.type = "text/css";
    importedCSS.rel = "stylesheet";
    importedCSS.href = sFileName;    
    document.body.appendChild(importedCSS);
    return 	("OK");
}
/**
 * input elements related functions.
 */
xcore.Input = {
	
	/**
	 * get checked radio button's value.
	 * @param {Object} String radioName
	 */
	getCheckedRadioButtonValue: function(/*String*/radioName){
		var value ;
		var arr = $name(radioName);
		if(arr && arr.length > 0){
			for(var i = 0; i < arr.length; i++){
				var r = arr[i];
				if(r.checked == true){
					value = r.value;
					break;
				}
			}
		}
		return value;
	},
	/**
	 * set given name's all radio button's value to
	 * given value.
	 * @param {Object} String radioName
	 * @param {Object} Boolean value
	 */
	setAllRadioButtonCheckStatus: function(/*String*/radioName, /*Boolean*/ value){
		var arr = $name(radioName);
		if(arr && arr.length > 0){
			for(var i = 0; i < arr.length; i++){
				var r = arr[i];
				r.checked = value;
			}
		}
	},
	/**
	 * set given name's all radio button's value to
	 * given value.
	 * @param {Object} String radioName
	 * @param {Object} Boolean value
	 */
	checkARadioButton: function(/*String*/radioName, /*Object*/ value){
		var arr = $name(radioName);
		if(arr && arr.length > 0){
			for(var i = 0; i < arr.length; i++){
				var r = arr[i];
				if(r.value == value){
					r.checked = true;;
				}				
			}
		}
	},
	/**
	 * get given name's value.
	 * @param {Object} String varName
	 */
	getVarValue: function(/*String*/ varName){
		var ret ;
		var values = $name(varName);
		if(values){
			if(values.length > 1){
				ret = new Array();
				for(var i = 0; i < values.length; i++){
					ret.push(values[i].value);
				}
			} else if(values.length == 1){
				ret = values[0].value;
			}
		}
		return ret;
	},
	/**
	 * 
	 * @param {String}  varName
	 * @param {boolean} switchValue
	 */
	enableAll: function(/*String */ varName , /*boolean*/switchValue){
		var arr = $name(varName);
		if(arr && arr.length > 0){
			for(var i = 0; i < arr.length; i++){
				var r = arr[i];
				r.disabled = switchValue;
			}
		}
	},
	/**
	 * get given name's value.
	 * @param {Object} String varName
	 */
	getCheckedValue: function(/*String*/ varName){
		var ret ;
		var values = $name(varName);
		if(values){			
				ret = new Array();
				for(var i = 0; i < values.length; i++){
					if(values[i].checked == true){
						ret.push(values[i].value);
					}
				}
		}
		return ret;
	}
}
