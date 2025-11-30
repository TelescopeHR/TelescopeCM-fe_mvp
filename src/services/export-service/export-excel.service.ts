import { BehaviorSubject } from "rxjs";
import { Workbook, Worksheet } from "exceljs";
import * as fs from "file-saver";
import { getCurrentDate } from "@/utils/utils";

export interface excelOptions {
  adjustColums: IAdjustColumns[];
}
interface IAdjustColumns {
  columnNumber: number;
  columWidth: number;
}

export class ExportExcelService {
  _rawData: any = [];
  isDownloadingBSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  exportExcel(excelData: any, option?: excelOptions) {
    //Create a workbook with a worksheet
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet(excelData.title);
    const newworksheet: Worksheet = workbook.getWorksheet(excelData.title)!;

    //Title, Header & Data
    const title = excelData.title;
    const fileName = excelData.fileName;
    const header = excelData.headers;
    const data = excelData.data;

    worksheet.mergeCells("C1", "E4");
    const titleRow = worksheet.getCell("C1");
    titleRow.value = title;
    titleRow.font = {
      name: "Avenir Next",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "223040" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Time stamp
    worksheet.mergeCells("  C5:E6");
    const dateCell = worksheet.getCell("C5");

    dateCell.value = `Time Stamp: ${getCurrentDate().date} - ${
      getCurrentDate().time
    }`;

    dateCell.font = {
      name: "Avenir Next",
      size: 14,
      bold: true,
    };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell: any) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "223040" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 14,
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    //Setting cell data
    data.forEach((d: any) => {
      const row = worksheet.addRow(d);
      row.eachCell((cell: any) => {
        cell.font = {
          size: 14,
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    });

    worksheet.addRow([]);

    //Add Auto resize column function
    newworksheet.columns.forEach((column: any) => {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, (cell: any) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });
    if (option) {
      this.useOptions(worksheet, option);
    }

    //Freeze pane
    worksheet.views = [
      {
        state: "frozen",
        xSplit: 2,
        ySplit: 8,
        topLeftCell: "C9",
        activeCell: "A1",
      },
    ];

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, fileName + ".xlsx");
    });
  }
  useOptions(worksheet: Worksheet, options: excelOptions) {
    if (options.adjustColums) {
      for (const column of options.adjustColums) {
        worksheet.getColumn(column.columnNumber).width = column.columWidth;
      }
    }
  }
}
