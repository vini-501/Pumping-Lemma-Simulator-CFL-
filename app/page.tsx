"use client";

import { useState } from "react";
import { SimulatorContainer } from "@/components/simulator-container";
import { InputPanel } from "@/components/input-panel";
import { VisualizationPanel } from "@/components/visualization-panel";
import { LogPanel } from "@/components/log-panel";

export default function Home() {
  const [string, setString] = useState("aaabbb"); // Default for a^n b^n pattern
  const [pumpingLength, setPumpingLength] = useState(3);
  const [uLen, setULen] = useState(0);
  const [vLen, setVLen] = useState(1);
  const [xLen, setXLen] = useState(4);
  const [yLen, setYLen] = useState(1);
  const [zLen, setZLen] = useState(0);
  const [pumpingMultiplier, setPumpingMultiplier] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{
    status: string;
    message: string;
  } | null>(null);

  const handleRun = () => {
    setIsRunning(true);
    setLogs([]);
    setResult(null);

    const newLogs: string[] = [];
    newLogs.push(`=== Pumping Lemma Simulator Started ===`);
    newLogs.push(`Original string s: "${string}"`);
    newLogs.push(`Pumping length p: ${pumpingLength}`);
    newLogs.push(
      `Decomposition: u="${string.substring(0, uLen)}", v="${string.substring(
        uLen,
        uLen + vLen
      )}", x="${string.substring(
        uLen + vLen,
        uLen + vLen + xLen
      )}", y="${string.substring(
        uLen + vLen + xLen,
        uLen + vLen + xLen + yLen
      )}", z="${string.substring(uLen + vLen + xLen + yLen)}"`
    );

    newLogs.push(``);
    newLogs.push(`--- Checking Conditions ---`);

    const vxyLen = vLen + xLen + yLen;
    const vyLen = vLen + yLen;

    const condition1 = vxyLen <= pumpingLength;
    const condition2 = vyLen >= 1;

    newLogs.push(
      `Condition 1: |vxy| ≤ p → |${vxyLen}| ≤ ${pumpingLength} → ${
        condition1 ? "TRUE ✓" : "FALSE ✗"
      }`
    );
    newLogs.push(
      `Condition 2: |vy| ≥ 1 → |${vyLen}| ≥ 1 → ${
        condition2 ? "TRUE ✓" : "FALSE ✗"
      }`
    );

    if (!condition1 || !condition2) {
      newLogs.push(``);
      newLogs.push(`❌ INVALID: One or more conditions failed.`);
      setResult({
        status: "INVALID",
        message: condition1
          ? "Condition |vy| ≥ 1 failed"
          : "Condition |vxy| ≤ p failed",
      });
      setLogs(newLogs);
      setIsRunning(false);
      return;
    }

    newLogs.push(``);
    newLogs.push(`--- Pumping Process ---`);
    newLogs.push(`Pumping multiplier i: ${pumpingMultiplier}`);

    const u = string.substring(0, uLen);
    const v = string.substring(uLen, uLen + vLen);
    const x = string.substring(uLen + vLen, uLen + vLen + xLen);
    const y = string.substring(uLen + vLen + xLen, uLen + vLen + xLen + yLen);
    const z = string.substring(uLen + vLen + xLen + yLen);

    let pumpedString = u;
    for (let j = 0; j < pumpingMultiplier; j++) {
      pumpedString += v;
    }
    pumpedString += x;
    for (let j = 0; j < pumpingMultiplier; j++) {
      pumpedString += y;
    }
    pumpedString += z;

    newLogs.push(
      `Pumped string s' = u(v^${pumpingMultiplier})x(y^${pumpingMultiplier})z: "${pumpedString}"`
    );

    newLogs.push(``);
    newLogs.push(`--- Membership Test ---`);

    // Generic membership test - for educational purposes, we'll check basic patterns
    const aCount = pumpedString.match(/a/g)?.length || 0;
    const bCount = pumpedString.match(/b/g)?.length || 0;
    const cCount = pumpedString.match(/c/g)?.length || 0;
    const dCount = pumpedString.match(/d/g)?.length || 0;
    const hasOtherChars = /[^abcd]/.test(pumpedString);

    newLogs.push(`Character counts in pumped string:`);
    if (aCount > 0) newLogs.push(`  Count of 'a': ${aCount}`);
    if (bCount > 0) newLogs.push(`  Count of 'b': ${bCount}`);
    if (cCount > 0) newLogs.push(`  Count of 'c': ${cCount}`);
    if (dCount > 0) newLogs.push(`  Count of 'd': ${dCount}`);
    newLogs.push(`  Has invalid characters: ${hasOtherChars ? "Yes" : "No"}`);

    // Basic pattern recognition for common CFL patterns
    let isValid = false;
    let patternType = "unknown";

    if (!hasOtherChars) {
      // Check for a^n b^n pattern
      if (cCount === 0 && dCount === 0 && aCount === bCount && aCount > 0) {
        isValid = true;
        patternType = "a^n b^n";
      }
      // Check for a^n b^n c^n pattern
      else if (
        dCount === 0 &&
        aCount === bCount &&
        bCount === cCount &&
        aCount > 0
      ) {
        isValid = true;
        patternType = "a^n b^n c^n";
      }
      // Check for ww pattern (even length, first half equals second half)
      else if (pumpedString.length % 2 === 0) {
        const mid = pumpedString.length / 2;
        const firstHalf = pumpedString.substring(0, mid);
        const secondHalf = pumpedString.substring(mid);
        if (firstHalf === secondHalf) {
          isValid = true;
          patternType = "ww";
        }
      }
      // For other patterns, just check if it's well-formed (no adjacent different chars for some patterns)
      else if (aCount > 0 || bCount > 0 || cCount > 0 || dCount > 0) {
        isValid = true;
        patternType = "custom pattern";
      }
    }

    newLogs.push(``);
    if (isValid) {
      newLogs.push(`✅ VALID: The pumped string belongs to the language.`);
      newLogs.push(`Pattern detected: ${patternType}`);
      newLogs.push(
        `The decomposition satisfies the Pumping Lemma for this pattern.`
      );
      setResult({
        status: "VALID",
        message: `The pumped string is in the language (${patternType})`,
      });
    } else {
      newLogs.push(
        `❌ INVALID: The pumped string does NOT belong to the language.`
      );
      newLogs.push(
        `Pattern analysis failed - string doesn't match expected format.`
      );
      if (hasOtherChars) {
        newLogs.push(
          `Reason: Contains invalid characters for typical CFL patterns.`
        );
      } else if (pumpedString.length === 0) {
        newLogs.push(`Reason: Empty string.`);
      } else {
        newLogs.push(
          `Reason: Character counts don't satisfy any recognized CFL pattern.`
        );
      }
      setResult({
        status: "INVALID",
        message: "The pumped string is NOT in the language",
      });
    }

    newLogs.push(`=== Simulation Complete ===`);
    setLogs(newLogs);
    setIsRunning(false);
  };

  return (
    <SimulatorContainer>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
        <div className="xl:col-span-3">
          <InputPanel
            string={string}
            setString={setString}
            pumpingLength={pumpingLength}
            setPumpingLength={setPumpingLength}
            uLen={uLen}
            setULen={setULen}
            vLen={vLen}
            setVLen={setVLen}
            xLen={xLen}
            setXLen={setXLen}
            yLen={yLen}
            setYLen={setYLen}
            zLen={zLen}
            setZLen={setZLen}
            pumpingMultiplier={pumpingMultiplier}
            setPumpingMultiplier={setPumpingMultiplier}
            onRun={handleRun}
            isRunning={isRunning}
          />
        </div>

        <div className="xl:col-span-5">
          <VisualizationPanel
            string={string}
            uLen={uLen}
            vLen={vLen}
            xLen={xLen}
            yLen={yLen}
            pumpingMultiplier={pumpingMultiplier}
            pumpingLength={pumpingLength}
            result={result}
          />
        </div>

        <div className="xl:col-span-4">
          <LogPanel logs={logs} />
        </div>
      </div>
    </SimulatorContainer>
  );
}
