"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface LogPanelProps {
  logs: string[];
}

export function LogPanel({ logs }: LogPanelProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <Card className="p-4 bg-muted">
      <h3 className="text-sm font-semibold mb-3 text-foreground">
        Simulation Log
      </h3>
      <div className="bg-background rounded p-4 font-mono text-xs overflow-y-auto max-h-96 space-y-1 border border-border">
        {logs.length === 0 ? (
          <p className="text-muted-foreground">
            Run a simulation to see the log...
          </p>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap wrap-break-word ${
                log.includes("✓") || log.includes("VALID")
                  ? "text-green-600 dark:text-green-400"
                  : log.includes("✗") ||
                    log.includes("INVALID") ||
                    log.includes("FALSE")
                  ? "text-red-600 dark:text-red-400"
                  : log.includes("===") || log.includes("---")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-foreground"
              }`}
            >
              {log}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </Card>
  );
}
