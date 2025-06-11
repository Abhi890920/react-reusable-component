import { useState} from 'react';
import { InputText } from "primereact/inputtext";
import { Table } from '../component/table/Table';
import { ColumnConfig } from '../component/table/TableTypes';
import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MenuItem } from 'primereact/menuitem';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { MenuItemCommandEvent } from 'primereact/menuitem';

interface TableData {
    id: number;
    name: string;
    email: string;
    status: string;
    type: string;
    progress: number;
    amount: number;
    date: string;
    priority: string;
    tags: string[];
    country: string;
    representative: {
        name: string;
        image: string;
    };
}

const TableDemo = () => {

    const [selection, setSelection] = useState([]);
    const isRowSelectable = (event:any) => (event.data.status==="inactive" ? false : true);
    const rowClassName = (data:any) =>(data.status === "inactive" ? 'p-disabled' : '');


    const columns: ColumnConfig[] = [
        {
            field: 'id',
            header: 'ID',
            sortable: true,
            filter: true,
            filterType: 'text',
            width: '80px',
            frozen: true,
            body: (r:any) : any => r.id
        },
        {
            field: 'name',
            header: 'Name',
            sortable: true,
            filter: true,
            filterType: 'text',
            editor: (options) => (
                <InputText
                    value={options.value}
                    onChange={(e) => options.editorCallback(e.target.value)}
                />
            )
        },
        {
            field: 'email',
            header: 'Email',
            sortable: true,
            filter: true,
            filterType: 'text'
        },
        {
            field: 'status',
            header: 'Status',
            sortable: true,
            filter: true,
            filterType: 'dropdown',
            filterOptions: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pending', value: 'pending' }
            ],
            body: (row:any) :any => (
                <Tag
                    severity={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}
                    value={row.status}
                    className="uppercase"
                />
            )
        },
        {
            field: 'type',
            header: 'Type',
            sortable: true,
            filter: true,
            filterType: 'dropdown',
            filterOptions: [
                { label: 'Bronze', value: 'bronze' },
                { label: 'Silver', value: 'silver' },
                { label: 'Gold', value: 'gold' },
                { label: 'Platinum', value: 'platinum' }
            ]
        },
        {
            field: 'progress',
            header: 'Progress',
            sortable: true,
            filter: true,
            filterType: 'numeric',
            body: (row:any) :any => (
                <div className="flex align-items-center gap-2">
                    <div className="w-8rem surface-200 border-round">
                        <div className={`border-round ${getProgressBgColor(row.progress)}`}
                             style={{ height: '0.5rem',width: `${row.progress}%`}}>
                        </div>
                    </div>
                    <span className={getProgressColor(row.progress)}>{row.progress}%</span>
                </div>
            ),
            editor: (options) => (
                <InputNumber
                    value={options.value}
                    onChange={(e) => options.editorCallback(e.value)}
                    min={0}
                    max={100}
                />
            )
        },
        {
            field: 'amount',
            header: 'Amount',
            sortable: true,
            filter: true,
            filterType: 'numeric',
            body: (row: any): any => formatCurrency(row.amount)
        },
        {
            field: 'date',
            header: 'Date',
            sortable: true,
            filter: true,
            filterType: 'date',
            body: (rowData: any): any => new Date(rowData.date).toLocaleDateString(),
            editor: (options:any):any => (
                <Calendar
                    value={new Date(options.value)}
                    onChange={(e:any):any => options.editorCallback(e.value?.toISOString())}
                    dateFormat="dd/mm/yy"
                />
            )
        }
    ];

    const getProgressColor:any = (progress: number):any => {
        if (progress < 25) return 'text-red-500';
        if (progress < 50) return 'text-orange-500';
        if (progress < 75) return 'text-blue-500';
        return 'text-green-500';
    };
    const getProgressBgColor:any = (progress: number):any => {
        if (progress < 25) return 'bg-red-500';
        if (progress < 50) return 'bg-orange-500';
        if (progress < 75) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    const data: TableData[] = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            status: 'active',
            type: 'gold',
            progress: 75,
            amount: 1250.50,
            date: '2024-01-15',
            priority: 'high',
            tags: ['sales', 'manager'],
            country: 'USA',
            representative: {
                name: 'Amy Elsner',
                image: 'amyelsner.png'
            }
        },
        {
            id: 2,
            name: 'Maria Garcia',
            email: 'maria.garcia@email.com',
            status: 'pending',
            type: 'silver',
            progress: 45,
            amount: 850.75,
            date: '2024-01-18',
            priority: 'medium',
            tags: ['support', 'technical'],
            country: 'Spain',
            representative: {
                name: 'Anna Fali',
                image: 'annafali.png'
            }
        },
        {
            id: 3,
            name: 'David Wilson',
            email: 'david.wilson@email.com',
            status: 'inactive',
            type: 'bronze',
            progress: 15,
            amount: 350.25,
            date: '2024-01-10',
            priority: 'low',
            tags: ['customer'],
            country: 'UK',
            representative: {
                name: 'Xuxue Feng',
                image: 'xuxuefeng.png'
            }
        },
        {
            id: 4,
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            status: 'active',
            type: 'platinum',
            progress: 90,
            amount: 2500.00,
            date: '2024-01-20',
            priority: 'high',
            tags: ['vip', 'premium'],
            country: 'Canada',
            representative: {
                name: 'Bernardo Dominic',
                image: 'bernardodominic.png'
            }
        },
        {
            id: 5,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'inactive',
            type: 'gold',
            progress: 60,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 6,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'active',
            type: 'gold',
            progress: 60,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 7,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'active',
            type: 'gold',
            progress: 10,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 8,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'inactive',
            type: 'gold',
            progress: 80,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 9,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'active',
            type: 'gold',
            progress: 60,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 10,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'pending',
            type: 'gold',
            progress: 30,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        },
        {
            id: 11,
            name: 'Michael Brown',
            email: 'm.brown@email.com',
            status: 'inactive',
            type: 'gold',
            progress: 20,
            amount: 1750.25,
            date: '2024-01-12',
            priority: 'medium',
            tags: ['sales'],
            country: 'Australia',
            representative: {
                name: 'Ivan Magalhaes',
                image: 'ivanmagalhaes.png'
            }
        }
    ];

    const defaultFilters: DataTableFilterMeta = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],},
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        progress: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        amount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tags: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        priority: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        representative: { value: null, matchMode: FilterMatchMode.BETWEEN },
        country: { value: null, matchMode: FilterMatchMode.EQUALS },
      };

    const contextMenuItems: MenuItem[] = [
        {
            label: 'View Details',
            icon: 'pi pi-fw pi-search',
            command: (event: MenuItemCommandEvent) => {
                const target = event.originalEvent?.target as HTMLElement;
                const item = target?.closest('tr')?.dataset.item;
                console.log('View details:', item);
            }
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            command: (event: MenuItemCommandEvent) => {
                const target = event.originalEvent?.target as HTMLElement;
                const item = target?.closest('tr')?.dataset.item;
                console.log('Edit item:', item);
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
            command: (event: MenuItemCommandEvent) => {
                const target = event.originalEvent?.target as HTMLElement;
                const item = target?.closest('tr')?.dataset.item;
                console.log('Delete item:', item);
            }
        }
    ];

    return (
        <Table
            columns={columns}
            data={data}
            dataKey="id"
            header="Reusable Data Table"
            selectionMode="checkbox"
            selection={selection}
            onSelectionChange={setSelection}
            isDataSelectable={isRowSelectable} 
            rowClassName={rowClassName}
            showGridlines
            filterDisplay="menu"
            defaultFilters={defaultFilters}
            sortMode="single"
            sortField="id" 
            sortOrder={1}          
            removableSort
            scrollable
            scrollHeight="500px"
            editMode="row"
            onRowEditComplete={(e) => console.log('Row edited:', e.data)}
            contextMenu={contextMenuItems}
        />
    );
};

export default TableDemo;