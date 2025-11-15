"use client";

import { Card } from "@/components/ui/card";

interface VisualizationPanelProps {
  string: string;
  uLen: number;
  vLen: number;
  xLen: number;
  yLen: number;
  pumpingMultiplier: number;
  pumpingLength: number;
  result: { status: string; message: string } | null;
}

export function VisualizationPanel({
  string,
  uLen,
  vLen,
  xLen,
  yLen,
  pumpingMultiplier,
  pumpingLength,
  result,
}: VisualizationPanelProps) {
  const u = string.substring(0, uLen);
  const v = string.substring(uLen, uLen + vLen);
  const x = string.substring(uLen + vLen, uLen + vLen + xLen);
  const y = string.substring(uLen + vLen + xLen, uLen + vLen + xLen + yLen);
  const z = string.substring(uLen + vLen + xLen + yLen);

  let pumpedString = u;
  for (let i = 0; i < pumpingMultiplier; i++) {
    pumpedString += v;
  }
  pumpedString += x;
  for (let i = 0; i < pumpingMultiplier; i++) {
    pumpedString += y;
  }
  pumpedString += z;

  const vxyLen = vLen + xLen + yLen;
  const vyLen = vLen + yLen;
  const condition1 = vxyLen <= pumpingLength;
  const condition2 = vyLen >= 1;

  const segmentColors = {
    u: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
    v: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
    x: "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
    y: "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100",
    z: "bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100",
  };

  return (
    <div className="space-y-4">
      {/* Original Decomposition */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Original String Decomposition
        </h3>
        <div className="flex flex-wrap gap-1 mb-3">
          {[
            { label: "u", content: u, color: segmentColors.u },
            { label: "v", content: v, color: segmentColors.v },
            { label: "x", content: x, color: segmentColors.x },
            { label: "y", content: y, color: segmentColors.y },
            { label: "z", content: z, color: segmentColors.z },
          ].map(({ label, content, color }) =>
            content ? (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`px-3 py-2 rounded font-mono font-bold text-center ${color}`}
                >
                  {content}
                </div>
                <span className="text-xs font-semibold mt-1 text-muted-foreground">
                  {label}
                </span>
              </div>
            ) : null
          )}
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          s = {u}·{v}·{x}·{y}·{z}
        </p>
      </Card>

      {/* Pumped String */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Pumped String (i = {pumpingMultiplier})
        </h3>
        <div className="mb-4 p-3 bg-muted rounded font-mono text-sm break-all">
          s' = {u}·{v}
          <sup>{pumpingMultiplier}</sup>·{x}·{y}
          <sup>{pumpingMultiplier}</sup>·{z}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {/* u segment */}
          {u && (
            <div
              className={`px-3 py-2 rounded font-mono font-bold ${segmentColors.u}`}
            >
              {u}
            </div>
          )}
          {/* v repeated */}
          {Array.from({ length: pumpingMultiplier }).map((_, i) => (
            <div
              key={`v-${i}`}
              className={`px-3 py-2 rounded font-mono font-bold ${segmentColors.v}`}
            >
              {v}
            </div>
          ))}
          {/* x segment */}
          {x && (
            <div
              className={`px-3 py-2 rounded font-mono font-bold ${segmentColors.x}`}
            >
              {x}
            </div>
          )}
          {/* y repeated */}
          {Array.from({ length: pumpingMultiplier }).map((_, i) => (
            <div
              key={`y-${i}`}
              className={`px-3 py-2 rounded font-mono font-bold ${segmentColors.y}`}
            >
              {y}
            </div>
          ))}
          {/* z segment */}
          {z && (
            <div
              className={`px-3 py-2 rounded font-mono font-bold ${segmentColors.z}`}
            >
              {z}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          Result: "{pumpedString}"
        </p>
      </Card>

      {/* Conditions */}
      <Card className="p-4 bg-muted">
        <h3 className="text-sm font-semibold mb-3 text-foreground">
          Lemma Conditions
        </h3>
        <div className="space-y-2 text-sm">
          <div
            className={`flex items-center justify-between p-2 rounded ${
              condition1
                ? "bg-green-50 dark:bg-green-950"
                : "bg-red-50 dark:bg-red-950"
            }`}
          >
            <span className="font-mono">
              |vxy| ≤ p → |{vxyLen}| ≤ {pumpingLength}
            </span>
            <span
              className={
                condition1
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "text-red-600 dark:text-red-400 font-semibold"
              }
            >
              {condition1 ? "✓" : "✗"}
            </span>
          </div>
          <div
            className={`flex items-center justify-between p-2 rounded ${
              condition2
                ? "bg-green-50 dark:bg-green-950"
                : "bg-red-50 dark:bg-red-950"
            }`}
          >
            <span className="font-mono">|vy| ≥ 1 → |{vyLen}| ≥ 1</span>
            <span
              className={
                condition2
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "text-red-600 dark:text-red-400 font-semibold"
              }
            >
              {condition2 ? "✓" : "✗"}
            </span>
          </div>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card
          className={`p-4 border-2 ${
            result.status === "VALID"
              ? "border-green-500 bg-green-50 dark:bg-green-950"
              : "border-red-500 bg-red-50 dark:bg-red-950"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`text-3xl font-bold ${
                result.status === "VALID"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {result.status === "VALID" ? "✓" : "✗"}
            </div>
            <div>
              <h4
                className={`text-lg font-bold px-3 py-2 rounded-lg ${
                  result.status === "VALID"
                    ? "text-green-900 dark:text-green-100"
                    : "text-red-900 dark:text-red-100"
                }`}
              >
                {result.status}
              </h4>
              <p
                className={`text-lg font-bold px-2 py-2 rounded-lg ${
                  result.status === "VALID"
                    ? "text-green-900 dark:text-green-100 bg-green-100 dark:bg-green-800"
                    : "text-red-900 dark:text-red-100 bg-red-100 dark:bg-red-800"
                }`}
              >
                {result.status === "VALID"
                  ? "The pumped string is in the language"
                  : "The pumped string is NOT in the language"}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
