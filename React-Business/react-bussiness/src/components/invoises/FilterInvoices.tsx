import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material"
import { useState } from "react";
import { Files } from "../models/Files";
import { Invoice } from "../models/Invoice";
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FilterInvoiecs = ({ fetchInvoices, files, setFiles, invoiceArray }: { fetchInvoices: Function, files: Array<Files>, setFiles: Function, invoiceArray: Array<Invoice> }) => {
    const [filterMonth, setFilterMonth] = useState<number | null>(null);
    const [filterSupplier, setFilterSupplier] = useState<string>("");
    const [filterYear, setFilterYear] = useState<number | null>(null);
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
        years.push(year);
    }
    const handleFilter = async () => {
        var invoices = await fetchInvoices() as (Invoice[] | Files[])[];
        console.log(invoiceArray);
        console.log(files);
        let filteredFiles = invoices;

        if (filterMonth) {
            filteredFiles[0] = (filteredFiles[0] as Invoice[])?.filter(invoice => new Date(invoice.date).getMonth() + 1 === filterMonth);
        }
        if (filterYear) {
            filteredFiles[0] = (filteredFiles[0] as Invoice[])?.filter(invoice => new Date(invoice.date).getFullYear() === filterYear);
        }

        if (filterSupplier) {
            filteredFiles[1] = (filteredFiles[0] as Invoice[])?.filter(invoice => invoice.supplier.includes(filterSupplier));
        }
        var ff = (filteredFiles[1] as Files[]).filter(f => (filteredFiles[0] as Invoice[])?.find(f1 => f1.id == f.receiptId))
        setFiles(ff);
    };

    const resetFilters = () => {
        setFilterMonth(null);
        setFilterYear(null);
        setFilterSupplier("");
        fetchInvoices();
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <InputLabel>Month</InputLabel>
                    <Select value={filterMonth || ""} onChange={(e: any) => setFilterMonth(e.target.value)} label="Month">
                        <MenuItem value=""><em>All months</em></MenuItem>
                        {[...Array(12)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <InputLabel>Year</InputLabel>
                    <Select value={filterYear || ""} onChange={(e: any) => setFilterYear(e.target.value)} label="Year">
                        <MenuItem value=""><em>All years</em></MenuItem>
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField label="Supplier name" variant="outlined" value={filterSupplier} onChange={(e) => setFilterSupplier(e.target.value)} />

                <Button
                    variant="outlined"
                    style={{
                        backgroundColor: 'rgba(0, 0, 255, 0.2)', color: 'white', border: '1px solid rgba(0, 0, 255, 0.5)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
                    }} startIcon={<FilterListIcon />}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
                    }} onClick={handleFilter}
                >
                    Filter
                </Button>
                <Button
                    variant="outlined"
                    style={{
                        backgroundColor: 'rgba(0, 0, 255, 0.2)', color: 'white', border: '1px solid rgba(0, 0, 255, 0.5)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
                    }}
                    startIcon={<ArrowBackIcon />}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
                    }} onClick={resetFilters}
                >
                    Back to all invoices
                </Button>
            </div>
        </>
    )
}
export default FilterInvoiecs