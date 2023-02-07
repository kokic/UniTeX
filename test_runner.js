"use strict";

import fs from "fs";
import { UniTeX } from "./unitex.js";
import { execSync } from "child_process";

let exitCode = 0;
let failedNum = 0;

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
    try {
      execSync(
        "diff -u " + outName + " " + resName,
      );
    } catch (error) {
      console.log(
        "test err: " + error.message + " for case `" + testName + "`",
      );
      console.log("status:\n\t" + error.status);
      console.log("stdout:\n\t" + error.stdout);
      console.log("stderr:\n\t" + error.stderr);
      exitCode = -1;
      failedNum += 1;
    }
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

  console.log("");
  console.log(
    failedNum == 0 ? "all tests passed" : failedNum + " tests failed",
  );
  process.exit(exitCode);
};

main();
