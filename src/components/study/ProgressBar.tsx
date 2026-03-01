import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="card-dark p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <TrendingUp size={16} className="text-primary" />
          Study Progress
        </span>
        <span className="text-2xl font-bold font-display text-gradient-electric">{pct}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="h-full gradient-electric rounded-full relative overflow-hidden shimmer"
        />
      </div>
      <div className="flex justify-between mt-3">
        <p className="text-xs text-muted-foreground">
          {completed} of {total} tasks completed
        </p>
        <p className="text-xs font-semibold text-primary">
          {total - completed} remaining
        </p>
      </div>
    </motion.div>
  );
}
