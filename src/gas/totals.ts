/**
 * @NotOnlyCurrentDoc Limits the script to only accessing the current sheet.
 *
 * Create & manage categories which are used in individual coin sheets
 *
 */
import { version } from '../version';

/* global GoogleAppsScript */
/* global SpreadsheetApp */

/**
 * A function that deletes, repopulates & formats the Totals page based on the coin sheets that already exist.
 *
 * @return the newly created sheet, for function chaining purposes.
 */
export default function resetTotalSheet(): GoogleAppsScript.Spreadsheet.Sheet | null {
    if (typeof ScriptApp !== 'undefined') {
        // delete the previous HODL Totals sheet, if any
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('HODL Totals')?.clear();
        if (sheet != null) {
            sheet.clear();
            sheet.getFilter()?.remove();
        } else {
            sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('HODL Totals', 0);
        }

        // Initial set of categories provided out of the box
        const header = ['      ↩ Sheet     ', '     Holdings     ', '=CONCATENATE(COUNT(B2:B)," Coins")', '    Last Reconciliation    ', '       Off By       ', '    Last Calculation    ', '     Calc Status     '];

        // populate the header cells
        sheet.getRange('1:1').addDeveloperMetadata('version', version);
        sheet.getRange('A1:G1').setValues([header]).setFontWeight('bold').setHorizontalAlignment('center');
        sheet.getRange('A1:G1').setBackground('#DDDDEE');

        // walk through all sheets in workbook to pick out the coin names & links
        const allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
        const ssUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
        const excludedSheetNames = ['HODL Totals', 'Wallets/Accounts', 'Categories', 'NFT Categories'];
        let rowCount = 1;
        for (const s in allSheets) {
            const coinSheet = allSheets[s];

            // Stop iteration execution if the condition is meet.
            if (excludedSheetNames.indexOf(coinSheet.getName()) === -1) {
                const newCoinName = coinSheet.getName().replace(/ *\([^)]*\) */g, '');
                const newCoinSheetUrl = `${ssUrl}#gid=${coinSheet.getSheetId()}`;
                rowCount += 1;
                const data = [`=HYPERLINK("${newCoinSheetUrl}","${newCoinName}")`, `=INDIRECT("'"&$A${rowCount}&"'!$C$1")`, newCoinName, `=INDIRECT("'"&$A${rowCount}&"'!$E$1")`,
                    `=INDIRECT("'"&$A${rowCount}&"'!$G$1")`, `=INDIRECT("'"&$A${rowCount}&"'!$S$1")`, `=INDIRECT("'"&$A${rowCount}&"'!$T$1")`];
                sheet.appendRow(data);
            }
        }

        // format all populated coin rows
        sheet.getRange(`D2:D${rowCount}`).setNumberFormat('yyyy-mm-dd');
        sheet.getRange(`F2:F${rowCount}`).setNumberFormat('yyyy-mm-dd h:mm:ss').setHorizontalAlignment('right');

        // create filter around all populated coin rows
        sheet.getRange(`A1:G${rowCount}`).createFilter();

        // autosize the columns' widths, add conditional formatting
        sheet.autoResizeColumns(1, 7);
        setConditionalFormattingRules(sheet, rowCount);
        SpreadsheetApp.flush();

        return sheet;
    }
    return null;
}

function setConditionalFormattingRules(sheet: GoogleAppsScript.Spreadsheet.Sheet, rowCount: number): void {
    // Color the cell that displays last reconciliation date, off by and calc status
    // to help users see if their sheet totals overall are in a healthy state
    const lastRecRange = sheet.getRange(`D2:D${rowCount}`);
    const offByRange = sheet.getRange(`E2:E${rowCount}`);
    // and Color the success/failure cell to indicate health of the last calculation
    const calcStatusRange = sheet.getRange(`G2:G${rowCount}`);

    // extract the conditional rules set on all other cells on this sheet
    const rules = SpreadsheetApp.getActiveSheet().getConditionalFormatRules();
    const newRules = [] as GoogleAppsScript.Spreadsheet.ConditionalFormatRule [];
    for (let i = 0; i < rules.length; i++) {
        const ruleRange = rules[i].getRanges()?.[0].getA1Notation();
        if ((ruleRange !== lastRecRange.getA1Notation()) && (ruleRange !== offByRange.getA1Notation()) && (ruleRange !== calcStatusRange.getA1Notation())) {
            newRules.push(rules[i]);
        }
    }
    // add back the rules for the cells we are formatting
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=D2>39816') // date recorded takes place after the bitcoin genesis block
        .setBackground('#B7E1CD') // green success
        .setRanges([lastRecRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=1')
        .setBackground('#F4C7C3') // red failure
        .setRanges([lastRecRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenNumberBetween(-0.001, 0.001)
        .setBackground('#B7E1CD') // green success
        .setRanges([offByRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenNumberNotBetween(-0.001, 0.001)
        .setBackground('#FFFF00') // yellow success
        .setRanges([offByRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=1')
        .setBackground('#F4C7C3') // red failure
        .setRanges([offByRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextStartsWith('Succeeded')
        .setBackground('#B7E1CD') // green success
        .setRanges([calcStatusRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextStartsWith('Failed')
        .setBackground('#F4C7C3') // red failure
        .setRanges([calcStatusRange])
        .build());
    newRules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=1')
        .setBackground('#F4C7C3') // red failure
        .setRanges([calcStatusRange])
        .build());
    sheet.setConditionalFormatRules(newRules);
}
