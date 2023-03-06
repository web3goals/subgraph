import {
  ClosedAsAchieved,
  ClosedAsFailed,
  ParamsSet,
  Transfer,
  WatcherSet,
} from "../../generated/Goal/Goal";
import { Goal } from "../../generated/schema";
import {
  getGoalWithAddedAcceptedGoalWatcherAccountAddress,
  getGoalWithAddedGoalWatcherAccountAddress,
  loadOrCreateAccount,
  loadOrCreateGoal,
  loadOrCreateGoalWatcher,
} from "../utils";

/**
 * Handle a tranfer event to create a goal with default values.
 */
export function handleTransfer(event: Transfer): void {
  let goal = loadOrCreateGoal(event.params.tokenId.toString());
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
  goal.description = event.params.params.description;
  goal.authorAddress = event.params.params.authorAddress.toHexString();
  goal.authorStake = event.params.params.authorStake;
  goal.deadlineTimestamp = event.params.params.deadlineTimestamp;
  goal.isClosed = event.params.params.isClosed;
  goal.isAchieved = event.params.params.isAchieved;
  goal.verificationRequirement = event.params.params.verificationRequirement;
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
  // Get watcher
  let watcher = loadOrCreateGoalWatcher(
    goal.id,
    event.params.watcherAccountAddress.toHexString()
  );
  // Define goal watcher is accepted
  let isWatcherAccepted =
    !watcher.isAccepted && event.params.watcher.isAccepted;
  // Update goal watcher
  watcher.addedTimestamp = event.params.watcher.addedTimestamp;
  watcher.accountAddress = event.params.watcher.accountAddress.toHexString();
  watcher.isAccepted = event.params.watcher.isAccepted;
  watcher.save();
  // Add watcher to goal list with watcher addresses
  goal = getGoalWithAddedGoalWatcherAccountAddress(
    goal,
    watcher.accountAddress
  );
  // Add watcher to goal list with accepted watcher addresses
  if (isWatcherAccepted) {
    goal = getGoalWithAddedAcceptedGoalWatcherAccountAddress(
      goal,
      watcher.accountAddress
    );
  }
  goal.save();
}

/**
 * Handle a closed as achieved event to update accounts.
 */
export function handleClosedAsAchieved(event: ClosedAsAchieved): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update account of goal author
  let account = loadOrCreateAccount(goal.authorAddress);
  account.achievedGoals = account.achievedGoals + 1;
  account.save();
  // Update accounts of goal accepted watchers
  for (let i = 0; i < goal.acceptedWatcherAddresses.length; i++) {
    let watcherAddress = goal.acceptedWatcherAddresses[i];
    let watcherAccount = loadOrCreateAccount(watcherAddress);
    watcherAccount.motivatedGoals = watcherAccount.motivatedGoals + 1;
    watcherAccount.save();
  }
}

/**
 * Handle a closed as failed event to update accounts.
 */
export function handleClosedAsFailed(event: ClosedAsFailed): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update account of goal author
  let account = loadOrCreateAccount(goal.authorAddress);
  account.failedGoals = account.failedGoals + 1;
  account.save();
}
