import { VAULT } from "./constants";
import AccountManager, { AccountType } from "./AccountManager";
import { Account, AccountKey } from "./storage/entities/Accounts";
import Auth from "./storage/Auth";
import Storage from "./storage/Storage";

export default class Extension {

  static async signUp({ seed, name = "New Account", password }: any) {
    try {
      if (!seed || !password) throw new Error("Missing data");
      await Auth.getInstance().signUp({ password });
      await Storage.getInstance().init();
      await Storage.getInstance().cachePassword();
      console.log(await Storage.getInstance().getAll());
      // Adds the account to storage
      await this.addAccounts({ name, seed });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async addAccounts({ seed, name }: any) {
    await AccountManager.addWASMAccount(seed, name);
    console.log(await Storage.getInstance().getAll());
    await AccountManager.addEVMAccount(seed, name);
    console.log(await Storage.getInstance().getAll());
  }

  static removeAccount(key: AccountKey) {
    AccountManager.forget(key);
  }

  static changeAccountName({ key, newName }: any) {
    AccountManager.changeName(key, newName);
  }

  static async signIn(password: string) {
    try {
      // Get encrypted vault from storage
      const { vault } = await Storage.getInstance().getStorage().get(VAULT);
      // Decrypt vault with password
      await Auth.getInstance().signIn(password, vault);
      // Cache password
      await Storage.getInstance().cachePassword();
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  static isVaultInitialized() {
    return Storage.getInstance().isVaultInitialized();
  }

  static isUnlocked() {
    return Auth.isUnlocked;
  }

  static showPrivateKey() {
    return AccountManager.showPrivateKey();
  }

  static async getAccount(key: AccountKey): Promise<Account | undefined> {
    return AccountManager.getAccount(key);
  }

  static async getAllAccounts() {
    const accounts = await AccountManager.getAll();
    if (!accounts) return [];
    return accounts.getAll();
  }

  static async derivateAccount(name: string, type: AccountType): Promise<Account> {
    const vault = await Storage.getInstance().getVault();
    if (!vault) throw new Error("Vault not found");
    return AccountManager.derive(name, vault, type);
  }
}
