"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface InputPanelProps {
  string: string;
  setString: (s: string) => void;
  pumpingLength: number;
  setPumpingLength: (p: number) => void;
  uLen: number;
  setULen: (n: number) => void;
  vLen: number;
  setVLen: (n: number) => void;
  xLen: number;
  setXLen: (n: number) => void;
  yLen: number;
  setYLen: (n: number) => void;
  zLen: number;
  setZLen: (n: number) => void;
  pumpingMultiplier: number;
  setPumpingMultiplier: (n: number) => void;
  onRun: () => void;
  isRunning: boolean;
}

type LanguagePattern = {
  id: string;
  name: string;
  description: string;
  example: string;
  parameters: { name: string; label: string; min: number; default: number }[];
};

const languagePatterns: LanguagePattern[] = [
  {
    id: "anbncn",
    name: "L = {aⁿbⁿcⁿ : n ≥ 0}",
    description: "Equal numbers of a's, b's, and c's",
    example: "aaabbbccc",
    parameters: [{ name: "n", label: "n", min: 1, default: 3 }],
  },
  {
    id: "ww",
    name: "L = {ww : w ∈ {a, b}*}",
    description: "String repeated twice",
    example: "abab",
    parameters: [{ name: "length", label: "w length", min: 1, default: 2 }],
  },
  {
    id: "anbn",
    name: "L = {aⁿbⁿ : n ≥ 0}",
    description: "Equal numbers of a's and b's",
    example: "aaabbb",
    parameters: [{ name: "n", label: "n", min: 1, default: 3 }],
  },
  {
    id: "aibjckdj",
    name: "L = {aⁱbʲcᵏdʲ : j ≠ k}",
    description: "Different numbers of b's and c's",
    example: "aabbcddd",
    parameters: [
      { name: "i", label: "i (a's)", min: 1, default: 2 },
      { name: "j", label: "j (b's)", min: 1, default: 2 },
      { name: "k", label: "k (c's)", min: 1, default: 1 },
    ],
  },
  {
    id: "0n1n2n",
    name: "L = {0ⁿ1ⁿ2ⁿ : n ≥ 1}",
    description: "Equal numbers of 0's, 1's, and 2's",
    example: "000111222",
    parameters: [{ name: "n", label: "n", min: 1, default: 3 }],
  },
  {
    id: "0n1n",
    name: "L = {0ⁿ1ⁿ : n > 1}",
    description: "Equal numbers of 0's and 1's (n > 1)",
    example: "001122",
    parameters: [{ name: "n", label: "n", min: 2, default: 3 }],
  },
];

