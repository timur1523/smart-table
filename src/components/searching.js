export function initSearching(searchField) {
    return (query, state) => {
        console.log(state[searchField]);
        return state[searchField] ? Object.assign({}, query, { search: state[searchField] }) : query;
    }
}