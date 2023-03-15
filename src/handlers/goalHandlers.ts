import {
  AccountReputationSet,
  ClosedAsAchieved,
  ClosedAsFailed,
  MessagePosted,
  MotivatorAccepted,
  MotivatorAdded,
  Set,
  Transfer,
  VerificationDataSet,
} from "../../generated/Goal/Goal";
import { Goal } from "../../generated/schema";
import {
  GOAL_STEP_TYPE_GOAL_CLOSED_AS_ACHIEVED,
  GOAL_STEP_TYPE_GOAL_CLOSED_AS_FAILED,
  GOAL_STEP_TYPE_GOAL_SET,
  GOAL_STEP_TYPE_MESSAGE_POSTED,
  GOAL_STEP_TYPE_MOTIVATOR_ACCEPTED,
  GOAL_STEP_TYPE_MOTIVATOR_ADDED,
  GOAL_STEP_TYPE_VERIFICATION_DATA_SET,
} from "../constants";
import {
  createStep,
  getGoalWithAddedAcceptedMotivator,
  getGoalWithAddedMotivator,
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
 * Handle a set event to update a goal.
 */
export function handleSet(event: Set): void {
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
  // Save step
  createStep(event, goal, GOAL_STEP_TYPE_GOAL_SET, "", "").save();
}

/**
 * Handle a motivator added event to add motivator.
 */
export function handleMotivatorAdded(event: MotivatorAdded): void {
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
  // Update goal motivator
  motivator.addedTimestamp = event.params.motivator.addedTimestamp;
  motivator.accountAddress = event.params.motivator.accountAddress.toHexString();
  motivator.isAccepted = event.params.motivator.isAccepted;
  motivator.save();
  // Add motivator to goal list with motivator addresses
  goal = getGoalWithAddedMotivator(goal, motivator.accountAddress);
  goal.save();
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_MOTIVATOR_ADDED,
    "",
    event.params.motivator.extraDataURI
  ).save();
}

/**
 * Handle a motivator added event to update motivator.
 */
export function handleMotivatorAccepted(event: MotivatorAccepted): void {
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
  // Update goal motivator
  motivator.addedTimestamp = event.params.motivator.addedTimestamp;
  motivator.accountAddress = event.params.motivator.accountAddress.toHexString();
  motivator.isAccepted = event.params.motivator.isAccepted;
  motivator.save();
  // Add motivator to goal list with accepted motivator addresses
  goal = getGoalWithAddedAcceptedMotivator(goal, motivator.accountAddress);
  goal.save();
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_MOTIVATOR_ACCEPTED,
    "MOTIVATOR_ACCOUNT_ADDRESS=" + motivator.accountAddress,
    ""
  ).save();
}

/**
 * Handle a message posted event to save step.
 */
export function handleMessagePosted(event: MessagePosted): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_MESSAGE_POSTED,
    "",
    event.params.message.extraDataURI
  ).save();
}

/**
 * Handle a verification data set event to save step.
 */
export function handleVerificationDataSet(event: VerificationDataSet): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_VERIFICATION_DATA_SET,
    event.params.key + "=" + event.params.value,
    ""
  ).save();
}

/**
 * Handle a closed as achieved event to update a goal.
 */
export function handleClosedAsAchieved(event: ClosedAsAchieved): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update goal
  goal.isClosed = event.params.params.isClosed;
  goal.isAchieved = event.params.params.isAchieved;
  goal.save();
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_GOAL_CLOSED_AS_ACHIEVED,
    "",
    ""
  ).save();
}

/**
 * Handle a closed as failed event to update a goal.
 */
export function handleClosedAsFailed(event: ClosedAsFailed): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update goal
  goal.isClosed = event.params.params.isClosed;
  goal.isAchieved = event.params.params.isAchieved;
  goal.save();
  // Save step
  createStep(event, goal, GOAL_STEP_TYPE_GOAL_CLOSED_AS_FAILED, "", "").save();
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
