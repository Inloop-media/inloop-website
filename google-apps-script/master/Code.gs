/**
 * Inloop Media — Lead CRM · MASTER sheet script
 *
 * Paste into the Master spreadsheet: Extensions → Apps Script → Code.gs
 * Then reload the sheet and run "Inloop CRM → 1. Setup" once (see SETUP.md).
 *
 * What it does
 *  - Receives website form leads (doPost) → new row in "Master" with Lead ID IM-1, IM-2 … and Date Registered
 *  - Status / Assigned To dropdowns
 *  - Assigning a lead copies it into that executive's own spreadsheet (+ Date Assigned)
 *  - Executive updates to Status, Remarks, Brief and meetings flow back into Master
 *  - Edits made in Master to those columns are pushed to the executive's sheet
 */

const CFG = {
  MASTER_TAB: "Master",
  EXECUTIVES_TAB: "Executives",
  EXEC_LEADS_TAB: "Leads",
  EXEC_CONFIG_TAB: "_config",
  LEAD_PREFIX: "IM-",
  DATE_FORMAT: "dd-mmm-yyyy hh:mm am/pm",
  SYNC_EVERY_MINUTES: 5,
};

const STATUSES = [
  "New Lead",
  "First Call / Touchbase",
  "Follow-up Scheduled",
  "Discovery Call",
  "Meeting Scheduled",
  "In-Person Meeting",
  "Client Brief Shared to Ops Team",
  "Proposal Deck in Making",
  "Strategy / Proposal Discussion",
  "Negotiation",
  "Awaiting Client Decision",
  "Won",
  "On Hold",
  "No Response",
  "Lost Lead",
];

const MASTER_HEADERS = [
  "Lead ID",
  "Date Registered",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
  "Newsletter",
  "Status",
  "Assigned To",
  "Date Assigned",
  "Remarks",
  "Brief",
  "Meeting Date & Time",
  "Meeting Link",
  "Last Updated",
];

const EXEC_HEADERS = [
  "Lead ID",
  "Date Registered",
  "Date Assigned",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
  "Status",
  "Remarks",
  "Brief",
  "Meeting Date & Time",
  "Schedule Meeting",
  "Meeting Link",
];

// Columns kept in sync between Master and the executive sheets
const SYNCED = ["Status", "Remarks", "Brief", "Meeting Date & Time", "Meeting Link"];
// Lead details copied from Master into an executive sheet on assignment
const COPIED = [
  "Lead ID",
  "Date Registered",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
];

const mCol = (name) => MASTER_HEADERS.indexOf(name) + 1;
const eCol = (name) => EXEC_HEADERS.indexOf(name) + 1;
const props = () => PropertiesService.getScriptProperties();

/* ------------------------------------------------------------------ */
/* Menu + setup                                                        */
/* ------------------------------------------------------------------ */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Inloop CRM")
    .addItem("1. Setup (run once)", "setup")
    .addItem("2. Create / refresh executive sheets", "ensureExecutiveSheets")
    .addSeparator()
    .addItem("Sync from executives now", "syncFromExecutives")
    .addItem("Show website secret", "showSecret")
    .addToUi();
}

function setup() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActive();
  props().setProperty("MASTER_ID", ss.getId());

  // Executive template (holds the meeting-scheduling script)
  if (!props().getProperty("TEMPLATE_ID")) {
    const res = ui.prompt(
      "Executive template",
      "Paste the URL of the 'Inloop Executive Template' spreadsheet (see SETUP.md step 2):",
      ui.ButtonSet.OK_CANCEL
    );
    if (res.getSelectedButton() !== ui.Button.OK) return;
    const id = extractId_(res.getResponseText());
    if (!id) return ui.alert("That doesn't look like a Google Sheets URL. Run Setup again.");
    props().setProperty("TEMPLATE_ID", id);
  }

  // Master tab
  let master = ss.getSheetByName(CFG.MASTER_TAB);
  if (!master) {
    const first = ss.getSheets()[0];
    master = first.getLastRow() === 0 && first.getName() === "Sheet1" ? first.setName(CFG.MASTER_TAB) : ss.insertSheet(CFG.MASTER_TAB, 0);
  }
  styleHeader_(master, MASTER_HEADERS);
  ensureRows_(master, 1000);
  applyMasterRules_(master, 2, master.getMaxRows() - 1);

  // Executives tab
  let execs = ss.getSheetByName(CFG.EXECUTIVES_TAB) || ss.insertSheet(CFG.EXECUTIVES_TAB);
  styleHeader_(execs, ["Executive Name", "Email", "Sheet Link", "Sheet ID"]);
  execs.setColumnWidth(1, 200).setColumnWidth(2, 260).setColumnWidth(3, 360);
  execs.hideColumns(4);

  // Website secret + ID counter
  if (!props().getProperty("SECRET")) props().setProperty("SECRET", Utilities.getUuid().replace(/-/g, ""));
  if (!props().getProperty("LAST_ID")) props().setProperty("LAST_ID", String(maxExistingId_(master)));

  installTriggers_();
  ensureExecutiveSheets();

  ui.alert(
    "Inloop CRM is ready ✅",
    "Next: add your executives (name + Gmail) in the 'Executives' tab, then run 'Inloop CRM → 2. Create / refresh executive sheets'.\n\n" +
      "Website secret (put this in Vercel as LEADS_WEBHOOK_SECRET):\n" + props().getProperty("SECRET"),
    ui.ButtonSet.OK
  );
}

