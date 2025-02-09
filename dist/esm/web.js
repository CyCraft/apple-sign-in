var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { WebPlugin } from "@capacitor/core";
export class SignInWithAppleWeb extends WebPlugin {
  constructor() {
    super({
      name: "SignInWithApple",
      platforms: ["web"],
    });
    this.appleScriptUrl =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    this.isAppleScriptLoaded = false;
  }
  authorize(options) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) =>
        __awaiter(this, void 0, void 0, function* () {
          var _a, _b, _c;
          if (options) {
            this.isAppleScriptLoaded = yield this.loadSignInWithAppleJS();
            if (this.isAppleScriptLoaded) {
              AppleID.auth.init({
                clientId: options.clientId,
                redirectURI: options.redirectURI,
                scope:
                  ((_a = options.scopes),
                  _a !== null && _a !== void 0 ? _a : undefined),
                state:
                  ((_b = options.state),
                  _b !== null && _b !== void 0 ? _b : undefined),
                nonce:
                  ((_c = options.nonce),
                  _c !== null && _c !== void 0 ? _c : undefined),
                usePopup: true,
              });
              AppleID.auth
                .signIn()
                .then((res) => {
                  var _a, _b, _c;
                  let response = {
                    response: {
                      user: null,
                      email:
                        (_a = res.user) === null || _a === void 0
                          ? void 0
                          : _a.email,
                      givenName:
                        (_b = res.user) === null || _b === void 0
                          ? void 0
                          : _b.name.firstName,
                      familyName:
                        (_c = res.user) === null || _c === void 0
                          ? void 0
                          : _c.name.lastName,
                      identityToken: res.authorization.id_token,
                      authorizationCode: res.authorization.code,
                    },
                  };
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject("Unable to load Sign in with Apple JS framework.");
            }
          } else {
            reject("No options were provided.");
          }
        })
      );
    });
  }
  loadSignInWithAppleJS() {
    return new Promise((resolve) => {
      if (!this.isAppleScriptLoaded) {
        if (typeof window !== undefined) {
          const script = require("scriptjs");
          script(this.appleScriptUrl, () => resolve(true));
        } else {
          resolve(false);
        }
      } else {
        resolve(true);
      }
    });
  }
}
const SignInWithApple = new SignInWithAppleWeb();
export { SignInWithApple };
import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(SignInWithApple);
//# sourceMappingURL=web.js.map
