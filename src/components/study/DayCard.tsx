import { motion } from "framer-motion";
import { Check, Sparkles, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayCardProps {
  title: string;
  tasks: string[];
  status: "past" | "today" | "future";
  dayIndex: number;
  isLastDay: boolean;
  isCompleted: (id: string) => boolean;
  onToggle: (id: string) => void;
  dateKey: string;
}

function getBadge(status: string, isLastDay: boolean) {
  if (status === "today") return { text: "Today", icon: <Sparkles size={12} /> };
  if (status === "past") return { text: "Completed", icon: <CheckCircle2 size={12} /> };
  if (isLastDay) return { text: "Final Day", icon: <AlertCircle size={12} /> };
  return { text: "Upcoming", icon: <Clock size={12} /> };
}

export default function DayCard({
  title,
  tasks,
  status,
  dayIndex,
  isLastDay,
  isCompleted,
  onToggle,
  dateKey,
}: DayCardProps) {
  const badge = getBadge(status, isLastDay);
  const completedInDay = tasks.filter((_, i) => isCompleted(`${dateKey}-${i}`)).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * dayIndex, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "card-dark hover:card-dark-hover p-5 md:p-7 transition-all duration-300",
        status === "today" && "border-primary/40 border today-electric-pulse",
        status === "past" && "opacity-50"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <h3 className="text-lg md:text-xl font-display font-bold text-foreground">{title}</h3>
        <span
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shrink-0",
            status === "today" && "gradient-electric text-primary-foreground",
            status === "past" && "bg-muted text-muted-foreground",
            status === "future" && "bg-primary/10 text-primary"
          )}
        >
          {badge.icon}
          {badge.text}
        </span>
      </div>

      {/* Sub info */}
      <p className="text-xs text-muted-foreground mb-4">
        {completedInDay}/{tasks.length} tasks done
      </p>

      {/* Tasks */}
      <ul className="space-y-2">
        {tasks.map((task, i) => {
          const taskId = `${dateKey}-${i}`;
          const done = isCompleted(taskId);
          const isPriority = task.includes("(Priority)");
          const cleanTask = task.replace("(Priority)", "").trim();

          return (
            <motion.li
              key={taskId}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggle(taskId)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group",
                done
                  ? "bg-success/10 line-through text-muted-foreground"
                  : "bg-muted/40 hover:bg-muted/70"
              )}
            >
              <span className="shrink-0">
                {done ? (
                  <div className="w-5 h-5 rounded-full gradient-success flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary transition-colors" />
                )}
              </span>
              <span className="flex-1 text-sm md:text-[15px]">
                {cleanTask}
              </span>
              {isPriority && (
                <span className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase gradient-purple text-accent-foreground">
                  Priority
                </span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