export function InputPanel({
  string,
  setString,
  pumpingLength,
  setPumpingLength,
  uLen,
  setULen,
  vLen,
  setVLen,
  xLen,
  setXLen,
  yLen,
  setYLen,
  zLen,
  setZLen,
  pumpingMultiplier,
  setPumpingMultiplier,
  onRun,
  isRunning,
}: InputPanelProps) {
  const [selectedPattern, setSelectedPattern] = useState<string>("anbn");
  const [patternParams, setPatternParams] = useState<Record<string, number>>({
    n: 3,
    length: 2,
    i: 2,
    j: 2,
    k: 1,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate initial string when client is ready
  useEffect(() => {
    if (isClient) {
      const generateStringForPattern = (
        patternId: string,
        params: Record<string, number>
      ): string => {
        switch (patternId) {
          case "anbncn":
            return (
              "a".repeat(params.n) + "b".repeat(params.n) + "c".repeat(params.n)
            );
          case "ww":
            const chars = ["a", "b"];
            let w = "";
            for (let i = 0; i < params.length; i++) {
              w += chars[i % 2]; // Use deterministic pattern for initial load
            }
            return w + w;
          case "anbn":
            return "a".repeat(params.n) + "b".repeat(params.n);
          case "aibjckdj":
            return (
              "a".repeat(params.i) +
              "b".repeat(params.j) +
              "c".repeat(params.k) +
              "d".repeat(params.j)
            );
          case "0n1n2n":
            return (
              "0".repeat(params.n) + "1".repeat(params.n) + "2".repeat(params.n)
            );
          case "0n1n":
            return "0".repeat(params.n) + "1".repeat(params.n);
          default:
            return "aabb";
        }
      };

      const newString = generateStringForPattern(
        selectedPattern,
        patternParams
      );
      setString(newString);
    }
  }, [isClient]);

  const totalLen = uLen + vLen + xLen + yLen + zLen;
  const isValidPartition = totalLen === string.length && string.length > 0;

  // Color mapping for each segment
  const segmentColors = {
    u: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
    v: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
    x: "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
    y: "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100",
    z: "bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100",
  };

  const updateSegment = (
    newULen: number,
    newVLen: number,
    newXLen: number,
    newYLen: number
  ) => {
    const sum = newULen + newVLen + newXLen + newYLen;
    if (sum <= string.length) {
      setULen(newULen);
      setVLen(newVLen);
      setXLen(newXLen);
      setYLen(newYLen);
      setZLen(string.length - sum);
    }
  };

  const generateString = (
    patternId: string,
    params: Record<string, number>
  ): string => {
    switch (patternId) {
      case "anbncn":
        return (
          "a".repeat(params.n) + "b".repeat(params.n) + "c".repeat(params.n)
        );
      case "ww":
        const chars = ["a", "b"];
        let w = "";
        for (let i = 0; i < params.length; i++) {
          // Use deterministic pattern for SSR, random for client
          w +=
            chars[isClient ? Math.floor(Math.random() * chars.length) : i % 2];
        }
        return w + w;
      case "anbn":
        return "a".repeat(params.n) + "b".repeat(params.n);
      case "aibjckdj":
        return (
          "a".repeat(params.i) +
          "b".repeat(params.j) +
          "c".repeat(params.k) +
          "d".repeat(params.j)
        );
      case "0n1n2n":
        return (
          "0".repeat(params.n) + "1".repeat(params.n) + "2".repeat(params.n)
        );
      case "0n1n":
        return "0".repeat(params.n) + "1".repeat(params.n);
      default:
        return "aabb";
    }
  };

  const handlePatternChange = (patternId: string) => {
    setSelectedPattern(patternId);
    if (isClient) {
      const newString = generateString(patternId, patternParams);
      setString(newString);
    }
  };

  const handleParamChange = (paramName: string, value: number) => {
    const newParams = { ...patternParams, [paramName]: value };
    setPatternParams(newParams);
    if (isClient) {
      const newString = generateString(selectedPattern, newParams);
      setString(newString);
    }
  };

  const randomizeSegments = () => {
    if (string.length < 3) return; // Need at least 3 characters for basic decomposition

    // 50% chance to generate invalid decomposition
    const shouldGenerateInvalid = Math.random() < 0.5;

    if (shouldGenerateInvalid) {
      // Generate invalid decomposition by violating constraints
      const violationType = Math.random() < 0.5 ? "vxy_length" : "vy_empty";

      if (violationType === "vxy_length") {
        // Violate |vxy| ≤ p constraint
        const randomULen = Math.floor(
          Math.random() * Math.max(1, string.length - pumpingLength)
        );
        const remainingAfterU = string.length - randomULen;

        // Force vxy to be larger than pumping length
        const minVxyForViolation = pumpingLength + 1;
        const maxVxyPossible = remainingAfterU;

        if (maxVxyPossible >= minVxyForViolation) {
          const vxyLen =
            Math.floor(
              Math.random() * (maxVxyPossible - minVxyForViolation + 1)
            ) + minVxyForViolation;

          // Distribute vxy randomly among v, x, y (ensuring at least |vy| ≥ 1)
          const randomXLen = Math.floor(
            Math.random() * Math.max(1, vxyLen - 1)
          );
          const remainingVY = vxyLen - randomXLen;
          const randomVLen = Math.floor(Math.random() * (remainingVY + 1));
          const randomYLen = remainingVY - randomVLen;

          // Ensure |vy| ≥ 1
          if (randomVLen === 0 && randomYLen === 0) {
            const randomVLen_fixed = 1;
            updateSegment(randomULen, randomVLen_fixed, randomXLen, randomYLen);
          } else {
            updateSegment(randomULen, randomVLen, randomXLen, randomYLen);
          }
          return;
        }
      } else {
        // Violate |vy| ≥ 1 constraint (make both v and y zero)
        const randomULen = Math.floor(
          Math.random() * Math.max(1, string.length - 1)
        );
        const remainingAfterU = string.length - randomULen;
        const randomXLen = Math.min(remainingAfterU, pumpingLength);

        updateSegment(randomULen, 0, randomXLen, 0);
        return;
      }
    }

    // Generate valid decomposition (original logic)
    const maxULen = Math.max(0, string.length - 3); // leave at least 3 for vxy
    const randomULen = Math.floor(Math.random() * (maxULen + 1));

    const remainingAfterU = string.length - randomULen;

    // Ensure |vxy| ≤ p and |vy| ≥ 1
    const maxVxyLen = Math.min(remainingAfterU, pumpingLength);
    const minVxyLen = Math.max(
      1,
      remainingAfterU - Math.max(0, string.length - pumpingLength - randomULen)
    );

    if (maxVxyLen < minVxyLen) {
      // Fallback to simple valid decomposition
      updateSegment(0, 1, Math.max(1, string.length - 2), 1);
      return;
    }

    const vxyLen =
      Math.floor(Math.random() * (maxVxyLen - minVxyLen + 1)) + minVxyLen;

    // Randomly distribute vxy among v, x, y with constraint |vy| ≥ 1
    let randomVLen, randomXLen, randomYLen;

    // Ensure at least one of v or y is non-zero
    const vyTotalMin = 1;
    const maxX = vxyLen - vyTotalMin;

    randomXLen = Math.floor(Math.random() * (maxX + 1));
    const remainingVY = vxyLen - randomXLen;

    // Split remaining between v and y randomly, ensuring total vy ≥ 1
    randomVLen = Math.floor(Math.random() * (remainingVY + 1));
    randomYLen = remainingVY - randomVLen;

    // If both v and y are 0 (shouldn't happen but safety check), fix it
    if (randomVLen === 0 && randomYLen === 0) {
      randomVLen = 1;
    }

    updateSegment(randomULen, randomVLen, randomXLen, randomYLen);
  };

  return (
    <Card className="p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        Configuration
      </h2>

      <div className="space-y-5">
        {/* Language Pattern Selection */}
        <div>
          <Label className="text-sm font-medium text-foreground">
            Language Pattern
          </Label>
          <Select
            value={selectedPattern}
            onValueChange={handlePatternChange}
            disabled={isRunning}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language pattern" />
            </SelectTrigger>
            <SelectContent>
              {languagePatterns.map((pattern) => (
                <SelectItem key={pattern.id} value={pattern.id}>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{pattern.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {pattern.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pattern Parameters */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Parameters
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {languagePatterns
              .find((p) => p.id === selectedPattern)
              ?.parameters.map((param) => (
                <div key={param.name}>
                  <Label
                    htmlFor={param.name}
                    className="text-xs text-foreground"
                  >
                    {param.label}
                  </Label>
                  <Input
                    id={param.name}
                    type="number"
                    min={param.min}
                    value={patternParams[param.name] || param.default}
                    onChange={(e) =>
                      handleParamChange(
                        param.name,
                        Math.max(
                          param.min,
                          Number.parseInt(e.target.value) || param.default
                        )
                      )
                    }
                    className="font-mono text-sm"
                    disabled={isRunning}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Generated String Display */}
        <div>
          <Label className="text-sm font-medium text-foreground">
            Generated String (s)
          </Label>
          <p className="text-xs text-muted-foreground mb-2">
            Current pattern:{" "}
            {languagePatterns.find((p) => p.id === selectedPattern)?.name}
          </p>
          <div className="px-3 py-2 bg-muted rounded border border-input text-sm font-mono">
            {string}
          </div>
        </div>

        {/* Pumping Length */}
        <div>
          <Label
            htmlFor="pumping-length"
            className="text-sm font-medium text-foreground"
          >
            Pumping Length (p)
          </Label>
          <Input
            id="pumping-length"
            type="number"
            min="1"
            value={pumpingLength}
            onChange={(e) =>
              setPumpingLength(
                Math.max(1, Number.parseInt(e.target.value) || 1)
              )
            }
            className="font-mono"
            disabled={isRunning}
          />
        </div>

        {/* Decomposition */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Decomposition: s = uvxyz
            </h3>
            <Button
              variant="outline"
              size="lg"
              onClick={randomizeSegments}
              disabled={isRunning || string.length < 5}
              className="text-xs px-3 py-1 h-7"
              title={
                string.length < 5
                  ? "String must have at least 5 characters for randomization"
                  : "Generate random valid decomposition"
              }
            >
              🎲 Randomize
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "u length",
                value: uLen,
                set: (v: number) => updateSegment(v, vLen, xLen, yLen),
                segment: "u" as keyof typeof segmentColors,
              },
              {
                label: "v length",
                value: vLen,
                set: (v: number) => updateSegment(uLen, v, xLen, yLen),
                segment: "v" as keyof typeof segmentColors,
              },
              {
                label: "x length",
                value: xLen,
                set: (v: number) => updateSegment(uLen, vLen, v, yLen),
                segment: "x" as keyof typeof segmentColors,
              },
              {
                label: "y length",
                value: yLen,
                set: (v: number) => updateSegment(uLen, vLen, xLen, v),
                segment: "y" as keyof typeof segmentColors,
              },
            ].map(({ label, value, set, segment }) => (
              <div key={label}>
                <Label htmlFor={label} className="text-xs text-foreground">
                  {label}
                </Label>
                <Input
                  id={label}
                  type="number"
                  min="0"
                  max={string.length}
                  value={value}
                  onChange={(e) =>
                    set(Math.max(0, Number.parseInt(e.target.value) || 0))
                  }
                  className={`font-mono text-sm ${segmentColors[segment]}`}
                  disabled={isRunning}
                />
              </div>
            ))}
            <div>
              <Label className="text-xs text-foreground">z length</Label>
              <div
                className={`px-3 py-2 rounded border border-input text-sm font-mono ${segmentColors.z}`}
              >
                {zLen}
              </div>
            </div>
          </div>
          {!isValidPartition && string.length > 0 && (
            <p className="text-xs text-destructive mt-3">
              ⚠ Partition mismatch: {totalLen} ≠ {string.length}
            </p>
          )}
        </div>

        {/* Pumping Multiplier */}
        <div className="border-t pt-4">
          <Label
            htmlFor="multiplier"
            className="text-sm font-medium text-foreground"
          >
            Pumping Multiplier (i)
          </Label>
          <Input
            id="multiplier"
            type="number"
            min="0"
            value={pumpingMultiplier}
            onChange={(e) =>
              setPumpingMultiplier(
                Math.max(0, Number.parseInt(e.target.value) || 0)
              )
            }
            className="font-mono"
            disabled={isRunning}
          />
        </div>

        {/* Run Button */}
        <Button
          onClick={onRun}
          disabled={!isValidPartition || isRunning}
          className="w-full mt-6 h-10 font-semibold"
          size="lg"
        >
          {isRunning ? "Running..." : "Run Simulation"}
        </Button>
      </div>
    </Card>
  );
}
