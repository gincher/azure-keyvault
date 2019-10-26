"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@actions/core");
var keyVault_1 = require("./keyVault");
var exec_1 = require("./exec");
var keyVaultName = core_1.getInput('keyVaultName', {
    required: true
});
var secretsFilterString = core_1.getInput('secretsFilter', {
    required: false
});
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var secretNames, secrets, e_1;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                secretNames = void 0;
                if (!(!secretsFilterString || secretsFilterString.trim() === '*')) return [3, 2];
                return [4, keyVault_1.listKeys(keyVaultName)];
            case 1:
                secretNames = _a.sent();
                return [3, 3];
            case 2:
                secretNames = secretsFilterString.split(',').map(function (name) { return name.trim(); });
                _a.label = 3;
            case 3: return [4, Promise.all(secretNames.map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                    var secret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, keyVault_1.getKeyValue(name, keyVaultName)];
                            case 1:
                                secret = _a.sent();
                                return [2, { key: name, secret: secret }];
                        }
                    });
                }); }))];
            case 4:
                secrets = _a.sent();
                secrets.forEach(function (_a) {
                    var key = _a.key, secret = _a.secret;
                    return exec_1.setEnvVariable(key, secret);
                });
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                core_1.setFailed(e_1.toString());
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
main();
