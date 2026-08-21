import { Button } from "@/components/ui/button";
import { Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-64 rounded-full bg-agri-green/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-48 rounded-full bg-agri-amber/6 blur-3xl" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          {/* Decorative icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl bg-agri-green/10 shadow-lg"
          >
            <Sprout className="size-10 text-agri-green" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-7xl font-black tracking-tighter">
              4<span className="text-gradient-green">0</span>4
            </h1>
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              Page not found
            </p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              The route you requested does not exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild size="sm" className="gap-1.5 rounded-xl shadow-md">
              <Link to="/courses">
                <Leaf className="size-3.5" />
                Browse Catalog
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        <p>
          AgriSkills Academy &copy; 2026 — agriculture training platform
        </p>
      </footer>
    </motion.div>
  );
}
