export interface Job {
  title: string;
  company: string;
  dates: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  stackoverflow: string;
  summary: string;
  experience: Job[];
  education: Education[];
  skills: {
    [category: string]: string[];
  };
  languages: {
    [language: string]: string;
  };
}

export const resumeData: ResumeData = {
  name: "Moshe Azaria",
  title: "Automation, QA & DevOps Team Lead",
  email: "moshisho84@gmail.com",
  linkedin: "linkedin.com/in/moshisho",
  github: "github.com/Moshisho",
  stackoverflow: "stackoverflow.com/users/2470092/moshisho",
  summary: `# Senior Junior Super Mega Ninja Developer - I'm less of a fan of labels, I like automation & CI processes :)
# B.Sc in Physics - a problem solver.
# Best practices liker.

I'm a self-educator in lots of domains and can't define myself to one, but whatever I do, I like to get into it and deepen my knowledge in it as I've done in QA and Automation development. With this approach it's easier to provide end 2 end solutions for CI processes.

In the course of years I've learned much about human behaviour and our world from my business and academic experience along with the scientific way of thinking of things and testing them.`,
  experience: [
    {
      title: "Automation, QA & DevOps Team Lead",
      company: "Sage",
      dates: "January 2020 - Present",
      description: [
        "I don't really do anything... I simply have amazing people in my team.",
      ],
    },
    {
      title: "Automation & CI/CD",
      company: "Sage",
      dates: "June 2019 - January 2020",
      description: [
        "Focused on automation and continuous integration/deployment processes",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Gett",
      dates: "June 2018 - June 2019",
      description: ["Full-stack development work at mobility services company"],
    },
    {
      title: "Automation Tech Lead",
      company: "Gett",
      dates: "June 2017 - June 2018",
      description: ["Led automation initiatives and technical strategy"],
    },
    {
      title: "Automation Engineer",
      company: "Hewlett Packard Enterprise",
      dates: "March 2016 - January 2017",
      description: [
        "Automating regression & e2e tests as part of the enablement team",
        "Developing Framework (Java) - Selenium wrapper, Maven, Best practices",
        "CI/CD Process - Jenkins, Docker, VeriGreen, Reporting (JSystem, TestNG, Allure)",
        "Partly DevOps to ENABLE agile development",
      ],
    },
    {
      title: "Automation Developer & Lead",
      company: "Music Lab LTD",
      dates: "July 2015 - March 2016",
      description: [
        "Developing automation solutions - QA and BI: Nightly builds, Application life-cycle",
        "Using C# mainly - Visual Studio, NuGet, EF",
        "In-Charge of automation department - software and hardware",
        "Managed servers (Microsoft - IIS, SQL, HyperV. Ubuntu - Zabbix), VMs, PCs",
      ],
    },
    {
      title: "QA Automation Developer",
      company: "Music Lab LTD",
      dates: "April 2013 - July 2015",
      description: [
        "Automation development for variety of applications",
        "Programming in C# with AutoIt, SQL, Batch and HTML",
        "Emphasis on clean, readable and professional code",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc in Physics",
      school: "Bar-Ilan University",
      year: "2008 - 2010",
    },
    {
      degree: "Java Programmer Certificate",
      school: "Nasi Technologies",
      year: "2012 - 2013",
    },
  ],
  skills: {
    "Core Areas": [
      "Testing",
      "Quality Assurance",
      "DevOps",
      "CI/CD",
      "Automation",
    ],
    Languages: ["Java", "C#", "HTML", "SQL", "JavaScript", "TypeScript"],
    "Frameworks & Tools": ["Selenium", "Maven", "Jenkins", "Docker", "TestNG"],
    Platforms: ["Windows", "Linux", "Ubuntu"],
    Databases: ["SQL Server", "MongoDB"],
    "Cloud & DevOps": ["Docker", "Jenkins", "CI/CD Pipelines", "VeriGreen"],
  },
  languages: {
    Hebrew: "Native or Bilingual",
    English: "Professional Working",
    Spanish: "Elementary",
  },
};
