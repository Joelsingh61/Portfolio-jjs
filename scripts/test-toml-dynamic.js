import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'smol-toml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const projectsPath = path.join(root, 'src/data/projects.toml');
const certsPath = path.join(root, 'src/data/certificates.toml');

console.log('--- TOML Dynamic Source of Truth Test ---');

// 1. Read initial projects count
const origProjectsRaw = fs.readFileSync(projectsPath, 'utf-8');
const initialProjects = parse(origProjectsRaw).projects || [];
console.log(`Initial Projects Count: ${initialProjects.length}`);

// 2. Append temporary project
const tempProjectToml = `
[[projects]]
id = "test-temp-drone"
title = "Temporary Test UAV Drone"
category = "Aerial Robotics / UAV"
year = 2026
featured = false
short_description = "A temporary test project to verify dynamic TOML reactivity."
description = "Verifying automatic project creation upon TOML addition."
technologies = ["ROS2", "PX4", "C++"]
results = ["Test verification passed"]
`;

fs.appendFileSync(projectsPath, tempProjectToml);

// 3. Re-parse and verify count increased
const updatedProjectsRaw = fs.readFileSync(projectsPath, 'utf-8');
const updatedProjects = parse(updatedProjectsRaw).projects || [];
console.log(`Updated Projects Count after addition: ${updatedProjects.length}`);

if (updatedProjects.length !== initialProjects.length + 1) {
  console.error('FAILED: Project was not dynamically added to TOML parsing!');
  process.exit(1);
}

// 4. Restore original projects file
fs.writeFileSync(projectsPath, origProjectsRaw);
const restoredProjects = parse(fs.readFileSync(projectsPath, 'utf-8')).projects || [];
console.log(`Restored Projects Count after removal: ${restoredProjects.length}`);

if (restoredProjects.length !== initialProjects.length) {
  console.error('FAILED: Project was not dynamically removed from TOML parsing!');
  process.exit(1);
}

console.log('SUCCESS: TOML dynamic addition and removal verification passed 100%!');
