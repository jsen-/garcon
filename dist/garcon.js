"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _http = require("http");

var http = _interopRequireWildcard(_http);

var _stimpack = require("stimpack");

var _pathToRegexp = require("path-to-regexp");

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _Context = require("./Context");

var _Context2 = _interopRequireDefault(_Context);

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Server = (function () {
    var _class = function Server(injector) {
        var _this = this;

        _classCallCheck(this, _class);

        this.injector = injector;
        this.routes = new Map();
        this.server = new http.Server();
        this.server.on("request", function (req, res) {
            _this.handleRequest(req, res);
        });
    };

    _createClass(_class, [{
        key: "listen",
        value: function listen(port, hostname, backlog) {
            this.server.listen(port, hostname, backlog);
        }
    }, {
        key: "get",
        value: function get(route, handler) {
            var keys = [];
            var re = (0, _pathToRegexp2["default"])(route, keys, { sensitive: true });
            var hndl = this.injector.get(handler);
            this.routes.set(re, [hndl, keys]);
        }
    }, {
        key: "handleRequest",
        value: function handleRequest() {
            return __awaiter(regeneratorRuntime.mark(function callee$2$0(req, res) {
                var ctx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, route, _step$value$1, handler, keys;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            ctx = new _Context2["default"](req, res);
                            context$3$0.prev = 1;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            context$3$0.prev = 5;
                            _iterator = this.routes[Symbol.iterator]();

                        case 7:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                context$3$0.next = 19;
                                break;
                            }

                            _step$value = _slicedToArray(_step.value, 2);
                            route = _step$value[0];
                            _step$value$1 = _slicedToArray(_step$value[1], 2);
                            handler = _step$value$1[0];
                            keys = _step$value$1[1];

                            if (!route.test(req.url)) {
                                context$3$0.next = 16;
                                break;
                            }

                            context$3$0.next = 16;
                            return handler.handleRequest(ctx);

                        case 16:
                            _iteratorNormalCompletion = true;
                            context$3$0.next = 7;
                            break;

                        case 19:
                            context$3$0.next = 25;
                            break;

                        case 21:
                            context$3$0.prev = 21;
                            context$3$0.t0 = context$3$0["catch"](5);
                            _didIteratorError = true;
                            _iteratorError = context$3$0.t0;

                        case 25:
                            context$3$0.prev = 25;
                            context$3$0.prev = 26;

                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }

                        case 28:
                            context$3$0.prev = 28;

                            if (!_didIteratorError) {
                                context$3$0.next = 31;
                                break;
                            }

                            throw _iteratorError;

                        case 31:
                            return context$3$0.finish(28);

                        case 32:
                            return context$3$0.finish(25);

                        case 33:
                            context$3$0.next = 39;
                            break;

                        case 35:
                            context$3$0.prev = 35;
                            context$3$0.t1 = context$3$0["catch"](1);

                            res.statusCode = 500;
                            res.end(context$3$0.t1.stack);

                        case 39:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[1, 35], [5, 21, 25, 33], [26,, 28, 32]]);
            }).apply(this, arguments));
        }
    }]);

    return _class;
})();
Server.Context = _Context2["default"];
Server = __decorate([_stimpack.Inject, __metadata("design:paramtypes", [_stimpack.Injector])], Server);
exports["default"] = Server;

//# sourceMappingURL=garcon.js.map
module.exports = exports["default"];
//# sourceMappingURL=garcon.js.map
