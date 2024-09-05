
# APOLLO Project

This is my first Full-Stack Development project I did in Next.js framework. A Software-as-a-Service web application integrated with Artificial Intelligence to generate YouTube videos for talent growth purposes. The videos are curated with Gemini 1.5 Pro from Vertex AI through YouTube API. User has to sign in with their Google account then insert the course title and its corresponding units. Then, they will directed to the course page where they can see the chapters, its YouTube videos, its summaries, and a set of questions to test the user's understanding of a chapter. 


## Author

- [@grandiv](https://github.com/grandiv) inspired by [@Elliott-Chong](https://github.com/Elliott-Chong)


## Tech Stack

**Framework:** Next.js

**Front-end:** React, ShadCN, TailwindCSS

**Back-end:** Node, Express

**API used:** Vertex AI API, YouTube API, Unsplash API

**Authentication:** Google Authentication

**Database:** Supabase PostgreSQL with Prisma as an ORM

**Containerization:** Docker

**AI Model:** Gemini-1.5-Pro-001

**Payments:** Stripe

**Deployment:**

* **VPS (Ubuntu Virtual Machine):** DigitalOcean Droplet 
* **Web Sever:** Nginx
* **SSL:** Enabled through Certbot using Let's Encrypt

**CI/CD:** GitHub Actions

**Domain Management:** [Name.com](https://www.name.com/)

## Screenshots

[![Logged-In Landing Page](https://i.postimg.cc/VkgDbvhZ/Screenshot-2024-09-04-221514.png)](https://postimg.cc/zyLnsz8T)

[![Example Course Chapter](https://i.postimg.cc/FKKGbm5r/Screenshot-2024-09-04-221655.png)](https://postimg.cc/fV6xZGRp)
## Future Development

* Add a system to track progress
* Refine the AI model for more personalized and relevant course videos based on user's learning progress profile (e.g. user tends to spend more time on videos with illustrations and visual)
* Add an AI prediction to suggest the best next course for user based on user's learning curve
* Add more interactivity and appealing user interface yet still maintaining maximum user experience

