import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, Goal, GoalMotivator } from "../generated/schema";

export function loadOrCreateGoal(tokenId: string): Goal {
  let goalId = tokenId;
  let goal = Goal.load(goalId);
  if (!goal) {
    goal = new Goal(goalId);
    goal.uri = "";
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
    account.achievedGoals = 0;
    account.failedGoals = 0;
    account.motivatedGoals = 0;
  }
  return account;
}

export function getGoalWithAddedGoalMotivatorAccountAddress(
  goal: Goal,
  goalMotivatorAccountAddress: string
): Goal {
  // Check existing motivator addresses
  for (let i = 0; i < goal.motivatorAddresses.length; i++) {
    let motivatorAddress = goal.motivatorAddresses[i];
    if (motivatorAddress == goalMotivatorAccountAddress) {
      return goal;
    }
  }
  // Add motivator address
  let newMotivatorAddresses = goal.motivatorAddresses;
  newMotivatorAddresses.push(goalMotivatorAccountAddress);
  goal.motivatorAddresses = newMotivatorAddresses;
  goal.motivatorsNumber = goal.motivatorsNumber + 1;
  return goal;
}

export function getGoalWithAddedAcceptedGoalMotivatorAccountAddress(
  goal: Goal,
  goalMotivatorAccountAddress: string
): Goal {
  // Check existing motivator addresses
  for (let i = 0; i < goal.acceptedMotivatorAddresses.length; i++) {
    let motivatorAddress = goal.acceptedMotivatorAddresses[i];
    if (motivatorAddress == goalMotivatorAccountAddress) {
      return goal;
    }
  }
  // Add motivator address
  let newAcceptedmotivatorAddresses = goal.acceptedMotivatorAddresses;
  newAcceptedmotivatorAddresses.push(goalMotivatorAccountAddress);
  goal.acceptedMotivatorAddresses = newAcceptedmotivatorAddresses;
  return goal;
}
