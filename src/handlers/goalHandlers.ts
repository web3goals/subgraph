import {
  ClosedAsAchieved,
  ClosedAsFailed,
  MessageEvaluated,
  MessagePosted,
  MotivatorAdded,
  ProofPosted,
  Set,
  Transfer,
} from "../../generated/Goal/Goal";
import { Goal, GoalMessage } from "../../generated/schema";
import {
  GOAL_MESSAGE_TYPE_GOAL_CLOSED_AS_ACHIEVED,
  GOAL_MESSAGE_TYPE_GOAL_CLOSED_AS_FAILED,
  GOAL_MESSAGE_TYPE_GOAL_SET,
  GOAL_MESSAGE_TYPE_MESSAGE_POSTED,
  GOAL_MESSAGE_TYPE_PROOF_POSTED,
} from "../constants";
import { createMessage, loadOrCreateGoal } from "../utils";

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
  goal.extraDataURI = event.params.params.extraDataURI;
  goal.save();
  // Create message
  createMessage(
    event,
    goal,
    event.transaction.hash.toHexString(),
    GOAL_MESSAGE_TYPE_GOAL_SET,
    ""
  ).save();
  // Update goal messages number
  goal.messagesNumber = goal.messagesNumber + 1;
  goal.save();
}

/**
 * Handle a proof posted event to create message.
 */
export function handleProofPosted(event: ProofPosted): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Create message
  createMessage(
    event,
    goal,
    event.transaction.hash.toHexString(),
    GOAL_MESSAGE_TYPE_PROOF_POSTED,
    event.params.proof.extraDataURI
  ).save();
  // Update goal messages number
  goal.messagesNumber = goal.messagesNumber + 1;
  goal.save();
}

/**
 * Handle a motivator add event to update goal.
 */
export function handleMotivatorAdded(event: MotivatorAdded): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Update goal
  let newMotivatorAddresses = goal.motivatorAddresses;
  newMotivatorAddresses.push(
    event.params.motivatorAccountAddress.toHexString()
  );
  goal.motivatorAddresses = newMotivatorAddresses;
  goal.motivatorsNumber = goal.motivatorsNumber + 1;
  goal.save();
}

/**
 * Handle a message posted event to create message.
 */
export function handleMessagePosted(event: MessagePosted): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Create message
  createMessage(
    event,
    goal,
    event.params.messageId.toString(),
    GOAL_MESSAGE_TYPE_MESSAGE_POSTED,
    event.params.message.extraDataURI
  ).save();
  // Update goal messages number
  goal.messagesNumber = goal.messagesNumber + 1;
  goal.save();
}

/**
 * Handle a message evaluated event to update message.
 */
export function handleMessageEvaluated(event: MessageEvaluated): void {
  // Load goal
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    return;
  }
  // Load message
  let message = GoalMessage.load(
    goal.id + "_" + event.params.messageId.toString()
  );
  if (!message) {
    return;
  }
  // Update message
  message.isMotivating = event.params.message.isMotivating;
  message.isSuperMotivating = event.params.message.isSuperMotivating;
  message.save();
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
  // Create message
  createMessage(
    event,
    goal,
    event.transaction.hash.toHexString(),
    GOAL_MESSAGE_TYPE_GOAL_CLOSED_AS_ACHIEVED,
    ""
  ).save();
  // Update goal messages number
  goal.messagesNumber = goal.messagesNumber + 1;
  goal.save();
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
  // Create message
  createMessage(
    event,
    goal,
    event.transaction.hash.toHexString(),
    GOAL_MESSAGE_TYPE_GOAL_CLOSED_AS_FAILED,
    ""
  ).save();
  // Update goal messages number
  goal.messagesNumber = goal.messagesNumber + 1;
  goal.save();
}
