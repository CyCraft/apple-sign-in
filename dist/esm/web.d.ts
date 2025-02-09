import { WebPlugin } from "@capacitor/core";
import {
  SignInWithApplePlugin,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from "./definitions";
export declare class SignInWithAppleWeb extends WebPlugin
  implements SignInWithApplePlugin {
  private appleScriptUrl;
  private isAppleScriptLoaded;
  constructor();
  authorize(options?: SignInWithAppleOptions): Promise<SignInWithAppleResponse>;
  private loadSignInWithAppleJS;
}
declare const SignInWithApple: SignInWithAppleWeb;
export { SignInWithApple };
