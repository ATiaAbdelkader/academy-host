import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col bg-background text-foreground"
    >
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <p className="text-xs text-term-green">
            <span className="text-term-green">$</span> find --path{" "}
            <span className="text-foreground">"$PATH"</span>
          </p>
          <h1 className="mt-6 text-6xl font-bold tracking-tight">
            4<span className="text-term-green">0</span>4
          </h1>
          <p className="mt-3 text-sm">
            <span className="text-term-amber">error:</span> page not found —
            the route you requested does not exist
          </p>
          <Button asChild variant="outline" size="sm" className="mt-6 text-xs">
            <Link to="/">return to home</Link>
          </Button>
        </div>
      </div>
      <footer className="mx-auto w-full max-w-6xl px-4 py-8 text-center text-[11px] text-muted-foreground sm:px-6">
        <p>
          <span className="text-term-green">agriskills_academy</span> © 2026
        </p>
      </footer>
    </motion.div>
  );
}
