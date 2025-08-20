import "./style.css";
import { PDFGenerator } from "./pdf-generator";
import { resumeData } from "./resume-data";

class TerminalResume {
  private terminalBody: HTMLElement;

  constructor() {
    this.terminalBody = document.getElementById("app") as HTMLElement;
    this.init();
  }

  private init(): void {
    this.createTerminalStructure();
    this.startBootSequence();
  }

  private createTerminalStructure(): void {
    this.terminalBody.innerHTML = `
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">moshe@resume:~$ better-everyday</div>
        </div>
        <div class="terminal-body" id="terminal-content">
          <div class="boot-sequence"></div>
        </div>
      </div>
    `;
  }

  private async startBootSequence(): Promise<void> {
    const bootContainer = document.querySelector(
      ".boot-sequence",
    ) as HTMLElement;

    const bootMessages = [
      "Initializing resume.exe...",
      "Loading professional experience...",
      "Mounting skills database...",
      "Establishing network connections...",
      "System ready. Welcome!",
    ];

    for (const message of bootMessages) {
      await this.typeText(bootContainer, `[  OK  ] ${message}`, 50);
      await this.delay(300);
    }

    await this.delay(1000);
    this.showMainContent();
  }

  private async typeText(
    container: HTMLElement,
    text: string,
    speed = 30,
  ): Promise<void> {
    const line = document.createElement("div");
    line.className = "output";
    container.appendChild(line);

    for (let i = 0; i <= text.length; i++) {
      line.textContent = text.slice(0, i);
      if (i < text.length) {
        line.innerHTML = `${text.slice(0, i)}<span class="typing-animation">_</span>`;
      }
      await this.delay(speed);
    }

    line.innerHTML = text;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private showMainContent(): void {
    const terminalContent = document.getElementById(
      "terminal-content",
    ) as HTMLElement;
    terminalContent.innerHTML = `
      <div class="ascii-art">
 ███╗   ███╗ ██████╗ ███████╗██╗  ██╗███████╗
 ████╗ ████║██╔═══██╗██╔════╝██║  ██║██╔════╝
 ██╔████╔██║██║   ██║███████╗███████║█████╗  
 ██║╚██╔╝██║██║   ██║╚════██║██╔══██║██╔══╝  
 ██║ ╚═╝ ██║╚██████╔╝███████║██║  ██║███████╗
 ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
 
  █████╗ ███████╗ █████╗ ██████╗ ██╗ █████╗ 
 ██╔══██╗╚══███╔╝██╔══██╗██╔══██╗██║██╔══██╗
 ███████║  ███╔╝ ███████║██████╔╝██║███████║
 ██╔══██║ ███╔╝  ██╔══██║██╔══██╗██║██╔══██║
 ██║  ██║███████╗██║  ██║██║  ██║██║██║  ██║
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
      </div>
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>whoami</span>
      </div>
      <div class="output">${resumeData.name} - ${resumeData.title}</div>
      <div class="output">${resumeData.email}</div>
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>cat summary.txt</span>
      </div>
      <div class="output">${resumeData.summary.replace(/\n/g, "<br>")}</div>
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>ls -la experience/</span>
      </div>
      ${this.renderExperience()}
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>cat skills.json</span>
      </div>
      ${this.renderSkills()}
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>find . -name "education*"</span>
      </div>
      ${this.renderEducation()}
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>echo "Contact Information"</span>
      </div>
      ${this.renderContact()}
      
      <button class="download-btn" id="download-pdf">
        download resume.pdf
      </button>
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span class="typing-animation">_</span>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderExperience(): string {
    return resumeData.experience
      .map(
        (job) => `
      <div class="section">
        <div class="section-title">${job.title}</div>
        <div class="section-content">
          <div class="job-company">${job.company}</div>
          <div class="job-dates">${job.dates}</div>
          ${job.description.map((desc) => `<div>• ${desc}</div>`).join("")}
        </div>
      </div>
    `,
      )
      .join("");
  }

  private renderSkills(): string {
    return Object.entries(resumeData.skills)
      .map(
        ([category, skills]) => `
      <div class="skills-grid">
        <div class="skill-category">"${category}":</div>
        <div class="skill-list">[${skills.map((skill) => `"${skill}"`).join(", ")}]</div>
      </div>
    `,
      )
      .join("");
  }

  private renderEducation(): string {
    return resumeData.education
      .map(
        (edu) => `
      <div class="section">
        <div class="section-title">${edu.degree}</div>
        <div class="section-content">
          <div>${edu.school} (${edu.year})</div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  private renderContact(): string {
    return `
      <div class="contact-links">
        <a href="mailto:${resumeData.email}" class="contact-link">📧 ${resumeData.email}</a>
        <a href="https://${resumeData.linkedin}" target="_blank" class="contact-link">💼 LinkedIn</a>
        <a href="https://${resumeData.github}" target="_blank" class="contact-link">🔗 GitHub</a>
        <a href="https://${resumeData.stackoverflow}" target="_blank" class="contact-link">📚 Stack Overflow</a>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const downloadBtn = document.getElementById("download-pdf");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const pdfGenerator = new PDFGenerator();
        pdfGenerator.download();
      });
    }
  }
}

// Initialize the terminal resume
new TerminalResume();
