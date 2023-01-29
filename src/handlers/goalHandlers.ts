import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Transfer } from "../../generated/Goal/Goal";
import { Goal } from "../../generated/schema";

/**
 * Handle a tranfer event to create a goal with default values.
 */
export function handleTransfer(event: Transfer): void {
  let goal = Goal.load(event.params.tokenId.toString());
  if (!goal) {
    goal = new Goal(event.params.tokenId.toString());
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
    goal.save();
  }
}
