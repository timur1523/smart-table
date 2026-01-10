import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);


// @todo: #4.1 — заполнить выпадающие списки опциями

export function initFiltering(elements, indexes) {
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


    // @todo: #4.2 — обработать очистку поля

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.closest('.filter-wrapper').querySelector(`[name="${field}"]`);
            if (input.value) {
                input.value = '';
                state[field] = '';
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        console.log(state);

        return data.filter(item => compare(item, state));
    }
}

