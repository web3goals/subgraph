import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, Goal, GoalWatcher } from "../generated/schema";

export function loadOrCreateGoal(tokenId: string): Goal {
  let goalId = tokenId;
  let goal = Goal.load(goalId);
  if (!goal) {
    goal = new Goal(goalId);
    goal.uri = "";
    // Defaults for params
    goal.createdTimestamp = BigInt.zero();
    goal.authorAddress = Address.zero().toHexString();
    goal.authorStake = BigInt.zero();
    goal.deadlineTimestamp = BigInt.zero();
    goal.isClosed = false;
    goal.isAchieved = false;
    // Defaults for watchers
    goal.watcherAddresses = new Array<string>();
    goal.watchersNumber = 0;
    goal.acceptedWatcherAddresses = new Array<string>();
  }
  return goal;
}

export function loadOrCreateGoalWatcher(
  goalId: string,
  goalWatcherAccountAddress: string
): GoalWatcher {
  let watcherId = goalId + "_" + goalWatcherAccountAddress;
  let watcher = GoalWatcher.load(watcherId);
  if (!watcher) {
    watcher = new GoalWatcher(watcherId);
    watcher.goal = goalId;
    watcher.addedTimestamp = BigInt.zero();
    watcher.accountAddress = Address.zero().toHexString();
    watcher.isAccepted = false;
  }
  return watcher;
}

export function loadOrCreateAccount(accountAddress: string): Account {
  let accountId = accountAddress;
  let account = Account.load(accountId);
  if (!account) {
    account = new Account(accountId);
    account.achievedGoals = 0;
    account.failedGoals = 0;
    account.motivatedGoals = 0;
  }
  return account;
}

export function getGoalWithAddedGoalWatcherAccountAddress(
  goal: Goal,
  goalWatcherAccountAddress: string
): Goal {
  // Check existing watcher addresses
  for (let i = 0; i < goal.watcherAddresses.length; i++) {
    let watcherAddress = goal.watcherAddresses[i];
    if (watcherAddress == goalWatcherAccountAddress) {
      return goal;
    }
  }
  // Add watcher address
  let newWatcherAddresses = goal.watcherAddresses;
  newWatcherAddresses.push(goalWatcherAccountAddress);
  goal.watcherAddresses = newWatcherAddresses;
  goal.watchersNumber = goal.watchersNumber + 1;
  return goal;
}

export function getGoalWithAddedAcceptedGoalWatcherAccountAddress(
  goal: Goal,
  goalWatcherAccountAddress: string
): Goal {
  // Check existing watcher addresses
  for (let i = 0; i < goal.acceptedWatcherAddresses.length; i++) {
    let watcherAddress = goal.acceptedWatcherAddresses[i];
    if (watcherAddress == goalWatcherAccountAddress) {
      return goal;
    }
  }
  // Add watcher address
  let newAcceptedWatcherAddresses = goal.acceptedWatcherAddresses;
  newAcceptedWatcherAddresses.push(goalWatcherAccountAddress);
  goal.acceptedWatcherAddresses = newAcceptedWatcherAddresses;
  return goal;
}
