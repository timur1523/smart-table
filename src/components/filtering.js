export function initFiltering(elements) {


    function applyFiltering(query, state, action) {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.closest('.filter-row').querySelector(`[name="${field}"]`);
            if (input.value) {
                input.value = '';
                state[field] = '';
            }
        }
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter${elements[key].name}`] = elements[key].value
                }
            }
        })
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    function updateIndexes(elements, indexes) {
        Object.keys(indexes).forEach(key => {
            elements[key].append(
                ...Object.values(indexes[key]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option
                })
            )
        })
    }
    return {applyFiltering, updateIndexes};
}
