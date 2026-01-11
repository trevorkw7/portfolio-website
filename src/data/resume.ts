export const resume = {
  about:
    "I'm Trevor, a software engineer working at the intersection of real-time systems, automation, and robotics. At Amazon, I work on player UX, playback runtime components, and end-to-end automation orchestration for the Prime Video Android client. Previously, I built LLM-orchestrated ad generation and rendering pipelines at Typeface and led and published field-deployed autonomy research on energy-efficient planning for autonomous underwater vehicles at Scripps Institution of Oceanography (IEEE OCEANS 2024).",

  education: [
    {
      institution: "University of California, San Diego",
      degree: "B.S. Computer Engineering",
      date: "Sept. 2021 – Mar. 2025",
      details: ["Relevant Coursework: Computer Vision, Autonomous Vehicles, Software Engineering, Circuits and Systems, Design & Analysis of Algorithms, Computer Operating Systems, Computer Architecture"]
    }
  ],
  
  experience: [
    {
      title: "Software Development Engineer – Prime Video, Amazon",
      location: "Seattle, WA",
      date: "Aug 2025 – Present",
      details: [
        "Developing video player features for Prime Video on Android and Fire TV devices"
      ],
    },
    {
      title: "Software Engineering Intern, Typeface",
      location: "Seattle, WA",
      date: "Jun 2025 – Sep 2025",
      details: [
        "Worked across Ads team's full stack (TypeScript, React, Python, LangChain) building agentic AI ad pipeline from chat prompts through generative models (DALL-E 2, GPT) to platform-specific rendering for Meta and Google ads — serving major enterprise clients including Coca-Cola, Albertsons, Microsoft, and Asics",
        "Owned end-to-end Rich Layout Previews as pipeline endpoint, converting AI-generated content into platform-accurate visual previews across 5 ad formats (Meta Single Image, Carousel, Collection + Google Display, Search) with real-time editing in infinite canvas",
        "Resolved major launch blockers for [Spaces](https://www.typeface.ai/product/spaces), Typeface's transition from UI-based workflows to chat-native collaborative canvas, implementing driver-based preview architecture with live editing and variant swapping that reduced malformed requests and streamlined agent-driven content creation"
      ],
      link: 'https://www.typeface.ai/product/spaces'
    },
    {
      title: "Robotics Researcher – Embedded Systems & Control, Scripps Institution of Oceanography",
      location: "San Diego, CA",
      date: "Jun 2022 – Present",
      details: [
        "Designed closed-loop controllers in ROS (Python/C++) for 100m-class AUVs, improving real-time energy efficiency by 9% via dynamic depth optimization",
        "Built embedded autonomy systems using multi-modal sensor fusion (IMU, salinity, depth), reducing manual survey efforts by over 150 hours",
        "Developed fault-tolerant software architecture enabling resilient deployment across diverse oceanic conditions",
        "Created GUI for embedded magnetometer data processing, increasing real-time detection accuracy 6× during recovery operations in Vietnam",
        "First-authored peer-reviewed IEEE Oceans 2024 paper on adaptive autonomy in marine robotics"
      ],
    },
    {
      title: "Frontend Project Manager, Association for Computing Machinery @ UCSD",
      location: "San Diego, CA",
      date: "May 2022 – June 2024",
      details: [
        "Led 13-person team to migrate portal to Next.js & TypeScript, achieving a 250% performance gain via domain-driven architecture and dynamic code splitting",
        "Built admin dashboard for recruiters using promise-based async ZIP generation, enabling bulk resume download and reducing screening time by 60%"
      ],
      link: 'https://members.acmucsd.com/'
    },
    {
      title: "Founder and Full Stack Developer, Notes For Frontliners",
      location: "Seattle, WA",
      date: "Mar 2020 – Sep 2021",
      details: [
        "Developed React + Firebase web app enabling real-time note delivery to 800+ users across 14 hospitals, supporting healthcare morale efforts",
        "Automated community message printing pipeline via custom PDF generator, scaling throughput to 1K+ messages and reducing operational costs"
      ],
      link: 'https://notesforfrontliners.org/'
    },
  ],
  
  projects: [
    {
      name: "Autonomous Police Car",
      tech: "ROS2, Python, Computer Vision (YOLO, OpenCV)",
      description: "Led the software development for an autonomous RC police car project, creating a ROS2 package ('robocar_visual_pursuit_pkg') to enable visual pursuit. Utilized YOLOv4-tiny on an OAK-D camera for real-time vehicle detection and tracking. Implemented adaptive PID steering control, dynamic throttle management based on tracking error, and a real-time parameter tuning interface with persistence for robust performance in chasing scenarios.",
      link: "https://github.com/UCSD-ECEMAE-148/148-winter-2025-final-project-team-11?tab=readme-ov-file"
    },
    {
      name: "VibeCheck",
      tech: "Next.js, React, TypeScript, Hume.ai API, react-vis, react-webcam, react-player, MongoDB, Figma",
      description: "Proof-of-concept engagement analytics platform using Hume.ai's facial expression models via webcam feed to analyze student engagement during online learning. Provides live feedback graphs for both individual students and aggregate data for teachers to improve teaching methods. Built at CalHacks 2023.",
      link: "https://devpost.com/software/vibecheck-75l1iv"
    }
  ],
  
  publications: [
    {
      title: "Chasing Currents: Implementing Depth Optimization for AUV Energy Savings",
      authors: "Trevor Kwan; Raymond Young; Andrew Nager; Mark Anderson; Eric Terrill; Sophia Merrifield",
      conference: "IEEE Oceans 2024",
      date: "2024",
      link: "https://doi.org/10.1109/OCEANS55160.2024.10754212"
    }
  ],
  
  skills: [
    "Python",
    "C/C++",
    "Java",
    "JavaScript",
    "TypeScript",
    "MATLAB",
    "SQL",
    "HTML/CSS",
    "ROS",
    "React",
    "Node.js",
    "Docker",
    "Git",
    "Firebase",
    "JUnit",
    "OpenCV",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "PyTorch",
    "PID control",
    "IMU integration",
    "Sensor fusion",
    "Multi-DOF systems",
    "I2C/UART",
    "OAK-D"
  ],
};
