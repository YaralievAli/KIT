"use client";

import type { Project } from "@/types/content";

export const THANK_YOU_SUMMARY_STORAGE_KEY = "kit:thank-you-summary";

export type ThankYouSummary = {
  selectedProjectId?: string;
  style?: string;
  layout?: string;
  budget?: string;
  sourceForm?: string;
};

const allowedKeys = ["selectedProjectId", "style", "layout", "budget", "sourceForm"] as const;

export function saveThankYouSummary(input: ThankYouSummary) {
  if (typeof window === "undefined") return;

  const summary = sanitizeSummary(input);
  if (!summary) return;

  try {
    window.sessionStorage.setItem(THANK_YOU_SUMMARY_STORAGE_KEY, JSON.stringify(summary));
  } catch {
    // Storage can be disabled; the thank-you page has a generic fallback.
  }
}

export function readThankYouSummary() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(THANK_YOU_SUMMARY_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    return sanitizeSummary(parsed);
  } catch {
    return null;
  }
}

export function readThankYouSummarySnapshot() {
  const summary = readThankYouSummary();
  return summary ? JSON.stringify(summary) : "";
}

export function parseThankYouSummarySnapshot(value: string) {
  if (!value) return null;

  try {
    return sanitizeSummary(JSON.parse(value) as unknown);
  } catch {
    return null;
  }
}

export function redirectToThankYou(summary: ThankYouSummary) {
  saveThankYouSummary(summary);

  if (typeof window !== "undefined") {
    window.location.assign("/thank-you");
  }
}

export function getThankYouRecommendations(projects: Project[], summary: ThankYouSummary | null, count = 3) {
  const recommendations: Project[] = [];

  function add(items: Project[]) {
    for (const item of items) {
      if (recommendations.some((project) => project.id === item.id)) continue;
      recommendations.push(item);
      if (recommendations.length >= count) break;
    }
  }

  if (summary?.selectedProjectId) {
    const selectedProjectId = summary.selectedProjectId;
    add(projects.filter((project) => project.id === selectedProjectId));
  }

  if (summary?.style) {
    const style = summary.style;
    add(projects.filter((project) => matchesStyle(project.style, style)));
  }

  if (summary?.layout) {
    const layout = summary.layout;
    add(projects.filter((project) => matchesLayout(project.layout, layout)));
  }

  const budgetGroup = summary?.budget ? toBudgetGroup(summary.budget) : null;
  if (budgetGroup) {
    add(projects.filter((project) => project.budgetGroup === budgetGroup));
  }

  add(projects);

  return recommendations.slice(0, count);
}

function sanitizeSummary(input: unknown): ThankYouSummary | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const record = input as Record<string, unknown>;
  const summary: ThankYouSummary = {};

  for (const key of allowedKeys) {
    const value = sanitizeString(record[key]);
    if (value) summary[key] = value;
  }

  return Object.keys(summary).length ? summary : null;
}

function sanitizeString(value: unknown) {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 160) return undefined;

  return trimmed;
}

function matchesStyle(projectStyle: string, selectedStyle: string) {
  const project = normalize(projectStyle);
  const selected = normalize(selectedStyle);

  if (!project || !selected) return false;
  if (project === selected || project.includes(selected) || selected.includes(project)) return true;

  return styleToken(project) === styleToken(selected);
}

function matchesLayout(projectLayout: string, selectedLayout: string) {
  const project = normalize(projectLayout);
  const selected = normalize(selectedLayout);

  if (!project || !selected) return false;
  if (project === selected || project.includes(selected) || selected.includes(project)) return true;

  return layoutToken(project) === layoutToken(selected);
}

function toBudgetGroup(value: string): Project["budgetGroup"] | null {
  const normalized = normalize(value);

  if (normalized.includes("300-500")) return "300-500 тыс.";
  if (normalized.includes("от 500") || normalized.includes("500") || normalized.includes("700") || normalized.startsWith("от")) return "от 500 тыс.";
  if (normalized.includes("250-400") || normalized.includes("250") || normalized.includes("400")) return "300-500 тыс.";
  if (normalized.includes("до")) return "до 300 тыс.";

  return null;
}

function styleToken(value: string) {
  if (value.includes("современ")) return "modern";
  if (value.includes("скандинав")) return "scandi";
  if (value.includes("неокласс")) return "neoclassic";
  if (value.includes("лофт")) return "loft";

  return value;
}

function layoutToken(value: string) {
  if (value.includes("углов")) return "corner";
  if (value.includes("прям")) return "straight";
  if (value.includes("п-образ")) return "u";
  if (value.includes("остров")) return "island";
  if (value.includes("потол")) return "ceiling";

  return value;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
}
