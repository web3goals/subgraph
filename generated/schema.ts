// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get achievedGoals(): BigInt {
    let value = this.get("achievedGoals");
    return value!.toBigInt();
  }

  set achievedGoals(value: BigInt) {
    this.set("achievedGoals", Value.fromBigInt(value));
  }

  get failedGoals(): BigInt {
    let value = this.get("failedGoals");
    return value!.toBigInt();
  }

  set failedGoals(value: BigInt) {
    this.set("failedGoals", Value.fromBigInt(value));
  }

  get motivatedGoals(): BigInt {
    let value = this.get("motivatedGoals");
    return value!.toBigInt();
  }

  set motivatedGoals(value: BigInt) {
    this.set("motivatedGoals", Value.fromBigInt(value));
  }

  get notMotivatedGoals(): BigInt {
    let value = this.get("notMotivatedGoals");
    return value!.toBigInt();
  }

  set notMotivatedGoals(value: BigInt) {
    this.set("notMotivatedGoals", Value.fromBigInt(value));
  }
}

export class Goal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Goal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Goal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Goal", id.toString(), this);
    }
  }

  static load(id: string): Goal | null {
    return changetype<Goal | null>(store.get("Goal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get createdTimestamp(): BigInt {
    let value = this.get("createdTimestamp");
    return value!.toBigInt();
  }

  set createdTimestamp(value: BigInt) {
    this.set("createdTimestamp", Value.fromBigInt(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get authorAddress(): string {
    let value = this.get("authorAddress");
    return value!.toString();
  }

  set authorAddress(value: string) {
    this.set("authorAddress", Value.fromString(value));
  }

  get authorStake(): BigInt {
    let value = this.get("authorStake");
    return value!.toBigInt();
  }

  set authorStake(value: BigInt) {
    this.set("authorStake", Value.fromBigInt(value));
  }

  get deadlineTimestamp(): BigInt {
    let value = this.get("deadlineTimestamp");
    return value!.toBigInt();
  }

  set deadlineTimestamp(value: BigInt) {
    this.set("deadlineTimestamp", Value.fromBigInt(value));
  }

  get isClosed(): boolean {
    let value = this.get("isClosed");
    return value!.toBoolean();
  }

  set isClosed(value: boolean) {
    this.set("isClosed", Value.fromBoolean(value));
  }

  get isAchieved(): boolean {
    let value = this.get("isAchieved");
    return value!.toBoolean();
  }

  set isAchieved(value: boolean) {
    this.set("isAchieved", Value.fromBoolean(value));
  }

  get verificationRequirement(): string {
    let value = this.get("verificationRequirement");
    return value!.toString();
  }

  set verificationRequirement(value: string) {
    this.set("verificationRequirement", Value.fromString(value));
  }

  get motivators(): Array<string> {
    let value = this.get("motivators");
    return value!.toStringArray();
  }

  set motivators(value: Array<string>) {
    this.set("motivators", Value.fromStringArray(value));
  }

  get motivatorAddresses(): Array<string> {
    let value = this.get("motivatorAddresses");
    return value!.toStringArray();
  }

  set motivatorAddresses(value: Array<string>) {
    this.set("motivatorAddresses", Value.fromStringArray(value));
  }

  get motivatorsNumber(): i32 {
    let value = this.get("motivatorsNumber");
    return value!.toI32();
  }

  set motivatorsNumber(value: i32) {
    this.set("motivatorsNumber", Value.fromI32(value));
  }

  get acceptedMotivatorAddresses(): Array<string> {
    let value = this.get("acceptedMotivatorAddresses");
    return value!.toStringArray();
  }

  set acceptedMotivatorAddresses(value: Array<string>) {
    this.set("acceptedMotivatorAddresses", Value.fromStringArray(value));
  }
}

export class GoalMotivator extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GoalMotivator entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GoalMotivator must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GoalMotivator", id.toString(), this);
    }
  }

  static load(id: string): GoalMotivator | null {
    return changetype<GoalMotivator | null>(store.get("GoalMotivator", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get goal(): string {
    let value = this.get("goal");
    return value!.toString();
  }

  set goal(value: string) {
    this.set("goal", Value.fromString(value));
  }

  get addedTimestamp(): BigInt {
    let value = this.get("addedTimestamp");
    return value!.toBigInt();
  }

  set addedTimestamp(value: BigInt) {
    this.set("addedTimestamp", Value.fromBigInt(value));
  }

  get accountAddress(): string {
    let value = this.get("accountAddress");
    return value!.toString();
  }

  set accountAddress(value: string) {
    this.set("accountAddress", Value.fromString(value));
  }

  get isAccepted(): boolean {
    let value = this.get("isAccepted");
    return value!.toBoolean();
  }

  set isAccepted(value: boolean) {
    this.set("isAccepted", Value.fromBoolean(value));
  }
}

export class GoalStep extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GoalStep entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GoalStep must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GoalStep", id.toString(), this);
    }
  }

  static load(id: string): GoalStep | null {
    return changetype<GoalStep | null>(store.get("GoalStep", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get createdTimestamp(): BigInt {
    let value = this.get("createdTimestamp");
    return value!.toBigInt();
  }

  set createdTimestamp(value: BigInt) {
    this.set("createdTimestamp", Value.fromBigInt(value));
  }

  get authorAddress(): string {
    let value = this.get("authorAddress");
    return value!.toString();
  }

  set authorAddress(value: string) {
    this.set("authorAddress", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get extraDataUri(): string {
    let value = this.get("extraDataUri");
    return value!.toString();
  }

  set extraDataUri(value: string) {
    this.set("extraDataUri", Value.fromString(value));
  }
}