function showSecret() {
  SpreadsheetApp.getUi().alert("LEADS_WEBHOOK_SECRET", props().getProperty("SECRET") || "Run Setup first", SpreadsheetApp.getUi().ButtonSet.OK);
}

function installTriggers_() {
  const keep = ["onMasterEdit", "syncFromExecutives"];
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (keep.includes(t.getHandlerFunction())) ScriptApp.deleteTrigger(t);
  });
  const ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger("onMasterEdit").forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger("syncFromExecutives").timeBased().everyMinutes(CFG.SYNC_EVERY_MINUTES).create();
}

function styleHeader_(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#000000").setFontColor("#ffffff").setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 34);
}

function ensureRows_(sheet, n) {
  if (sheet.getMaxRows() < n) sheet.insertRowsAfter(sheet.getMaxRows(), n - sheet.getMaxRows());
}

function statusRule_() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
}

function applyMasterRules_(sheet, startRow, numRows) {
  if (numRows < 1) return;
  const execs = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  sheet.getRange(startRow, mCol("Status"), numRows).setDataValidation(statusRule_());
  if (execs) {
    const assignRule = SpreadsheetApp.newDataValidation().requireValueInRange(execs.getRange("A2:A"), true).setAllowInvalid(false).build();
    sheet.getRange(startRow, mCol("Assigned To"), numRows).setDataValidation(assignRule);
  }
  ["Date Registered", "Date Assigned", "Meeting Date & Time", "Last Updated"].forEach((h) =>
    sheet.getRange(startRow, mCol(h), numRows).setNumberFormat(CFG.DATE_FORMAT)
  );
  sheet.getRange(startRow, mCol("Remarks"), numRows).setWrap(true);
  sheet.getRange(startRow, mCol("Brief"), numRows).setWrap(true);
}

/* ------------------------------------------------------------------ */
/* Website → Master (Web App)                                          */
/* ------------------------------------------------------------------ */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!body.secret || body.secret !== props().getProperty("SECRET")) return json_({ ok: false, error: "unauthorized" });

    const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
    const id = CFG.LEAD_PREFIX + nextId_();
    const now = new Date();
    const row = MASTER_HEADERS.map(() => "");
    const set = (h, v) => (row[mCol(h) - 1] = v == null ? "" : String(v).slice(0, 5000));

    set("Lead ID", id);
    row[mCol("Date Registered") - 1] = now;
    set("First Name", body.firstName);
    set("Last Name", body.lastName);
    set("Contact Number", body.phone ? "'" + body.phone : "");
    set("Email", body.email);
    set("Brand Name", body.company);
    set("Location", body.location);
    set("Service Interest", body.service);
    set("Estimated Budget", body.budget);
    set("Project Details", body.message);
    set("Newsletter", body.newsletter ? "Yes" : "No");
    set("Status", "New Lead");
    row[mCol("Last Updated") - 1] = now;

    master.appendRow(row);
    applyMasterRules_(master, master.getLastRow(), 1);
    return json_({ ok: true, id });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: "Inloop CRM" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function nextId_() {
  const n = Number(props().getProperty("LAST_ID") || 0) + 1;
  props().setProperty("LAST_ID", String(n));
  return n;
}

function maxExistingId_(master) {
  const last = master.getLastRow();
  if (last < 2) return 0;
  return master
    .getRange(2, mCol("Lead ID"), last - 1)
    .getValues()
    .map((r) => Number(String(r[0]).replace(CFG.LEAD_PREFIX, "")) || 0)
    .reduce((a, b) => Math.max(a, b), 0);
}

/* ------------------------------------------------------------------ */
/* Executives                                                          */
/* ------------------------------------------------------------------ */

function getExecutives_() {
  const sh = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh
    .getRange(2, 1, sh.getLastRow() - 1, 4)
    .getValues()
    .map((r, i) => ({ row: i + 2, name: String(r[0]).trim(), email: String(r[1]).trim(), id: String(r[3]).trim() }))
    .filter((x) => x.name);
}

