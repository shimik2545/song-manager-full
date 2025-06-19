function doPost(e) {
  if (!e || !e.postData) {
    return ContentService.createTextOutput(JSON.stringify({ error: "אין נתונים" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("נתונים") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("נתונים");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["קטגוריה", "קצב", "שם שיר", "סולם", "סוג סולם", "זמר", "תאריך"]);
  }

  const data = JSON.parse(e.postData.contents);
  if (data.action === "add") {
    sheet.appendRow([
      data.category,
      data.rhythm,
      data.name,
      data.scale,
      data.tone,
      data.singer,
      new Date()
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("נתונים");
  const rows = sheet.getDataRange().getValues();
  const result = rows.slice(1).map(row => ({
    category: row[0],
    rhythm: row[1],
    name: row[2],
    scale: row[3],
    tone: row[4],
    singer: row[5],
    date: row[6]
  }));
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
