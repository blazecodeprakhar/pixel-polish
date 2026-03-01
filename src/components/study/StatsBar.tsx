import { motion } from "framer-motion";
import { BookOpen, ListChecks, CalendarClock } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay: number;
  gradientClass: string;
}

function StatItem({ icon, value, label, delay, gradientClass }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="card-dark hover:card-dark-hover p-5 md:p-6 flex-1 text-center transition-all duration-300"
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${gradientClass} mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold font-display text-foreground">{value}</div>
      <div className="text-[11px] font-medium text-muted-foreground mt-1.5 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

interface StatsBarProps {
  totalDays: number;
  totalTasks: number;
  remainingDays: number;
}

export default function StatsBar({ totalDays, totalTasks, remainingDays }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      <StatItem
        icon={<BookOpen size={18} className="text-primary-foreground" />}
        value={totalDays}
        label="Days"
        delay={0.1}
        gradientClass="gradient-electric"
      />
      <StatItem
        icon={<ListChecks size={18} className="text-accent-foreground" />}
        value={totalTasks}
        label="Tasks"
        delay={0.2}
        gradientClass="gradient-purple"
      />
      <StatItem
        icon={<CalendarClock size={18} className="text-secondary-foreground" />}
        value={remainingDays}
        label="Left"
        delay={0.3}
        gradientClass="gradient-dark-blue"
      />
    </div>
  );
}
