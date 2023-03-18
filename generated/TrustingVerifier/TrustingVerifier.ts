// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class GoalVerifiedAsAchieved extends ethereum.Event {
  get params(): GoalVerifiedAsAchieved__Params {
    return new GoalVerifiedAsAchieved__Params(this);
  }
}

export class GoalVerifiedAsAchieved__Params {
  _event: GoalVerifiedAsAchieved;

  constructor(event: GoalVerifiedAsAchieved) {
    this._event = event;
  }

  get goalTokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class GoalVerifiedAsFailed extends ethereum.Event {
  get params(): GoalVerifiedAsFailed__Params {
    return new GoalVerifiedAsFailed__Params(this);
  }
}

export class GoalVerifiedAsFailed__Params {
  _event: GoalVerifiedAsFailed;

  constructor(event: GoalVerifiedAsFailed) {
    this._event = event;
  }

  get goalTokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class GoalVerifiedAsNotAchievedYet extends ethereum.Event {
  get params(): GoalVerifiedAsNotAchievedYet__Params {
    return new GoalVerifiedAsNotAchievedYet__Params(this);
  }
}

export class GoalVerifiedAsNotAchievedYet__Params {
  _event: GoalVerifiedAsNotAchievedYet;

  constructor(event: GoalVerifiedAsNotAchievedYet) {
    this._event = event;
  }

  get goalTokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TrustingVerifier__getVerificationStatusResult {
  value0: boolean;
  value1: boolean;

  constructor(value0: boolean, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }

  getIsAchieved(): boolean {
    return this.value0;
  }

  getIsFailed(): boolean {
    return this.value1;
  }
}

export class TrustingVerifier extends ethereum.SmartContract {
  static bind(address: Address): TrustingVerifier {
    return new TrustingVerifier("TrustingVerifier", address);
  }

  getHubAddress(): Address {
    let result = super.call("getHubAddress", "getHubAddress():(address)", []);

    return result[0].toAddress();
  }

  try_getHubAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getHubAddress",
      "getHubAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getVerificationStatus(
    goalTokenId: BigInt
  ): TrustingVerifier__getVerificationStatusResult {
    let result = super.call(
      "getVerificationStatus",
      "getVerificationStatus(uint256):(bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(goalTokenId)]
    );

    return new TrustingVerifier__getVerificationStatusResult(
      result[0].toBoolean(),
      result[1].toBoolean()
    );
  }

  try_getVerificationStatus(
    goalTokenId: BigInt
  ): ethereum.CallResult<TrustingVerifier__getVerificationStatusResult> {
    let result = super.tryCall(
      "getVerificationStatus",
      "getVerificationStatus(uint256):(bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(goalTokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TrustingVerifier__getVerificationStatusResult(
        value[0].toBoolean(),
        value[1].toBoolean()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get hubAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetHubAddressCall extends ethereum.Call {
  get inputs(): SetHubAddressCall__Inputs {
    return new SetHubAddressCall__Inputs(this);
  }

  get outputs(): SetHubAddressCall__Outputs {
    return new SetHubAddressCall__Outputs(this);
  }
}

export class SetHubAddressCall__Inputs {
  _call: SetHubAddressCall;

  constructor(call: SetHubAddressCall) {
    this._call = call;
  }

  get hubAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetHubAddressCall__Outputs {
  _call: SetHubAddressCall;

  constructor(call: SetHubAddressCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class VerifyCall extends ethereum.Call {
  get inputs(): VerifyCall__Inputs {
    return new VerifyCall__Inputs(this);
  }

  get outputs(): VerifyCall__Outputs {
    return new VerifyCall__Outputs(this);
  }
}

export class VerifyCall__Inputs {
  _call: VerifyCall;

  constructor(call: VerifyCall) {
    this._call = call;
  }

  get goalTokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class VerifyCall__Outputs {
  _call: VerifyCall;

  constructor(call: VerifyCall) {
    this._call = call;
  }
}