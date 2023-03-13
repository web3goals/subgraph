import {
  AccountReputationSet,
  MotivatorSet,
  ParamsSet,
  Transfer,
} from "../../generated/Goal/Goal";
import { Goal } from "../../generated/schema";
import {
  getGoalWithAddedAcceptedGoalMotivatorAccountAddress,
  getGoalWithAddedGoalMotivatorAccountAddress,
  loadOrCreateAccount,
  loadOrCreateGoal,
  loadOrCreateGoalMotivator,
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
 * Handle a motivator set event to add or update a goal motivators.
 */
export function handleMotivatorSet(event: MotivatorSet): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Get motivator
  let motivator = loadOrCreateGoalMotivator(
    goal.id,
    event.params.motivatorAccountAddress.toHexString()
  );
  // Define goal motivator is accepted
  let isMotivatorAccepted =
    !motivator.isAccepted && event.params.motivator.isAccepted;
  // Update goal motivator
  motivator.addedTimestamp = event.params.motivator.addedTimestamp;
  motivator.accountAddress = event.params.motivator.accountAddress.toHexString();
  motivator.isAccepted = event.params.motivator.isAccepted;
  motivator.save();
  // Add motivator to goal list with motivator addresses
  goal = getGoalWithAddedGoalMotivatorAccountAddress(
    goal,
    motivator.accountAddress
  );
  // Add motivator to goal list with accepted motivator addresses
  if (isMotivatorAccepted) {
    goal = getGoalWithAddedAcceptedGoalMotivatorAccountAddress(
      goal,
      motivator.accountAddress
    );
  }
  goal.save();
}

/**
 * Handle a account reputation set event to update account reputation.
 */
export function handleAccountReputationSet(event: AccountReputationSet): void {
  let account = loadOrCreateAccount(event.params.accountAddress.toHexString());
  account.achievedGoals = event.params.accountReputation.achievedGoals;
  account.failedGoals = event.params.accountReputation.failedGoals;
  account.motivatedGoals = event.params.accountReputation.motivatedGoals;
  account.notMotivatedGoals = event.params.accountReputation.notMotivatedGoals;
  account.save();
}
