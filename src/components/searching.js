import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
        const compare = createComparison(['skipEmptyTargetValues'], [rules.searchMultipleFields(searchField, ['date',
'customer', 'seller'], false)]);
    // @todo: #5.1 — настроить компаратор

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(item => compare(item, state))
    }
}