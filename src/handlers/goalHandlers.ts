import {
  ClosedAsAchieved,
  ClosedAsFailed,
  ParamsSet,
  Transfer,
  URISet,
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
  goal.createdTimestamp = event.params.param1.createdTimestamp;
  goal.authorAddress = event.params.param1.authorAddress.toHexString();
  goal.authorStake = event.params.param1.authorStake;
  goal.deadlineTimestamp = event.params.param1.deadlineTimestamp;
  goal.isClosed = event.params.param1.isClosed;
  goal.isAchieved = event.params.param1.isAchieved;
  goal.verificationRequirement = event.params.param1.verificationRequirement;
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
