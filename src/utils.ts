import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Account, Goal, GoalMessage } from "../generated/schema";

export function loadOrCreateAccount(accountAddress: string): Account {
  let accountId = accountAddress;
  let account = Account.load(accountId);
  if (!account) {
    account = new Account(accountId);
    // Defaults for profile
    account.profileId = "";
    account.profileCreatedTimestamp = 0;
    account.profileUri = "";
    // Defaults for reputation
    account.goals = 0;
    account.achievedGoals = 0;
    account.failedGoals = 0;
    account.motivations = 0;
    account.superMotivations = 0;
  }
  return account;
}

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
    goal.extraDataURI = "";
    // Defaults for messages
    goal.messagesNumber = 0;
    // Defaults for motivators
    goal.motivatorAddresses = new Array<string>();
    goal.motivatorsNumber = 0;
  }
  return goal;
}

export function createMessage(
  event: ethereum.Event,
  goal: Goal,
  messageId: string,
  type: string,
  extraDataUri: string
): GoalMessage {
  let id = goal.id + "_" + messageId;
  let message = new GoalMessage(id);
  message.messageId = messageId;
  message.goal = goal.id;
  message.addedTimestamp = event.block.timestamp;
  message.type = type;
  message.authorAddress = event.transaction.from.toHexString();
  message.isMotivating = false;
  message.isSuperMotivating = false;
  message.extraDataUri = extraDataUri;
  return message;
}

export function getUpdatedAccount(
  accountAddress: string,
  additionalGoals: i32,
  additionalAchievedGoals: i32,
  additionalFailedGoals: i32,
  additionalMotivations: i32,
  additionalSuperMotivations: i32
): Account {
  let account = loadOrCreateAccount(accountAddress);
  account.goals += additionalGoals;
  account.achievedGoals += additionalAchievedGoals;
  account.failedGoals += additionalFailedGoals;
  account.motivations += additionalMotivations;
  account.superMotivations += additionalSuperMotivations;
  return account;
}

export function getUpdatedGoal(
  tokenId: string,
  additionalMotivaterAddress: string | null,
  additionalMotivatorsNumber: i32,
  additionalMessagesNumber: i32
): Goal {
  let goal = loadOrCreateGoal(tokenId);
  if (additionalMotivaterAddress) {
    let newMotivatorAddresses = goal.motivatorAddresses;
    newMotivatorAddresses.push(additionalMotivaterAddress);
    goal.motivatorAddresses = newMotivatorAddresses;
  }
  goal.motivatorsNumber += additionalMotivatorsNumber;
  goal.messagesNumber += additionalMessagesNumber;
  return goal;
}
