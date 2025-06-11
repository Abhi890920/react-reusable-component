
export interface FilterOption {
    label: string;
    value: any;
}

export interface ColumnConfig {
    field: string;
    header: string;
    sortable?: boolean;
    filter?: boolean;
    filterType?: 'text' | 'numeric' | 'date' | 'dropdown' | 'multiselect' | 'custom';
    filterOptions?: FilterOption[];
    filterElement?: React.ReactNode;
    body?: any;
    editor?: (options: any) => React.ReactNode;
    frozen?: boolean;
    selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton' | null | undefined;
    style?: React.CSSProperties;
    className?: string;
    headerStyle?: React.CSSProperties;
    headerClassName?: string;
    footer?: string | ((data: any[]) => React.ReactNode);
    footerStyle?: React.CSSProperties;
    footerClassName?: string;
    expander?: boolean;
    groupable?: boolean;
    rowSpan?: boolean;
    colSpan?: boolean;
    exportable?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    bodyClassName?: string;
    showFilterMatchModes?: boolean;
    filterField?: string;
    filterPlaceholder?: string;
    filterClear?: any;
    filterApply?: any;
    filterFooter?: any;
    filterMatchMode?: string;
    filterHeaderStyle?: React.CSSProperties;
    filterMenuStyle?: React.CSSProperties;
    filterFunction?: (value: any, filter: any) => boolean;
}

export interface TableProps {
    columns: ColumnConfig[];
    data: any[];
    dataKey: string;
    loading?: boolean;
    size?: 'small' | 'normal' | 'large' | undefined;
    rowClassName?: (data: any) => string | undefined;
    // Selection
    selectionMode?: 'single' | 'multiple' | 'checkbox' | 'radiobutton' | null | undefined;
    selection?: any | any[];
    onSelectionChange?: (selection: any) => void;
    isDataSelectable?: (data: any) => boolean;
    dragSelection?: boolean;
    cellSelection?: boolean;
    
    // Sorting
    sortField?: string;
    sortOrder?: 1 | -1;
    multiSortMeta?: any[];
    sortMode?: 'single' | 'multiple';
    removableSort?: boolean;
    onSort?: (event: any) => void;
    
    // Filtering
    filters?: any;
    defaultFilters?: any;
    filterDisplay?: 'menu' | 'row';
    globalFilterFields?: string[];
    filterLocale?: string;
    
    // Pagination
    paginator?: boolean;
    rows?: number;
    totalRecords?: number;
    first?: number;
    paginatorPosition?: 'top' | 'bottom' | 'both';
    paginatorTemplate?: string;
    paginatorLeft?: React.ReactNode;
    paginatorRight?: React.ReactNode;
    rowsPerPageOptions?: number[];
    currentPageReportTemplate?: string;
    onPage?: (event: any) => void;
    alwaysShowPaginator?: boolean;
    paginatorDropdownAppendTo?: 'body' | 'self';
    paginatorDropdownAppendToBody?: boolean;
    paginatorClassName?: string;
    paginatorTemplateOptions?: any;
    paginatorDropdown?: boolean;
    paginatorDropdownItems?: any[];
    
    // Lazy Loading
    lazy?: boolean;
    onLazyLoad?: (event: any) => void;
    
    // Scrolling
    scrollable?: boolean;
    scrollHeight?: string;
    scrollDirection?: 'vertical' | 'horizontal' | 'both';
    virtualScroll?: boolean;
    virtualScrollOptions?: any;
    
    // Row Features
    expandedRows?: any[];
    onRowToggle?: (event: any) => void;
    rowExpansionTemplate?: (data: any) => React.ReactNode;
    groupField?: string;
    groupRowsBy?: string;
    groupRowTemplate?: (data: any) => React.ReactNode;
    
    // Editing
    editMode?: 'row' | 'cell';
    onRowEditComplete?: (event: any) => void;
    onCellEditComplete?: (event: any) => void;
    showGridlines?: boolean;
    stripedRows?: boolean;
    
    // Export
    exportFunction?: (data: any[]) => void;
    csvSeparator?: string;
    exportFilename?: string;
    
    // Styling & Customization
    tableStyle?: React.CSSProperties;
    tableClassName?: string;
    
    // Context Menu
    contextMenu?: any;
    onContextMenu?: (event: any) => void;
    
    // State Management
    stateKey?: string;
    stateStorage?: 'local' | 'session';
    
    // Custom Templates
    header?: React.ReactNode;
    footer?: React.ReactNode;
    emptyMessage?: React.ReactNode;
}