/**
 * http helper
 * you can use http request like jquery ajax
 * 
 */
var http = require('request');
var Q = require('q');
var extend = require('extend');
var utils = require('./lib/utils');

var ajax = {

	defualts : {
		method: 'GET',
		json: true,
		headers : {
			"Content-Type" : 'application/json'
		}
	},

	setup: function(options){
		this.defualts = extend(this.defualts, options);
	},

	buildRequestData : function(data){
		if(!data){
			return extend(this.formData, data);
		}else{
			return this.formData;
		}
	},

	_bulidUrlParam: function(data){
		var params = {};
		var paramStr = null;

		params = this.defualts.body ? extend(params, this.defualts.body) : params;
		params = extend(params, data);
		paramStr = utils.param(data);

		return paramStr;
	},

	get : function(url, data){
		var options = {
			uri: url,
			method: 'GET'
		}

		var urlParam = this._bulidUrlParam(data);
		if(urlParam){
			options.uri = url + '?' + urlParam;
		}

		return this.request(options);
	},

	post : function(url, data){
		var options = {
			uri: url,
			method: 'POST',
			body: data
		}

		return this.request(options);
	},

	put : function(url){
		var options = {
			uri: url,
			method: 'PUT',
			body: data
		}

		return this.request(options);
	},

	del : function(url){
		var options = {
			uri: url,
			method: 'DELETE'
		}

		var urlParam = this._bulidUrlParam(data);
		if(urlParam){
			options.uri = url + '?' + urlParam;
		}

		return this.request(options);
	},

	// send request
	request : function(options){
		var deferred = Q.defer();
		var $this = this;

		console.log('--------------------------------------');
		console.log(options.method + ':' + options.uri);
		console.log(options);
		console.log('---------------------------------------');

		var reqOptions = extend(options, $this.defualts);

		this.requester(
			reqOptions,
			function(error, response, body){
				// console.log(body);
				if(!error && Number(response.statusCode) < 400){
					deferred.resolve(body, response);
				}else{
					deferred.reject(error, response);
				}
			}
		)

		return deferred.promise; 
	}
}

module.exports = ajax;