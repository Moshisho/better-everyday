import { jsPDF } from "jspdf";
import { resumeData } from "./resume-data";

export class PDFGenerator {
  private doc: jsPDF;
  private yPosition = 20;
  private pageHeight: number;
  private margin = 20;

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
  }

  private addText(
    text: string,
    fontSize = 12,
    isBold = false,
    color = "#000000",
  ) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", isBold ? "bold" : "normal");
    this.doc.setTextColor(color);

    if (this.yPosition > this.pageHeight - 30) {
      this.doc.addPage();
      this.yPosition = 20;
    }

    const splitText = this.doc.splitTextToSize(
      text,
      this.doc.internal.pageSize.width - this.margin * 2,
    );
    this.doc.text(splitText, this.margin, this.yPosition);
    this.yPosition += splitText.length * (fontSize * 0.4) + 5;
  }

  private addSection(title: string) {
    this.yPosition += 5;
    this.addText(title.toUpperCase(), 14, true, "#2563eb");
    this.yPosition += 2;
  }

  generate(): void {
    // Header
    this.addText(resumeData.name, 24, true);
    this.addText(resumeData.title, 16, false, "#666666");
    this.yPosition += 5;

    // Contact Info
    const contactInfo = [
      `Email: ${resumeData.email}`,
      `LinkedIn: ${resumeData.linkedin}`,
      `GitHub: ${resumeData.github}`,
      `Stack Overflow: ${resumeData.stackoverflow}`,
    ].join(" | ");
    this.addText(contactInfo, 10, false, "#666666");

    // Summary
    this.addSection("Summary");
    this.addText(resumeData.summary.replace(/# /g, ""));

    // Experience
    this.addSection("Experience");
    for (const job of resumeData.experience) {
      this.addText(`${job.title} at ${job.company}`, 13, true);
      this.addText(job.dates, 10, false, "#666666");
      for (const desc of job.description) {
        this.addText(`• ${desc}`, 11);
      }
      this.yPosition += 3;
    }

    // Education
    this.addSection("Education");
    for (const edu of resumeData.education) {
      this.addText(`${edu.degree} - ${edu.school}`, 12, true);
      this.addText(edu.year, 10, false, "#666666");
      this.yPosition += 3;
    }

    // Skills
    this.addSection("Skills");
    for (const [category, skills] of Object.entries(resumeData.skills)) {
      this.addText(`${category}:`, 12, true);
      this.addText(skills.join(", "), 11);
      this.yPosition += 2;
    }

    // Languages
    this.addSection("Languages");
    for (const [lang, level] of Object.entries(resumeData.languages)) {
      this.addText(`${lang}: ${level}`, 11);
    }
  }

  download(): void {
    this.generate();
    this.doc.save(`${resumeData.name.replace(" ", "_")}_Resume.pdf`);
  }
}
