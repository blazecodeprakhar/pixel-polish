import { useState, useCallback, useMemo } from "react";

const STORAGE_KEY = "study-planner-completed";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useTaskCompletion() {
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);

  const toggle = useCallback((taskId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      saveCompleted(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (taskId: string) => completed.has(taskId),
    [completed]
  );

  const completedCount = useMemo(() => completed.size, [completed]);

  return { toggle, isCompleted, completedCount };
}
