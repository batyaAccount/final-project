import axios from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "../models/Invoice";

export default ({ invoiceId, onClose }: { invoiceId: number, onClose: Function }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getInvoiceById = async () => {
        try {
            const response = await axios.get(`https://localhost:7160/api/Recipt/${invoiceId}`);
            setInvoice(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getInvoiceById();
    }, [invoiceId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (invoice) {
            setInvoice({
                ...invoice,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (invoice) {
            try {
                await axios.put(`https://localhost:7160/api/Recipt/${invoiceId}`, invoice);
                alert("Invoice updated successfully!");
                onClose();
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {invoice && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            name="Amount"
                            value={invoice.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="Category"
                            value={invoice.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            name="Date"
                            value={invoice.date ? invoice.date.toString().substring(0,10) : ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Supplier:</label>
                        <input
                            type="text"
                            name="Supplier"
                            value={invoice.supplier}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>URL:</label>
                        <input
                            type="text"
                            name="Url"
                            value={invoice.url}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Invoice</button>
                </form>
            )}
        </>
    );
};
