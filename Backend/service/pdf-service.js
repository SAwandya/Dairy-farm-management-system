const PDFDocument = require("pdfkit");

function buildPDF() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(pdfBuffer);
    });

    // Add an image to the top left corner
    doc.image("./assets/nevilLogo.png", 30, 30, { width: 130 });

    // Add styled heading
    doc
      .fontSize(25)
      .font("Helvetica-Bold")
      .text("Some heading", { align: "center" })
      .moveDown()
      .strokeColor("#000000")
      .lineWidth(1)
      .moveTo(50, 100)
      .lineTo(550, 100)
      .stroke();

    const tableData = [
      ["Column 1", "Column 2", "Column 3"],
      ["Row 1 Data 1", "Row 1 Data 2", "Row 1 Data 3"],
      ["Row 2 Data 1", "Row 2 Data 2", "Row 2 Data 3"],
    ];

    // Improved table with alternating row colors
    let y = 120;
    for (let i = 0; i < tableData.length; i++) {
      if (i === 0) {
        doc.fontSize(12).font("Helvetica-Bold");
      } else {
        doc.fontSize(12).font("Helvetica");
      }

      if (i % 2 === 0) {
        doc.rect(50, y, 500, 20).fillAndStroke("#f2f2f2", "#000");
      }
      doc.fillColor("#000").text(tableData[i].join(" | "), 60, y + 5);
      y += 20;
    }

    // Add page numbers
    doc
      .fontSize(10)
      .text(`Page 1 of 1`, 50, 780, { align: "center", width: 500 });

    doc.end();
  });
}

module.exports = { buildPDF };
