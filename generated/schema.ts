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

  get uri(): string {
    let value = this.get("uri");
    return value!.toString();
  }

  set uri(value: string) {
    this.set("uri", Value.fromString(value));
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

  get watchers(): Array<string> {
    let value = this.get("watchers");
    return value!.toStringArray();
  }

  set watchers(value: Array<string>) {
    this.set("watchers", Value.fromStringArray(value));
  }

  get watcherAddresses(): Array<string> {
    let value = this.get("watcherAddresses");
    return value!.toStringArray();
  }

  set watcherAddresses(value: Array<string>) {
    this.set("watcherAddresses", Value.fromStringArray(value));
  }

  get watchersNumber(): i32 {
    let value = this.get("watchersNumber");
    return value!.toI32();
  }

  set watchersNumber(value: i32) {
    this.set("watchersNumber", Value.fromI32(value));
  }
}

export class GoalWatcher extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GoalWatcher entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GoalWatcher must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GoalWatcher", id.toString(), this);
    }
  }

  static load(id: string): GoalWatcher | null {
    return changetype<GoalWatcher | null>(store.get("GoalWatcher", id));
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
}
