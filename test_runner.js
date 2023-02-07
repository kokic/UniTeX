"use strict";

import fs from "fs";
import { UniTeX } from "./unitex.js";
import { exec } from "child_process";

let exitCode = 0;

const ignoreTests = [];

const testDir = "./test/";
const testDirContents = fs.readdirSync(testDir);
const testSrc = testDirContents.filter((fileName) =>
  fileName.split(".").pop() == "tex"
);
const testNames = testDirContents.filter((fileName) =>
  fileName.split(".").pop() == "tex"
).map((fileName) => fileName.split(".")[0]);
const enableApplyCalcResults = process.env["TEST_APPLY_RESULTS"] == "1";

const runTest = (
  testName,
) => {
  console.log("running test `" + testName + "`");
  const texName = testDir + testName + ".tex";
  const outName = testDir + testName + ".out";
  const resName = testDir + testName + ".out" + ".tmp";

  const rawTeX = fs.readFileSync(texName).toString();
  const calcOut = UniTeX.parse(rawTeX);
  if (enableApplyCalcResults) {
    fs.writeFileSync(outName, calcOut);
  } else {
    fs.writeFileSync(resName, calcOut);
    const child = exec(
      "diff -u " + outName + " " + resName,
      (err, stdout, stderr) => {
        if (err != null) {
          console.log("test err: " + err + " for case `" + testName + "`");
          console.log("stdout:\n\t" + stdout);
          console.log("stderr:\n\t" + stderr);
          exitCode = -1;
        }
      },
    );
    child.on("exit", () => {
      if (child.exitCode != 0) {
        const stdout = child.stdout;
        const stderr = child.stderr;
        console.log("test err for case `" + testName + "`");
        console.log("stdout:\n\t" + stdout);
        console.log("stderr:\n\t" + stderr);
        exitCode = child.exitCode;
      }
    });
  }
};

const main = () => {
  console.log("testSrc = ", testSrc);
  console.log("will run tests: ", testNames);
  console.log(
    "will " + (enableApplyCalcResults ? "" : "not ") +
      "write test results to `.out` files",
  );
  console.log("");

  testNames.forEach(
    (testName) => {
      runTest(testName);
    },
  );
};

main();
