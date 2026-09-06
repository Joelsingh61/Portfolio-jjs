# Joel Jaba Singh J — Personal Engineering Portfolio

A modern, high-precision dark-themed personal portfolio website for **Joel Jaba Singh J** (Final Year Student in Robotics & Automation at Lovely Professional University), focused on Autonomous Mobile Robots, Computer Vision, AI, Embedded Systems, and Intelligent Machines.

Inspired by Apple, Linear, and Vercel design aesthetics, this application is **100% data-driven** using **TOML files** as the single source of truth.

---

## 🚀 Key Features

- **Single Source of Truth (TOML)**: All portfolio content is managed entirely via editing clean TOML files in `src/data/`. No React or TypeScript code modifications are needed for normal portfolio updates.
- **High-Precision Engineering Aesthetic**: Deep charcoal theme (`#09090b`), high-contrast typography, section numbers (`01 / ABOUT`, `02 / SELECTED WORK`, etc.), and ambient grid styling.
- **Full Case Study Modals**: Engineering projects render problem statements, solutions, contributions, hardware specs, software stacks, engineering metrics, and lightbox image galleries.
- **Embedded PDF Viewers**: Built-in PDF viewer for certificates and resume with zoom controls, page navigation, direct download button, and keyboard shortcuts (`Esc`).
- **Graceful Null Safety**: Omitted or empty TOML fields hide automatically without leaving broken images or `undefined`/`null` text.
- **Contact Endpoint & Email Fallback**: Posts to `VITE_CONTACT_ENDPOINT` if configured, otherwise falls back seamlessly to `mailto:` using the email in `profile.toml`.

---

## 📁 Repository Structure

```
src/
├── data/                       # 👈 ALL YOUR CONTENT IS MANAGED HERE
│   ├── profile.toml            # Bio, university, interests, status, social links
│   ├── projects.toml           # Engineering project entries (AMR, MRI, Smart Glove)
│   ├── certificates.toml       # Certifications & PDF references
│   ├── skills.toml             # Categorized technical skills matrix
│   ├── experience.toml         # Work timeline & positions
│   ├── achievements.toml       # Awards, competitions, research, hackathons
│   ├── education.toml          # Degree, university, coursework
│   └── site.toml               # Site title, description, resume path
├── components/                 # React UI components (Layout, Hero, Projects, Viewers)
├── lib/
│   └── content.ts              # TOML Parser & typed content loader
└── types/
    └── index.ts                # TypeScript interfaces for portfolio data

public/                         # 👈 MEDIA & PDF ASSETS GO HERE
├── projects/                   # Project screenshots & webp assets
├── certificates/               # PDF certificates
├── resume/                     # PDF resume (Joel-Jaba-Singh-Resume.pdf)
└── favicon.svg                 # Technical logo icon
```

---

## 🛠️ How to Maintain & Update Content

### 1. How to Add a New Project
Open `src/data/projects.toml` and append a new `[[projects]]` block:

```toml
[[projects]]
id = "drone-navigation"
title = "Autonomous UAV Drone Flight Controller"
category = "Aerial Robotics / UAV"
year = 2026
featured = true
short_description = "Autonomous drone trajectory control and obstacle avoidance system."
description = "Detailed system architecture description goes here..."
problem = "Navigating GPS-denied environments safely."
solution = "Optical flow and Lidar sensor fusion for indoor position hold."
contribution = "Engineered state estimation and velocity command controller."
technologies = ["ROS2", "Python", "C++", "PX4"]
hardware = ["Quadcopter Frame", "PX4 Flight Controller", "Optical Flow Sensor"]
software = ["ROS2 MAVROS", "Custom Trajectory Planner"]
features = [
  "Autonomous indoor waypoint hold",
  "Real-time optical flow velocity estimation"
]
achievements = ["Achieved 95% position hold stability."]
results = ["Target position drift under 5cm."]

# Optional engineering performance metrics grid
[[projects.metrics]]
label = "Position Drift"
value = "< 5 cm"
description = "Tested in GPS-denied indoor arena"

images = [
  "/projects/drone-01.webp"
]
github = "https://github.com/joelsingh/drone-control"
demo = ""
documentation = ""
patent = ""
```
*Save the file. The new project card will automatically appear on the website!*

---

### 2. How to Remove or Edit a Project
- **To Remove**: Delete the corresponding `[[projects]]` block from `src/data/projects.toml`.
- **To Edit**: Modify any string or list inside the project block in `src/data/projects.toml`.

---

### 3. How to Add Project Screenshots/Images
1. Drop your image file (e.g., `my-project-01.webp` or `my-project-01.png`) into `public/projects/`.
2. Reference the path inside `projects.toml`:
```toml
images = [
  "/projects/my-project-01.webp",
  "/projects/my-project-02.webp"
]
```

---

### 4. How to Add a Certificate
Open `src/data/certificates.toml` and append:

```toml
[[certificates]]
id = "ros2-robotics"
name = "ROS 2 Fundamentals & Mobile Robotics"
issuer = "ConstructSim Robotics Academy"
date = "2026"
category = "Robotics / ROS"
credential_id = "CERT-99201"
file = "/certificates/ros2-fundamentals.pdf"
verification = "https://example.com/verify/ros2"
skills = ["ROS2", "Robotics", "Python"]
```
1. Place the PDF certificate inside `public/certificates/ros2-fundamentals.pdf`.
2. Clicking **VIEW CERTIFICATE** on the website will open the built-in PDF viewer modal instantly.

---

### 5. How to Replace Your Resume PDF
1. Save your updated resume as a PDF file at `public/resume/Joel-Jaba-Singh-Resume.pdf`.
2. (Optional) If you change the filename, update `resume` in `src/data/site.toml`:
```toml
[site]
resume = "/resume/Joel-Jaba-Singh-Resume.pdf"
```

---

### 6. How to Update Profile, Social Links & Status
Open `src/data/profile.toml`:

```toml
[profile]
name = "Joel Jaba Singh J"
title = "Final Year Student — Robotics and Automation"
university = "Lovely Professional University"
status = "Open to Opportunities"
tagline = "Building intelligent systems for the physical world."

[profile.social]
github = "https://github.com/your-username"
linkedin = "https://linkedin.in/in/your-username"
email = "joel@example.com"
```
*If any social link is left empty (`""`), the corresponding button will be hidden automatically.*

---

### 7. How to Configure Contact Form Endpoint
By default, sending a message opens a clean `mailto:` draft addressed to your email from `profile.toml`.

If you use a backend API or form service (such as Formspree, Web3Forms, or your own serverless function), set the endpoint in `src/data/site.toml`:

```toml
[site]
contact_endpoint = "https://formspree.io/f/your-form-id"
```
or pass `VITE_CONTACT_ENDPOINT` in your environment variables.

---

## 💻 Local Development & Build Commands

```bash
# Install dependencies
npm install

# Run dev server with hot module replacement (HMR)
npm run dev

# Check TypeScript types & compile production build
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

Vercel will build and host your portfolio live in under a minute! Every time you push an update to your TOML files on GitHub, Vercel will automatically redeploy the new website content.
