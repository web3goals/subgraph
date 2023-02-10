import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ParamsSet,
  Transfer,
  URISet,
  WatcherSet,
} from "../../generated/Goal/Goal";
import { Goal, GoalWatcher } from "../../generated/schema";

/**
 * Handle a tranfer event to create a goal with default values.
 */
export function handleTransfer(event: Transfer): void {
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    goal = new Goal(event.params.tokenId.toString());
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
    goal.save();
  }
}

/**
 * Handle a uri set event to update a goal.
 */
export function handleURISet(event: URISet): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update goal
  goal.uri = event.params.tokenURI;
  goal.save();
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
  let watcherId =
    goal.id + "_" + event.params.watcherAccountAddress.toHexString();
  // Load or create goal watcher
  let watcher = GoalWatcher.load(watcherId);
  let isWatcherCreated = false;
  if (!watcher) {
    watcher = new GoalWatcher(watcherId);
    watcher.goal = goal.id;
    watcher.addedTimestamp = BigInt.zero();
    watcher.accountAddress = Address.zero().toHexString();
    watcher.isAccepted = false;
    isWatcherCreated = true;
  }
  // Define goal watcher is accepted
  let isWatcherAccepted =
    !watcher.isAccepted && event.params.watcher.isAccepted;
  // Update goal watcher
  watcher.addedTimestamp = event.params.watcher.addedTimestamp;
  watcher.accountAddress = event.params.watcher.accountAddress.toHexString();
  watcher.isAccepted = event.params.watcher.isAccepted;
  watcher.save();
  // Add watcher to goal list of watcher addresses
  if (isWatcherCreated) {
    let newWatcherAddresses = goal.watcherAddresses;
    newWatcherAddresses.push(watcher.accountAddress);
    goal.watcherAddresses = newWatcherAddresses;
    goal.watchersNumber = goal.watchersNumber + 1;
  }
  // Add watcher to goal list of accepted watchers
  if (isWatcherAccepted) {
    let newAcceptedWatcherAddresses = goal.acceptedWatcherAddresses;
    newAcceptedWatcherAddresses.push(watcher.accountAddress);
    goal.acceptedWatcherAddresses = newAcceptedWatcherAddresses;
  }
  goal.save();
}
