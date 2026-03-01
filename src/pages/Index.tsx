import { useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { studyPlan, getToday, getDayStatus } from "@/data/studyPlan";
import { useTaskCompletion } from "@/hooks/useTaskCompletion";
import StatsBar from "@/components/study/StatsBar";
import ProgressBar from "@/components/study/ProgressBar";
import DayCard from "@/components/study/DayCard";
import Footer from "@/components/study/Footer";
import ScrollToTop from "@/components/study/ScrollToTop";

export default function Index() {
  const today = getToday();
  const { toggle, isCompleted, completedCount } = useTaskCompletion();

  const totalTasks = useMemo(() => studyPlan.reduce((s, d) => s + d.tasks.length, 0), []);
  const remainingDays = useMemo(
    () => studyPlan.filter((d) => getDayStatus(d.date, today) !== "past").length,
    [today]
  );

  return (
    <div className="dark-premium-bg sparkle-dots min-h-screen relative">
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center pt-14 pb-8 px-5 md:pt-20 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-electric mb-6 shadow-lg shadow-primary/20">
              <GraduationCap size={30} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient-electric mb-3">
              Midterm Study Planner
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              Organize your study schedule. Check off tasks as you go. Ace your exams.
            </p>
          </motion.div>
        </header>

        {/* Main */}
        <main className="max-w-2xl mx-auto px-4 pb-8 space-y-5 md:space-y-6">
          <StatsBar totalDays={studyPlan.length} totalTasks={totalTasks} remainingDays={remainingDays} />
          <ProgressBar completed={completedCount} total={totalTasks} />

          <div className="space-y-4">
            {studyPlan.map((day, i) => (
              <DayCard
                key={day.date}
                title={day.title}
                tasks={day.tasks}
                status={getDayStatus(day.date, today)}
                dayIndex={i}
                isLastDay={i === studyPlan.length - 1}
                isCompleted={isCompleted}
                onToggle={toggle}
                dateKey={day.date}
              />
            ))}
          </div>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}
