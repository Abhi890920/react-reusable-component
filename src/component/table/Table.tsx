import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ContextMenu } from 'primereact/contextmenu';
import { DataTable } from 'primereact/datatable';
import {
    Column,
    ColumnFilterApplyTemplateOptions,
    ColumnFilterClearTemplateOptions,
  } from "primereact/column";
  import { InputText } from "primereact/inputtext";
  import { IconField } from "primereact/iconfield";
  import { InputIcon } from "primereact/inputicon";
  import { Button } from "primereact/button";


import { TableProps, ColumnConfig } from './TableTypes';


export const Table = <T extends { [key: string]: any }>({
    columns,
    data,
    dataKey,
    loading,
    selectionMode,
    selection,
    onSelectionChange,
    defaultFilters,
    header,
    ...rest
}: TableProps) => {
    const dt = useRef<DataTable<T[]>>(null);
    const cm = useRef<ContextMenu>(null);
    const [filters, setFilters] = useState<any>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const clearFilter = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue("");
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
    
        // @ts-ignore
        _filters["global"].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
      };

    const [localSelection, setLocalSelection] = useState<T | T[] | null>(selection);

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <div>{header}</div>
                <div className="flex align-items-center gap-2">
                    <IconField iconPosition="left">
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Global table search..."
                            className="p-inputtext-sm"
                        />
                        <InputIcon className="pi pi-search"/>
                    </IconField>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            icon="pi pi-filter-slash"
                            label="Clear"
                            onClick={clearFilter}
                            severity="help"
                            size="small"
                            outlined
                        />
                        <Button
                            type="button"
                            icon="pi pi-file"
                            onClick={() => dt.current?.exportCSV()}
                            severity="info"
                            size="small"
                            outlined
                            tooltip="Export CSV"
                        />
                        <Button
                            type="button"
                            icon="pi pi-file-pdf"
                            onClick={exportPDF}
                            severity="warning"
                            size="small"
                            outlined
                            tooltip="Export PDF"
                        />
                        <Button
                            type="button"
                            icon="pi pi-file-excel"
                            onClick={exportExcel}
                            severity="success"
                            size="small"
                            outlined
                            tooltip="Export Excel"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const exportPDF = () => {
        const doc = new jsPDF('l', 'pt');
        doc.setFontSize(15);
        doc.text('Table Export', 40, 40);
        
        const exportColumns = columns
            .filter(col => col.exportable !== false)
            .map(col => ({
                header: col.header,
                dataKey: col.field
            }));

        autoTable(doc, {
            startY: 50,
            columns: exportColumns,
            body: data,
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { top: 50 }
        });

        doc.save('table-export.pdf');
    };

    const exportExcel = () => {
        const exportData = data.map(item => {
            const row: { [key: string]: any } = {};
            columns
                .filter(col => col.exportable !== false)
                .forEach(col => {
                    if (col.body) {
                        const element = col.body(item, { field: col.field, header: col.header });
                        if (React.isValidElement(element)) {
                            row[col.header] = element.props.children || '';
                        } else {
                            row[col.header] = element;
                        }
                    } else {
                        row[col.header] = item[col.field];
                    }
                });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'table-export.xlsx');
    };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <div className="enhanced-table">
            {rest.contextMenu && (
                <ContextMenu
                    ref={cm}
                    model={rest.contextMenu}
                    onShow={rest.onContextMenu}
                />
            )}

            <DataTable<T[]>
                ref={dt}
                value={data}
                dataKey={dataKey|| "id"}
                loading={loading}
                className={rest.tableClassName}
                style={rest.tableStyle}
                scrollHeight={rest.scrollHeight || "flex"}
                selectionMode={selectionMode}
                selection={localSelection}
                onSelectionChange={(e:any): void => {
                    setLocalSelection(e.value);
                    onSelectionChange?.(e.value);
                }}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={renderHeader()}
                paginator={rest.paginator || true}
                paginatorTemplate={rest.paginatorTemplate || "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate={rest.currentPageReportTemplate || "Showing {first} - {last} of {totalRecords} records"}
                paginatorLeft={rest.paginatorLeft || paginatorLeft}
                paginatorRight={rest.paginatorRight || paginatorRight}
                rows={rest.rows || 5}
                rowsPerPageOptions={rest.rowsPerPageOptions || [5, 10, 25, 50, 100]}
                size={rest.size || "small"}
                emptyMessage='No record found!'

                {...rest}
            >
            {selectionMode && <Column selectionMode={selectionMode==="checkbox" ? "multiple" : selectionMode==="radiobutton"? "single" : selectionMode} headerStyle={{ width: '3rem' }}/>}   
            {columns.map((col, index) => (
                <Column
                    key={col.field || index}
                    field={col.field}
                    header={col.header}
                    sortable={col.sortable}
                    filter={col.filter? true : false}
                    body={col.body}
                    style={col.style}
                    frozen={col.frozen}
                    headerStyle={col.headerStyle}
                    headerClassName={col.headerClassName}
                    className={col.className}
                    bodyClassName={col.bodyClassName}
                    showFilterMenu={col.filter}
                    showFilterMatchModes={col.showFilterMatchModes}
                    filterField={col.filterField || col.field}
                    filterPlaceholder={col.filterPlaceholder || "Search..."}
                    filterClear={col.filterClear ? (options: ColumnFilterClearTemplateOptions) => col.filterClear!(options) : undefined}
                    filterApply={ col.filterApply ? (options: ColumnFilterApplyTemplateOptions) => col.filterApply!(options) : undefined}
                    filterFooter={ col.filterFooter ? (options: any) => col.filterFooter!(options) : undefined}
                    filterElement={col.filterElement}
                    filterMatchMode={col.filterMatchMode}
                    filterHeaderStyle={col.filterHeaderStyle}
                    filterMenuStyle={col.filterMenuStyle}
                    filterFunction={col.filterFunction}
                    exportable={col.exportable}
                />
            ))}
            </DataTable>
        </div>
    );
};