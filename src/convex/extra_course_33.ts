import type { CourseModule } from "./schema";

export type ExtraCourse = {
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  priceCents: number;
  durationMinutes: number;
  order: number;
  instructor: string;
  instructorTitle: string;
  modules: CourseModule[];
};

export const extraCourse33: ExtraCourse = {
  title: "Smart Agriculture System Architecture",
  description:
    "Learn to design and build end-to-end smart agriculture ecosystems. Covers microservice architecture, API gateways, IoT sensor integration, cloud deployment, and production DevOps using the AgroAI framework.",
  category: "AgTech",
  duration: "8 weeks",
  difficulty: "Advanced",
  priceCents: 9900,
  durationMinutes: 480,
  order: 33,
  instructor: "Dr. Aniket Asawale",
  instructorTitle: "Systems Architect & Cloud Infrastructure Engineer",
  modules: [
    {
      title: "Introduction to Smart Agriculture Systems",
      content: [
        { type: "paragraph", text: "Smart agriculture systems integrate multiple technologies — IoT sensors, machine learning, cloud computing, and mobile applications — into a cohesive ecosystem. The AgroAI framework demonstrates this with 8 interconnected modules." },
        { type: "paragraph", text: "A well-designed system must handle: real-time data ingestion from field sensors, asynchronous ML model inference, user authentication, cross-platform mobile access, and reliable cloud deployment." },
        { type: "paragraph", text: "Microservice architecture offers: independent deployment (update disease detector without touching sensors), technology flexibility (Python for ML, Flutter for mobile, PostgreSQL for data), fault isolation, and horizontal scaling." },
        { type: "quiz", title: "Smart Agriculture Systems", passPercent: 60, questions: [
          { question: "How many modules does the AgroAI framework contain?", options: ["3 modules", "8 modules", "15 modules", "1 module"], answerIndex: 1 },
          { question: "What is a key advantage of microservice architecture?", options: ["All modules must use the same language", "Independent deployment — update one service without affecting others", "It requires less code", "It eliminates APIs"], answerIndex: 1 },
          { question: "Why is fault isolation important?", options: ["It makes the system smaller", "A sensor failure shouldn't crash the recommendation engine", "It reduces development time", "It eliminates testing"], answerIndex: 1 },
          { question: "What technology does the AgroAI mobile app use?", options: ["React Native", "Flutter with Dart", "Swift only", "HTML5 only"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Microservice Design Patterns",
      content: [
        { type: "paragraph", text: "The AgroAI system implements key patterns: API Gateway (centralized request routing), Circuit Breaker (fault tolerance), Event-Driven Communication (async data flow), and Database-per-service (preventing tight coupling)." },
        { type: "paragraph", text: "The API Gateway centralizes cross-cutting concerns: authentication, rate limiting, request routing, and response caching. It routes requests to the appropriate backend service." },
        { type: "paragraph", text: "Database-per-service gives each microservice its own database. AgroSensor uses PostgreSQL for time-series data, Auth uses PostgreSQL for user credentials, and ML services use file-based model storage. Services communicate through APIs, not shared databases." },
        { type: "quiz", title: "Microservice Patterns", passPercent: 60, questions: [
          { question: "What does the API Gateway pattern centralize?", options: ["Database storage", "Authentication, rate limiting, request routing, and caching", "Machine learning training", "Sensor calibration"], answerIndex: 1 },
          { question: "What is the database-per-service pattern?", options: ["All services share one database", "Each microservice owns its own database", "Services store data in files only", "Databases are optional"], answerIndex: 1 },
          { question: "How do microservices communicate in a loosely-coupled architecture?", options: ["Through shared databases", "Through well-defined APIs", "By directly accessing each other's memory", "Through file transfers only"], answerIndex: 1 },
          { question: "What is the purpose of a Circuit Breaker pattern?", options: ["To increase network speed", "To prevent cascading failures when a service is down", "To encrypt data", "To compress responses"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Authentication & Security",
      content: [
        { type: "paragraph", text: "The AgroAI Auth microservice implements JWT (JSON Web Token) authentication with PostgreSQL-backed user management. JWT tokens provide stateless authentication, reducing database lookups on every request." },
        { type: "paragraph", text: "Security best practices: HTTPS everywhere, role-based access control (farmers see their data, admins see all), API key management for IoT devices, and input validation." },
        { type: "paragraph", text: "The auth flow: (1) Register with email/password, (2) Password hashed with bcrypt, (3) On login, verify credentials and issue JWT, (4) JWT contains user ID and role, (5) Subsequent requests include JWT in Authorization header, (6) API Gateway validates JWT before routing." },
        { type: "quiz", title: "Authentication & Security", passPercent: 60, questions: [
          { question: "Why does AgroAI use JWT authentication?", options: ["It is the oldest method", "JWT provides stateless auth, reducing database lookups", "It requires no server", "It only works on mobile"], answerIndex: 1 },
          { question: "Why is HTTPS important for IoT platforms?", options: ["It makes pages load faster", "To encrypt sensor data and farm information in transit", "It is optional for IoT", "It only applies to browsers"], answerIndex: 1 },
          { question: "What is the purpose of role-based access control?", options: ["To make the system faster", "To ensure farmers see only their data while admins see all", "To reduce code size", "To improve model accuracy"], answerIndex: 1 },
          { question: "How does the auth flow handle password security?", options: ["Passwords stored in plain text", "Passwords hashed with bcrypt before storage", "Passwords sent via email", "Passwords are optional"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Cloud Deployment & DevOps",
      content: [
        { type: "paragraph", text: "Deploying agriculture systems to the cloud requires reliable infrastructure. The AgroAI system deploys on Oracle Cloud with Nginx reverse proxy, systemd service management, and automated deployment scripts." },
        { type: "paragraph", text: "Key deployment components: Nginx (load balancing, SSL termination, static file serving), systemd (auto-restart on failure, resource limits), Docker containers for service isolation, and CI/CD pipelines for automated testing and deployment." },
        { type: "paragraph", text: "Monitoring and observability: track API response times (<200ms), sensor data freshness (alert if >5 minutes old), ML model accuracy drift, and system resource usage. Prometheus + Grafana is the standard open-source monitoring stack." },
        { type: "quiz", title: "Cloud Deployment", passPercent: 60, questions: [
          { question: "What role does Nginx play?", options: ["It trains ML models", "Reverse proxy for load balancing, SSL termination, and static file serving", "It stores sensor data", "It runs the mobile app"], answerIndex: 1 },
          { question: "Why is systemd used in production?", options: ["It provides database storage", "Process management with auto-restart on failure and resource limits", "It trains ML models", "It handles authentication"], answerIndex: 1 },
          { question: "What should be monitored for sensor data freshness?", options: ["Only CPU usage", "Alert if sensor data is older than 5 minutes", "Only disk space", "Only network speed"], answerIndex: 1 },
          { question: "Why might ML inference spike during planting season?", options: ["Models run slower in warm weather", "More farmers query for recommendations during planting decisions", "Servers are weaker", "Data quality drops"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Mobile App Development for Agriculture",
      content: [
        { type: "paragraph", text: "The AgroAI mobile app uses Flutter/Dart for cross-platform deployment (Android and iOS). Flutter's single codebase approach reduces development time while providing native performance." },
        { type: "paragraph", text: "Key mobile features: offline data caching (poor connectivity), camera integration for disease detection, GPS for field mapping, push notifications, and local model inference for real-time diagnosis." },
        { type: "paragraph", text: "Mobile UX for agriculture must account for: bright sunlight (high contrast, large targets), gloved hands (big buttons), limited connectivity (offline-first design), multilingual support, and data usage awareness." },
        { type: "quiz", title: "Mobile Development", passPercent: 60, questions: [
          { question: "Why does AgroAI use Flutter?", options: ["It is the only mobile framework", "Single codebase for Android and iOS with native performance", "It requires no internet", "It only works on iOS"], answerIndex: 1 },
          { question: "Why is offline data caching important?", options: ["It makes the app prettier", "Farmers often work in areas with poor connectivity", "It reduces development time", "It is required by law"], answerIndex: 1 },
          { question: "What UX consideration is critical for bright sunlight?", options: ["Dark themes only", "High contrast UI with large touch targets", "Small text for detail", "Complex animations"], answerIndex: 1 },
          { question: "How does the app handle disease detection without internet?", options: ["It doesn't work offline", "It runs the EfficientNet model locally on the device", "It sends SMS instead", "It queues requests"], answerIndex: 1 },
        ]},
      ],
    },
    {
      title: "Scaling & Production Operations",
      content: [
        { type: "paragraph", text: "Scaling from prototype to production requires: concurrent sensor connections, API throughput, storage growth for time-series data, and model serving latency for real-time disease detection." },
        { type: "paragraph", text: "Horizontal scaling: multiple API gateway instances behind a load balancer, database read replicas, containerized ML services that scale independently, and CDN for static assets." },
        { type: "paragraph", text: "Production best practices: blue-green deployments (zero-downtime updates), automated backups, disaster recovery (geographic redundancy), cost monitoring, and user feedback loops. The system must be reliable enough that farmers trust it with their livelihood." },
        { type: "quiz", title: "Scaling & Operations", passPercent: 60, questions: [
          { question: "What is blue-green deployment?", options: ["Deploying on two cloud providers", "Zero-downtime updates by running two identical environments", "A color scheme for the dashboard", "Deploying only on weekdays"], answerIndex: 1 },
          { question: "Why are automated backups critical?", options: ["To save money", "Sensor data is irreplaceable and essential for ML model training", "To make the system faster", "They are optional"], answerIndex: 1 },
          { question: "What scaling strategy works for ML model serving?", options: ["Using a single powerful server", "Containerized ML services that scale independently", "Running models on sensors", "Using only CPU inference"], answerIndex: 1 },
          { question: "Why must agricultural platforms be highly reliable?", options: ["For aesthetic reasons", "Farmers trust the system with their livelihood and planting decisions", "Reliability is optional", "It only matters during harvest"], answerIndex: 1 },
        ]},
      ],
    },
  ],
};
