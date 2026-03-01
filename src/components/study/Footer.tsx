import { motion } from "framer-motion";
import { Flame, Target, Trophy } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-16 mb-8 mx-4"
    >
      <div className="card-dark p-8 md:p-10 text-center max-w-2xl mx-auto">
        <p className="font-display text-xl md:text-2xl font-bold text-gradient-electric mb-2">
          "Stay consistent, stay unstoppable."
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Small steps daily lead to extraordinary results
        </p>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Flame size={20} className="text-primary mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold font-display text-foreground">100%</div>
            <div className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest mt-1">Commitment</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10">
            <Target size={20} className="text-secondary mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold font-display text-foreground">∞</div>
            <div className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest mt-1">Potential</div>
          </div>
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
            <Trophy size={20} className="text-accent mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold font-display text-foreground">2026</div>
            <div className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest mt-1">Your Year</div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
