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
import { useState } from "react";

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
          w += chars[Math.floor(Math.random() * chars.length)];
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
    const newString = generateString(patternId, patternParams);
    setString(newString);
  };

  const handleParamChange = (paramName: string, value: number) => {
    const newParams = { ...patternParams, [paramName]: value };
    setPatternParams(newParams);
    const newString = generateString(selectedPattern, newParams);
    setString(newString);
  };

  const randomizeSegments = () => {
    if (string.length < 5) return; // Need at least 5 characters for all segments to be ≥ 1

    // Ensure all segments have at least length 1: u≥1, v≥1, x≥1, y≥1, z≥1
    // Total minimum required: 5 characters

    // Start with minimum allocation (1 for each segment)
    let remainingLength = string.length - 5; // Subtract the required 1 for each segment

    // Generate random additional lengths for each segment
    const additionalLengths = Array(4)
      .fill(0)
      .map(() => {
        if (remainingLength === 0) return 0;
        const maxAdditional = Math.floor(remainingLength / 2); // Conservative distribution
        const additional = Math.floor(Math.random() * (maxAdditional + 1));
        remainingLength = Math.max(0, remainingLength - additional);
        return additional;
      });

    // Distribute any remaining length randomly
    while (remainingLength > 0) {
      const randomIndex = Math.floor(Math.random() * 4);
      additionalLengths[randomIndex]++;
      remainingLength--;
    }

    // Calculate final lengths (minimum 1 + additional)
    const randomULen = 1 + additionalLengths[0];
    let randomVLen = 1 + additionalLengths[1];
    let randomXLen = 1 + additionalLengths[2];
    let randomYLen = 1 + additionalLengths[3];

    // Ensure pumping lemma condition: |vxy| ≤ p
    const vxyLength = randomVLen + randomXLen + randomYLen;
    if (vxyLength > pumpingLength) {
      // Adjust vxy lengths to fit within pumping length while keeping each ≥ 1
      const excess = vxyLength - pumpingLength;
      const minVxyLength = 3; // minimum for v≥1, x≥1, y≥1

      if (pumpingLength >= minVxyLength) {
        // Redistribute vxy within pumping length constraint
        const availableVxyLength = pumpingLength - 3; // subtract minimum 1 for each

        // Redistribute the available length randomly
        const vxyDistribution = Array(3)
          .fill(0)
          .map(() => {
            const max = Math.floor(availableVxyLength / 3);
            return Math.floor(Math.random() * (max + 1));
          });

        // Add any remaining length
        let remaining =
          availableVxyLength - vxyDistribution.reduce((a, b) => a + b, 0);
        while (remaining > 0) {
          const idx = Math.floor(Math.random() * 3);
          vxyDistribution[idx]++;
          remaining--;
        }

        randomVLen = 1 + vxyDistribution[0];
        randomXLen = 1 + vxyDistribution[1];
        randomYLen = 1 + vxyDistribution[2];
      } else {
        // If pumping length is too small, use minimum values
        randomVLen = 1;
        randomXLen = Math.min(1, pumpingLength - 2);
        randomYLen = Math.max(1, pumpingLength - randomVLen - randomXLen);
      }
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