/** Creates a personal spreadsheet for every executive that doesn't have one yet. */
function ensureExecutiveSheets() {
  const execsTab = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  const templateId = props().getProperty("TEMPLATE_ID");
  if (!templateId) throw new Error("Run 'Inloop CRM → 1. Setup' first.");
  const ownerEmail = Session.getEffectiveUser().getEmail();

  getExecutives_().forEach((ex) => {
    if (ex.id) return;
    const file = DriveApp.getFileById(templateId).makeCopy("Inloop Leads — " + ex.name);
    const ss = SpreadsheetApp.openById(file.getId());

    let leads = ss.getSheetByName(CFG.EXEC_LEADS_TAB) || ss.getSheets()[0].setName(CFG.EXEC_LEADS_TAB);
    styleHeader_(leads, EXEC_HEADERS);
    ensureRows_(leads, 500);
    applyExecRules_(leads, 2, leads.getMaxRows() - 1);

    let cfg = ss.getSheetByName(CFG.EXEC_CONFIG_TAB) || ss.insertSheet(CFG.EXEC_CONFIG_TAB);
    cfg.getRange(1, 1, 3, 2).setValues([
      ["MASTER_EMAIL", ownerEmail],
      ["EXECUTIVE_NAME", ex.name],
      ["EXECUTIVE_EMAIL", ex.email],
    ]);
    cfg.hideSheet();

    if (ex.email) {
      try {
        file.addEditor(ex.email);
      } catch (err) {
        console.warn("Could not share with " + ex.email + ": " + err);
      }
    }

    execsTab.getRange(ex.row, 3).setValue(ss.getUrl());
    execsTab.getRange(ex.row, 4).setValue(file.getId());
    ScriptApp.newTrigger("onExecutiveEdit").forSpreadsheet(ss).onEdit().create();
  });

  // Refresh the Assigned To dropdown so new names show up
  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  if (master) applyMasterRules_(master, 2, master.getMaxRows() - 1);
}

function applyExecRules_(sheet, startRow, numRows) {
  sheet.getRange(startRow, eCol("Status"), numRows).setDataValidation(statusRule_());
  sheet.getRange(startRow, eCol("Schedule Meeting"), numRows).insertCheckboxes();
  ["Date Registered", "Date Assigned", "Meeting Date & Time"].forEach((h) =>
    sheet.getRange(startRow, eCol(h), numRows).setNumberFormat(CFG.DATE_FORMAT)
  );
  const dateRule = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText("Pick a date, then type the time e.g. 25/10/2026 15:30").build();
  sheet.getRange(startRow, eCol("Meeting Date & Time"), numRows).setDataValidation(dateRule);
  sheet.getRange(startRow, eCol("Remarks"), numRows).setWrap(true);
  sheet.getRange(startRow, eCol("Brief"), numRows).setWrap(true);
}

function execByName_(name) {
  return getExecutives_().find((x) => x.name === name);
}

function execLeadsSheet_(ex) {
  if (!ex || !ex.id) return null;
  return SpreadsheetApp.openById(ex.id).getSheetByName(CFG.EXEC_LEADS_TAB);
}

function findRowById_(sheet, idCol, leadId) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const ids = sheet.getRange(2, idCol, last - 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(leadId)) return i + 2;
  return 0;
}

/* ------------------------------------------------------------------ */
/* Master edits                                                        */
/* ------------------------------------------------------------------ */

function onMasterEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() === CFG.EXECUTIVES_TAB) return; // names/emails: use menu item 2
  if (sheet.getName() !== CFG.MASTER_TAB) return;

  const r0 = e.range.getRow();
  const c0 = e.range.getColumn();
  const rows = e.range.getNumRows();
  const cols = e.range.getNumColumns();
  if (r0 + rows - 1 < 2) return;

  for (let r = Math.max(r0, 2); r < r0 + rows; r++) {
    for (let c = c0; c < c0 + cols; c++) {
      const header = MASTER_HEADERS[c - 1];
      if (header === "Assigned To") assignLead_(sheet, r);
      else if (SYNCED.includes(header)) pushToExecutive_(sheet, r, header);
    }
    sheet.getRange(r, mCol("Last Updated")).setValue(new Date());
  }
}

