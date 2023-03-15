import { Goal } from "../../generated/schema";
import {
  GoalVerifiedAsAchieved,
  GoalVerifiedAsFailed,
  GoalVerifiedAsNotAchievedYet,
} from "../../generated/TrustingVerifier/TrustingVerifier";
import {
  GOAL_STEP_TYPE_GOAL_VERIFIED_AS_ACHIEVED,
  GOAL_STEP_TYPE_GOAL_VERIFIED_AS_FAILED,
  GOAL_STEP_TYPE_GOAL_VERIFIED_AS_NOT_ACHIEVED_YET,
} from "../constants";
import { createStep } from "../utils";

/**
 * Handle a goal verified as achieved event to save step.
 */
export function handleGoalVerifiedAsAchieved(
  event: GoalVerifiedAsAchieved
): void {
  // Load goal
  let goal = Goal.load(event.params.goalTokenId.toString());
  if (!goal) {
    return;
  }
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_GOAL_VERIFIED_AS_ACHIEVED,
    "",
    ""
  ).save();
}

/**
 * Handle a goal verified as failed event to save step.
 */
export function handleGoalVerifiedAsFailed(event: GoalVerifiedAsFailed): void {
  // Load goal
  let goal = Goal.load(event.params.goalTokenId.toString());
  if (!goal) {
    return;
  }
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_GOAL_VERIFIED_AS_FAILED,
    "",
    ""
  ).save();
}

/**
 * Handle a goal verified as not achieved yet event to save step.
 */
export function handleGoalVerifiedAsNotAchievedYet(
  event: GoalVerifiedAsNotAchievedYet
): void {
  // Load goal
  let goal = Goal.load(event.params.goalTokenId.toString());
  if (!goal) {
    return;
  }
  // Save step
  createStep(
    event,
    goal,
    GOAL_STEP_TYPE_GOAL_VERIFIED_AS_NOT_ACHIEVED_YET,
    "",
    ""
  ).save();
}
