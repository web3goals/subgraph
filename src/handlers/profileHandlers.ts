import { Transfer, URISet } from "../../generated/Profile/Profile";
import { loadOrCreateAccount } from "../utils";

/**
 * Handle a tranfer event to save account profile.
 */
export function handleTransfer(event: Transfer): void {
  let account = loadOrCreateAccount(event.params.to.toHexString());
  account.profileId = event.params.tokenId.toString();
  account.profileCreatedTimestamp = event.block.timestamp.toI32();
  account.save();
}

/**
 * Handle a tranfer event to update account profile.
 *
 * TODO: Check that event was emmitted by account, not contract
 */
export function handleUriSet(event: URISet): void {
  let account = loadOrCreateAccount(event.transaction.from.toHexString());
  account.profileUri = event.params.tokenURI;
  account.save();
}
