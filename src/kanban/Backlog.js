import React, {useEffect, useRef, useState} from 'react';
import CreateModal from "./CreateModal";
import {Link} from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {Toast} from 'primereact/toast';
import {Dropdown} from 'primereact/dropdown';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';

const Backlog = (props) => {
    const {cards, arrayStatuses, priorities, usersNames, createNewCard, getCardById} = props
    const [selectedProduct, setSelectedProduct] = useState(null);
    const toast = useRef(null);
    const [statuses] = useState(arrayStatuses);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null)


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'assignee': {
                operator: FilterOperator.AND,
                constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
            },
            'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        });
        setGlobalFilterValue('');
    }

    const clearFilter = () => {
        initFilters();
    }

    const renderHeader = () => {
        return (
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined"
                        onClick={clearFilter}/>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
                </span>
            </div>
        )
    }
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses}
                         onChange={(e) => options.filterCallback(e.value, options.index)}
                         itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter"
                         showClear/>;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }
    const onRowSelect = (event) => {
        const id = event.data._id
        getCardById(id)
        window.open(`/kanban/card/${id}`, "_blank");
    };

    useEffect(() => {
        initFilters()
    }, [])

    const header = renderHeader()

    return (

        <div>
            <nav className="navbar navbar-expand-lg" style={{marginTop: 10, marginBottom: 10}}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "100px"}}>
                        <li className="nav-item">
                            <Link to="/kanban" className="nav-link">
                                TasksBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kanban/backlog" className="nav-link"
                                  style={{color: "blue", textDecoration: "underline"}}>
                                Backlog
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center flex-grow-1">
                        <CreateModal createNewCard={createNewCard} arrayStatuses={arrayStatuses}
                                     priorities={priorities} usersNames={usersNames}/>
                    </div>
                </div>
            </nav>

            <div className="card container-fluid">
                <Toast ref={toast}/>
                <DataTable value={cards} paginator rows={4} rowsPerPageOptions={[4, 6, 8]}
                           selectionMode="single" selection={selectedProduct} filters={filters}
                           onSelectionChange={(e) => setSelectedProduct(e.value)}
                           onRowSelect={onRowSelect} showGridlines
                           tableStyle={{minWidth: '50rem'}}
                           globalFilterFields={['assignee', 'status', 'name', 'priority', 'taskNumber']} header={header}
                           emptyMessage="No customers found.">
                    <Column field="taskNumber" header="Task #" sortable style={{width: '15%'}}></Column>
                    <Column field="assignee" header="Assignee" filter filterPlaceholder="Search by name" sortable
                            style={{width: '15%'}}></Column>
                    <Column field="priority" header="Priority" sortable style={{width: '5%'}}></Column>
                    <Column field="status" header="Status" filterMenuStyle={{width: '14rem'}}
                            body={statusBodyTemplate}
                            sortable style={{width: '15%'}}
                            filter filterElement={statusFilterTemplate}/>
                    <Column field="name" header="Title"></Column>
                </DataTable>
            </div>

        </div>


    );
};

export default Backlog;
