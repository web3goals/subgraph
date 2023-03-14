import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Account, Goal, GoalMotivator, GoalStep } from "../generated/schema";

export function loadOrCreateGoal(tokenId: string): Goal {
  let goalId = tokenId;
  let goal = Goal.load(goalId);
  if (!goal) {
    goal = new Goal(goalId);
    // Defaults for params
    goal.createdTimestamp = BigInt.zero();
    goal.description = "";
    goal.authorAddress = Address.zero().toHexString();
    goal.authorStake = BigInt.zero();
    goal.deadlineTimestamp = BigInt.zero();
    goal.isClosed = false;
    goal.isAchieved = false;
    goal.verificationRequirement = "";
    // Defaults for motivators
    goal.motivatorAddresses = new Array<string>();
    goal.motivatorsNumber = 0;
    goal.acceptedMotivatorAddresses = new Array<string>();
  }
  return goal;
}

export function loadOrCreateGoalMotivator(
  goalId: string,
  goalMotivatorAccountAddress: string
): GoalMotivator {
  let motivatorId = goalId + "_" + goalMotivatorAccountAddress;
  let motivator = GoalMotivator.load(motivatorId);
  if (!motivator) {
    motivator = new GoalMotivator(motivatorId);
    motivator.goal = goalId;
    motivator.addedTimestamp = BigInt.zero();
    motivator.accountAddress = Address.zero().toHexString();
    motivator.isAccepted = false;
  }
  return motivator;
}

export function loadOrCreateAccount(accountAddress: string): Account {
  let accountId = accountAddress;
  let account = Account.load(accountId);
  if (!account) {
    account = new Account(accountId);
    account.achievedGoals = BigInt.zero();
    account.failedGoals = BigInt.zero();
    account.motivatedGoals = BigInt.zero();
    account.notMotivatedGoals = BigInt.zero();
  }
  return account;
}

export function getGoalWithAddedMotivator(
  goal: Goal,
  motivatorAccountAddress: string
): Goal {
  // Check existing motivator addresses
  for (let i = 0; i < goal.motivatorAddresses.length; i++) {
    let motivatorAddress = goal.motivatorAddresses[i];
    if (motivatorAddress == motivatorAccountAddress) {
      return goal;
    }
  }
  // Add motivator address
  let newMotivatorAddresses = goal.motivatorAddresses;
  newMotivatorAddresses.push(motivatorAccountAddress);
  goal.motivatorAddresses = newMotivatorAddresses;
  goal.motivatorsNumber = goal.motivatorsNumber + 1;
  return goal;
}

export function getGoalWithAddedAcceptedMotivator(
  goal: Goal,
  motivatorAccountAddress: string
): Goal {
  // Check existing motivator addresses
  for (let i = 0; i < goal.acceptedMotivatorAddresses.length; i++) {
    let motivatorAddress = goal.acceptedMotivatorAddresses[i];
    if (motivatorAddress == motivatorAccountAddress) {
      return goal;
    }
  }
  // Add motivator address
  let newAcceptedMotivatorAddresses = goal.acceptedMotivatorAddresses;
  newAcceptedMotivatorAddresses.push(motivatorAccountAddress);
  goal.acceptedMotivatorAddresses = newAcceptedMotivatorAddresses;
  return goal;
}

export function createStep(
  event: ethereum.Event,
  goal: Goal,
  type: string,
  extraDataUri: string
): GoalStep {
  let id = goal.id + "_" + event.transaction.hash.toHexString();
  let step = new GoalStep(id);
  step.goal = goal.id;
  step.createdTimestamp = event.block.timestamp;
  step.type = type;
  step.authorAddress = event.transaction.from.toHexString();
  step.extraDataUri = extraDataUri;
  return step;
}
