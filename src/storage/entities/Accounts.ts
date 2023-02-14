import { AccountKey, AccountValue } from "@src/accounts/types";
import BaseEntity from "./BaseEntity";
import Account from "./Account";

export default class Accounts extends BaseEntity {
  data: { [key: AccountKey]: Account };

  constructor() {
    super();
    this.data = {};
  }

  static async init() {
    await Accounts.set<Accounts>(new Accounts());
  }

  static async update(account: Account): Promise<Account> {
    const accounts = await Accounts.get<Accounts>();
    if (!accounts) throw new Error("Accounts are not initialized");
    accounts.update(account.key, account.value);
    await Accounts.set<Accounts>(accounts);
    return account;
  }

  static async removeAccount(key: AccountKey) {
    const accounts = await Accounts.get<Accounts>();
    if (!accounts) throw new Error("Accounts are not initialized");
    accounts.remove(key);
    await Accounts.set<Accounts>(accounts);
  }

  static async add(account: Account): Promise<void> {
    const accounts = await Accounts.get<Accounts>();
    if (!accounts) throw new Error("Accounts are not initialized");
    if (accounts.allreadyExists(account.key)) {
      throw new Error("Account already exists");
    }
    accounts.add(account);
    await Accounts.set<Accounts>(accounts);
  }

  static async getAccount(key: AccountKey): Promise<Account | undefined> {
    const accounts = await Accounts.get<Accounts>();
    if (!accounts) throw new Error("Accounts are not initialized");
    return accounts.get(key);
  }

  isEmpty() {
    return Object.keys(this.data).length === 0;
  }

  add(account: Account) {
    this.data[account.key] = account;
  }

  remove(key: AccountKey) {
    delete this.data[key];
  }

  get(key: AccountKey) {
    if (!this.data[key]) return undefined;
    return new Account(key, this.data[key].value);
  }

  getAll() {
    return Object.keys(this.data).map((key) => this.data[key as AccountKey]);
  }

  update(key: AccountKey, value: AccountValue) {
    this.data[key].value = value;
  }

  allreadyExists(key: AccountKey) {
    return this.data[key] !== undefined;
  }

  first() {
    const keys = Object.keys(this.data);
    if (keys.length === 0) return undefined;
    return this.get(keys[0] as AccountKey);
  }
}
