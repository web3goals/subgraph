import { Account } from "../generated/schema";

export function loadOrCreateAccount(id: string): Account {
  let account = Account.load(id);
  if (!account) {
    account = new Account(id);
    account.achievedGoals = 0;
    account.failedGoals = 0;
    account.motivatedGoals = 0;
  }
  return account;
}
