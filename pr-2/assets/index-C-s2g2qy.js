var c=Object.defineProperty;var d=(o,e,t)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var l=(o,e,t)=>d(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const s={name:"Moshe Azaria",title:"Automation, QA & DevOps Team Lead",email:"moshisho84@gmail.com",linkedin:"linkedin.com/in/moshisho",github:"github.com/Moshisho",stackoverflow:"stackoverflow.com/users/2470092/moshisho",summary:`# Senior Junior Super Mega Ninja Developer - I'm less of a fan of labels, I like automation & CI processes :)
# B.Sc in Physics - a problem solver.
# Best practices liker.

I'm a self-educator in lots of domains and can't define myself to one, but whatever I do, I like to get into it and deepen my knowledge in it as I've done in QA and Automation development. With this approach it's easier to provide end 2 end solutions for CI processes.

In the course of years I've learned much about human behaviour and our world from my business and academic experience along with the scientific way of thinking of things and testing them.`,experience:[{title:"Automation, QA & DevOps Team Lead",company:"Sage",dates:"January 2020 - Present",description:["I don't really do anything... I simply have amazing people in my team."]},{title:"Automation & CI/CD",company:"Sage",dates:"June 2019 - January 2020",description:["Focused on automation and continuous integration/deployment processes"]},{title:"Full Stack Developer",company:"Gett",dates:"June 2018 - June 2019",description:["Full-stack development work at mobility services company"]},{title:"Automation Tech Lead",company:"Gett",dates:"June 2017 - June 2018",description:["Led automation initiatives and technical strategy"]},{title:"Automation Engineer",company:"Hewlett Packard Enterprise",dates:"March 2016 - January 2017",description:["Automating regression & e2e tests as part of the enablement team","Developing Framework (Java) - Selenium wrapper, Maven, Best practices","CI/CD Process - Jenkins, Docker, VeriGreen, Reporting (JSystem, TestNG, Allure)","Partly DevOps to ENABLE agile development"]},{title:"Automation Developer & Lead",company:"Music Lab LTD",dates:"July 2015 - March 2016",description:["Developing automation solutions - QA and BI: Nightly builds, Application life-cycle","Using C# mainly - Visual Studio, NuGet, EF","In-Charge of automation department - software and hardware","Managed servers (Microsoft - IIS, SQL, HyperV. Ubuntu - Zabbix), VMs, PCs"]},{title:"QA Automation Developer",company:"Music Lab LTD",dates:"April 2013 - July 2015",description:["Automation development for variety of applications","Programming in C# with AutoIt, SQL, Batch and HTML","Emphasis on clean, readable and professional code"]}],education:[{degree:"B.Sc in Physics",school:"Bar-Ilan University",year:"2008 - 2010"},{degree:"Java Programmer Certificate",school:"Nasi Technologies",year:"2012 - 2013"}],skills:{"Core Areas":["Testing","Quality Assurance","DevOps","CI/CD","Automation"],Languages:["Java","C#","HTML","SQL","JavaScript","TypeScript"],"Frameworks & Tools":["Selenium","Maven","Jenkins","Docker","TestNG"],Platforms:["Windows","Linux","Ubuntu"],Databases:["SQL Server","MongoDB"],"Cloud & DevOps":["Docker","Jenkins","CI/CD Pipelines","VeriGreen"]}};class m{constructor(){l(this,"terminalBody");this.terminalBody=document.getElementById("app"),this.init()}init(){this.createTerminalStructure(),new URLSearchParams(window.location.search).get("skip-boot")==="true"?this.showMainContent():this.startBootSequence()}createTerminalStructure(){this.terminalBody.innerHTML=`
      <div class="terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">moshe-azaria@resume: >_ /better-everyday/</div>
        </div>
        <div class="terminal-body" id="terminal-content">
          <div class="boot-sequence"></div>
        </div>
      </div>
    `}async startBootSequence(){const e=document.querySelector(".boot-sequence"),t=["Initializing ./resume ...","Loading professional experience...","Mounting skills database...","Establishing network connections...","System ready. Welcome!"],a=Math.max(...t.map(n=>n.length));for(const n of t){const i=`${n.padEnd(a)}      √`;await this.typeText(e,i,40),await this.delay(250)}await this.delay(1e3),this.showMainContent()}async typeText(e,t,a=30){const n=document.createElement("div");n.className="output",e.appendChild(n);for(let i=0;i<=t.length;i++)n.textContent=t.slice(0,i),i<t.length&&(n.innerHTML=`${t.slice(0,i)}<span class="typing-animation">_</span>`),await this.delay(a);n.innerHTML=t}delay(e){return new Promise(t=>setTimeout(t,e))}showMainContent(){const e=document.getElementById("terminal-content");e.innerHTML=`
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
      <div class="output">${s.name} - ${s.title}</div>
      <div class="output">${s.email}</div>
      
      <div class="command-line">
        <span class="prompt-symbol">$</span>
        <span>cat summary.txt</span>
      </div>
      <div class="output">${s.summary.replace(/\n/g,"<br>")}</div>
      
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
    `,this.attachEventListeners()}showViewCvCommand(){const e=document.getElementById("terminal-input"),t=document.getElementById("prompt-cursor");e&&t&&(e.style.display="none",t.className="",t.textContent="cat cv.txt")}isUnixCommand(e){const t=["ls","cd","pwd","mkdir","rmdir","rm","cp","mv","cat","less","more","head","tail","grep","find","locate","which","whereis","man","info","ps","top","htop","kill","killall","jobs","bg","fg","nohup","chmod","chown","chgrp","umask","su","sudo","passwd","who","w","whoami","id","groups","finger","last","history","alias","unalias","tar","gzip","gunzip","zip","unzip","wget","curl","ssh","scp","rsync","ping","traceroute","netstat","ss","lsof","df","du","mount","umount","fdisk","free","uname","uptime","date","cal","echo","printf","wc","sort","uniq","cut","awk","sed","tr","diff","patch","cmp","file","stat","touch","ln","readlink","vim","nano","emacs","git","make","gcc","python","node","npm"],a=e.trim().split(" ")[0].toLowerCase();return t.includes(a)}handleCommand(e){const t=document.getElementById("command-output");if(!t)return;const a=this.isUnixCommand(e)?"That looks like a fine command!":"Nice try...",n=document.createElement("div");n.className="output",n.innerHTML=`<span class="prompt-symbol">$</span> ${e}<br>${a}`,t.prepend(n);const i=document.getElementById("terminal-input");i&&(i.value=""),t.scrollIntoView({behavior:"smooth",block:"end"})}renderExperience(){return s.experience.map(e=>`
      <div class="section">
        <div class="section-title">${e.title}</div>
        <div class="section-content">
          <div class="job-company">${e.company}</div>
          <div class="job-dates">${e.dates}</div>
          ${e.description.map(t=>`<div>• ${t}</div>`).join("")}
        </div>
      </div>
    `).join("")}renderSkills(){return Object.entries(s.skills).map(([e,t])=>`
      <div class="skills-grid">
        <div class="skill-category">"${e}":</div>
        <div class="skill-list">[${t.map(a=>`"${a}"`).join(", ")}]</div>
      </div>
    `).join("")}renderEducation(){return s.education.map(e=>`
      <div class="section">
        <div class="section-title">${e.degree}</div>
        <div class="section-content">
          <div>${e.school} (${e.year})</div>
        </div>
      </div>
    `).join("")}renderContact(){return`
      <div class="contact-links">
        <a href="mailto:${s.email}" class="contact-link">📧 ${s.email}</a>
        <a href="https://${s.linkedin}" target="_blank" class="contact-link">💼 LinkedIn</a>
        <a href="https://${s.github}" target="_blank" class="contact-link">🔗 GitHub</a>
        <a href="https://${s.stackoverflow}" target="_blank" class="contact-link">📚 Stack Overflow</a>
      </div>
    `}attachEventListeners(){const e=document.getElementById("view-cv");e&&e.addEventListener("click",async()=>{this.showViewCvCommand(),await this.delay(1200),window.location.href="/cv.html"});const t=document.getElementById("terminal-input"),a=document.getElementById("prompt-cursor");t&&(t.addEventListener("keydown",n=>{if(n.key==="Enter"){const i=t.value.trim();i&&this.handleCommand(i)}}),t.addEventListener("focus",()=>{a&&(a.style.display="none")}),t.addEventListener("blur",()=>{a&&t.value===""&&(a.style.display="inline")}),document.addEventListener("click",n=>{n.target.closest(".terminal-body")&&t.focus()}))}}new m;
