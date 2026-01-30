const BASE_URL = 'https://webinars.webdev.education-services.ru/sp7-api';

export function initData() {
    let sellers,
        customers,
        lastResult,
        lastQuery;

    function currectFields(data) {
        return data.map(item => ({
            id: item.receipt_id,
            date: item.date,
            seller: sellers[item.seller_id],
            customer: customers[item.customer_id],
            total: item.total_amount
        })
        )
    }

    async function getIndexes() {
        if (!sellers || !customers) {
            [sellers, customers] = await Promise.all([fetch(`${BASE_URL}/sellers`).then(res => res.json()), fetch(`${BASE_URL}/customers`).then(res => res.json())]);
        }
        return { customers, sellers };
    }

    async function getRecords(query, isUpdate = false) {
        const qs = new URLSearchParams(query);
        const nextQuery = qs.toString();
        if (lastQuery === nextQuery && !isUpdate) {
            return lastResult;
        }
        const response = await fetch(`${BASE_URL}/records?${nextQuery}`);
        const records = await response.json();
        lastQuery = nextQuery;
        lastResult = { total: records.total, items: currectFields(records.items) }

        return lastResult;
    }
    return { getIndexes, getRecords };
}