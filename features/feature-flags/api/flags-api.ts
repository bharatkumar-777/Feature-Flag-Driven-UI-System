import { FeatureFlag } from "../types";
import { FLAGS_API_URL } from "../constants";

export async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  const res = await fetch(FLAGS_API_URL);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  return res.json() as Promise<FeatureFlag[]>;
}