function assignLead_(master, row) {
  const leadId = master.getRange(row, mCol("Lead ID")).getValue();
  if (!leadId) return;
  const newName = String(master.getRange(row, mCol("Assigned To")).getValue()).trim();

  // Remove the lead from whoever had it before
  getExecutives_().forEach((ex) => {
    if (ex.name === newName || !ex.id) return;
    const sh = execLeadsSheet_(ex);
    const r = sh && findRowById_(sh, eCol("Lead ID"), leadId);
    if (r) sh.deleteRow(r);
  });

  if (!newName) {
    master.getRange(row, mCol("Date Assigned")).clearContent();
    return;
  }

  let ex = execByName_(newName);
  if (ex && !ex.id) {
    ensureExecutiveSheets();
    ex = execByName_(newName);
  }
  const sh = execLeadsSheet_(ex);
  if (!sh) return;

  const now = new Date();
  master.getRange(row, mCol("Date Assigned")).setValue(now);

  const values = master.getRange(row, 1, 1, MASTER_HEADERS.length).getValues()[0];
  const get = (h) => values[mCol(h) - 1];
  const out = EXEC_HEADERS.map((h) => {
    if (h === "Date Assigned") return now;
    if (h === "Schedule Meeting") return false;
    if (COPIED.includes(h) || SYNCED.includes(h)) return get(h);
    return "";
  });
  if (out[eCol("Contact Number") - 1]) out[eCol("Contact Number") - 1] = "'" + out[eCol("Contact Number") - 1];

  let target = findRowById_(sh, eCol("Lead ID"), leadId);
  if (!target) {
    target = Math.max(sh.getLastRow(), 1) + 1;
    if (target > sh.getMaxRows()) {
      sh.insertRowsAfter(sh.getMaxRows(), 100);
      applyExecRules_(sh, target, 100);
    }
  }
  sh.getRange(target, 1, 1, EXEC_HEADERS.length).setValues([out]);
}

function pushToExecutive_(master, row, header) {
  const name = String(master.getRange(row, mCol("Assigned To")).getValue()).trim();
  if (!name) return;
  const sh = execLeadsSheet_(execByName_(name));
  if (!sh) return;
  const leadId = master.getRange(row, mCol("Lead ID")).getValue();
  const r = findRowById_(sh, eCol("Lead ID"), leadId);
  if (r) sh.getRange(r, eCol(header)).setValue(master.getRange(row, mCol(header)).getValue());
}

/* ------------------------------------------------------------------ */
/* Executive edits → Master                                            */
/* ------------------------------------------------------------------ */

/** Installable trigger on each executive spreadsheet (runs as the Master owner). */
function onExecutiveEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CFG.EXEC_LEADS_TAB) return;
  const r0 = e.range.getRow();
  const rows = e.range.getNumRows();
  const c0 = e.range.getColumn();
  const cols = e.range.getNumColumns();
  const touched = [];
  for (let c = c0; c < c0 + cols; c++) if (SYNCED.includes(EXEC_HEADERS[c - 1])) touched.push(EXEC_HEADERS[c - 1]);
  if (!touched.length) return;

  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  for (let r = Math.max(r0, 2); r < r0 + rows; r++) {
    const leadId = sheet.getRange(r, eCol("Lead ID")).getValue();
    const mr = leadId && findRowById_(master, mCol("Lead ID"), leadId);
    if (!mr) continue;
    touched.forEach((h) => master.getRange(mr, mCol(h)).setValue(sheet.getRange(r, eCol(h)).getValue()));
    master.getRange(mr, mCol("Last Updated")).setValue(new Date());
  }
}

/** Every few minutes: pull Status / Remarks / Brief / meeting from all executive sheets into Master. */
function syncFromExecutives() {
  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  const last = master.getLastRow();
  if (last < 2) return;
  const data = master.getRange(2, 1, last - 1, MASTER_HEADERS.length).getValues();
  const index = {};
  data.forEach((row, i) => (index[String(row[0])] = i));
  let changed = false;

  getExecutives_().forEach((ex) => {
    const sh = execLeadsSheet_(ex);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, EXEC_HEADERS.length)
      .getValues()
      .forEach((er) => {
        const i = index[String(er[0])];
        if (i == null) return;
        if (String(data[i][mCol("Assigned To") - 1]).trim() !== ex.name) return;
        SYNCED.forEach((h) => {
          const v = er[eCol(h) - 1];
          const cur = data[i][mCol(h) - 1];
          const same = v instanceof Date && cur instanceof Date ? v.getTime() === cur.getTime() : String(v) === String(cur);
          if (!same) {
            data[i][mCol(h) - 1] = v;
            data[i][mCol("Last Updated") - 1] = new Date();
            changed = true;
          }
        });
      });
  });

  if (changed) master.getRange(2, 1, data.length, MASTER_HEADERS.length).setValues(data);
}

/* ------------------------------------------------------------------ */

function masterSS_() {
  return SpreadsheetApp.openById(masterId_());
}

function masterId_() {
  let id = props().getProperty("MASTER_ID");
  if (!id) {
    id = SpreadsheetApp.getActive().getId();
    props().setProperty("MASTER_ID", id);
  }
  return id;
}

function extractId_(url) {
  const m = String(url).match(/\/d\/([a-zA-Z0-9-_]+)/);
  return m ? m[1] : String(url).trim().match(/^[a-zA-Z0-9-_]{30,}$/) ? String(url).trim() : null;
}
