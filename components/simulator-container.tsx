"use client";

import type React from "react";

export function SimulatorContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-background/95 p-4">
      <div className="max-w-full mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Pumping Lemma Simulator
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive visualization of the Pumping Lemma for Regular Languages
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
