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

  get profileId(): string {
    let value = this.get("profileId");
    return value!.toString();
  }

  set profileId(value: string) {
    this.set("profileId", Value.fromString(value));
  }

  get profileCreatedTimestamp(): BigInt {
    let value = this.get("profileCreatedTimestamp");
    return value!.toBigInt();
  }

  set profileCreatedTimestamp(value: BigInt) {
    this.set("profileCreatedTimestamp", Value.fromBigInt(value));
  }

  get profileUri(): string {
    let value = this.get("profileUri");
    return value!.toString();
  }

  set profileUri(value: string) {
    this.set("profileUri", Value.fromString(value));
  }

  get goals(): BigInt {
    let value = this.get("goals");
    return value!.toBigInt();
  }

  set goals(value: BigInt) {
    this.set("goals", Value.fromBigInt(value));
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

  get motivations(): BigInt {
    let value = this.get("motivations");
    return value!.toBigInt();
  }

  set motivations(value: BigInt) {
    this.set("motivations", Value.fromBigInt(value));
  }

  get superMotivations(): BigInt {
    let value = this.get("superMotivations");
    return value!.toBigInt();
  }

  set superMotivations(value: BigInt) {
    this.set("superMotivations", Value.fromBigInt(value));
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

  get extraDataURI(): string {
    let value = this.get("extraDataURI");
    return value!.toString();
  }

  set extraDataURI(value: string) {
    this.set("extraDataURI", Value.fromString(value));
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

  get messages(): Array<string> {
    let value = this.get("messages");
    return value!.toStringArray();
  }

  set messages(value: Array<string>) {
    this.set("messages", Value.fromStringArray(value));
  }

  get messagesNumber(): i32 {
    let value = this.get("messagesNumber");
    return value!.toI32();
  }

  set messagesNumber(value: i32) {
    this.set("messagesNumber", Value.fromI32(value));
  }
}

export class GoalMessage extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GoalMessage entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GoalMessage must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GoalMessage", id.toString(), this);
    }
  }

  static load(id: string): GoalMessage | null {
    return changetype<GoalMessage | null>(store.get("GoalMessage", id));
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

  get isMotivating(): boolean {
    let value = this.get("isMotivating");
    return value!.toBoolean();
  }

  set isMotivating(value: boolean) {
    this.set("isMotivating", Value.fromBoolean(value));
  }

  get isSuperMotivating(): boolean {
    let value = this.get("isSuperMotivating");
    return value!.toBoolean();
  }

  set isSuperMotivating(value: boolean) {
    this.set("isSuperMotivating", Value.fromBoolean(value));
  }

  get extraDataUri(): string {
    let value = this.get("extraDataUri");
    return value!.toString();
  }

  set extraDataUri(value: string) {
    this.set("extraDataUri", Value.fromString(value));
  }
}
