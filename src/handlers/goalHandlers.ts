import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ParamsSet, Transfer, WatcherSet } from "../../generated/Goal/Goal";
import { Goal, GoalWatcher } from "../../generated/schema";

/**
 * Handle a tranfer event to create a goal with default values.
 */
export function handleTransfer(event: Transfer): void {
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    goal = new Goal(event.params.tokenId.toString());
    // Defaults for par ams
    goal.createdTimestamp = BigInt.zero();
    goal.authorAddress = Address.zero().toHexString();
    goal.authorStake = BigInt.zero();
    goal.deadlineTimestamp = BigInt.zero();
    goal.isClosed = false;
    goal.isAchieved = false;
    // Defaults for watchers
    goal.watcherAddresses = new Array<string>();
    goal.watchersNumber = 0;
    goal.save();
  }
}

/**
 * Handle a params set event to update a goal.
 */
export function handleParamsSet(event: ParamsSet): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update goal
  goal.createdTimestamp = event.params.params.createdTimestamp;
  goal.authorAddress = event.params.params.authorAddress.toHexString();
  goal.authorStake = event.params.params.authorStake;
  goal.deadlineTimestamp = event.params.params.deadlineTimestamp;
  goal.isClosed = event.params.params.isClosed;
  goal.isAchieved = event.params.params.isAchieved;
  goal.save();
}

/**
 * Handle a watcher set event to add or update a goal watchers.
 */
export function handleWatcherSet(event: WatcherSet): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Define goal watcher id
  let goalWatcherId =
    goal.id + "_" + event.params.watcherAccountAddress.toHexString();
  // Load or create goal watcher
  let isGoalWatcherCreated = false;
  let goalWatcher = GoalWatcher.load(goalWatcherId);
  if (!goalWatcher) {
    goalWatcher = new GoalWatcher(goalWatcherId);
    goalWatcher.goal = goal.id;
    isGoalWatcherCreated = true;
  }
  // Update goal watcher
  goalWatcher.addedTimestamp = event.params.watcher.addedTimestamp;
  goalWatcher.accountAddress = event.params.watcher.accountAddress.toHexString();
  goalWatcher.save();
  // Update goal
  if (isGoalWatcherCreated) {
    let newGoalWatcherAddresses = goal.watcherAddresses;
    newGoalWatcherAddresses.push(goalWatcher.accountAddress);
    goal.watcherAddresses = newGoalWatcherAddresses;
    goal.watchersNumber = goal.watchersNumber + 1;
    goal.save();
  }
}
