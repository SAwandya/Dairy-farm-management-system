const express = require("express");
const pdfService = require("../service/pdf-service");

const router = express.Router();

router.get("/", async (req, res) => {

  console.log('download');

  try {
    const pdfBuffer = await pdfService.buildPDF();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=invoice.pdf",
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }

});

module.exports = router;
