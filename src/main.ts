import "./style.css";
import { resumeData } from "./resume-data";

class TerminalResume {
  private terminalBody: HTMLElement;

  constructor() {
    this.terminalBody = document.getElementById("app") as HTMLElement;
    this.init();
  }

  private init(): void {
    this.createTerminalStructure();
    
    // Check for skip-boot parameter (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skip-boot') === 'true') {
      this.showMainContent();
    } else {
      this.startBootSequence();
    }
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
      "Initializing ./resume ...",
      "Loading professional experience...",
      "Mounting skills database...",
      "Establishing network connections...",
      "System ready. Welcome!",
    ];

    for (const message of bootMessages) {
      await this.typeText(bootContainer, `${message} √`, 40);
      await this.delay(250);
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
      
      <button class="download-btn" id="view-cv">
        view cv
      </button>
      
      <div class="command-line" id="final-prompt">
        <span class="prompt-symbol">$</span>
        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Type a command..." />
        <span class="typing-animation hidden" id="prompt-cursor">_</span>
      </div>
      <div id="command-output"></div>
    `;

    this.attachEventListeners();
  }

  private showViewCvCommand(): void {
    const terminalInput = document.getElementById(
      "terminal-input",
    ) as HTMLInputElement;
    const promptCursor = document.getElementById("prompt-cursor");

    if (terminalInput && promptCursor) {
      terminalInput.style.display = "none";
      promptCursor.className = "";
      promptCursor.textContent = "cat cv.txt";
    }
  }

  private isUnixCommand(command: string): boolean {
    const unixCommands = [
      "ls",
      "cd",
      "pwd",
      "mkdir",
      "rmdir",
      "rm",
      "cp",
      "mv",
      "cat",
      "less",
      "more",
      "head",
      "tail",
      "grep",
      "find",
      "locate",
      "which",
      "whereis",
      "man",
      "info",
      "ps",
      "top",
      "htop",
      "kill",
      "killall",
      "jobs",
      "bg",
      "fg",
      "nohup",
      "chmod",
      "chown",
      "chgrp",
      "umask",
      "su",
      "sudo",
      "passwd",
      "who",
      "w",
      "whoami",
      "id",
      "groups",
      "finger",
      "last",
      "history",
      "alias",
      "unalias",
      "tar",
      "gzip",
      "gunzip",
      "zip",
      "unzip",
      "wget",
      "curl",
      "ssh",
      "scp",
      "rsync",
      "ping",
      "traceroute",
      "netstat",
      "ss",
      "lsof",
      "df",
      "du",
      "mount",
      "umount",
      "fdisk",
      "free",
      "uname",
      "uptime",
      "date",
      "cal",
      "echo",
      "printf",
      "wc",
      "sort",
      "uniq",
      "cut",
      "awk",
      "sed",
      "tr",
      "diff",
      "patch",
      "cmp",
      "file",
      "stat",
      "touch",
      "ln",
      "readlink",
      "vim",
      "nano",
      "emacs",
      "git",
      "make",
      "gcc",
      "python",
      "node",
      "npm",
    ];

    const commandName = command.trim().split(" ")[0].toLowerCase();
    return unixCommands.includes(commandName);
  }

  private handleCommand(command: string): void {
    const outputDiv = document.getElementById("command-output");
    if (!outputDiv) return;

    const response = this.isUnixCommand(command)
      ? "That looks like a fine command!"
      : "Nice try...";

    const outputLine = document.createElement("div");
    outputLine.className = "output";
    outputLine.innerHTML = `<span class="prompt-symbol">$</span> ${command}<br>${response}`;
    outputDiv.appendChild(outputLine);

    // Clear input
    const terminalInput = document.getElementById(
      "terminal-input",
    ) as HTMLInputElement;
    if (terminalInput) {
      terminalInput.value = "";
    }

    // Scroll to bottom
    outputDiv.scrollIntoView({ behavior: "smooth", block: "end" });
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
    const viewCvBtn = document.getElementById("view-cv");
    if (viewCvBtn) {
      viewCvBtn.addEventListener("click", () => {
        window.location.href = "/cv.html";
        this.showViewCvCommand();
      });
    }

    const terminalInput = document.getElementById(
      "terminal-input",
    ) as HTMLInputElement;
    const promptCursor = document.getElementById("prompt-cursor");
    
    if (terminalInput) {
      terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const command = terminalInput.value.trim();
          if (command) {
            this.handleCommand(command);
          }
        }
      });

      // Show/hide cursor based on input focus
      terminalInput.addEventListener("focus", () => {
        if (promptCursor) {
          promptCursor.style.display = "none";
        }
      });

      terminalInput.addEventListener("blur", () => {
        if (promptCursor && terminalInput.value === "") {
          promptCursor.style.display = "inline";
        }
      });

      // Focus input when user clicks anywhere on the terminal
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.closest(".terminal-body")) {
          terminalInput.focus();
        }
      });

      // Don't auto-focus the input initially
    }
  }
}

// Initialize the terminal resume
new TerminalResume();
